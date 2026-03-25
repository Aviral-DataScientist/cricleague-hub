/**
 * CricLeague Hub — API Server
 * Serves processed cricsheet stats and proxies ESPN RSS news
 * Port: 3001
 */

import express from 'express';
import cors from 'cors';
import { parseStringPromise } from 'xml2js';
import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// ─── In-memory cache ──────────────────────────────────────────────────────────

const cache = new Map();
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

function getCached(key) {
  const entry = cache.get(key);
  if (entry && Date.now() - entry.timestamp < CACHE_TTL) return entry.data;
  return null;
}

function setCache(key, data) {
  cache.set(key, { data, timestamp: Date.now() });
}

// ─── Load pre-processed league data ──────────────────────────────────────────

function loadLeagueData() {
  const realDataDir = join(__dirname, '../src/data/real');
  const leagueIds = ['ipl', 'bbl', 'psl', 'cpl', 'hundred', 't20blast'];
  const leagues = {};

  for (const id of leagueIds) {
    const filePath = join(realDataDir, `${id}.json`);
    if (existsSync(filePath)) {
      try {
        leagues[id] = JSON.parse(readFileSync(filePath, 'utf8'));
        console.log(`  Loaded ${id}.json (${leagues[id].totalMatches} matches)`);
      } catch (e) {
        console.error(`  Failed to load ${id}.json: ${e.message}`);
      }
    }
  }
  return leagues;
}

const leagueData = loadLeagueData();

// ─── League tag detection ─────────────────────────────────────────────────────

function detectLeague(title = '') {
  const t = title.toLowerCase();
  if (t.includes('ipl') || t.includes('indian premier')) return { tag: 'IPL', id: 'ipl' };
  if (t.includes('bbl') || t.includes('big bash')) return { tag: 'BBL', id: 'bbl' };
  if (t.includes('psl') || t.includes('pakistan super')) return { tag: 'PSL', id: 'psl' };
  if (t.includes('cpl') || t.includes('caribbean premier')) return { tag: 'CPL', id: 'cpl' };
  if (t.includes('hundred')) return { tag: 'The Hundred', id: 'hundred' };
  if (t.includes('t20 blast') || t.includes('blast')) return { tag: 'T20 Blast', id: 't20blast' };
  if (t.includes('sa20')) return { tag: 'SA20', id: 'sa20' };
  if (t.includes('ilt20')) return { tag: 'ILT20', id: 'ilt20' };
  if (t.includes('mlc') || t.includes('major league cricket')) return { tag: 'MLC', id: 'mlc' };
  if (t.includes('lpl') || t.includes('lanka premier')) return { tag: 'LPL', id: 'lpl' };
  if (t.includes('bpl') || t.includes('bangladesh premier')) return { tag: 'BPL', id: 'bpl' };
  return { tag: 'Cricket', id: 'ipl' };
}

// Strip HTML tags from RSS description
function stripHtml(html = '') {
  return html.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").trim();
}

// ─── Routes ───────────────────────────────────────────────────────────────────

// Health check
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    leaguesLoaded: Object.keys(leagueData),
    uptime: process.uptime(),
  });
});

// All league stats
app.get('/api/leagues', (_req, res) => {
  res.json(leagueData);
});

// Specific league stats
app.get('/api/leagues/:id', (req, res) => {
  const data = leagueData[req.params.id];
  if (data) {
    res.json(data);
  } else {
    res.status(404).json({ error: 'No cricsheet data for this league' });
  }
});

// ESPN Cricinfo RSS news
app.get('/api/news', async (_req, res) => {
  const cacheKey = 'espn_news';
  const cached = getCached(cacheKey);
  if (cached) {
    console.log('Serving cached news');
    return res.json(cached);
  }

  const RSS_URL = 'https://www.espncricinfo.com/rss/content/story/feeds/0.xml';

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);

    const response = await fetch(RSS_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'application/rss+xml, application/xml, text/xml, */*',
      },
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const xml = await response.text();
    const parsed = await parseStringPromise(xml, { explicitArray: false, trim: true });

    const channel = parsed?.rss?.channel;
    if (!channel) throw new Error('Invalid RSS structure');

    const rawItems = channel.item || [];
    const items = Array.isArray(rawItems) ? rawItems : [rawItems];

    const articles = items
      .slice(0, 20)
      .filter(Boolean)
      .map((item, index) => {
        const title = typeof item.title === 'string' ? item.title : (item.title?._ || '');
        const description = typeof item.description === 'string' ? item.description : (item.description?._ || '');
        const clean = stripHtml(description);
        const { tag, id } = detectLeague(title);
        const pubDate = item.pubDate ? new Date(item.pubDate) : new Date();
        const dateStr = isNaN(pubDate) ? new Date().toISOString().split('T')[0] : pubDate.toISOString().split('T')[0];

        return {
          id: `espn-${Date.now()}-${index}`,
          title: title || 'Cricket News',
          excerpt: clean.length > 200 ? clean.slice(0, 197) + '...' : (clean || 'Read the full story on ESPN Cricinfo.'),
          content: clean,
          leagueTag: tag,
          leagueId: id,
          author: item['dc:creator'] || item.author || 'ESPN Cricinfo',
          date: dateStr,
          readTime: Math.max(2, Math.floor(clean.split(' ').length / 200)),
          category: 'news',
          featured: index < 3,
          url: typeof item.link === 'string' ? item.link : (item.link?._ || item.guid?._ || ''),
          source: 'ESPN Cricinfo',
        };
      });

    console.log(`Fetched ${articles.length} articles from ESPN RSS`);
    setCache(cacheKey, articles);
    res.json(articles);
  } catch (err) {
    console.error('ESPN RSS fetch failed:', err.message);
    // Try saved news.json as fallback
    const savedNewsPath = join(__dirname, '../src/data/real/news.json');
    if (existsSync(savedNewsPath)) {
      try {
        const saved = JSON.parse(readFileSync(savedNewsPath, 'utf8'));
        console.log(`Serving ${saved.length} articles from saved news.json fallback`);
        return res.json(saved);
      } catch (e) {
        console.error('Failed to read saved news.json:', e.message);
      }
    }
    res.status(502).json({ error: 'RSS fetch failed', message: err.message });
  }
});

// ─── Start server ─────────────────────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`\nCricLeague Hub API — http://localhost:${PORT}`);
  console.log(`  GET /api/health      — server status`);
  console.log(`  GET /api/news        — ESPN Cricinfo articles (cached 1h)`);
  console.log(`  GET /api/leagues     — all processed cricsheet stats`);
  console.log(`  GET /api/leagues/:id — specific league stats`);
  if (Object.keys(leagueData).length === 0) {
    console.log('\n  ⚠  No real data found. Run: node scripts/process-cricsheet.js');
  }
});
