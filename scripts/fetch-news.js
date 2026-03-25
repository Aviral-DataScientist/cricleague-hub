/**
 * fetch-news.js
 * Fetches top 20 articles from ESPN Cricinfo RSS and saves to src/data/real/news.json
 *
 * Usage: node scripts/fetch-news.js
 */

import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parseStringPromise } from 'xml2js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const OUTPUT_DIR = path.join(__dirname, '../src/data/real');
const OUT_FILE = path.join(OUTPUT_DIR, 'news.json');

const RSS_URL = 'https://www.espncricinfo.com/rss/content/story/feeds/0.xml';

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'application/rss+xml, application/xml, text/xml, */*',
      },
      timeout: 20000,
    }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return fetchUrl(res.headers.location).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode}`));
      }
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => resolve(data));
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('Request timed out')); });
  });
}

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

function stripHtml(html = '') {
  return html
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}

async function main() {
  console.log('Fetching ESPN Cricinfo RSS...');
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  let xml;
  try {
    xml = await fetchUrl(RSS_URL);
    console.log(`  Received ${(xml.length / 1024).toFixed(1)} KB`);
  } catch (err) {
    console.error(`  ✗ Fetch failed: ${err.message}`);
    process.exit(1);
  }

  const parsed = await parseStringPromise(xml, { explicitArray: false, trim: true });
  const channel = parsed?.rss?.channel;
  if (!channel) {
    console.error('  ✗ Invalid RSS structure');
    process.exit(1);
  }

  const rawItems = channel.item || [];
  const items = Array.isArray(rawItems) ? rawItems : [rawItems];

  const articles = items.slice(0, 20).filter(Boolean).map((item, index) => {
    const title = typeof item.title === 'string' ? item.title : (item.title?._ || '');
    const description = typeof item.description === 'string' ? item.description : (item.description?._ || '');
    const clean = stripHtml(description);
    const { tag, id } = detectLeague(title);
    const pubDate = item.pubDate ? new Date(item.pubDate) : new Date();
    const dateStr = isNaN(pubDate) ? new Date().toISOString().split('T')[0] : pubDate.toISOString().split('T')[0];

    return {
      id: `espn-saved-${index}`,
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

  fs.writeFileSync(OUT_FILE, JSON.stringify(articles, null, 2));
  console.log(`  ✓ Saved ${articles.length} articles to src/data/real/news.json`);
  if (articles.length > 0) {
    console.log(`  Latest: "${articles[0].title}" (${articles[0].date})`);
  }
}

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
