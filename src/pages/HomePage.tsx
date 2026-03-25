import { Link } from "react-router-dom";
import { leagues } from "../data/leagues";
import newsData from "../data/real/news.json";
import type { RealArticle } from "../lib/api";
import { Trophy, Globe, Users, Activity, Calendar, Newspaper } from "lucide-react";

const statCards = [
  { icon: Trophy, value: "11", label: "Leagues" },
  { icon: Globe, value: "4000+", label: "Matches" },
  { icon: Users, value: "10+", label: "Countries" },
  { icon: Activity, value: "1000+", label: "Players" },
  { icon: Calendar, value: "2025", label: "Season" },
];

export default function HomePage() {
  const articles = newsData as unknown as RealArticle[];
  const featuredArticle = articles[0];
  const sideArticles = articles.slice(1, 3);
  const scrollArticles = articles.slice(3, 9);
  const featuredLeagues = leagues.slice(0, 6);

  return (
    <div style={{ backgroundColor: "var(--bg-primary)", minHeight: "100vh" }}>
      {/* ── Hero ── */}
      <section
        style={{
          minHeight: "85vh",
          display: "flex",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
          backgroundColor: "#0F1112",
        }}
      >
        {/* Glow orbs */}
        <div
          style={{
            position: "absolute",
            width: 600,
            height: 600,
            top: -100,
            left: -100,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0,217,255,0.06) 0%, transparent 70%)",
            filter: "blur(40px)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 500,
            height: 500,
            top: -80,
            right: "5%",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(167,139,250,0.05) 0%, transparent 70%)",
            filter: "blur(40px)",
            pointerEvents: "none",
          }}
        />

        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "80px 24px", position: "relative", width: "100%" }}>
          <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }} className="fade-in">
            {/* Badge */}
            <span className="badge-teal" style={{ display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 24 }}>
              🏏 11 Leagues • Real Data • Updated 2025
            </span>

            <h1
              className="teal-gradient-heading"
              style={{ fontSize: "clamp(40px, 7vw, 72px)", marginBottom: 20, lineHeight: 1.15 }}
            >
              The Ultimate{"\n"}T20 Cricket Hub
            </h1>

            <p style={{ color: "#C8C9D4", fontSize: 18, fontFamily: "'Lato', sans-serif", marginBottom: 36, maxWidth: 600, margin: "0 auto 36px" }}>
              From the blazing pitches of the IPL to the sun-soaked Caribbean Premier League — explore every major franchise T20 competition in one beautifully designed hub.
            </p>

            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 48 }}>
              <Link to="/leagues" className="btn-primary">
                Explore Leagues →
              </Link>
              <Link to="/compare" className="btn-secondary">
                Compare Leagues
              </Link>
            </div>

            {/* Stat pills */}
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              {["11 Leagues", "4000+ Matches", "10+ Countries", "2025 Data"].map((pill) => (
                <div
                  key={pill}
                  className="glass-card"
                  style={{ padding: "8px 20px", fontSize: 13, fontFamily: "'Inter', sans-serif", fontWeight: 600, color: "#C8C9D4" }}
                >
                  {pill}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section style={{ backgroundColor: "var(--bg-primary)", padding: "48px 24px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
            {statCards.map(({ icon: Icon, value, label }, i) => (
              <div
                key={label}
                className="glass-card fade-in"
                style={{ padding: "20px 24px", display: "flex", flexDirection: "column", alignItems: "center", minWidth: 140, flex: "1 1 140px", maxWidth: 200, animationDelay: `${i * 0.08}s` }}
              >
                <Icon size={22} color="#00D9FF" style={{ marginBottom: 10 }} />
                <div style={{ fontSize: 28, fontWeight: 700, fontFamily: "'Inter', sans-serif", color: "#FFFFFF", lineHeight: 1 }}>
                  {value}
                </div>
                <div style={{ color: "#C8C9D4", fontSize: 13, marginTop: 6 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Latest News ── */}
      <section style={{ padding: "48px 24px", backgroundColor: "var(--bg-primary)" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <h2 className="section-title">
            <Newspaper size={20} color="#00D9FF" />
            Latest Cricket News
          </h2>

          {/* Bento grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr",
              gridTemplateRows: "auto auto",
              gap: 16,
              marginBottom: 16,
            }}
            className="news-bento"
          >
            {/* Featured large article */}
            {featuredArticle && (
              <div
                className="glass-card"
                style={{ gridRow: "1 / 3", padding: 0, overflow: "hidden" }}
              >
                <div
                  style={{
                    height: 200,
                    background: "linear-gradient(135deg, #00D9FF22 0%, #A78BFA22 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 64,
                  }}
                >
                  🏏
                </div>
                <div style={{ padding: 24 }}>
                  <span className="badge-red" style={{ marginBottom: 12, display: "inline-block" }}>LATEST</span>
                  <h2 style={{ fontSize: 22, marginBottom: 12, color: "#FFFFFF" }}>{featuredArticle.title}</h2>
                  <p style={{ color: "#C8C9D4", fontSize: 14, lineHeight: 1.6, marginBottom: 16 }}>{featuredArticle.excerpt}</p>
                  <div style={{ color: "#6B7280", fontSize: 12 }}>
                    {featuredArticle.author} · {new Date(featuredArticle.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </div>
                </div>
              </div>
            )}

            {/* Two smaller articles */}
            {sideArticles.map((article) => (
              <div key={article.id} className="glass-card" style={{ padding: 20 }}>
                <span className="badge-violet" style={{ marginBottom: 10, display: "inline-block" }}>{article.leagueTag}</span>
                <h3 style={{ fontSize: 15, color: "#FFFFFF", marginBottom: 8, fontWeight: 600 }}>{article.title}</h3>
                <p style={{ color: "#C8C9D4", fontSize: 13, lineHeight: 1.5, marginBottom: 10 }}>{article.excerpt}</p>
                <div style={{ color: "#6B7280", fontSize: 12 }}>
                  {new Date(article.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </div>
              </div>
            ))}
          </div>

          {/* Horizontal scroll row */}
          <div style={{ display: "flex", gap: 16, overflowX: "auto", paddingBottom: 8 }}>
            {scrollArticles.map((article) => (
              <div
                key={article.id}
                className="glass-card"
                style={{ padding: 16, minWidth: 240, flexShrink: 0 }}
              >
                <span className="badge-teal" style={{ marginBottom: 8, display: "inline-block" }}>{article.leagueTag}</span>
                <h3 style={{ fontSize: 13, color: "#FFFFFF", fontWeight: 600, lineHeight: 1.4, marginBottom: 6 }}>{article.title}</h3>
                <div style={{ color: "#6B7280", fontSize: 11 }}>
                  {new Date(article.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Leagues ── */}
      <section style={{ padding: "48px 24px", backgroundColor: "var(--bg-primary)" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <h2 className="section-title">
            <Trophy size={20} color="#00D9FF" />
            Featured Leagues
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16, marginBottom: 24 }}>
            {featuredLeagues.map((league) => (
              <Link
                key={league.id}
                to={`/leagues/${league.id}`}
                style={{ textDecoration: "none" }}
              >
                <div
                  className="glass-card"
                  style={{
                    padding: 20,
                    borderLeft: `4px solid ${league.color}`,
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                  }}
                >
                  <span style={{ fontSize: 40, lineHeight: 1 }}>{league.flag}</span>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: 16, color: "#FFFFFF", marginBottom: 4 }}>{league.name}</h3>
                    <div style={{ color: "#C8C9D4", fontSize: 13, marginBottom: 8 }}>{league.country}</div>
                    {league.isActive
                      ? <span className="badge-teal">ACTIVE</span>
                      : <span style={{ background: "rgba(255,255,255,0.06)", color: "#9CA3AF", padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700, fontFamily: "'Inter',sans-serif", textTransform: "uppercase" as const }}>OFF SEASON</span>
                    }
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <Link to="/leagues" style={{ color: "#00D9FF", textDecoration: "none", fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 14 }}>
            View All Leagues →
          </Link>
        </div>
      </section>
    </div>
  );
}
