import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getLeagueById } from "../data/leagues";
import { fetchLeagueStats, type RealLeagueStats } from "../lib/api";

const statCard = (label: string, value: string | number, icon: string, accent = false) => (
  <div
    className="glass-card p-5 flex flex-col items-center text-center"
    style={
      accent
        ? { borderColor: "rgba(245,166,35,0.35)", boxShadow: "0 0 20px rgba(245,166,35,0.08)" }
        : {}
    }
  >
    <div className="text-3xl mb-2">{icon}</div>
    <div
      className="text-2xl font-extrabold mb-1"
      style={{ color: accent ? "#f5a623" : "#ffffff" }}
    >
      {value}
    </div>
    <div className="text-xs text-gray-400">{label}</div>
  </div>
);

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
      <div
        className="flex flex-col items-center justify-center py-32 text-center"
        style={{ backgroundColor: "#060e1a" }}
      >
        <p className="text-6xl mb-4">🏏</p>
        <h2 className="text-2xl font-bold text-white mb-2">League Not Found</h2>
        <p className="text-gray-400 mb-6">We couldn't find that league.</p>
        <Link
          to="/leagues"
          className="px-6 py-3 rounded-xl font-semibold"
          style={{ background: "linear-gradient(135deg, #f5a623, #d4891e)", color: "#060e1a" }}
        >
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

  return (
    <div style={{ backgroundColor: "#060e1a", minHeight: "100vh" }}>
      {/* ─── Hero Banner ─── */}
      <div
        className="relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${league.color}40 0%, #060e1a 65%)`,
          borderBottom: "1px solid rgba(245,166,35,0.08)",
        }}
      >
        {/* League color glow orb */}
        <div
          className="orb"
          style={{
            width: 600,
            height: 600,
            top: "-200px",
            left: "-100px",
            background: `radial-gradient(circle, ${league.color}25 0%, transparent 70%)`,
          }}
        />
        <div
          className="orb"
          style={{
            width: 300,
            height: 300,
            top: "-50px",
            right: "10%",
            background: "radial-gradient(circle, rgba(245,166,35,0.1) 0%, transparent 70%)",
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
            <Link to="/" className="hover:text-white transition-colors" style={{ textDecoration: "none" }}>
              Home
            </Link>
            <span style={{ color: "rgba(245,166,35,0.4)" }}>›</span>
            <Link to="/leagues" className="hover:text-white transition-colors" style={{ textDecoration: "none" }}>
              Leagues
            </Link>
            <span style={{ color: "rgba(245,166,35,0.4)" }}>›</span>
            <span className="text-white">{league.shortName}</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center gap-8">
            <div className="flex items-center gap-5">
              <span
                className="text-7xl"
                style={{ filter: "drop-shadow(0 0 20px rgba(245,166,35,0.3))" }}
              >
                {league.flag}
              </span>
              <div>
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <span
                    className="text-xs font-semibold px-3 py-1.5 rounded-full"
                    style={
                      league.isActive
                        ? { backgroundColor: "rgba(34,197,94,0.15)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.3)" }
                        : { backgroundColor: "rgba(156,163,175,0.1)", color: "#9ca3af", border: "1px solid rgba(156,163,175,0.2)" }
                    }
                  >
                    {league.isActive ? "● Live Now" : "Off Season"}
                  </span>
                  <span
                    className="text-xs px-2.5 py-1 rounded-full"
                    style={{
                      backgroundColor: "rgba(245,166,35,0.08)",
                      color: "#f5a623",
                      border: "1px solid rgba(245,166,35,0.2)",
                    }}
                  >
                    {league.format}
                  </span>
                  {realStats && !statsLoading && (
                    <span
                      className="text-xs font-semibold px-2.5 py-1 rounded-full"
                      style={{
                        backgroundColor: "rgba(245,166,35,0.12)",
                        color: "#f5a623",
                        border: "1px solid rgba(245,166,35,0.3)",
                      }}
                    >
                      {realStats.isFallback ? "📊 Stats Data" : `📊 ${realStats.totalMatches} Real Matches`}
                    </span>
                  )}
                </div>
                <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
                  {league.name}
                </h1>
                <p className="text-gray-300 mt-2 text-lg">
                  {league.country} · Founded {league.founded} · {league.teams} Teams
                </p>
              </div>
            </div>

            <div className="lg:ml-auto flex gap-3">
              <Link
                to="/compare"
                className="px-5 py-3 rounded-xl text-sm font-medium transition-all hover:-translate-y-0.5 glass-card"
                style={{
                  color: "#f5a623",
                  textDecoration: "none",
                }}
              >
                Compare ⚖️
              </Link>
            </div>
          </div>

          {/* Color bar */}
          <div
            className="mt-8 h-1 rounded-full"
            style={{
              background: `linear-gradient(90deg, ${league.color}, ${league.accentColor}, ${league.color})`,
              boxShadow: `0 0 12px ${league.color}60`,
            }}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* ─── Description ─── */}
        <div className="glass-card p-6 mb-10">
          <p className="text-gray-300 text-base leading-relaxed">{league.description}</p>
        </div>

        {/* ─── Key Stats ─── */}
        <h2 className="text-2xl font-bold text-white mb-5">League Overview</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-12 overflow-x-auto">
          {statCard("Founded", league.founded, "📅")}
          {statCard("Teams", league.teams, "👕")}
          {statCard("Seasons", realStats?.seasons?.length ?? league.numberOfSeasons, "🏆")}
          {realStats?.latestSeason && statCard("Latest Season", realStats.latestSeason, "📆", true)}
          {statCard("Prize Money", prizeMoney, "💰", true)}
          {statCard("Avg Viewership", `${league.avgViewershipMillion}M`, "📺")}
          {statCard("Quality Rating", `${league.playerQualityRating}/100`, "⭐", true)}
        </div>

        {/* ─── Records (real data only) ─── */}
        {realStats && (
          <>
            <div className="flex items-center gap-3 mb-5">
              <h2 className="text-2xl font-bold text-white">All-Time Records</h2>
              {!realStats.isFallback && (
                <span
                  className="text-xs font-semibold px-2.5 py-1 rounded-full"
                  style={{ backgroundColor: "rgba(34,197,94,0.12)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.3)" }}
                >
                  ✓ Real Data
                </span>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
              {realStats.topRunScorers[0] && (
                <div className="glass-card p-6 glow-border">
                  <div className="text-3xl mb-3">🏏</div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider mb-2">Most Runs (Career)</div>
                  <div className="text-2xl font-extrabold text-white mb-1">
                    {(realStats.topRunScorers[0].runs ?? 0).toLocaleString()}
                  </div>
                  <div className="font-semibold gradient-text">{realStats.topRunScorers[0].name}</div>
                  <div className="text-xs text-gray-500 mt-1">Career</div>
                </div>
              )}

              {realStats.topWicketTakers[0] && (
                <div className="glass-card p-6 glow-border">
                  <div className="text-3xl mb-3">🎳</div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider mb-2">Most Wickets (Career)</div>
                  <div className="text-2xl font-extrabold text-white mb-1">{realStats.topWicketTakers[0].wickets ?? 0}</div>
                  <div className="font-semibold gradient-text">{realStats.topWicketTakers[0].name}</div>
                  <div className="text-xs text-gray-500 mt-1">Career</div>
                </div>
              )}

              {realStats.highestIndividualScore && (
                <div className="glass-card p-6 glow-border">
                  <div className="text-3xl mb-3">⚡</div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider mb-2">Highest Score</div>
                  <div className="text-2xl font-extrabold text-white mb-1">{realStats.highestIndividualScore.score}*</div>
                  <div className="font-semibold gradient-text">{realStats.highestIndividualScore.player}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    vs {realStats.highestIndividualScore.against} · {realStats.highestIndividualScore.season}
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {/* ─── Real Stats: Top Run Scorers ─── */}
        {realStats && realStats.topRunScorers.length > 0 && (
          <>
            <div className="flex items-center gap-3 mb-5">
              <h2 className="text-2xl font-bold text-white">Top Run Scorers</h2>
              <span
                className="text-xs font-semibold px-2.5 py-1 rounded-full"
                style={{ backgroundColor: "rgba(245,166,35,0.12)", color: "#f5a623", border: "1px solid rgba(245,166,35,0.3)" }}
              >
                📊 Cricsheet Data
              </span>
            </div>
            <div
              className="rounded-2xl overflow-hidden mb-12 glass-card"
              style={{ padding: 0 }}
            >
              <table className="w-full">
                <thead>
                  <tr
                    style={{
                      background: "linear-gradient(90deg, rgba(13,31,60,0.9), rgba(17,43,92,0.9))",
                      borderBottom: "1px solid rgba(245,166,35,0.15)",
                    }}
                  >
                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: "#f5a623" }}>#</th>
                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: "#f5a623" }}>Player</th>
                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: "#f5a623" }}>Runs</th>
                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider hidden sm:table-cell" style={{ color: "#f5a623" }}>Innings</th>
                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider hidden md:table-cell" style={{ color: "#f5a623" }}>Average</th>
                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider hidden md:table-cell" style={{ color: "#f5a623" }}>SR</th>
                  </tr>
                </thead>
                <tbody>
                  {realStats.topRunScorers.slice(0, 10).map((p, i) => (
                    <tr
                      key={p.name}
                      style={{
                        backgroundColor: i % 2 === 0 ? "rgba(6,14,26,0.6)" : "rgba(13,31,60,0.6)",
                        borderTop: "1px solid rgba(245,166,35,0.04)",
                      }}
                    >
                      <td className="px-5 py-3 text-gray-400 text-sm font-medium">{i + 1}</td>
                      <td className="px-5 py-3 text-white text-sm font-semibold">{p.name}</td>
                      <td className="px-5 py-3 text-sm font-bold" style={{ color: "#f5a623" }}>
                        {(p.runs ?? 0).toLocaleString()}
                      </td>
                      <td className="px-5 py-3 text-gray-400 text-sm hidden sm:table-cell">{p.matches}</td>
                      <td className="px-5 py-3 text-gray-400 text-sm hidden md:table-cell">{p.average}</td>
                      <td className="px-5 py-3 text-gray-400 text-sm hidden md:table-cell">{p.strikeRate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* ─── Real Stats: Top Wicket Takers ─── */}
        {realStats && realStats.topWicketTakers.length > 0 && (
          <>
            <div className="flex items-center gap-3 mb-5">
              <h2 className="text-2xl font-bold text-white">Top Wicket Takers</h2>
              <span
                className="text-xs font-semibold px-2.5 py-1 rounded-full"
                style={{ backgroundColor: "rgba(245,166,35,0.12)", color: "#f5a623", border: "1px solid rgba(245,166,35,0.3)" }}
              >
                📊 Cricsheet Data
              </span>
            </div>
            <div
              className="rounded-2xl overflow-hidden mb-12 glass-card"
              style={{ padding: 0 }}
            >
              <table className="w-full">
                <thead>
                  <tr
                    style={{
                      background: "linear-gradient(90deg, rgba(13,31,60,0.9), rgba(17,43,92,0.9))",
                      borderBottom: "1px solid rgba(245,166,35,0.15)",
                    }}
                  >
                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: "#f5a623" }}>#</th>
                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: "#f5a623" }}>Bowler</th>
                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: "#f5a623" }}>Wickets</th>
                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider hidden sm:table-cell" style={{ color: "#f5a623" }}>Matches</th>
                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider hidden md:table-cell" style={{ color: "#f5a623" }}>Economy</th>
                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider hidden md:table-cell" style={{ color: "#f5a623" }}>Average</th>
                  </tr>
                </thead>
                <tbody>
                  {realStats.topWicketTakers.slice(0, 10).map((p, i) => (
                    <tr
                      key={p.name}
                      style={{
                        backgroundColor: i % 2 === 0 ? "rgba(6,14,26,0.6)" : "rgba(13,31,60,0.6)",
                        borderTop: "1px solid rgba(245,166,35,0.04)",
                      }}
                    >
                      <td className="px-5 py-3 text-gray-400 text-sm font-medium">{i + 1}</td>
                      <td className="px-5 py-3 text-white text-sm font-semibold">{p.name}</td>
                      <td className="px-5 py-3 text-sm font-bold" style={{ color: "#f5a623" }}>
                        {p.wickets ?? 0}
                      </td>
                      <td className="px-5 py-3 text-gray-400 text-sm hidden sm:table-cell">{p.matches}</td>
                      <td className="px-5 py-3 text-gray-400 text-sm hidden md:table-cell">{p.economy}</td>
                      <td className="px-5 py-3 text-gray-400 text-sm hidden md:table-cell">{p.average}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* ─── Top Players (mock reference data) ─── */}
        <h2 className="text-2xl font-bold text-white mb-5">Notable Players</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
          {league.topPlayers.map((player, i) => (
            <div
              key={player.name}
              className="glass-card p-5 text-center relative overflow-hidden card-hover"
            >
              {/* Rank badge */}
              <div
                className="absolute top-3 left-3 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                style={
                  i === 0
                    ? { background: "linear-gradient(135deg, #f5a623, #d4891e)", color: "#060e1a" }
                    : { backgroundColor: "rgba(255,255,255,0.08)", color: "#9ca3af" }
                }
              >
                {i + 1}
              </div>

              {/* Avatar placeholder */}
              <div
                className="w-14 h-14 rounded-full mx-auto mb-3 flex items-center justify-center text-2xl"
                style={{
                  background: `linear-gradient(135deg, ${league.color}80, ${league.accentColor}40)`,
                  border: "2px solid rgba(245,166,35,0.25)",
                  boxShadow: "0 0 16px rgba(245,166,35,0.1)",
                }}
              >
                🏏
              </div>

              <div className="font-bold text-white text-sm leading-snug mb-1">{player.name}</div>
              <div className="text-xs text-gray-400 mb-3">{player.country}</div>

              <span
                className="text-xs px-2.5 py-1 rounded-md inline-block mb-3"
                style={{ backgroundColor: "rgba(245,166,35,0.1)", color: "#f5a623", border: "1px solid rgba(245,166,35,0.2)" }}
              >
                {player.role}
              </span>

              <div className="text-xs text-gray-400 mb-1">
                {player.runs != null
                  ? `${player.runs.toLocaleString()} runs`
                  : `${player.wickets} wickets`}
              </div>

              {/* Rating bar */}
              <div className="mt-2">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-500">Rating</span>
                  <span style={{ color: "#f5a623" }}>{player.rating}</span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "rgba(6,14,26,0.8)" }}>
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${player.rating}%`, background: "linear-gradient(90deg, #f5a623, #fbbf24)" }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ─── Highest Team Total ─── */}
        {realStats?.highestTeamTotal && (
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-5">
              <h2 className="text-2xl font-bold text-white">Highest Team Total</h2>
              <span
                className="text-xs font-semibold px-2.5 py-1 rounded-full"
                style={{ backgroundColor: "rgba(245,166,35,0.12)", color: "#f5a623", border: "1px solid rgba(245,166,35,0.3)" }}
              >
                📊 Cricsheet Data
              </span>
            </div>
            <div className="glass-card p-6 glow-border">
              <div className="flex items-center gap-4">
                <div className="text-4xl">🏟️</div>
                <div>
                  <div className="text-3xl font-extrabold text-white mb-1">
                    {realStats.highestTeamTotal.runs}
                    <span className="text-lg text-gray-400 font-normal ml-1">runs</span>
                  </div>
                  <div className="font-semibold gradient-text">
                    {realStats.highestTeamTotal.team}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    vs {realStats.highestTeamTotal.against} · {realStats.highestTeamTotal.season}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ─── Recent Seasons ─── */}
        <h2 className="text-2xl font-bold text-white mb-5">Recent Seasons</h2>
        <div
          className="rounded-2xl overflow-hidden mb-12 glass-card"
          style={{ padding: 0 }}
        >
          {realStats && !realStats.isFallback && realStats.seasons && realStats.seasons.length > 0 ? (
            <table className="w-full">
              <thead>
                <tr
                  style={{
                    background: "linear-gradient(90deg, rgba(13,31,60,0.9), rgba(17,43,92,0.9))",
                    borderBottom: "1px solid rgba(245,166,35,0.15)",
                  }}
                >
                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: "#f5a623" }}>Season</th>
                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: "#f5a623" }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {[...realStats.seasons].reverse().map((season, i) => (
                  <tr
                    key={season}
                    style={{
                      backgroundColor: i % 2 === 0 ? "rgba(6,14,26,0.6)" : "rgba(13,31,60,0.6)",
                      borderTop: "1px solid rgba(245,166,35,0.04)",
                    }}
                  >
                    <td className="px-5 py-4">
                      <span className="font-bold text-sm" style={{ color: "#f5a623" }}>{season}</span>
                    </td>
                    <td className="px-5 py-4">
                      {i === 0 ? (
                        <span
                          className="text-xs font-semibold px-2.5 py-1 rounded-full"
                          style={{ backgroundColor: "rgba(34,197,94,0.15)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.3)" }}
                        >
                          Current/Recent
                        </span>
                      ) : (
                        <span className="text-xs text-gray-400">Completed</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="w-full">
              <thead>
                <tr
                  style={{
                    background: "linear-gradient(90deg, rgba(13,31,60,0.9), rgba(17,43,92,0.9))",
                    borderBottom: "1px solid rgba(245,166,35,0.15)",
                  }}
                >
                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: "#f5a623" }}>Season</th>
                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: "#f5a623" }}>Champion 🏆</th>
                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider hidden sm:table-cell" style={{ color: "#f5a623" }}>Runner Up</th>
                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider hidden md:table-cell" style={{ color: "#f5a623" }}>Player of Tournament</th>
                </tr>
              </thead>
              <tbody>
                {league.recentSeasons.map((season, i) => (
                  <tr
                    key={season.year}
                    style={{
                      backgroundColor: i % 2 === 0 ? "rgba(6,14,26,0.6)" : "rgba(13,31,60,0.6)",
                      borderTop: "1px solid rgba(245,166,35,0.04)",
                    }}
                  >
                    <td className="px-5 py-4">
                      <span className="font-bold text-sm" style={{ color: "#f5a623" }}>{season.year}</span>
                    </td>
                    <td className="px-5 py-4 text-white text-sm font-medium">{season.champion}</td>
                    <td className="px-5 py-4 text-gray-400 text-sm hidden sm:table-cell">{season.runnerUp}</td>
                    <td className="px-5 py-4 text-gray-400 text-sm hidden md:table-cell">{season.playerOfTournament}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* ─── Teams ─── */}
        <h2 className="text-2xl font-bold text-white mb-5">
          {league.name} Teams ({league.teams})
        </h2>
        <div className="flex flex-wrap gap-3 mb-12">
          {league.teamsList.map((team) => (
            <span
              key={team}
              className="px-4 py-2.5 rounded-xl text-sm font-medium glass-card"
              style={{
                color: "#d1d5db",
              }}
            >
              {team}
            </span>
          ))}
        </div>

        {/* ─── News ─── */}
        <div className="mb-12 text-center">
          <Link
            to="/news"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:-translate-y-0.5 glass-card glow-border"
            style={{
              color: "#f5a623",
              textDecoration: "none",
            }}
          >
            📰 Visit News Page for Latest Articles →
          </Link>
        </div>
      </div>
    </div>
  );
}
