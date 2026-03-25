/**
 * setup-real-data.js
 * Step 1: Write fallback stats for all leagues immediately.
 * Step 2: Download & process IPL zip (re-download since existing one is corrupt).
 * Run: node scripts/setup-real-data.js
 */

import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import AdmZip from 'adm-zip';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const OUTPUT_DIR = path.join(__dirname, '../src/data/real');
const TMP_DIR = path.join(__dirname, '../tmp_cricsheet');

fs.mkdirSync(OUTPUT_DIR, { recursive: true });
fs.mkdirSync(TMP_DIR, { recursive: true });

// ─── Fallback data ───────────────────────────────────────────────────────────

const FALLBACKS = {
  ipl: {
    leagueId: 'ipl', leagueName: 'Indian Premier League', totalMatches: 1100,
    isFallback: true, processedAt: new Date().toISOString(),
    topRunScorers: [
      { name: 'Virat Kohli', runs: 8004, matches: 237, average: 37.20, strikeRate: 131.5 },
      { name: 'Rohit Sharma', runs: 6628, matches: 243, average: 29.90, strikeRate: 130.2 },
      { name: 'Shikhar Dhawan', runs: 6769, matches: 222, average: 35.20, strikeRate: 127.1 },
      { name: 'David Warner', runs: 6565, matches: 184, average: 41.20, strikeRate: 140.1 },
      { name: 'Suresh Raina', runs: 5528, matches: 205, average: 32.50, strikeRate: 136.8 },
      { name: 'AB de Villiers', runs: 5162, matches: 184, average: 39.70, strikeRate: 151.7 },
      { name: 'MS Dhoni', runs: 5082, matches: 250, average: 39.10, strikeRate: 135.9 },
      { name: 'Gautam Gambhir', runs: 4217, matches: 154, average: 31.20, strikeRate: 123.9 },
      { name: 'Chris Gayle', runs: 4965, matches: 142, average: 40.00, strikeRate: 148.9 },
      { name: 'Kieron Pollard', runs: 3413, matches: 189, average: 29.80, strikeRate: 147.3 },
    ],
    topWicketTakers: [
      { name: 'Yuzvendra Chahal', wickets: 205, matches: 156, economy: 7.92, average: 21.4 },
      { name: 'Lasith Malinga', wickets: 170, matches: 122, economy: 7.14, average: 19.8 },
      { name: 'Amit Mishra', wickets: 166, matches: 154, economy: 7.35, average: 24.1 },
      { name: 'Piyush Chawla', wickets: 157, matches: 165, economy: 8.11, average: 27.3 },
      { name: 'Dwayne Bravo', wickets: 167, matches: 161, economy: 8.42, average: 25.6 },
      { name: 'Ravichandran Ashwin', wickets: 157, matches: 175, economy: 6.97, average: 24.2 },
      { name: 'Jasprit Bumrah', wickets: 145, matches: 120, economy: 7.43, average: 22.9 },
      { name: 'Pragyan Ojha', wickets: 159, matches: 155, economy: 7.14, average: 25.1 },
      { name: 'Harbhajan Singh', wickets: 150, matches: 163, economy: 7.05, average: 26.8 },
      { name: 'Sandeep Sharma', wickets: 130, matches: 117, economy: 8.01, average: 26.4 },
    ],
    highestIndividualScore: { player: 'Chris Gayle', score: 175, against: 'Pune Warriors India', season: '2013' },
    highestTeamTotal: { team: 'Royal Challengers Bangalore', runs: 263, against: 'Pune Warriors India', season: '2013' },
  },
  bbl: {
    leagueId: 'bbl', leagueName: 'Big Bash League', totalMatches: 480,
    isFallback: true, processedAt: new Date().toISOString(),
    topRunScorers: [
      { name: 'Chris Lynn', runs: 2803, matches: 96, average: 31.5, strikeRate: 150.2 },
      { name: 'Aaron Finch', runs: 2682, matches: 105, average: 27.1, strikeRate: 135.4 },
      { name: 'Matthew Wade', runs: 2576, matches: 110, average: 25.8, strikeRate: 128.6 },
      { name: 'David Warner', runs: 2400, matches: 78, average: 34.3, strikeRate: 140.1 },
      { name: 'Alex Ross', runs: 2210, matches: 93, average: 27.6, strikeRate: 133.2 },
      { name: 'Usman Khawaja', runs: 2188, matches: 91, average: 29.4, strikeRate: 125.9 },
      { name: 'Marcus Stoinis', runs: 2102, matches: 87, average: 28.2, strikeRate: 136.7 },
      { name: "D'Arcy Short", runs: 1982, matches: 82, average: 31.5, strikeRate: 138.4 },
      { name: 'Michael Klinger', runs: 1878, matches: 84, average: 26.8, strikeRate: 122.1 },
      { name: 'Ben McDermott', runs: 1800, matches: 79, average: 25.4, strikeRate: 130.6 },
    ],
    topWicketTakers: [
      { name: 'Andrew Tye', wickets: 119, matches: 87, economy: 8.12, average: 22.4 },
      { name: 'Nathan Coulter-Nile', wickets: 114, matches: 92, economy: 8.35, average: 24.1 },
      { name: 'Adam Zampa', wickets: 113, matches: 95, economy: 7.98, average: 23.5 },
      { name: 'Ben Dwarshuis', wickets: 102, matches: 80, economy: 8.62, average: 26.3 },
      { name: 'Clint McKay', wickets: 97, matches: 82, economy: 7.76, average: 22.1 },
      { name: 'Sean Abbott', wickets: 91, matches: 76, economy: 8.21, average: 24.8 },
      { name: 'Billy Stanlake', wickets: 88, matches: 71, economy: 8.54, average: 25.6 },
      { name: 'Peter Siddle', wickets: 83, matches: 74, economy: 7.94, average: 23.7 },
      { name: 'James Faulkner', wickets: 79, matches: 68, economy: 8.36, average: 26.1 },
      { name: 'Michael Neser', wickets: 75, matches: 67, economy: 8.12, average: 27.4 },
    ],
    highestIndividualScore: { player: 'Joe Burns', score: 115, against: 'Brisbane Heat', season: '2017-18' },
    highestTeamTotal: { team: 'Sydney Thunder', runs: 229, against: 'Melbourne Renegades', season: '2015-16' },
  },
  psl: {
    leagueId: 'psl', leagueName: 'Pakistan Super League', totalMatches: 400,
    isFallback: true, processedAt: new Date().toISOString(),
    topRunScorers: [
      { name: 'Babar Azam', runs: 3056, matches: 101, average: 35.4, strikeRate: 128.9 },
      { name: 'Mohammad Rizwan', runs: 2856, matches: 98, average: 37.1, strikeRate: 130.5 },
      { name: 'Fakhar Zaman', runs: 2411, matches: 90, average: 29.8, strikeRate: 136.2 },
      { name: 'Kamran Akmal', runs: 2309, matches: 89, average: 28.5, strikeRate: 138.7 },
      { name: 'Shoaib Malik', runs: 2188, matches: 92, average: 31.3, strikeRate: 126.4 },
      { name: 'Umar Akmal', runs: 1998, matches: 84, average: 27.2, strikeRate: 131.8 },
      { name: 'Asif Ali', runs: 1876, matches: 82, average: 28.8, strikeRate: 151.2 },
      { name: 'Ahmed Shehzad', runs: 1788, matches: 78, average: 26.3, strikeRate: 119.4 },
      { name: 'Colin Munro', runs: 1654, matches: 65, average: 29.5, strikeRate: 143.6 },
      { name: 'Liam Livingstone', runs: 1542, matches: 56, average: 31.5, strikeRate: 158.2 },
    ],
    topWicketTakers: [
      { name: 'Hasan Ali', wickets: 121, matches: 91, economy: 8.23, average: 23.1 },
      { name: 'Wahab Riaz', wickets: 116, matches: 96, economy: 8.61, average: 26.4 },
      { name: 'Shadab Khan', wickets: 108, matches: 93, economy: 7.82, average: 22.6 },
      { name: 'Shaheen Afridi', wickets: 98, matches: 74, economy: 7.64, average: 20.3 },
      { name: 'Mohammad Amir', wickets: 93, matches: 79, economy: 7.98, average: 24.7 },
      { name: 'Imad Wasim', wickets: 88, matches: 87, economy: 6.92, average: 23.4 },
      { name: 'Usman Qadir', wickets: 82, matches: 73, economy: 8.14, average: 25.6 },
      { name: 'Chris Jordan', wickets: 76, matches: 62, economy: 8.72, average: 27.1 },
      { name: 'Waqas Maqsood', wickets: 74, matches: 68, economy: 8.34, average: 26.8 },
      { name: 'Rumman Raees', wickets: 70, matches: 65, economy: 7.94, average: 25.3 },
    ],
    highestIndividualScore: { player: 'Kamran Akmal', score: 117, against: 'Peshawar Zalmi', season: '2017' },
    highestTeamTotal: { team: 'Lahore Qalandars', runs: 220, against: 'Islamabad United', season: '2022' },
  },
  cpl: {
    leagueId: 'cpl', leagueName: 'Caribbean Premier League', totalMatches: 320,
    isFallback: true, processedAt: new Date().toISOString(),
    topRunScorers: [
      { name: 'Chris Gayle', runs: 2718, matches: 88, average: 32.8, strikeRate: 152.3 },
      { name: 'Lendl Simmons', runs: 2402, matches: 95, average: 28.6, strikeRate: 136.1 },
      { name: 'Andre Russell', runs: 2198, matches: 102, average: 30.5, strikeRate: 168.4 },
      { name: 'Kieron Pollard', runs: 2156, matches: 110, average: 26.3, strikeRate: 148.7 },
      { name: 'Evin Lewis', runs: 2089, matches: 87, average: 27.9, strikeRate: 141.5 },
      { name: 'Nicholas Pooran', runs: 1954, matches: 81, average: 29.6, strikeRate: 155.4 },
      { name: 'Shimron Hetmyer', runs: 1876, matches: 78, average: 28.1, strikeRate: 147.8 },
      { name: 'Brandon King', runs: 1698, matches: 72, average: 27.4, strikeRate: 132.6 },
      { name: 'Denesh Ramdin', runs: 1612, matches: 84, average: 23.7, strikeRate: 125.9 },
      { name: 'Shai Hope', runs: 1543, matches: 69, average: 26.2, strikeRate: 120.4 },
    ],
    topWicketTakers: [
      { name: 'Sunil Narine', wickets: 154, matches: 112, economy: 6.43, average: 18.7 },
      { name: 'Dwayne Bravo', wickets: 136, matches: 107, economy: 8.21, average: 24.3 },
      { name: 'Ravi Rampaul', wickets: 98, matches: 86, economy: 7.82, average: 23.8 },
      { name: 'Samuel Badree', wickets: 92, matches: 82, economy: 5.96, average: 17.4 },
      { name: 'Imran Tahir', wickets: 87, matches: 72, economy: 7.34, average: 21.5 },
      { name: 'Fabian Allen', wickets: 78, matches: 74, economy: 7.12, average: 22.6 },
      { name: 'Hayden Walsh Jr', wickets: 74, matches: 67, economy: 7.64, average: 23.1 },
      { name: 'Fidel Edwards', wickets: 71, matches: 64, economy: 8.41, average: 26.7 },
      { name: 'Jason Holder', wickets: 68, matches: 72, economy: 7.56, average: 25.4 },
      { name: 'Kesrick Williams', wickets: 66, matches: 61, economy: 8.34, average: 27.2 },
    ],
    highestIndividualScore: { player: 'Chris Gayle', score: 132, against: 'Guyana Amazon Warriors', season: '2015' },
    highestTeamTotal: { team: 'Barbados Tridents', runs: 224, against: 'Guyana Amazon Warriors', season: '2016' },
  },
  hundred: {
    leagueId: 'hundred', leagueName: 'The Hundred', totalMatches: 160,
    isFallback: true, processedAt: new Date().toISOString(),
    topRunScorers: [
      { name: 'Dawid Malan', runs: 987, matches: 35, average: 30.2, strikeRate: 136.8 },
      { name: 'Jos Buttler', runs: 921, matches: 32, average: 31.8, strikeRate: 141.2 },
      { name: 'Joe Root', runs: 876, matches: 33, average: 29.5, strikeRate: 128.9 },
      { name: 'Tom Banton', runs: 812, matches: 34, average: 25.4, strikeRate: 134.6 },
      { name: 'Liam Livingstone', runs: 798, matches: 30, average: 31.1, strikeRate: 156.3 },
      { name: 'Will Smeed', runs: 756, matches: 31, average: 26.7, strikeRate: 140.5 },
      { name: 'Paul Stirling', runs: 712, matches: 29, average: 28.3, strikeRate: 138.2 },
      { name: 'James Vince', runs: 698, matches: 32, average: 25.1, strikeRate: 131.4 },
      { name: 'Finn Allen', runs: 654, matches: 27, average: 27.7, strikeRate: 148.9 },
      { name: 'Jonny Bairstow', runs: 621, matches: 28, average: 24.9, strikeRate: 135.6 },
    ],
    topWicketTakers: [
      { name: 'Adil Rashid', wickets: 56, matches: 38, economy: 7.21, average: 20.3 },
      { name: 'Jofra Archer', wickets: 52, matches: 34, economy: 7.64, average: 21.8 },
      { name: 'Pat Brown', wickets: 48, matches: 36, economy: 8.12, average: 24.5 },
      { name: 'Tom Curran', wickets: 44, matches: 33, economy: 8.43, average: 26.1 },
      { name: 'Mason Crane', wickets: 41, matches: 31, economy: 7.85, average: 23.4 },
      { name: 'Mohammad Hasnain', wickets: 38, matches: 29, economy: 8.54, average: 25.7 },
      { name: 'Fidel Edwards', wickets: 36, matches: 28, economy: 8.76, average: 27.3 },
      { name: 'Luke Wood', wickets: 34, matches: 30, economy: 8.32, average: 26.8 },
      { name: 'Marchant de Lange', wickets: 32, matches: 26, economy: 8.91, average: 28.4 },
      { name: 'Danny Lamb', wickets: 30, matches: 27, economy: 8.64, average: 29.1 },
    ],
    highestIndividualScore: { player: 'Jos Buttler', score: 101, against: 'London Spirit', season: '2021' },
    highestTeamTotal: { team: 'Southern Brave', runs: 182, against: 'Welsh Fire', season: '2021' },
  },
  t20blast: {
    leagueId: 't20blast', leagueName: 'Vitality T20 Blast', totalMatches: 1400,
    isFallback: true, processedAt: new Date().toISOString(),
    topRunScorers: [
      { name: 'Ian Bell', runs: 3900, matches: 156, average: 32.5, strikeRate: 134.2 },
      { name: 'Alex Hales', runs: 3756, matches: 142, average: 31.8, strikeRate: 151.6 },
      { name: 'Dawid Malan', runs: 3612, matches: 148, average: 29.4, strikeRate: 136.5 },
      { name: 'Sam Northeast', runs: 3456, matches: 149, average: 27.8, strikeRate: 141.3 },
      { name: 'Luke Wright', runs: 3312, matches: 152, average: 25.6, strikeRate: 148.9 },
      { name: 'Joe Denly', runs: 3187, matches: 143, average: 28.1, strikeRate: 132.4 },
      { name: 'David Willey', runs: 2998, matches: 139, average: 26.3, strikeRate: 143.7 },
      { name: 'James Vince', runs: 2876, matches: 136, average: 27.9, strikeRate: 135.8 },
      { name: 'Colin Munro', runs: 2756, matches: 112, average: 30.6, strikeRate: 156.2 },
      { name: 'Phil Salt', runs: 2634, matches: 118, average: 28.4, strikeRate: 149.3 },
    ],
    topWicketTakers: [
      { name: 'Imran Tahir', wickets: 112, matches: 98, economy: 7.34, average: 20.8 },
      { name: 'Danny Briggs', wickets: 108, matches: 112, economy: 7.82, average: 24.6 },
      { name: 'Jade Dernbach', wickets: 104, matches: 105, economy: 8.43, average: 27.2 },
      { name: 'Tom Curran', wickets: 98, matches: 89, economy: 8.21, average: 25.7 },
      { name: 'Liam Dawson', wickets: 94, matches: 102, economy: 7.62, average: 23.9 },
      { name: 'Matt Henry', wickets: 89, matches: 81, economy: 8.12, average: 24.3 },
      { name: 'Kyle Abbott', wickets: 87, matches: 79, economy: 7.94, average: 23.1 },
      { name: 'Marchant de Lange', wickets: 84, matches: 74, economy: 9.01, average: 28.7 },
      { name: 'Ish Sodhi', wickets: 81, matches: 76, economy: 7.76, average: 24.8 },
      { name: 'Josh Davey', wickets: 78, matches: 82, economy: 8.34, average: 27.6 },
    ],
    highestIndividualScore: { player: 'Alex Hales', score: 147, against: 'Hampshire', season: '2015' },
    highestTeamTotal: { team: 'Gloucestershire', runs: 254, against: 'Middlesex', season: '2011' },
  },
};

// ─── Write fallbacks immediately ─────────────────────────────────────────────

console.log('Step 1: Writing fallback data for all leagues...');
for (const [id, data] of Object.entries(FALLBACKS)) {
  const outPath = path.join(OUTPUT_DIR, `${id}.json`);
  fs.writeFileSync(outPath, JSON.stringify(data, null, 2));
  console.log(`  ✓ ${id}.json written (fallback)`);
}

// ─── Download helper ──────────────────────────────────────────────────────────

function downloadFile(url, destPath, timeoutMs = 90000) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destPath);

    const doRequest = (reqUrl) => {
      const req = https.get(reqUrl, { timeout: timeoutMs }, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          file.close();
          if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
          const newFile = fs.createWriteStream(destPath);
          const redirectReq = https.get(res.headers.location, { timeout: timeoutMs }, (res2) => {
            if (res2.statusCode !== 200) {
              newFile.close();
              return reject(new Error(`HTTP ${res2.statusCode}`));
            }
            const total = parseInt(res2.headers['content-length'] || '0', 10);
            let downloaded = 0;
            let lastPct = -1;
            res2.on('data', (chunk) => {
              downloaded += chunk.length;
              if (total > 0) {
                const pct = Math.floor((downloaded / total) * 100);
                if (pct !== lastPct && pct % 10 === 0) {
                  process.stdout.write(`\r    ${pct}% (${(downloaded / 1048576).toFixed(1)} MB / ${(total / 1048576).toFixed(1)} MB)`);
                  lastPct = pct;
                }
              }
            });
            res2.pipe(newFile);
            newFile.on('finish', () => { process.stdout.write('\n'); newFile.close(resolve); });
          });
          redirectReq.on('error', reject);
          redirectReq.on('timeout', () => { redirectReq.destroy(); reject(new Error('Timeout')); });
          return;
        }
        if (res.statusCode !== 200) {
          file.close();
          return reject(new Error(`HTTP ${res.statusCode}`));
        }
        const total = parseInt(res.headers['content-length'] || '0', 10);
        let downloaded = 0;
        let lastPct = -1;
        res.on('data', (chunk) => {
          downloaded += chunk.length;
          if (total > 0) {
            const pct = Math.floor((downloaded / total) * 100);
            if (pct !== lastPct && pct % 10 === 0) {
              process.stdout.write(`\r    ${pct}% (${(downloaded / 1048576).toFixed(1)} MB / ${(total / 1048576).toFixed(1)} MB)`);
              lastPct = pct;
            }
          }
        });
        res.pipe(file);
        file.on('finish', () => { process.stdout.write('\n'); file.close(resolve); });
      });
      req.on('error', reject);
      req.on('timeout', () => { req.destroy(); reject(new Error('Timeout')); });
    };

    doRequest(url);
  });
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('\nStep 2: Downloading fresh IPL zip from cricsheet.org...');
  const zipPath = path.join(TMP_DIR, 'ipl.zip');

  // Remove corrupt zip if present
  if (fs.existsSync(zipPath)) {
    fs.unlinkSync(zipPath);
    console.log('  Removed corrupt ipl.zip');
  }

  try {
    console.log('  Fetching https://cricsheet.org/downloads/ipl_json.zip');
    await downloadFile('https://cricsheet.org/downloads/ipl_json.zip', zipPath);
    const size = fs.statSync(zipPath).size;
    console.log(`  Download complete: ${(size / 1048576).toFixed(1)} MB`);

    console.log('\nStep 3: Processing IPL match data...');
    const { default: AdmZip } = await import('adm-zip');
    const zip = new AdmZip(zipPath);
    const entries = zip.getEntries().filter(e => e.entryName.endsWith('.json') && !e.isDirectory);
    console.log(`  Found ${entries.length} match JSON files`);

    const stats = {
      totalMatches: 0,
      batters: new Map(),
      bowlers: new Map(),
      highestScore: { player: '', score: 0, against: '', season: '' },
      highestTeamTotal: { team: '', runs: 0, against: '', season: '' },
    };

    let processed = 0, errors = 0;
    for (const entry of entries) {
      try {
        const matchData = JSON.parse(entry.getData().toString('utf8'));
        const info = matchData.info;
        if (!info || !matchData.innings) { errors++; continue; }
        const season = String(info.season || (info.dates?.[0] || '').slice(0, 4) || 'Unknown');
        const teams = info.teams || [];
        stats.totalMatches++;

        for (const inning of matchData.innings) {
          const battingTeam = inning.team;
          const bowlingTeam = teams.find(t => t !== battingTeam) || 'Unknown';
          let inningRuns = 0;
          const bRuns = new Map(), bBalls = new Map(), bSixes = new Map();

          for (const over of (inning.overs || [])) {
            for (const del of (over.deliveries || [])) {
              const batter = del.batter, bowler = del.bowler;
              const br = del.runs?.batter ?? 0;
              const extras = del.extras || {};
              const isWide = !!extras.wides, isNoBall = !!extras.noballs;
              const totalR = del.runs?.total ?? 0;

              bRuns.set(batter, (bRuns.get(batter) || 0) + br);
              if (!isWide) bBalls.set(batter, (bBalls.get(batter) || 0) + 1);
              if (br === 6) bSixes.set(batter, (bSixes.get(batter) || 0) + 1);

              if (!stats.bowlers.has(bowler)) stats.bowlers.set(bowler, { wickets: 0, runs: 0, balls: 0 });
              const bs = stats.bowlers.get(bowler);
              bs.runs += totalR;
              if (!isWide && !isNoBall) bs.balls++;

              if (del.wickets) {
                for (const wkt of del.wickets) {
                  if (!['run out','retired hurt','obstructing the field','retired out'].includes(wkt.kind || '')) bs.wickets++;
                }
              }
              inningRuns += totalR;
            }
          }

          for (const [batter, runs] of bRuns) {
            if (!stats.batters.has(batter)) stats.batters.set(batter, { runs: 0, innings: 0, balls: 0, sixes: 0 });
            const s = stats.batters.get(batter);
            s.runs += runs; s.innings++; s.balls += bBalls.get(batter) || 0; s.sixes += bSixes.get(batter) || 0;
            if (runs > stats.highestScore.score) stats.highestScore = { player: batter, score: runs, against: bowlingTeam, season };
          }
          if (inningRuns > stats.highestTeamTotal.runs) stats.highestTeamTotal = { team: battingTeam, runs: inningRuns, against: bowlingTeam, season };
        }
        processed++;
        if (processed % 100 === 0) process.stdout.write(`\r  Processed: ${processed}/${entries.length}`);
      } catch { errors++; }
    }
    process.stdout.write(`\r  Processed: ${processed}/${entries.length} (${errors} errors)\n`);

    const topRunScorers = [...stats.batters.entries()]
      .sort((a, b) => b[1].runs - a[1].runs).slice(0, 10)
      .map(([name, s]) => ({
        name, runs: s.runs, matches: s.innings,
        average: s.innings > 0 ? parseFloat((s.runs / s.innings).toFixed(2)) : 0,
        strikeRate: s.balls > 0 ? parseFloat(((s.runs / s.balls) * 100).toFixed(2)) : 0,
      }));

    const topWicketTakers = [...stats.bowlers.entries()]
      .sort((a, b) => b[1].wickets - a[1].wickets).slice(0, 10)
      .map(([name, s]) => ({
        name, wickets: s.wickets, matches: Math.ceil(s.balls / 24),
        economy: s.balls > 0 ? parseFloat(((s.runs / s.balls) * 6).toFixed(2)) : 0,
        average: s.wickets > 0 ? parseFloat((s.runs / s.wickets).toFixed(2)) : 0,
      }));

    const iplReal = {
      leagueId: 'ipl', leagueName: 'Indian Premier League',
      totalMatches: stats.totalMatches,
      processedAt: new Date().toISOString(),
      isFallback: false,
      topRunScorers, topWicketTakers,
      highestIndividualScore: stats.highestScore,
      highestTeamTotal: stats.highestTeamTotal,
    };

    const iplOut = path.join(OUTPUT_DIR, 'ipl.json');
    fs.writeFileSync(iplOut, JSON.stringify(iplReal, null, 2));
    console.log(`  ✓ ipl.json updated with REAL data (${stats.totalMatches} matches)`);

    // Clean up zip
    try { fs.unlinkSync(zipPath); } catch {}

  } catch (err) {
    console.warn(`  ⚠ IPL download/process failed: ${err.message}`);
    console.log('  Using fallback IPL data (already written in Step 1)');
  }

  console.log('\n✓ Done! Files in src/data/real/:');
  for (const f of fs.readdirSync(OUTPUT_DIR).filter(f => f.endsWith('.json'))) {
    const d = JSON.parse(fs.readFileSync(path.join(OUTPUT_DIR, f), 'utf8'));
    console.log(`  ${f.padEnd(16)} ${d.totalMatches} matches  isFallback=${d.isFallback ?? false}`);
  }
}

main().catch(err => { console.error('Fatal:', err); process.exit(1); });
