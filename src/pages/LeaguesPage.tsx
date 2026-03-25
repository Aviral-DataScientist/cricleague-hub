import { useState } from "react";
import { Link } from "react-router-dom";
import { leagues, continents } from "../data/leagues";
import { Search, Trophy } from "lucide-react";

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
    <div style={{ backgroundColor: "var(--bg-primary)", minHeight: "100vh" }}>
      {/* Page Hero */}
      <div style={{ padding: "56px 24px 40px", borderBottom: "1px solid var(--border-subtle)" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
            <Trophy size={28} color="#00D9FF" />
            <h1 style={{ color: "#FFFFFF", margin: 0 }}>All T20 Leagues</h1>
          </div>
          <p style={{ color: "#C8C9D4", fontSize: 16, maxWidth: 500 }}>
            Explore every major T20 franchise league across the world — from the mighty IPL to the emerging MLC.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "32px 24px" }}>
        {/* Filters */}
        <div className="glass-card" style={{ padding: 20, marginBottom: 24, display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
          {/* Search */}
          <div style={{ position: "relative", flex: "1 1 200px", minWidth: 180 }}>
            <Search size={15} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#6B7280" }} />
            <input
              type="text"
              placeholder="Search leagues..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%",
                paddingLeft: 36,
                paddingRight: 16,
                paddingTop: 10,
                paddingBottom: 10,
                borderRadius: 8,
                border: "1px solid var(--border-subtle)",
                background: "rgba(255,255,255,0.03)",
                color: "#FFFFFF",
                fontSize: 14,
                fontFamily: "'Lato', sans-serif",
                outline: "none",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(0,217,255,0.4)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border-subtle)")}
            />
          </div>

          {/* Continent pills */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {["All", ...continents].map((c) => (
              <button
                key={c}
                onClick={() => setSelectedContinent(c)}
                style={{
                  padding: "7px 14px",
                  borderRadius: 20,
                  border: selectedContinent === c ? "1px solid rgba(0,217,255,0.5)" : "1px solid var(--border-subtle)",
                  background: selectedContinent === c ? "rgba(0,217,255,0.15)" : "transparent",
                  color: selectedContinent === c ? "#00D9FF" : "#C8C9D4",
                  fontSize: 13,
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "all 200ms ease",
                }}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Status pills */}
          <div style={{ display: "flex", gap: 6 }}>
            {["All", "Active", "Off Season"].map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                style={{
                  padding: "7px 14px",
                  borderRadius: 20,
                  border: statusFilter === s ? "1px solid rgba(0,217,255,0.5)" : "1px solid var(--border-subtle)",
                  background: statusFilter === s ? "rgba(0,217,255,0.15)" : "transparent",
                  color: statusFilter === s ? "#00D9FF" : "#C8C9D4",
                  fontSize: 13,
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "all 200ms ease",
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <p style={{ color: "#6B7280", fontSize: 13, marginBottom: 20 }}>
          Showing <span style={{ color: "#FFFFFF", fontWeight: 600 }}>{filtered.length}</span> of{" "}
          <span style={{ color: "#FFFFFF", fontWeight: 600 }}>{leagues.length}</span> leagues
        </p>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <p style={{ fontSize: 48, marginBottom: 16 }}>🏏</p>
            <p style={{ color: "#C8C9D4", fontSize: 16 }}>No leagues found. Try adjusting your filters.</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
            {filtered.map((league) => (
              <div
                key={league.id}
                className="glass-card"
                style={{ borderLeft: `4px solid ${league.color}`, padding: 20 }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 14 }}>
                  <span style={{ fontSize: 36, lineHeight: 1, flexShrink: 0 }}>{league.flag}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: "#6B7280", fontSize: 11, marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>{league.continent}</div>
                    <h3 style={{ color: "#FFFFFF", fontSize: 17, margin: 0 }}>{league.name}</h3>
                    <div style={{ color: "#C8C9D4", fontSize: 13, marginTop: 2 }}>{league.country} · {league.format}</div>
                  </div>
                  {league.isActive
                    ? <span className="badge-teal">ACTIVE</span>
                    : <span style={{ background: "rgba(255,255,255,0.06)", color: "#9CA3AF", padding: "3px 8px", borderRadius: 20, fontSize: 10, fontWeight: 700, fontFamily: "'Inter',sans-serif", whiteSpace: "nowrap" as const }}>OFF</span>
                  }
                </div>

                <p style={{ color: "#C8C9D4", fontSize: 13, lineHeight: 1.5, marginBottom: 14, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const, overflow: "hidden" }}>
                  {league.description}
                </p>

                <div style={{ display: "flex", gap: 16, marginBottom: 14, paddingTop: 12, borderTop: "1px solid var(--border-subtle)" }}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ color: "#FFFFFF", fontWeight: 700, fontSize: 16, fontFamily: "'Inter', sans-serif" }}>{league.teams}</div>
                    <div style={{ color: "#6B7280", fontSize: 11 }}>Teams</div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ color: "#FFFFFF", fontWeight: 700, fontSize: 16, fontFamily: "'Inter', sans-serif" }}>{league.numberOfSeasons}</div>
                    <div style={{ color: "#6B7280", fontSize: 11 }}>Seasons</div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ color: "#FFFFFF", fontWeight: 700, fontSize: 16, fontFamily: "'Inter', sans-serif" }}>{league.founded}</div>
                    <div style={{ color: "#6B7280", fontSize: 11 }}>Founded</div>
                  </div>
                </div>

                <Link
                  to={`/leagues/${league.id}`}
                  style={{
                    color: "#00D9FF",
                    textDecoration: "none",
                    fontSize: 13,
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 600,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  View Details →
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
