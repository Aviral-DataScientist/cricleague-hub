/**
 * CricLeague Hub — API Client
 * Fetches real data from the backend (localhost:3001) with mock-data fallback.
 */

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';
const TIMEOUT_MS = 6000;

// ─── Types ────────────────────────────────────────────────────────────────────

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

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function apiFetch<T>(path: string): Promise<T | null> {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
    const res = await fetch(`${API_BASE}${path}`, { signal: controller.signal });
    clearTimeout(timer);
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

// ─── Public API ───────────────────────────────────────────────────────────────

/** Fetch real news articles from ESPN RSS (via backend proxy). Returns null on failure. */
export async function fetchRealNews(): Promise<RealArticle[] | null> {
  return apiFetch<RealArticle[]>('/api/news');
}

/** Fetch cricsheet-processed stats for a specific league. Returns null on failure. */
export async function fetchLeagueStats(leagueId: string): Promise<RealLeagueStats | null> {
  return apiFetch<RealLeagueStats>(`/api/leagues/${leagueId}`);
}

/** Fetch all processed league stats. Returns empty object on failure. */
export async function fetchAllLeagueStats(): Promise<Record<string, RealLeagueStats>> {
  const data = await apiFetch<Record<string, RealLeagueStats>>('/api/leagues');
  return data ?? {};
}

/** Check if the backend API is reachable. */
export async function checkApiHealth(): Promise<boolean> {
  const data = await apiFetch<{ status: string }>('/api/health');
  return data?.status === 'ok';
}
