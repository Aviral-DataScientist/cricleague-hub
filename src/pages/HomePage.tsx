import { Link } from "react-router-dom";
import { leagues } from "../data/leagues";
import newsData from "../data/real/news.json";
import type { RealArticle } from "../lib/api";

const statBar = [
  { label: "T20 Leagues", value: "11", icon: "🏆" },
  { label: "Countries", value: "10+", icon: "🌍" },
  { label: "Teams", value: "90+", icon: "👕" },
  { label: "Players", value: "1000+", icon: "🏏" },
  { label: "Seasons Tracked", value: "100+", icon: "📅" },
];

export default function HomePage() {
  const featuredArticles = (newsData as unknown as RealArticle[]).slice(0, 3);

  return (
    <div>
      {/* ─── Hero ─── */}
      <section
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #060e1a 0%, #0a1e42 40%, #112b5c 70%, #060e1a 100%)",
          minHeight: "90vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* Floating orbs */}
        <div
          className="orb"
          style={{
            width: 500,
            height: 500,
            top: "-100px",
            left: "-100px",
            background: "radial-gradient(circle, rgba(26,86,160,0.3) 0%, transparent 70%)",
          }}
        />
        <div
          className="orb"
          style={{
            width: 350,
            height: 350,
            top: "-50px",
            right: "5%",
            background: "radial-gradient(circle, rgba(245,166,35,0.15) 0%, transparent 70%)",
          }}
        />
        <div
          className="orb"
          style={{
            width: 250,
            height: 250,
            bottom: "5%",
            left: "40%",
            background: "radial-gradient(circle, rgba(17,43,92,0.4) 0%, transparent 70%)",
          }}
        />

        {/* Cricket ball SVG decoration */}
        <div
          className="absolute right-0 top-0 w-1/2 h-full opacity-5"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Ccircle cx='100' cy='100' r='90' fill='none' stroke='%23f5a623' stroke-width='3'/%3E%3Cpath d='M 10 100 Q 100 10 190 100 Q 100 190 10 100' fill='none' stroke='%23f5a623' stroke-width='2'/%3E%3C/svg%3E\")",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right -50px center",
            backgroundSize: "600px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl animate-fade-in">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
              style={{
                background: "rgba(245,166,35,0.12)",
                border: "1px solid rgba(245,166,35,0.3)",
                color: "#f5a623",
                backdropFilter: "blur(8px)",
              }}
            >
              <span>⚡</span> All 11 Major T20 Leagues. One Hub.
            </div>

            <h1
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight"
              style={{ color: "#ffffff", letterSpacing: "-1px" }}
            >
              Your Ultimate{" "}
              <span className="gradient-text glow-text">
                T20 Cricket
              </span>{" "}
              Universe
            </h1>

            <p className="text-lg sm:text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl">
              From the blazing pitches of the IPL to the sun-soaked Caribbean Premier League —
              explore every major franchise T20 competition in one beautifully designed hub.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/leagues"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-base transition-all duration-200 hover:-translate-y-1"
                style={{
                  background: "linear-gradient(135deg, #f5a623, #d4891e)",
                  color: "#060e1a",
                  boxShadow: "0 8px 30px rgba(245,166,35,0.4), 0 0 0 0 rgba(245,166,35,0)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 12px 40px rgba(245,166,35,0.55), 0 0 30px rgba(245,166,35,0.2)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 8px 30px rgba(245,166,35,0.4)";
                }}
              >
                Explore Leagues <span>→</span>
              </Link>
              <Link
                to="/compare"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-base transition-all duration-200 hover:-translate-y-1 glass-card"
                style={{
                  color: "#f5a623",
                  backdropFilter: "blur(12px)",
                }}
              >
                Compare Leagues ⚖️
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-24"
          style={{ background: "linear-gradient(to bottom, transparent, #060e1a)" }}
        />
      </section>

      {/* ─── Stats Bar ─── */}
      <section style={{ backgroundColor: "#060e1a" }} className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {statBar.map((stat, i) => (
              <div
                key={i}
                className="glass-card flex flex-col items-center py-6 px-4 text-center"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <span className="text-3xl mb-2">{stat.icon}</span>
                <span
                  className="text-3xl font-extrabold shimmer"
                  style={{ color: "#f5a623" }}
                >
                  {stat.value}
                </span>
                <span className="text-xs text-gray-400 mt-1">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section divider */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="section-divider" />
      </div>

      {/* ─── Featured Leagues ─── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "#060e1a" }}>
        <div className="max-w-7xl mx-auto">
          {/* Section title with decorative lines */}
          <div className="flex items-center gap-4 mb-3">
            <div className="flex-1 section-divider" />
            <p className="text-xs font-semibold tracking-widest" style={{ color: "#f5a623" }}>
              AROUND THE WORLD
            </p>
            <div className="flex-1 section-divider" />
          </div>
          <div className="flex items-end justify-between mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              All Major T20 Leagues
            </h2>
            <Link
              to="/leagues"
              className="hidden sm:inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-white"
              style={{ color: "#f5a623" }}
            >
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {leagues.map((league) => (
              <Link
                key={league.id}
                to={`/leagues/${league.id}`}
                className="block rounded-2xl overflow-hidden card-hover glass-card relative"
                style={{
                  textDecoration: "none",
                  borderLeft: `3px solid ${league.color}`,
                }}
              >
                {/* League flag in top-right */}
                <div
                  className="absolute top-3 right-3 text-2xl"
                  style={{ lineHeight: 1 }}
                >
                  {league.flag}
                </div>

                {/* Card top color banner */}
                <div
                  className="h-1.5"
                  style={{ background: `linear-gradient(90deg, ${league.color}, ${league.accentColor})` }}
                />
                <div className="p-5 pr-12">
                  <div className="mb-3">
                    <span
                      className="text-xs font-semibold px-2.5 py-1 rounded-full"
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
                      {league.isActive ? "● ACTIVE" : "OFF SEASON"}
                    </span>
                  </div>

                  <h3 className="text-white font-bold text-base mb-1 leading-snug">
                    {league.name}
                  </h3>
                  <p className="text-xs text-gray-400 mb-4">
                    {league.country} · {league.format} · Since {league.founded}
                  </p>

                  <div
                    className="grid grid-cols-3 gap-2 pt-3"
                    style={{ borderTop: "1px solid rgba(245,166,35,0.1)" }}
                  >
                    <div className="text-center">
                      <div className="text-base font-bold text-white">{league.teams}</div>
                      <div className="text-xs text-gray-500">Teams</div>
                    </div>
                    <div className="text-center">
                      <div className="text-base font-bold" style={{ color: "#f5a623" }}>
                        {league.numberOfSeasons}
                      </div>
                      <div className="text-xs text-gray-500">Seasons</div>
                    </div>
                    <div className="text-center">
                      <div className="text-base font-bold text-white">
                        {league.playerQualityRating}
                      </div>
                      <div className="text-xs text-gray-500">Rating</div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Section divider */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="section-divider" />
      </div>

      {/* ─── Latest News ─── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "#060e1a" }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-3">
            <div className="flex-1 section-divider" />
            <p className="text-xs font-semibold tracking-widest" style={{ color: "#f5a623" }}>
              LATEST
            </p>
            <div className="flex-1 section-divider" />
          </div>
          <div className="flex items-end justify-between mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Featured Stories
            </h2>
            <Link
              to="/news"
              className="hidden sm:inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-white"
              style={{ color: "#f5a623" }}
            >
              All Articles →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredArticles.map((article) => (
              <div
                key={article.id}
                className="rounded-2xl overflow-hidden card-hover glass-card"
              >
                {/* Category strip */}
                <div
                  className="px-5 pt-5 pb-3"
                  style={{ borderBottom: "1px solid rgba(245,166,35,0.08)" }}
                >
                  <span
                    className="text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md"
                    style={{
                      backgroundColor: "rgba(245,166,35,0.15)",
                      color: "#f5a623",
                      border: "1px solid rgba(245,166,35,0.2)",
                    }}
                  >
                    {article.leagueTag}
                  </span>
                  <span className="ml-2 text-xs text-gray-500 capitalize">
                    {article.category}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-white font-bold text-base leading-snug mb-3">
                    {article.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500">
                      By {article.author} · {article.readTime} min read
                    </div>
                    <Link
                      to="/news"
                      className="text-xs font-medium transition-colors hover:opacity-80"
                      style={{ color: "#f5a623" }}
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Section ─── */}
      <section
        className="py-20 px-4 text-center relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #060e1a, #0a1e42, #060e1a)",
        }}
      >
        <div
          className="orb"
          style={{
            width: 400,
            height: 400,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "radial-gradient(circle, rgba(245,166,35,0.08) 0%, transparent 70%)",
          }}
        />
        <div className="relative max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Compare Your Favourite{" "}
            <span className="gradient-text">Leagues</span>
          </h2>
          <p className="text-gray-300 mb-8">
            Side-by-side comparisons of prize money, viewership, player quality and more.
          </p>
          <Link
            to="/compare"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all duration-200 hover:-translate-y-1"
            style={{
              background: "linear-gradient(135deg, #f5a623, #d4891e)",
              color: "#060e1a",
              boxShadow: "0 8px 30px rgba(245,166,35,0.35)",
            }}
          >
            Start Comparing ⚖️
          </Link>
        </div>
      </section>
    </div>
  );
}
