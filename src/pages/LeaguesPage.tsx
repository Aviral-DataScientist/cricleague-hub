import { useState } from "react";
import { Link } from "react-router-dom";
import { leagues, continents } from "../data/leagues";

export default function LeaguesPage() {
  const [search, setSearch] = useState("");
  const [selectedContinent, setSelectedContinent] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const filtered = leagues.filter((l) => {
    const matchSearch =
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.country.toLowerCase().includes(search.toLowerCase()) ||
      l.shortName.toLowerCase().includes(search.toLowerCase());
    const matchContinent =
      selectedContinent === "All" || l.continent === selectedContinent;
    const matchStatus =
      statusFilter === "All" ||
      (statusFilter === "Active" && l.isActive) ||
      (statusFilter === "Off Season" && !l.isActive);
    return matchSearch && matchContinent && matchStatus;
  });

  return (
    <div style={{ backgroundColor: "#0a1628", minHeight: "100vh" }}>
      {/* Page Header */}
      <div
        className="py-14 px-4 sm:px-6 lg:px-8"
        style={{
          background: "linear-gradient(180deg, #081020 0%, #0a1628 100%)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div className="max-w-7xl mx-auto">
          <p className="text-sm font-medium mb-2" style={{ color: "#f5a623" }}>
            GLOBAL T20 CRICKET
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-3">
            All Leagues
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            Explore every major T20 franchise league across the world — from the
            mighty IPL to the emerging MLC.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Filters */}
        <div
          className="flex flex-col md:flex-row gap-4 mb-10 p-5 rounded-2xl"
          style={{
            backgroundColor: "#112240",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {/* Search */}
          <div className="flex-1 relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              🔍
            </span>
            <input
              type="text"
              placeholder="Search leagues..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2"
              style={{
                backgroundColor: "#0a1628",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            />
          </div>

          {/* Continent filter */}
          <select
            value={selectedContinent}
            onChange={(e) => setSelectedContinent(e.target.value)}
            className="px-4 py-3 rounded-xl text-sm text-white focus:outline-none cursor-pointer"
            style={{
              backgroundColor: "#0a1628",
              border: "1px solid rgba(255,255,255,0.1)",
              color: selectedContinent === "All" ? "#9ca3af" : "#ffffff",
            }}
          >
            <option value="All">All Continents</option>
            {continents.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          {/* Status filter */}
          <div className="flex gap-2">
            {["All", "Active", "Off Season"].map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className="px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150"
                style={
                  statusFilter === s
                    ? {
                        background: "linear-gradient(135deg, #f5a623, #d4891e)",
                        color: "#0a1628",
                      }
                    : {
                        backgroundColor: "#0a1628",
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: "#9ca3af",
                      }
                }
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <p className="text-gray-400 text-sm mb-6">
          Showing <span className="text-white font-semibold">{filtered.length}</span> of{" "}
          <span className="text-white font-semibold">{leagues.length}</span> leagues
        </p>

        {/* League cards grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">🏏</p>
            <p className="text-gray-400 text-lg">No leagues found. Try adjusting your filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((league) => (
              <Link
                key={league.id}
                to={`/leagues/${league.id}`}
                className="block rounded-2xl overflow-hidden card-hover"
                style={{
                  backgroundColor: "#112240",
                  border: "1px solid rgba(255,255,255,0.06)",
                  textDecoration: "none",
                }}
              >
                {/* Color bar */}
                <div
                  className="h-1.5"
                  style={{
                    background: `linear-gradient(90deg, ${league.color}, ${league.accentColor})`,
                  }}
                />

                <div className="p-6">
                  {/* Header row */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">{league.flag}</span>
                      <div>
                        <div className="text-xs text-gray-400 mb-0.5">{league.continent}</div>
                        <h3 className="text-white font-bold text-lg leading-snug">
                          {league.name}
                        </h3>
                      </div>
                    </div>
                    <span
                      className="text-xs font-semibold px-2.5 py-1.5 rounded-full shrink-0"
                      style={
                        league.isActive
                          ? {
                              backgroundColor: "rgba(34,197,94,0.15)",
                              color: "#22c55e",
                              border: "1px solid rgba(34,197,94,0.3)",
                            }
                          : {
                              backgroundColor: "rgba(156,163,175,0.08)",
                              color: "#9ca3af",
                              border: "1px solid rgba(156,163,175,0.15)",
                            }
                      }
                    >
                      {league.isActive ? "● Live" : "Off Season"}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 text-sm leading-relaxed mb-5 line-clamp-2">
                    {league.description}
                  </p>

                  {/* Stats row */}
                  <div
                    className="grid grid-cols-4 gap-3 pt-4"
                    style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    <div className="text-center">
                      <div className="text-white font-bold">{league.teams}</div>
                      <div className="text-xs text-gray-500 mt-0.5">Teams</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold" style={{ color: "#f5a623" }}>
                        {league.founded}
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">Founded</div>
                    </div>
                    <div className="text-center">
                      <div className="text-white font-bold">{league.numberOfSeasons}</div>
                      <div className="text-xs text-gray-500 mt-0.5">Seasons</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold" style={{ color: "#f5a623" }}>
                        {league.format}
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">Format</div>
                    </div>
                  </div>

                  {/* Teams list snippet */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {league.teamsList.slice(0, 3).map((team) => (
                      <span
                        key={team}
                        className="text-xs px-2.5 py-1 rounded-md"
                        style={{
                          backgroundColor: "rgba(255,255,255,0.05)",
                          color: "#9ca3af",
                        }}
                      >
                        {team}
                      </span>
                    ))}
                    {league.teamsList.length > 3 && (
                      <span
                        className="text-xs px-2.5 py-1 rounded-md"
                        style={{
                          backgroundColor: "rgba(245,166,35,0.1)",
                          color: "#f5a623",
                        }}
                      >
                        +{league.teamsList.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
