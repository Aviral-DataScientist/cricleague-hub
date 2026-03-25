import { useState } from "react";
import { leagues, type League } from "../data/leagues";
import { ChevronDown } from "lucide-react";

interface BarProps {
  value: number;
  max: number;
  color: string;
  label: string;
}

function Bar({ value, max, color, label }: BarProps) {
  const pct = Math.round((value / max) * 100);
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
        <span style={{ fontSize: 12, color: "#C8C9D4", fontFamily: "'Lato', sans-serif", maxWidth: 160, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" as const }}>{label}</span>
        <span style={{ fontSize: 12, fontWeight: 700, color, marginLeft: 8, fontFamily: "'Inter', sans-serif" }}>{value.toLocaleString()}</span>
      </div>
      <div style={{ height: 10, borderRadius: 5, overflow: "hidden", background: "rgba(255,255,255,0.06)" }}>
        <div
          style={{
            height: "100%",
            width: `${pct}%`,
            borderRadius: 5,
            background: `linear-gradient(90deg, ${color}, ${color}99)`,
            boxShadow: `0 0 8px ${color}60`,
            transition: "width 700ms ease",
          }}
        />
      </div>
    </div>
  );
}

const METRICS = [
  {
    key: "prizeMoneyUSD",
    label: "Prize Money (USD)",
    icon: "💰",
    format: (v: number) =>
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        notation: "compact",
        maximumFractionDigits: 1,
      }).format(v),
  },
  {
    key: "teams",
    label: "Number of Teams",
    icon: "👕",
    format: (v: number) => v.toString(),
  },
  {
    key: "avgViewershipMillion",
    label: "Avg Viewership (M)",
    icon: "📺",
    format: (v: number) => `${v}M`,
  },
  {
    key: "playerQualityRating",
    label: "Player Quality Rating",
    icon: "⭐",
    format: (v: number) => `${v}/100`,
  },
  {
    key: "numberOfSeasons",
    label: "Seasons Completed",
    icon: "🏆",
    format: (v: number) => v.toString(),
  },
  {
    key: "founded",
    label: "Founded",
    icon: "📅",
    format: (v: number) => v.toString(),
  },
];

const COLORS = ["#00D9FF", "#A78BFA", "#34d399", "#f472b6"];

export default function ComparisonPage() {
  const [selected, setSelected] = useState<string[]>(["ipl", "psl"]);

  const selectedLeagues: League[] = selected
    .map((id) => leagues.find((l) => l.id === id))
    .filter(Boolean) as League[];

  const toggleLeague = (id: string) => {
    if (selected.includes(id)) {
      if (selected.length > 1) setSelected(selected.filter((s) => s !== id));
    } else {
      if (selected.length < 3) setSelected([...selected, id]);
    }
  };

  return (
    <div style={{ backgroundColor: "var(--bg-primary)", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ padding: "56px 24px 40px", borderBottom: "1px solid var(--border-subtle)" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <p style={{ color: "#00D9FF", fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", fontFamily: "'Inter', sans-serif", marginBottom: 8 }}>
            SIDE BY SIDE
          </p>
          <h1 style={{ color: "#FFFFFF", margin: "0 0 8px" }}>Compare Leagues</h1>
          <p style={{ color: "#C8C9D4", fontSize: 16 }}>
            Select up to 3 leagues and compare them across key metrics.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "32px 24px" }}>
        {/* League selector */}
        <div className="glass-card" style={{ padding: 24, marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <h2 style={{ color: "#FFFFFF", fontSize: 16, margin: 0 }}>Choose Leagues to Compare</h2>
            <ChevronDown size={16} color="#6B7280" />
            <span style={{ color: "#6B7280", fontSize: 13 }}>({selected.length}/3 selected)</span>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {leagues.map((league) => {
              const isSelected = selected.includes(league.id);
              const idx = selected.indexOf(league.id);
              return (
                <button
                  key={league.id}
                  onClick={() => toggleLeague(league.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "8px 14px",
                    borderRadius: 8,
                    fontSize: 13,
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 500,
                    cursor: "pointer",
                    transition: "all 150ms ease",
                    background: isSelected ? `${COLORS[idx]}18` : "rgba(255,255,255,0.03)",
                    border: isSelected ? `1px solid ${COLORS[idx]}60` : "1px solid var(--border-subtle)",
                    color: isSelected ? COLORS[idx] : "#9CA3AF",
                    boxShadow: isSelected ? `0 0 12px ${COLORS[idx]}25` : "none",
                  }}
                  disabled={!isSelected && selected.length >= 3}
                >
                  <span>{league.flag}</span>
                  <span>{league.shortName}</span>
                  {isSelected && <span style={{ color: COLORS[idx] }}>✓</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Comparison table */}
        <div className="glass-card" style={{ overflow: "hidden", padding: 0, marginBottom: 32 }}>
          {/* Header row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `220px repeat(${selectedLeagues.length}, 1fr)`,
              background: "rgba(0,217,255,0.04)",
              borderBottom: "1px solid var(--border-subtle)",
            }}
          >
            <div style={{ padding: "16px 24px", fontSize: 11, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: 1, color: "#00D9FF", fontFamily: "'Inter', sans-serif" }}>
              Metric
            </div>
            {selectedLeagues.map((league, i) => (
              <div key={league.id} style={{ padding: "16px 24px", textAlign: "center" }}>
                <div style={{ fontSize: 28, marginBottom: 4 }}>{league.flag}</div>
                <div style={{ fontWeight: 700, fontSize: 13, color: COLORS[i], fontFamily: "'Inter', sans-serif" }}>{league.shortName}</div>
                <div style={{ fontSize: 11, color: "#6B7280", marginTop: 2 }}>{league.country}</div>
              </div>
            ))}
          </div>

          {/* Data rows */}
          {METRICS.map((metric, mi) => {
            const values = selectedLeagues.map((l) => (l as unknown as Record<string, number>)[metric.key]);
            const maxVal = Math.max(...values);

            return (
              <div
                key={metric.key}
                style={{
                  display: "grid",
                  gridTemplateColumns: `220px repeat(${selectedLeagues.length}, 1fr)`,
                  backgroundColor: mi % 2 === 0 ? "transparent" : "rgba(255,255,255,0.02)",
                  borderBottom: "1px solid var(--border-subtle)",
                }}
              >
                <div style={{ padding: "16px 24px", display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 18 }}>{metric.icon}</span>
                  <span style={{ fontSize: 13, color: "#C8C9D4", fontFamily: "'Lato', sans-serif" }}>{metric.label}</span>
                </div>
                {selectedLeagues.map((league, i) => {
                  const val = (league as unknown as Record<string, number>)[metric.key];
                  const isBest = val === maxVal && metric.key !== "founded";
                  return (
                    <div
                      key={league.id}
                      style={{
                        padding: "16px 24px",
                        textAlign: "center",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        ...(isBest && metric.key !== "founded"
                          ? {
                              background: `${COLORS[i]}08`,
                              borderLeft: `2px solid ${COLORS[i]}`,
                              boxShadow: `inset 0 0 20px ${COLORS[i]}08`,
                            }
                          : {}),
                      }}
                    >
                      <div style={{ fontSize: 16, fontWeight: 800, fontFamily: "'Inter', sans-serif", color: isBest && metric.key !== "founded" ? COLORS[i] : "#FFFFFF", marginBottom: 4 }}>
                        {metric.format(val)}
                      </div>
                      {isBest && metric.key !== "founded" && (
                        <span style={{
                          fontSize: 10,
                          fontWeight: 700,
                          padding: "2px 8px",
                          borderRadius: 10,
                          color: COLORS[i],
                          background: `${COLORS[i]}15`,
                          border: `1px solid ${COLORS[i]}30`,
                          fontFamily: "'Inter', sans-serif",
                        }}>
                          ▲ Best
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* Bar Charts */}
        <h2 style={{ color: "#FFFFFF", marginBottom: 20 }}>Visual Comparison</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16, marginBottom: 32 }}>
          {[
            { key: "prizeMoneyUSD", label: "Prize Money (USD)", icon: "💰" },
            { key: "avgViewershipMillion", label: "Avg Viewership (Millions)", icon: "📺" },
            { key: "playerQualityRating", label: "Player Quality Rating", icon: "⭐" },
            { key: "numberOfSeasons", label: "Seasons Completed", icon: "🏆" },
          ].map((chart) => {
            const values = selectedLeagues.map((l) => (l as unknown as Record<string, number>)[chart.key]);
            const maxVal = Math.max(...values);
            return (
              <div key={chart.key} className="glass-card" style={{ padding: 20 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                  <span style={{ fontSize: 18 }}>{chart.icon}</span>
                  <h3 style={{ fontSize: 14, color: "#FFFFFF", margin: 0 }}>{chart.label}</h3>
                </div>
                {selectedLeagues.map((league, i) => (
                  <Bar
                    key={league.id}
                    value={(league as unknown as Record<string, number>)[chart.key]}
                    max={maxVal}
                    color={COLORS[i]}
                    label={`${league.flag} ${league.shortName}`}
                  />
                ))}
              </div>
            );
          })}
        </div>

        {/* Quick Summary */}
        <h2 style={{ color: "#FFFFFF", marginBottom: 20 }}>Quick Summary</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
          {selectedLeagues.map((league, i) => (
            <div
              key={league.id}
              className="glass-card"
              style={{ padding: 20, borderColor: `${COLORS[i]}30`, boxShadow: `0 0 20px ${COLORS[i]}10` }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <span style={{ fontSize: 28 }}>{league.flag}</span>
                <div>
                  <div style={{ fontWeight: 700, color: "#FFFFFF", fontFamily: "'Inter', sans-serif" }}>{league.name}</div>
                  <div style={{ fontSize: 12, color: "#6B7280" }}>{league.country}</div>
                </div>
              </div>
              <div style={{ height: 2, borderRadius: 1, background: `linear-gradient(90deg, ${COLORS[i]}, transparent)`, marginBottom: 16 }} />
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  { label: "Status", value: league.isActive ? "● Active" : "Off Season" },
                  { label: "Format", value: league.format },
                  { label: "Teams", value: `${league.teams} franchises` },
                  { label: "Season", value: league.activeSeason },
                ].map((row) => (
                  <div key={row.label} style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                    <span style={{ color: "#6B7280" }}>{row.label}</span>
                    <span style={{ fontWeight: 500, color: row.label === "Status" && league.isActive ? "#22c55e" : COLORS[i], fontFamily: "'Inter', sans-serif" }}>
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
