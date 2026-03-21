import { useParams, Link } from "react-router-dom";
import { getLeagueById } from "../data/leagues";
import { getArticlesByLeague } from "../data/articles";

const statCard = (label: string, value: string | number, icon: string, accent = false) => (
  <div
    className="p-5 rounded-xl"
    style={{
      backgroundColor: "#0a1628",
      border: accent ? "1px solid rgba(245,166,35,0.3)" : "1px solid rgba(255,255,255,0.06)",
    }}
  >
    <div className="text-2xl mb-2">{icon}</div>
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
  const articles = getArticlesByLeague(id ?? "");

  if (!league) {
    return (
      <div
        className="flex flex-col items-center justify-center py-32 text-center"
        style={{ backgroundColor: "#0a1628" }}
      >
        <p className="text-6xl mb-4">🏏</p>
        <h2 className="text-2xl font-bold text-white mb-2">League Not Found</h2>
        <p className="text-gray-400 mb-6">We couldn't find that league.</p>
        <Link
          to="/leagues"
          className="px-6 py-3 rounded-xl font-semibold"
          style={{ background: "linear-gradient(135deg, #f5a623, #d4891e)", color: "#0a1628" }}
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
    <div style={{ backgroundColor: "#0a1628", minHeight: "100vh" }}>
      {/* ─── Hero Banner ─── */}
      <div
        className="relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${league.color}55 0%, #0a1628 60%)`,
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
            <Link to="/" className="hover:text-white transition-colors" style={{ textDecoration: "none" }}>
              Home
            </Link>
            <span>›</span>
            <Link to="/leagues" className="hover:text-white transition-colors" style={{ textDecoration: "none" }}>
              Leagues
            </Link>
            <span>›</span>
            <span className="text-white">{league.shortName}</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center gap-8">
            <div className="flex items-center gap-5">
              <span className="text-7xl">{league.flag}</span>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className="text-xs font-semibold px-3 py-1.5 rounded-full"
                    style={
                      league.isActive
                        ? {
                            backgroundColor: "rgba(34,197,94,0.15)",
                            color: "#22c55e",
                            border: "1px solid rgba(34,197,94,0.3)",
                          }
                        : {
                            backgroundColor: "rgba(156,163,175,0.1)",
                            color: "#9ca3af",
                            border: "1px solid rgba(156,163,175,0.2)",
                          }
                    }
                  >
                    {league.isActive ? "● Live Now" : "Off Season"}
                  </span>
                  <span className="text-xs text-gray-400">{league.format}</span>
                </div>
                <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
                  {league.name}
                </h1>
                <p className="text-gray-300 mt-2 text-lg">
                  {league.country} · Founded {league.founded} · {league.teams} Teams
                </p>
              </div>
            </div>

            {/* Quick action */}
            <div className="lg:ml-auto flex gap-3">
              <Link
                to="/compare"
                className="px-5 py-3 rounded-xl text-sm font-medium transition-all hover:-translate-y-0.5"
                style={{
                  border: "1px solid rgba(245,166,35,0.4)",
                  color: "#f5a623",
                  background: "rgba(245,166,35,0.05)",
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
            }}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* ─── Description ─── */}
        <div
          className="p-6 rounded-2xl mb-10"
          style={{
            backgroundColor: "#112240",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <p className="text-gray-300 text-base leading-relaxed">{league.description}</p>
        </div>

        {/* ─── Key Stats ─── */}
        <h2 className="text-2xl font-bold text-white mb-5">League Overview</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {statCard("Founded", league.founded, "📅")}
          {statCard("Teams", league.teams, "👕")}
          {statCard("Seasons", league.numberOfSeasons, "🏆")}
          {statCard("Prize Money", prizeMoney, "💰", true)}
          {statCard("Avg Viewership", `${league.avgViewershipMillion}M`, "📺")}
          {statCard("Quality Rating", `${league.playerQualityRating}/100`, "⭐", true)}
        </div>

        {/* ─── Records ─── */}
        <h2 className="text-2xl font-bold text-white mb-5">All-Time Records</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          <div
            className="p-6 rounded-2xl"
            style={{
              backgroundColor: "#112240",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div className="text-3xl mb-3">🏏</div>
            <div className="text-xs text-gray-400 uppercase tracking-wider mb-2">Most Runs</div>
            <div className="text-2xl font-extrabold text-white mb-1">
              {league.mostRuns.runs.toLocaleString()}
            </div>
            <div className="font-semibold" style={{ color: "#f5a623" }}>
              {league.mostRuns.player}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {league.mostRuns.season}
            </div>
          </div>

          <div
            className="p-6 rounded-2xl"
            style={{
              backgroundColor: "#112240",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div className="text-3xl mb-3">🎳</div>
            <div className="text-xs text-gray-400 uppercase tracking-wider mb-2">Most Wickets</div>
            <div className="text-2xl font-extrabold text-white mb-1">
              {league.mostWickets.wickets}
            </div>
            <div className="font-semibold" style={{ color: "#f5a623" }}>
              {league.mostWickets.player}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {league.mostWickets.season}
            </div>
          </div>

          <div
            className="p-6 rounded-2xl"
            style={{
              backgroundColor: "#112240",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div className="text-3xl mb-3">⚡</div>
            <div className="text-xs text-gray-400 uppercase tracking-wider mb-2">Highest Score</div>
            <div className="text-2xl font-extrabold text-white mb-1">
              {league.highestScore.score}*
            </div>
            <div className="font-semibold" style={{ color: "#f5a623" }}>
              {league.highestScore.player}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              vs {league.highestScore.against} · {league.highestScore.season}
            </div>
          </div>
        </div>

        {/* ─── Top Players ─── */}
        <h2 className="text-2xl font-bold text-white mb-5">Top Players</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
          {league.topPlayers.map((player, i) => (
            <div
              key={player.name}
              className="p-5 rounded-2xl text-center relative overflow-hidden"
              style={{
                backgroundColor: "#112240",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {/* Rank badge */}
              <div
                className="absolute top-3 left-3 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                style={
                  i === 0
                    ? { background: "linear-gradient(135deg, #f5a623, #d4891e)", color: "#0a1628" }
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
                  border: "2px solid rgba(245,166,35,0.2)",
                }}
              >
                🏏
              </div>

              <div className="font-bold text-white text-sm leading-snug mb-1">
                {player.name}
              </div>
              <div className="text-xs text-gray-400 mb-3">
                {player.country}
              </div>

              <span
                className="text-xs px-2.5 py-1 rounded-md inline-block mb-3"
                style={{
                  backgroundColor: "rgba(245,166,35,0.1)",
                  color: "#f5a623",
                }}
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
                <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "#0a1628" }}>
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${player.rating}%`,
                      background: "linear-gradient(90deg, #f5a623, #fbbf24)",
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ─── Recent Seasons ─── */}
        <h2 className="text-2xl font-bold text-white mb-5">Recent Seasons</h2>
        <div
          className="rounded-2xl overflow-hidden mb-12"
          style={{
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <table className="w-full">
            <thead>
              <tr style={{ backgroundColor: "#112240" }}>
                <th className="px-5 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Season
                </th>
                <th className="px-5 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Champion 🏆
                </th>
                <th className="px-5 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider hidden sm:table-cell">
                  Runner Up
                </th>
                <th className="px-5 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider hidden md:table-cell">
                  Player of Tournament
                </th>
              </tr>
            </thead>
            <tbody>
              {league.recentSeasons.map((season, i) => (
                <tr
                  key={season.year}
                  style={{
                    backgroundColor: i % 2 === 0 ? "#0a1628" : "#0d1f3c",
                    borderTop: "1px solid rgba(255,255,255,0.04)",
                  }}
                >
                  <td className="px-5 py-4">
                    <span
                      className="font-bold text-sm"
                      style={{ color: "#f5a623" }}
                    >
                      {season.year}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-white text-sm font-medium">
                    {season.champion}
                  </td>
                  <td className="px-5 py-4 text-gray-400 text-sm hidden sm:table-cell">
                    {season.runnerUp}
                  </td>
                  <td className="px-5 py-4 text-gray-400 text-sm hidden md:table-cell">
                    {season.playerOfTournament}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ─── Teams ─── */}
        <h2 className="text-2xl font-bold text-white mb-5">
          {league.name} Teams ({league.teams})
        </h2>
        <div className="flex flex-wrap gap-3 mb-12">
          {league.teamsList.map((team) => (
            <span
              key={team}
              className="px-4 py-2.5 rounded-xl text-sm font-medium"
              style={{
                backgroundColor: "#112240",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "#d1d5db",
              }}
            >
              {team}
            </span>
          ))}
        </div>

        {/* ─── Related Articles ─── */}
        {articles.length > 0 && (
          <>
            <h2 className="text-2xl font-bold text-white mb-5">Latest Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
              {articles.slice(0, 2).map((article) => (
                <div
                  key={article.id}
                  className="p-5 rounded-2xl card-hover"
                  style={{
                    backgroundColor: "#112240",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="text-xs font-semibold px-2.5 py-1 rounded-md capitalize"
                      style={{
                        backgroundColor: "rgba(245,166,35,0.1)",
                        color: "#f5a623",
                      }}
                    >
                      {article.category}
                    </span>
                    <span className="text-xs text-gray-500">{article.readTime} min</span>
                  </div>
                  <h3 className="text-white font-semibold mb-2">{article.title}</h3>
                  <p className="text-gray-400 text-sm">{article.excerpt}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
