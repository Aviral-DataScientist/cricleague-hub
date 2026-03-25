import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getLeagueById } from "../data/leagues";
import { fetchLeagueStats, type RealLeagueStats } from "../lib/api";
import { Calendar, Users, Trophy, Clock, DollarSign, Star } from "lucide-react";

export default function LeagueDetailPage() {
  const { id } = useParams<{ id: string }>();
  const league = getLeagueById(id ?? "");
  const [realStats, setRealStats] = useState<RealLeagueStats | null>(null);
  const [statsLoading, setStatsLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    let mounted = true;
    setStatsLoading(true);
    fetchLeagueStats(id).then((data) => {
      if (mounted) {
        setRealStats(data);
        setStatsLoading(false);
      }
    });
    return () => { mounted = false; };
  }, [id]);

  if (!league) {
    return (
      <div style={{ backgroundColor: "var(--bg-primary)", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: 32 }}>
        <p style={{ fontSize: 64, marginBottom: 16 }}>🏏</p>
        <h2 style={{ color: "#FFFFFF", marginBottom: 8 }}>League Not Found</h2>
        <p style={{ color: "#C8C9D4", marginBottom: 24 }}>We couldn't find that league.</p>
        <Link to="/leagues" className="btn-primary">
          Back to Leagues
        </Link>
      </div>
    );
  }

  const prizeMoney = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(league.prizeMoneyUSD);

  const overviewStats = [
    { icon: Calendar, label: "Founded", value: league.founded },
    { icon: Users, label: "Teams", value: league.teams },
    { icon: Trophy, label: "Seasons", value: realStats?.seasons?.length ?? league.numberOfSeasons },
    { icon: Clock, label: "Latest Season", value: realStats?.latestSeason ?? "—" },
    { icon: DollarSign, label: "Prize Money", value: prizeMoney },
    { icon: Star, label: "Quality Rating", value: `${league.playerQualityRating}/100` },
  ];

  return (
    <div style={{ backgroundColor: "var(--bg-primary)", minHeight: "100vh" }}>
      {/* ── Hero ── */}
      <div
        style={{
          background: `linear-gradient(135deg, ${league.color}30 0%, var(--bg-primary) 60%)`,
          borderBottom: "1px solid var(--border-subtle)",
          padding: "48px 24px 40px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Glow orb */}
        <div
          style={{
            position: "absolute",
            width: 500,
            height: 500,
            top: -200,
            left: -100,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${league.color}20 0%, transparent 70%)`,
            filter: "blur(60px)",
            pointerEvents: "none",
          }}
        />
        <div style={{ maxWidth: 1400, margin: "0 auto", position: "relative" }}>
          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#6B7280", marginBottom: 20 }}>
            <Link to="/" style={{ color: "#6B7280", textDecoration: "none" }}>Home</Link>
            <span style={{ color: "rgba(0,217,255,0.4)" }}>›</span>
            <Link to="/leagues" style={{ color: "#6B7280", textDecoration: "none" }}>Leagues</Link>
            <span style={{ color: "rgba(0,217,255,0.4)" }}>›</span>
            <span style={{ color: "#FFFFFF" }}>{league.shortName}</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
            <span style={{ fontSize: 72, lineHeight: 1, filter: `drop-shadow(0 0 20px ${league.color}60)` }}>
              {league.flag}
            </span>
            <div>
              <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap", alignItems: "center" }}>
                {league.isActive
                  ? <span className="badge-teal">● ACTIVE</span>
                  : <span style={{ background: "rgba(255,255,255,0.06)", color: "#9CA3AF", padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700, fontFamily: "'Inter',sans-serif" }}>OFF SEASON</span>
                }
                <span style={{ background: "rgba(0,217,255,0.1)", color: "#00D9FF", border: "1px solid rgba(0,217,255,0.2)", padding: "3px 10px", borderRadius: 6, fontSize: 11, fontWeight: 700, fontFamily: "'Inter',sans-serif" }}>
                  {league.format}
                </span>
                {realStats && !statsLoading && (
                  <span className="badge-violet">
                    {realStats.isFallback ? "📊 Stats Data" : `📊 ${realStats.totalMatches} Real Matches`}
                  </span>
                )}
              </div>
              <h1 style={{ color: "#FFFFFF", margin: "0 0 8px", fontSize: "clamp(28px, 5vw, 48px)" }}>{league.name}</h1>
              <p style={{ color: "#C8C9D4", fontSize: 15 }}>
                {league.country} · Founded {league.founded} · {league.teams} Teams
              </p>
            </div>
            <div style={{ marginLeft: "auto" }}>
              <Link to="/compare" className="btn-secondary" style={{ fontSize: 13 }}>
                Compare ⚖️
              </Link>
            </div>
          </div>

          {/* Color bar */}
          <div
            style={{
              marginTop: 28,
              height: 3,
              borderRadius: 2,
              background: `linear-gradient(90deg, ${league.color}, ${league.accentColor}, ${league.color})`,
              boxShadow: `0 0 12px ${league.color}60`,
            }}
          />
        </div>
      </div>

      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "32px 24px" }}>
        {/* Description */}
        <div className="glass-card" style={{ padding: 20, marginBottom: 32 }}>
          <p style={{ color: "#C8C9D4", lineHeight: 1.7, fontSize: 15 }}>{league.description}</p>
        </div>

        {/* ── League Overview ── */}
        <h2 style={{ color: "#FFFFFF", marginBottom: 16 }}>League Overview</h2>
        <div style={{ overflowX: "auto", marginBottom: 40 }}>
          <div style={{ display: "flex", gap: 12, minWidth: "fit-content", paddingBottom: 4 }}>
            {overviewStats.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="glass-card"
                style={{ padding: "20px 24px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", minWidth: 130 }}
              >
                <Icon size={18} color="#00D9FF" style={{ marginBottom: 8 }} />
                <div style={{ fontSize: 20, fontWeight: 700, fontFamily: "'Inter', sans-serif", color: "#FFFFFF", marginBottom: 4 }}>
                  {String(value)}
                </div>
                <div style={{ fontSize: 11, color: "#C8C9D4" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── All-Time Records ── */}
        {realStats && (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <h2 style={{ color: "#FFFFFF", margin: 0 }}>All-Time Records</h2>
              {!realStats.isFallback && (
                <span style={{ background: "rgba(34,197,94,0.12)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.3)", padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700, fontFamily: "'Inter',sans-serif" }}>
                  ✓ Real Data
                </span>
              )}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16, marginBottom: 40 }}>
              {realStats.topRunScorers[0] && (
                <div className="glass-card" style={{ padding: 20, borderColor: "rgba(0,217,255,0.2)" }}>
                  <div style={{ fontSize: 32, marginBottom: 10 }}>🏏</div>
                  <div style={{ fontSize: 10, color: "#6B7280", textTransform: "uppercase", letterSpacing: 1, marginBottom: 6, fontFamily: "'Inter',sans-serif" }}>Most Runs (Career)</div>
                  <div style={{ fontSize: 24, fontWeight: 800, color: "#FFFFFF", fontFamily: "'Inter',sans-serif", marginBottom: 4 }}>
                    {(realStats.topRunScorers[0].runs ?? 0).toLocaleString()}
                  </div>
                  <div style={{ color: "#00D9FF", fontWeight: 600, fontSize: 14 }}>{realStats.topRunScorers[0].name}</div>
                </div>
              )}
              {realStats.topWicketTakers[0] && (
                <div className="glass-card" style={{ padding: 20, borderColor: "rgba(167,139,250,0.2)" }}>
                  <div style={{ fontSize: 32, marginBottom: 10 }}>🎳</div>
                  <div style={{ fontSize: 10, color: "#6B7280", textTransform: "uppercase", letterSpacing: 1, marginBottom: 6, fontFamily: "'Inter',sans-serif" }}>Most Wickets (Career)</div>
                  <div style={{ fontSize: 24, fontWeight: 800, color: "#FFFFFF", fontFamily: "'Inter',sans-serif", marginBottom: 4 }}>
                    {realStats.topWicketTakers[0].wickets ?? 0}
                  </div>
                  <div style={{ color: "#A78BFA", fontWeight: 600, fontSize: 14 }}>{realStats.topWicketTakers[0].name}</div>
                </div>
              )}
              {realStats.highestIndividualScore && (
                <div className="glass-card" style={{ padding: 20, borderColor: "rgba(239,68,68,0.2)" }}>
                  <div style={{ fontSize: 32, marginBottom: 10 }}>⚡</div>
                  <div style={{ fontSize: 10, color: "#6B7280", textTransform: "uppercase", letterSpacing: 1, marginBottom: 6, fontFamily: "'Inter',sans-serif" }}>Highest Score</div>
                  <div style={{ fontSize: 24, fontWeight: 800, color: "#FFFFFF", fontFamily: "'Inter',sans-serif", marginBottom: 4 }}>
                    {realStats.highestIndividualScore.score}*
                  </div>
                  <div style={{ color: "#EF4444", fontWeight: 600, fontSize: 14 }}>{realStats.highestIndividualScore.player}</div>
                  <div style={{ color: "#6B7280", fontSize: 11, marginTop: 4 }}>
                    vs {realStats.highestIndividualScore.against} · {realStats.highestIndividualScore.season}
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {/* ── Top Run Scorers ── */}
        {realStats && realStats.topRunScorers.length > 0 && (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <h2 style={{ color: "#FFFFFF", margin: 0 }}>Top Run Scorers</h2>
              <span className="badge-teal">📊 Cricsheet Data</span>
            </div>
            <div className="glass-card" style={{ overflow: "hidden", padding: 0, marginBottom: 40 }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "rgba(0,217,255,0.06)", borderBottom: "1px solid rgba(0,217,255,0.15)" }}>
                    <th style={{ padding: "14px 20px", textAlign: "left", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, color: "#00D9FF", fontFamily: "'Inter',sans-serif" }}>#</th>
                    <th style={{ padding: "14px 20px", textAlign: "left", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, color: "#00D9FF", fontFamily: "'Inter',sans-serif" }}>Player</th>
                    <th style={{ padding: "14px 20px", textAlign: "left", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, color: "#00D9FF", fontFamily: "'Inter',sans-serif" }}>Runs</th>
                    <th style={{ padding: "14px 20px", textAlign: "left", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, color: "#00D9FF", fontFamily: "'Inter',sans-serif" }} className="hidden sm:table-cell">Innings</th>
                    <th style={{ padding: "14px 20px", textAlign: "left", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, color: "#00D9FF", fontFamily: "'Inter',sans-serif" }} className="hidden md:table-cell">Average</th>
                    <th style={{ padding: "14px 20px", textAlign: "left", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, color: "#00D9FF", fontFamily: "'Inter',sans-serif" }} className="hidden md:table-cell">SR</th>
                  </tr>
                </thead>
                <tbody>
                  {realStats.topRunScorers.slice(0, 10).map((p, i) => (
                    <tr
                      key={p.name}
                      style={{
                        backgroundColor: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.02)",
                        borderTop: "1px solid var(--border-subtle)",
                      }}
                    >
                      <td style={{ padding: "12px 20px", color: "#6B7280", fontSize: 13 }}>{i + 1}</td>
                      <td style={{ padding: "12px 20px", color: "#FFFFFF", fontSize: 13, fontWeight: 600 }}>{p.name}</td>
                      <td style={{ padding: "12px 20px", fontSize: 13, fontWeight: 700, color: "#00D9FF" }}>{(p.runs ?? 0).toLocaleString()}</td>
                      <td style={{ padding: "12px 20px", color: "#C8C9D4", fontSize: 13 }} className="hidden sm:table-cell">{p.matches}</td>
                      <td style={{ padding: "12px 20px", color: "#C8C9D4", fontSize: 13 }} className="hidden md:table-cell">{p.average}</td>
                      <td style={{ padding: "12px 20px", color: "#C8C9D4", fontSize: 13 }} className="hidden md:table-cell">{p.strikeRate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* ── Top Wicket Takers ── */}
        {realStats && realStats.topWicketTakers.length > 0 && (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <h2 style={{ color: "#FFFFFF", margin: 0 }}>Top Wicket Takers</h2>
              <span className="badge-violet">📊 Cricsheet Data</span>
            </div>
            <div className="glass-card" style={{ overflow: "hidden", padding: 0, marginBottom: 40 }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "rgba(167,139,250,0.06)", borderBottom: "1px solid rgba(167,139,250,0.15)" }}>
                    <th style={{ padding: "14px 20px", textAlign: "left", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, color: "#A78BFA", fontFamily: "'Inter',sans-serif" }}>#</th>
                    <th style={{ padding: "14px 20px", textAlign: "left", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, color: "#A78BFA", fontFamily: "'Inter',sans-serif" }}>Bowler</th>
                    <th style={{ padding: "14px 20px", textAlign: "left", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, color: "#A78BFA", fontFamily: "'Inter',sans-serif" }}>Wickets</th>
                    <th style={{ padding: "14px 20px", textAlign: "left", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, color: "#A78BFA", fontFamily: "'Inter',sans-serif" }} className="hidden sm:table-cell">Matches</th>
                    <th style={{ padding: "14px 20px", textAlign: "left", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, color: "#A78BFA", fontFamily: "'Inter',sans-serif" }} className="hidden md:table-cell">Economy</th>
                    <th style={{ padding: "14px 20px", textAlign: "left", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, color: "#A78BFA", fontFamily: "'Inter',sans-serif" }} className="hidden md:table-cell">Average</th>
                  </tr>
                </thead>
                <tbody>
                  {realStats.topWicketTakers.slice(0, 10).map((p, i) => (
                    <tr
                      key={p.name}
                      style={{
                        backgroundColor: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.02)",
                        borderTop: "1px solid var(--border-subtle)",
                      }}
                    >
                      <td style={{ padding: "12px 20px", color: "#6B7280", fontSize: 13 }}>{i + 1}</td>
                      <td style={{ padding: "12px 20px", color: "#FFFFFF", fontSize: 13, fontWeight: 600 }}>{p.name}</td>
                      <td style={{ padding: "12px 20px", fontSize: 13, fontWeight: 700, color: "#A78BFA" }}>{p.wickets ?? 0}</td>
                      <td style={{ padding: "12px 20px", color: "#C8C9D4", fontSize: 13 }} className="hidden sm:table-cell">{p.matches}</td>
                      <td style={{ padding: "12px 20px", color: "#C8C9D4", fontSize: 13 }} className="hidden md:table-cell">{p.economy}</td>
                      <td style={{ padding: "12px 20px", color: "#C8C9D4", fontSize: 13 }} className="hidden md:table-cell">{p.average}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* ── Notable Players ── */}
        <h2 style={{ color: "#FFFFFF", marginBottom: 16 }}>Notable Players</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 12, marginBottom: 40 }}>
          {league.topPlayers.map((player, i) => (
            <div key={player.name} className="glass-card" style={{ padding: 16, textAlign: "center", position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  top: 10,
                  left: 10,
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 11,
                  fontWeight: 700,
                  fontFamily: "'Inter',sans-serif",
                  background: i === 0 ? "#00D9FF" : "rgba(255,255,255,0.06)",
                  color: i === 0 ? "#000" : "#9CA3AF",
                }}
              >
                {i + 1}
              </div>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  margin: "0 auto 10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                  background: `linear-gradient(135deg, ${league.color}60, ${league.accentColor}30)`,
                  border: "1px solid rgba(0,217,255,0.15)",
                }}
              >
                🏏
              </div>
              <div style={{ fontWeight: 700, color: "#FFFFFF", fontSize: 13, lineHeight: 1.3, marginBottom: 4 }}>{player.name}</div>
              <div style={{ fontSize: 11, color: "#6B7280", marginBottom: 8 }}>{player.country}</div>
              <span style={{ background: "rgba(0,217,255,0.1)", color: "#00D9FF", padding: "2px 8px", borderRadius: 4, fontSize: 10, fontWeight: 700, fontFamily: "'Inter',sans-serif", display: "inline-block", marginBottom: 8 }}>
                {player.role}
              </span>
              <div style={{ fontSize: 11, color: "#C8C9D4", marginBottom: 6 }}>
                {player.runs != null ? `${player.runs.toLocaleString()} runs` : `${player.wickets} wickets`}
              </div>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, marginBottom: 4 }}>
                  <span style={{ color: "#6B7280" }}>Rating</span>
                  <span style={{ color: "#00D9FF" }}>{player.rating}</span>
                </div>
                <div style={{ height: 4, borderRadius: 2, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${player.rating}%`, background: "linear-gradient(90deg, #00D9FF, #A78BFA)", borderRadius: 2 }} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Highest Team Total ── */}
        {realStats?.highestTeamTotal && (
          <div style={{ marginBottom: 40 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <h2 style={{ color: "#FFFFFF", margin: 0 }}>Highest Team Total</h2>
              <span className="badge-teal">📊 Cricsheet Data</span>
            </div>
            <div className="glass-card" style={{ padding: 24 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <span style={{ fontSize: 40 }}>🏟️</span>
                <div>
                  <div style={{ fontSize: 32, fontWeight: 800, color: "#FFFFFF", fontFamily: "'Inter',sans-serif" }}>
                    {realStats.highestTeamTotal.runs}
                    <span style={{ fontSize: 16, color: "#C8C9D4", fontWeight: 400, marginLeft: 6 }}>runs</span>
                  </div>
                  <div style={{ color: "#00D9FF", fontWeight: 600, fontSize: 15 }}>{realStats.highestTeamTotal.team}</div>
                  <div style={{ color: "#6B7280", fontSize: 12, marginTop: 4 }}>
                    vs {realStats.highestTeamTotal.against} · {realStats.highestTeamTotal.season}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Recent Seasons ── */}
        <h2 style={{ color: "#FFFFFF", marginBottom: 16 }}>Recent Seasons</h2>
        <div className="glass-card" style={{ overflow: "hidden", padding: 0, marginBottom: 40 }}>
          {realStats && !realStats.isFallback && realStats.seasons && realStats.seasons.length > 0 ? (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "rgba(0,217,255,0.04)", borderBottom: "1px solid var(--border-subtle)" }}>
                  <th style={{ padding: "14px 20px", textAlign: "left", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, color: "#00D9FF", fontFamily: "'Inter',sans-serif" }}>Season</th>
                  <th style={{ padding: "14px 20px", textAlign: "left", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, color: "#00D9FF", fontFamily: "'Inter',sans-serif" }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {[...realStats.seasons].reverse().map((season, i) => (
                  <tr key={season} style={{ backgroundColor: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.02)", borderTop: "1px solid var(--border-subtle)" }}>
                    <td style={{ padding: "12px 20px" }}>
                      <span style={{ fontWeight: 700, fontSize: 13, color: "#00D9FF", fontFamily: "'Inter',sans-serif" }}>{season}</span>
                    </td>
                    <td style={{ padding: "12px 20px" }}>
                      {i === 0
                        ? <span style={{ background: "rgba(34,197,94,0.12)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.3)", padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700, fontFamily: "'Inter',sans-serif" }}>Current/Recent</span>
                        : <span style={{ color: "#6B7280", fontSize: 12 }}>Completed</span>
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "rgba(0,217,255,0.04)", borderBottom: "1px solid var(--border-subtle)" }}>
                  <th style={{ padding: "14px 20px", textAlign: "left", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, color: "#00D9FF", fontFamily: "'Inter',sans-serif" }}>Season</th>
                  <th style={{ padding: "14px 20px", textAlign: "left", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, color: "#00D9FF", fontFamily: "'Inter',sans-serif" }}>Champion 🏆</th>
                  <th style={{ padding: "14px 20px", textAlign: "left", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, color: "#00D9FF", fontFamily: "'Inter',sans-serif" }} className="hidden sm:table-cell">Runner Up</th>
                  <th style={{ padding: "14px 20px", textAlign: "left", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, color: "#00D9FF", fontFamily: "'Inter',sans-serif" }} className="hidden md:table-cell">Player of Tournament</th>
                </tr>
              </thead>
              <tbody>
                {league.recentSeasons.map((season, i) => (
                  <tr key={season.year} style={{ backgroundColor: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.02)", borderTop: "1px solid var(--border-subtle)" }}>
                    <td style={{ padding: "12px 20px" }}>
                      <span style={{ fontWeight: 700, fontSize: 13, color: "#00D9FF", fontFamily: "'Inter',sans-serif" }}>{season.year}</span>
                    </td>
                    <td style={{ padding: "12px 20px", color: "#FFFFFF", fontSize: 13, fontWeight: 500 }}>{season.champion}</td>
                    <td style={{ padding: "12px 20px", color: "#C8C9D4", fontSize: 13 }} className="hidden sm:table-cell">{season.runnerUp}</td>
                    <td style={{ padding: "12px 20px", color: "#C8C9D4", fontSize: 13 }} className="hidden md:table-cell">{season.playerOfTournament}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* ── Teams ── */}
        <h2 style={{ color: "#FFFFFF", marginBottom: 16 }}>{league.name} Teams ({league.teams})</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 40 }}>
          {league.teamsList.map((team) => (
            <span
              key={team}
              className="glass-card"
              style={{ padding: "8px 16px", fontSize: 13, color: "#C8C9D4" }}
            >
              {team}
            </span>
          ))}
        </div>

        {/* ── News link ── */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <Link to="/news" className="btn-secondary">
            📰 Visit News Page for Latest Articles →
          </Link>
        </div>
      </div>
    </div>
  );
}
