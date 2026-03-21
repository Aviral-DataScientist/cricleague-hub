import { useState } from "react";
import { leagues, type League } from "../data/leagues";

interface BarProps {
  value: number;
  max: number;
  color: string;
  label: string;
}

function Bar({ value, max, color, label }: BarProps) {
  const pct = Math.round((value / max) * 100);
  return (
    <div className="mb-1">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-xs text-gray-400 truncate max-w-[140px]">{label}</span>
        <span className="text-xs font-bold" style={{ color }}>
          {value.toLocaleString()}
        </span>
      </div>
      <div
        className="h-3 rounded-full overflow-hidden"
        style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
      >
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, background: color }}
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

const COLORS = ["#f5a623", "#60a5fa", "#34d399", "#f472b6"];

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
    <div style={{ backgroundColor: "#0a1628", minHeight: "100vh" }}>
      {/* Header */}
      <div
        className="py-14 px-4 sm:px-6 lg:px-8"
        style={{
          background: "linear-gradient(180deg, #081020 0%, #0a1628 100%)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div className="max-w-7xl mx-auto">
          <p className="text-sm font-medium mb-2" style={{ color: "#f5a623" }}>
            SIDE BY SIDE
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-3">
            Compare Leagues
          </h1>
          <p className="text-gray-400 text-lg">
            Select up to 3 leagues and compare them across key metrics.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* League selector */}
        <div
          className="p-6 rounded-2xl mb-10"
          style={{
            backgroundColor: "#112240",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <h2 className="text-white font-semibold mb-4">
            Choose Leagues to Compare{" "}
            <span className="text-sm font-normal text-gray-400">
              (min 1, max 3 — {selected.length}/3 selected)
            </span>
          </h2>
          <div className="flex flex-wrap gap-2.5">
            {leagues.map((league) => {
              const isSelected = selected.includes(league.id);
              const idx = selected.indexOf(league.id);
              return (
                <button
                  key={league.id}
                  onClick={() => toggleLeague(league.id)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-150"
                  style={
                    isSelected
                      ? {
                          background: `${COLORS[idx]}20`,
                          border: `1px solid ${COLORS[idx]}60`,
                          color: COLORS[idx],
                        }
                      : {
                          backgroundColor: "#0a1628",
                          border: "1px solid rgba(255,255,255,0.08)",
                          color: "#9ca3af",
                        }
                  }
                  disabled={!isSelected && selected.length >= 3}
                >
                  <span>{league.flag}</span>
                  <span>{league.shortName}</span>
                  {isSelected && <span>✓</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Comparison table */}
        <div
          className="rounded-2xl overflow-hidden mb-10"
          style={{ border: "1px solid rgba(255,255,255,0.06)" }}
        >
          {/* Header row */}
          <div
            className="grid"
            style={{
              gridTemplateColumns: `220px repeat(${selectedLeagues.length}, 1fr)`,
              backgroundColor: "#112240",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div className="px-6 py-5 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Metric
            </div>
            {selectedLeagues.map((league, i) => (
              <div key={league.id} className="px-6 py-5 text-center">
                <div className="text-3xl mb-1">{league.flag}</div>
                <div
                  className="font-bold text-sm"
                  style={{ color: COLORS[i] }}
                >
                  {league.shortName}
                </div>
                <div className="text-xs text-gray-500 mt-0.5">{league.country}</div>
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
                className="grid"
                style={{
                  gridTemplateColumns: `220px repeat(${selectedLeagues.length}, 1fr)`,
                  backgroundColor: mi % 2 === 0 ? "#0a1628" : "#0d1f3c",
                  borderBottom: "1px solid rgba(255,255,255,0.04)",
                }}
              >
                <div className="px-6 py-5 flex items-center gap-3">
                  <span className="text-xl">{metric.icon}</span>
                  <span className="text-sm text-gray-300 font-medium">{metric.label}</span>
                </div>
                {selectedLeagues.map((league, i) => {
                  const val = (league as unknown as Record<string, number>)[metric.key];
                  const isBest = val === maxVal && metric.key !== "founded";
                  return (
                    <div key={league.id} className="px-6 py-5 text-center flex flex-col items-center justify-center">
                      <div
                        className="text-lg font-extrabold mb-0.5"
                        style={{ color: isBest ? COLORS[i] : "#ffffff" }}
                      >
                        {metric.format(val)}
                      </div>
                      {isBest && metric.key !== "founded" && (
                        <span className="text-xs" style={{ color: COLORS[i] }}>
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
        <h2 className="text-2xl font-bold text-white mb-6">Visual Comparison</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {[
            { key: "prizeMoneyUSD", label: "Prize Money (USD)", icon: "💰" },
            { key: "avgViewershipMillion", label: "Avg Viewership (Millions)", icon: "📺" },
            { key: "playerQualityRating", label: "Player Quality Rating", icon: "⭐" },
            { key: "numberOfSeasons", label: "Seasons Completed", icon: "🏆" },
          ].map((chart) => {
            const values = selectedLeagues.map(
              (l) => (l as unknown as Record<string, number>)[chart.key]
            );
            const maxVal = Math.max(...values);
            return (
              <div
                key={chart.key}
                className="p-6 rounded-2xl"
                style={{
                  backgroundColor: "#112240",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div className="flex items-center gap-2 mb-5">
                  <span className="text-xl">{chart.icon}</span>
                  <h3 className="text-white font-semibold text-sm">{chart.label}</h3>
                </div>
                <div className="space-y-4">
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
              </div>
            );
          })}
        </div>

        {/* Quick Summary */}
        <h2 className="text-2xl font-bold text-white mb-6">Quick Summary</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {selectedLeagues.map((league, i) => (
            <div
              key={league.id}
              className="p-6 rounded-2xl"
              style={{
                backgroundColor: "#112240",
                border: `1px solid ${COLORS[i]}30`,
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{league.flag}</span>
                <div>
                  <div className="font-bold text-white">{league.name}</div>
                  <div className="text-xs text-gray-400">{league.country}</div>
                </div>
              </div>
              <div className="space-y-2">
                {[
                  { label: "Status", value: league.isActive ? "● Active" : "Off Season" },
                  { label: "Format", value: league.format },
                  { label: "Teams", value: `${league.teams} franchises` },
                  { label: "Season", value: league.activeSeason },
                ].map((row) => (
                  <div key={row.label} className="flex justify-between text-sm">
                    <span className="text-gray-400">{row.label}</span>
                    <span
                      className="font-medium"
                      style={{ color: row.label === "Status" && league.isActive ? "#22c55e" : COLORS[i] }}
                    >
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
