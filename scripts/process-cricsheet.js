/**
 * process-cricsheet.js
 * Downloads T20 league JSON data from cricsheet.org, processes match files,
 * and writes aggregated stats to src/data/real/<league>.json
 *
 * Usage: node scripts/process-cricsheet.js
 */

import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import AdmZip from 'adm-zip';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const OUTPUT_DIR = path.join(__dirname, '../src/data/real');
const TMP_DIR = path.join(__dirname, '../tmp_cricsheet');

// Make sure output and tmp dirs exist
fs.mkdirSync(OUTPUT_DIR, { recursive: true });
fs.mkdirSync(TMP_DIR, { recursive: true });

const LEAGUES = [
  { id: 'ipl',       url: 'https://cricsheet.org/downloads/ipl_json.zip',         name: 'Indian Premier League' },
  { id: 'bbl',       url: 'https://cricsheet.org/downloads/bbl_json.zip',         name: 'Big Bash League' },
  { id: 'psl',       url: 'https://cricsheet.org/downloads/psl_json.zip',         name: 'Pakistan Super League' },
  { id: 'cpl',       url: 'https://cricsheet.org/downloads/cpl_json.zip',         name: 'Caribbean Premier League' },
  { id: 'hundred',   url: 'https://cricsheet.org/downloads/hnd_json.zip',          name: 'The Hundred' },
  { id: 't20blast',  url: 'https://cricsheet.org/downloads/ntb_json.zip',          name: 'Vitality T20 Blast' },
];

// ─── Download ────────────────────────────────────────────────────────────────

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destPath);
    const protocol = url.startsWith('https') ? https : http;

    const request = protocol.get(url, { timeout: 120000 }, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        file.close();
        fs.unlinkSync(destPath);
        return downloadFile(response.headers.location, destPath).then(resolve).catch(reject);
      }
      if (response.statusCode !== 200) {
        file.close();
        fs.unlinkSync(destPath);
        return reject(new Error(`HTTP ${response.statusCode} for ${url}`));
      }

      const totalBytes = parseInt(response.headers['content-length'] || '0', 10);
      let downloaded = 0;
      let lastPct = -1;

      response.on('data', (chunk) => {
        downloaded += chunk.length;
        if (totalBytes > 0) {
          const pct = Math.floor((downloaded / totalBytes) * 100);
          if (pct !== lastPct && pct % 10 === 0) {
            process.stdout.write(`\r  ${pct}% (${(downloaded / 1048576).toFixed(1)} MB)`);
            lastPct = pct;
          }
        }
      });

      response.pipe(file);
      file.on('finish', () => {
        process.stdout.write('\n');
        file.close(resolve);
      });
    });

    request.on('error', (err) => {
      file.close();
      if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
      reject(err);
    });

    request.on('timeout', () => {
      request.destroy();
      reject(new Error('Download timed out'));
    });
  });
}

// ─── Process a single match JSON ────────────────────────────────────────────

function processMatch(matchData, stats) {
  const info = matchData.info;
  if (!info || !matchData.innings) return;

  const season = String(info.season || (info.dates?.[0] || '').slice(0, 4) || 'Unknown');
  const teams = info.teams || [];
  stats.totalMatches += 1;
  if (season !== 'Unknown') stats.seasons.add(season);

  for (const inning of matchData.innings) {
    const battingTeam = inning.team;
    const bowlingTeam = teams.find(t => t !== battingTeam) || 'Unknown';
    let inningRuns = 0;
    let inningBalls = 0;
    const batterRunsThisInning = new Map();
    const batterBallsThisInning = new Map();
    const batterSixesThisInning = new Map();

    for (const overObj of (inning.overs || [])) {
      for (const delivery of (overObj.deliveries || [])) {
        const batter = delivery.batter;
        const bowler = delivery.bowler;
        const bRuns = delivery.runs?.batter ?? 0;
        const extras = delivery.extras || {};
        const isWide = !!extras.wides;
        const isNoBall = !!extras.noballs;
        const totalRuns = delivery.runs?.total ?? 0;

        // Batter accumulation
        batterRunsThisInning.set(batter, (batterRunsThisInning.get(batter) || 0) + bRuns);
        if (!isWide) {
          batterBallsThisInning.set(batter, (batterBallsThisInning.get(batter) || 0) + 1);
        }
        if (bRuns === 6) {
          batterSixesThisInning.set(batter, (batterSixesThisInning.get(batter) || 0) + 1);
        }

        // Bowler accumulation
        if (!stats.bowlers.has(bowler)) {
          stats.bowlers.set(bowler, { wickets: 0, runsConceded: 0, balls: 0 });
        }
        const bs = stats.bowlers.get(bowler);
        bs.runsConceded += totalRuns;
        if (!isWide && !isNoBall) bs.balls += 1;

        // Wickets
        if (delivery.wickets) {
          for (const wkt of delivery.wickets) {
            const kind = wkt.kind || '';
            if (!['run out', 'retired hurt', 'obstructing the field', 'retired out'].includes(kind)) {
              bs.wickets += 1;
            }
          }
        }

        inningRuns += totalRuns;
        if (!isWide) inningBalls += 1;
      }
    }

    // Aggregate batter stats for this inning into career
    for (const [batter, runs] of batterRunsThisInning) {
      if (!stats.batters.has(batter)) {
        stats.batters.set(batter, { runs: 0, innings: 0, balls: 0, sixes: 0 });
      }
      const bs = stats.batters.get(batter);
      bs.runs += runs;
      bs.innings += 1;
      bs.balls += batterBallsThisInning.get(batter) || 0;
      bs.sixes += batterSixesThisInning.get(batter) || 0;

      // Highest individual score check
      if (runs > stats.highestScore.score) {
        stats.highestScore = { player: batter, score: runs, against: bowlingTeam, season };
      }
    }

    // Highest team total check
    if (inningRuns > stats.highestTeamTotal.runs) {
      stats.highestTeamTotal = { team: battingTeam, runs: inningRuns, against: bowlingTeam, season };
    }
  }
}

// ─── Build output from accumulated stats ─────────────────────────────────────

function buildOutput(leagueId, leagueName, stats) {
  // Top run scorers
  const topRunScorers = [...stats.batters.entries()]
    .sort((a, b) => b[1].runs - a[1].runs)
    .slice(0, 10)
    .map(([name, s]) => ({
      name,
      runs: s.runs,
      matches: s.innings, // approximate
      average: s.innings > 0 ? parseFloat((s.runs / s.innings).toFixed(2)) : 0,
      strikeRate: s.balls > 0 ? parseFloat(((s.runs / s.balls) * 100).toFixed(2)) : 0,
    }));

  // Top wicket takers
  const topWicketTakers = [...stats.bowlers.entries()]
    .sort((a, b) => b[1].wickets - a[1].wickets)
    .slice(0, 10)
    .map(([name, s]) => ({
      name,
      wickets: s.wickets,
      matches: Math.ceil(s.balls / 24), // approx matches from balls bowled
      economy: s.balls > 0 ? parseFloat(((s.runsConceded / s.balls) * 6).toFixed(2)) : 0,
      average: s.wickets > 0 ? parseFloat((s.runsConceded / s.wickets).toFixed(2)) : 0,
    }));

  const seasons = [...stats.seasons].sort();
  const latestSeason = seasons.length > 0 ? seasons[seasons.length - 1] : 'Unknown';

  return {
    leagueId,
    leagueName,
    totalMatches: stats.totalMatches,
    processedAt: new Date().toISOString(),
    latestSeason,
    seasons,
    topRunScorers,
    topWicketTakers,
    highestIndividualScore: stats.highestScore,
    highestTeamTotal: stats.highestTeamTotal,
  };
}

// ─── Process a league ZIP ────────────────────────────────────────────────────

async function processLeague(league) {
  console.log(`\n━━━ Processing ${league.name} (${league.id}) ━━━`);

  const zipPath = path.join(TMP_DIR, `${league.id}.zip`);

  // Download
  console.log(`  Downloading: ${league.url}`);
  try {
    await downloadFile(league.url, zipPath);
    console.log(`  Download complete: ${(fs.statSync(zipPath).size / 1048576).toFixed(1)} MB`);
  } catch (err) {
    console.warn(`  ⚠ Download failed: ${err.message} — using fallback`);
    writeFallback(league);
    return;
  }

  // Extract and process
  console.log('  Extracting and processing match files...');
  const stats = {
    totalMatches: 0,
    batters: new Map(),
    bowlers: new Map(),
    highestScore: { player: '', score: 0, against: '', season: '' },
    highestTeamTotal: { team: '', runs: 0, against: '', season: '' },
    seasons: new Set(),
  };

  let processed = 0;
  let errors = 0;

  try {
    const zip = new AdmZip(zipPath);
    const entries = zip.getEntries();
    const jsonEntries = entries.filter(e => e.entryName.endsWith('.json') && !e.isDirectory);

    console.log(`  Found ${jsonEntries.length} match files`);

    for (const entry of jsonEntries) {
      try {
        const content = entry.getData().toString('utf8');
        const matchData = JSON.parse(content);
        processMatch(matchData, stats);
        processed++;
        if (processed % 200 === 0) {
          process.stdout.write(`\r  Processed: ${processed}/${jsonEntries.length} matches`);
        }
      } catch {
        errors++;
      }
    }
    process.stdout.write(`\r  Processed: ${processed}/${jsonEntries.length} matches\n`);
    if (errors > 0) console.warn(`  ⚠ ${errors} files had parse errors`);
  } catch (err) {
    console.warn(`  ⚠ Extraction failed: ${err.message} — using fallback`);
    writeFallback(league);
    return;
  }

  // Build and write output
  const output = buildOutput(league.id, league.name, stats);
  const outPath = path.join(OUTPUT_DIR, `${league.id}.json`);
  fs.writeFileSync(outPath, JSON.stringify(output, null, 2));
  console.log(`  ✓ Saved: src/data/real/${league.id}.json (${stats.totalMatches} matches, ${stats.batters.size} batters, ${stats.bowlers.size} bowlers)`);

  // Clean up ZIP to save disk space
  try { fs.unlinkSync(zipPath); } catch { /* ignore */ }
}

// ─── Fallback data for when download fails ────────────────────────────────────

function writeFallback(league) {
  const fallbacks = {
    ipl: {
      topRunScorers: [
        { name: 'Virat Kohli', runs: 8004, matches: 237, average: 37.20, strikeRate: 131.5 },
        { name: 'Rohit Sharma', runs: 6628, matches: 243, average: 29.90, strikeRate: 130.2 },
        { name: 'Shikhar Dhawan', runs: 6769, matches: 222, average: 35.20, strikeRate: 127.1 },
        { name: 'David Warner', runs: 6565, matches: 184, average: 41.20, strikeRate: 140.1 },
        { name: 'Suresh Raina', runs: 5528, matches: 205, average: 32.50, strikeRate: 136.8 },
      ],
      topWicketTakers: [
        { name: 'Yuzvendra Chahal', wickets: 205, matches: 156, economy: 7.92, average: 21.4 },
        { name: 'Lasith Malinga', wickets: 170, matches: 122, economy: 7.14, average: 19.8 },
        { name: 'Amit Mishra', wickets: 166, matches: 154, economy: 7.35, average: 24.1 },
        { name: 'Piyush Chawla', wickets: 157, matches: 165, economy: 8.11, average: 27.3 },
        { name: 'Dwayne Bravo', wickets: 167, matches: 161, economy: 8.42, average: 25.6 },
      ],
      highestIndividualScore: { player: 'Chris Gayle', score: 175, against: 'Pune Warriors India', season: '2013' },
      highestTeamTotal: { team: 'Royal Challengers Bangalore', runs: 263, against: 'Pune Warriors India', season: '2013' },
    },
    bbl: {
      topRunScorers: [
        { name: 'Chris Lynn', runs: 2803, matches: 96, average: 31.5, strikeRate: 150.2 },
        { name: 'Aaron Finch', runs: 2682, matches: 105, average: 27.1, strikeRate: 135.4 },
        { name: 'Matthew Wade', runs: 2576, matches: 110, average: 25.8, strikeRate: 128.6 },
        { name: 'David Warner', runs: 2400, matches: 78, average: 34.3, strikeRate: 140.1 },
        { name: 'Alex Ross', runs: 2210, matches: 93, average: 27.6, strikeRate: 133.2 },
      ],
      topWicketTakers: [
        { name: 'Andrew Tye', wickets: 119, matches: 87, economy: 8.12, average: 22.4 },
        { name: 'Nathan Coulter-Nile', wickets: 114, matches: 92, economy: 8.35, average: 24.1 },
        { name: 'Adam Zampa', wickets: 113, matches: 95, economy: 7.98, average: 23.5 },
        { name: 'Ben Dwarshuis', wickets: 102, matches: 80, economy: 8.62, average: 26.3 },
        { name: 'Clint McKay', wickets: 97, matches: 82, economy: 7.76, average: 22.1 },
      ],
      highestIndividualScore: { player: 'Joe Burns', score: 115, against: 'Brisbane Heat', season: '2017-18' },
      highestTeamTotal: { team: 'Sydney Thunder', runs: 229, against: 'Melbourne Renegades', season: '2015-16' },
    },
    psl: {
      topRunScorers: [
        { name: 'Babar Azam', runs: 3056, matches: 101, average: 35.4, strikeRate: 128.9 },
        { name: 'Mohammad Rizwan', runs: 2856, matches: 98, average: 37.1, strikeRate: 130.5 },
        { name: 'Fakhar Zaman', runs: 2411, matches: 90, average: 29.8, strikeRate: 136.2 },
        { name: 'Kamran Akmal', runs: 2309, matches: 89, average: 28.5, strikeRate: 138.7 },
        { name: 'Shoaib Malik', runs: 2188, matches: 92, average: 31.3, strikeRate: 126.4 },
      ],
      topWicketTakers: [
        { name: 'Hasan Ali', wickets: 121, matches: 91, economy: 8.23, average: 23.1 },
        { name: 'Wahab Riaz', wickets: 116, matches: 96, economy: 8.61, average: 26.4 },
        { name: 'Shadab Khan', wickets: 108, matches: 93, economy: 7.82, average: 22.6 },
        { name: 'Shaheen Afridi', wickets: 98, matches: 74, economy: 7.64, average: 20.3 },
        { name: 'Mohammad Amir', wickets: 93, matches: 79, economy: 7.98, average: 24.7 },
      ],
      highestIndividualScore: { player: 'Kamran Akmal', score: 117, against: 'Peshawar Zalmi', season: '2017' },
      highestTeamTotal: { team: 'Lahore Qalandars', runs: 220, against: 'Islamabad United', season: '2022' },
    },
    cpl: {
      topRunScorers: [
        { name: 'Chris Gayle', runs: 2718, matches: 88, average: 32.8, strikeRate: 152.3 },
        { name: 'Lendl Simmons', runs: 2402, matches: 95, average: 28.6, strikeRate: 136.1 },
        { name: 'Andre Russell', runs: 2198, matches: 102, average: 30.5, strikeRate: 168.4 },
        { name: 'Kieron Pollard', runs: 2156, matches: 110, average: 26.3, strikeRate: 148.7 },
        { name: 'Evin Lewis', runs: 2089, matches: 87, average: 27.9, strikeRate: 141.5 },
      ],
      topWicketTakers: [
        { name: 'Sunil Narine', wickets: 154, matches: 112, economy: 6.43, average: 18.7 },
        { name: 'Dwayne Bravo', wickets: 136, matches: 107, economy: 8.21, average: 24.3 },
        { name: 'Ravi Rampaul', wickets: 98, matches: 86, economy: 7.82, average: 23.8 },
        { name: 'Samuel Badree', wickets: 92, matches: 82, economy: 5.96, average: 17.4 },
        { name: 'Imran Tahir', wickets: 87, matches: 72, economy: 7.34, average: 21.5 },
      ],
      highestIndividualScore: { player: 'Chris Gayle', score: 132, against: 'Guyana Amazon Warriors', season: '2015' },
      highestTeamTotal: { team: 'Barbados Tridents', runs: 224, against: 'Guyana Amazon Warriors', season: '2016' },
    },
    hundred: {
      topRunScorers: [
        { name: 'Dawid Malan', runs: 987, matches: 35, average: 30.2, strikeRate: 136.8 },
        { name: 'Jos Buttler', runs: 921, matches: 32, average: 31.8, strikeRate: 141.2 },
        { name: 'Joe Root', runs: 876, matches: 33, average: 29.5, strikeRate: 128.9 },
        { name: 'Tom Banton', runs: 812, matches: 34, average: 25.4, strikeRate: 134.6 },
        { name: 'Liam Livingstone', runs: 798, matches: 30, average: 31.1, strikeRate: 156.3 },
      ],
      topWicketTakers: [
        { name: 'Adil Rashid', wickets: 56, matches: 38, economy: 7.21, average: 20.3 },
        { name: 'Jofra Archer', wickets: 52, matches: 34, economy: 7.64, average: 21.8 },
        { name: 'Pat Brown', wickets: 48, matches: 36, economy: 8.12, average: 24.5 },
        { name: 'Tom Curran', wickets: 44, matches: 33, economy: 8.43, average: 26.1 },
        { name: 'Mason Crane', wickets: 41, matches: 31, economy: 7.85, average: 23.4 },
      ],
      highestIndividualScore: { player: 'Jos Buttler', score: 101, against: 'London Spirit', season: '2021' },
      highestTeamTotal: { team: 'Southern Brave', runs: 182, against: 'Welsh Fire', season: '2021' },
    },
    t20blast: {
      topRunScorers: [
        { name: 'Ian Bell', runs: 3900, matches: 156, average: 32.5, strikeRate: 134.2 },
        { name: 'Alex Hales', runs: 3756, matches: 142, average: 31.8, strikeRate: 151.6 },
        { name: 'Dawid Malan', runs: 3612, matches: 148, average: 29.4, strikeRate: 136.5 },
        { name: 'Sam Northeast', runs: 3456, matches: 149, average: 27.8, strikeRate: 141.3 },
        { name: 'Luke Wright', runs: 3312, matches: 152, average: 25.6, strikeRate: 148.9 },
      ],
      topWicketTakers: [
        { name: 'Imran Tahir', wickets: 112, matches: 98, economy: 7.34, average: 20.8 },
        { name: 'Danny Briggs', wickets: 108, matches: 112, economy: 7.82, average: 24.6 },
        { name: 'Jade Dernbach', wickets: 104, matches: 105, economy: 8.43, average: 27.2 },
        { name: 'Tom Curran', wickets: 98, matches: 89, economy: 8.21, average: 25.7 },
        { name: 'Liam Dawson', wickets: 94, matches: 102, economy: 7.62, average: 23.9 },
      ],
      highestIndividualScore: { player: 'Alex Hales', score: 147, against: 'Hampshire', season: '2015' },
      highestTeamTotal: { team: 'Gloucestershire', runs: 254, against: 'Middlesex', season: '2011' },
    },
  };

  const fallback = fallbacks[league.id];
  if (!fallback) return;

  const output = {
    leagueId: league.id,
    leagueName: league.name,
    totalMatches: 0,
    processedAt: new Date().toISOString(),
    isFallback: true,
    ...fallback,
  };

  const outPath = path.join(OUTPUT_DIR, `${league.id}.json`);
  fs.writeFileSync(outPath, JSON.stringify(output, null, 2));
  console.log(`  ✓ Saved fallback data: src/data/real/${league.id}.json`);
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  console.log('CricLeague Hub — Cricsheet Data Processor');
  console.log('==========================================');
  console.log(`Output directory: ${OUTPUT_DIR}`);
  console.log(`Tmp directory:    ${TMP_DIR}\n`);

  for (const league of LEAGUES) {
    await processLeague(league);
  }

  // Clean up tmp dir
  try {
    fs.rmSync(TMP_DIR, { recursive: true, force: true });
  } catch { /* ignore */ }

  console.log('\n==========================================');
  console.log('✓ All leagues processed!');
  console.log(`  Files in src/data/real/:`);
  for (const file of fs.readdirSync(OUTPUT_DIR)) {
    console.log(`    ${file}`);
  }
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
