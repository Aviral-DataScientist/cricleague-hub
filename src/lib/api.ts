/**
 * CricLeague Hub – API Client
 * Imports real data directly from processed JSON files (works on GitHub Pages).
 * No backend server needed for static stats and news.
 */

// ============================================================
// Types
// ============================================================

export interface RealPlayerStat {
  name: string;
  runs?: number;
  wickets?: number;
  matches: number;
  average?: number;
  strikeRate?: number;
  economy?: number;
}

export interface RealLeagueStats {
  leagueId: string;
  leagueName: string;
  totalMatches: number;
  latestSeason?: string;
  seasons?: string[];
  processedAt: string;
  isFallback?: boolean;
  topRunScorers: RealPlayerStat[];
  topWicketTakers: RealPlayerStat[];
  highestIndividualScore: { player: string; score: number; against: string; season: string };
  highestTeamTotal: { team: string; runs: number; against: string; season: string };
}

export interface RealArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  leagueTag: string;
  leagueId: string;
  author: string;
  date: string;
  readTime: number;
  category: 'news' | 'analysis' | 'interview' | 'preview' | 'review';
  featured: boolean;
  url?: string;
  source?: string;
}

// ============================================================
// Direct JSON imports (bundled at build time — works on GitHub Pages)
// ============================================================

import iplData from '../data/real/ipl.json';
import bblData from '../data/real/bbl.json';
import pslData from '../data/real/psl.json';
import cplData from '../data/real/cpl.json';
import hundredData from '../data/real/hundred.json';
import t20blastData from '../data/real/t20blast.json';
import newsData from '../data/real/news.json';

const leagueDataMap: Record<string, RealLeagueStats> = {
  ipl: iplData as RealLeagueStats,
  bbl: bblData as RealLeagueStats,
  psl: pslData as RealLeagueStats,
  cpl: cplData as RealLeagueStats,
  hundred: hundredData as RealLeagueStats,
  t20blast: t20blastData as RealLeagueStats,
};

// ============================================================
// Public API (same interface as before — drop-in replacement)
// ============================================================

/** Fetch real news articles. Returns from bundled JSON. */
export async function fetchRealNews(): Promise<RealArticle[] | null> {
  try {
    return (newsData as unknown as RealArticle[]);
  } catch {
    return null;
  }
}

/** Fetch cricsheet-processed stats for a specific league. */
export async function fetchLeagueStats(leagueId: string): Promise<RealLeagueStats | null> {
  return leagueDataMap[leagueId] ?? null;
}

/** Fetch all processed league stats. */
export async function fetchAllLeagueStats(): Promise<Record<string, RealLeagueStats>> {
  return leagueDataMap;
}

/** Always true since we use local data now. */
export async function checkApiHealth(): Promise<boolean> {
  return true;
}
