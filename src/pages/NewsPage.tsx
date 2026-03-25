import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { leagues } from "../data/leagues";
import { fetchRealNews, type RealArticle } from "../lib/api";
import { ExternalLink, Search } from "lucide-react";

const categoryColors: Record<string, string> = {
  news: "#00D9FF",
  analysis: "#A78BFA",
  interview: "#34d399",
  preview: "#f5a623",
  review: "#f472b6",
};

function ArticleCard({ article, url }: { article: RealArticle; url?: string }) {
  const color = categoryColors[article.category] ?? "#00D9FF";
  const inner = (
    <div className="glass-card" style={{ padding: 0, overflow: "hidden", height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Gradient placeholder */}
      <div
        style={{
          height: 160,
          background: `linear-gradient(135deg, ${color}15 0%, rgba(167,139,250,0.1) 100%)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          fontSize: 48,
          color: "rgba(255,255,255,0.1)",
        }}
      >
        🏏
        <div style={{ position: "absolute", top: 10, left: 10 }}>
          <span
            style={{
              background: `${color}20`,
              color,
              border: `1px solid ${color}50`,
              padding: "3px 10px",
              borderRadius: 20,
              fontSize: 11,
              fontWeight: 700,
              fontFamily: "'Inter', sans-serif",
              textTransform: "capitalize",
            }}
          >
            {article.category}
          </span>
        </div>
        <div style={{ position: "absolute", top: 10, right: 10 }}>
          <span className="badge-teal">{article.leagueTag}</span>
        </div>
      </div>

      <div style={{ padding: 16, flex: 1, display: "flex", flexDirection: "column" }}>
        <h3 style={{ color: "#FFFFFF", fontSize: 14, fontWeight: 600, lineHeight: 1.4, marginBottom: 8 }}>{article.title}</h3>
        <p style={{ color: "#C8C9D4", fontSize: 13, lineHeight: 1.5, flex: 1, marginBottom: 12 }}>{article.excerpt}</p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 10, borderTop: "1px solid var(--border-subtle)" }}>
          <div>
            <div style={{ fontSize: 12, color: "#FFFFFF", fontWeight: 500 }}>{article.author}</div>
            <div style={{ fontSize: 11, color: "#6B7280", marginTop: 2 }}>
              {new Date(article.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })} · {article.readTime} min
            </div>
          </div>
          <span style={{ display: "flex", alignItems: "center", gap: 4, color: "#00D9FF", fontSize: 12, fontWeight: 600, fontFamily: "'Inter', sans-serif" }}>
            Read <ExternalLink size={12} />
          </span>
        </div>
      </div>
    </div>
  );

  if (url) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "block", height: "100%" }}>
        {inner}
      </a>
    );
  }
  return (
    <Link to={`/leagues/${article.leagueId}`} style={{ textDecoration: "none", display: "block", height: "100%" }}>
      {inner}
    </Link>
  );
}

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLeague, setSelectedLeague] = useState("all");
  const [search, setSearch] = useState("");
  const [realArticles, setRealArticles] = useState<RealArticle[] | null>(null);
  const [articleUrls, setArticleUrls] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setIsLoading(true);
      const data = await fetchRealNews();
      if (mounted && data && data.length > 0) {
        const urls: Record<string, string> = {};
        data.forEach((a) => { if (a.url) urls[a.id] = a.url; });
        setRealArticles(data);
        setArticleUrls(urls);
        setIsLive(true);
      }
      if (mounted) setIsLoading(false);
    })();
    return () => { mounted = false; };
  }, []);

  const displayArticles = realArticles ?? [];
  const allCategories = ["news"];

  const filtered = displayArticles.filter((a) => {
    const matchCat = selectedCategory === "all" || a.category === selectedCategory;
    const matchLeague = selectedLeague === "all" || a.leagueId === selectedLeague;
    const matchSearch =
      search === "" ||
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.author.toLowerCase().includes(search.toLowerCase()) ||
      a.leagueTag.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchLeague && matchSearch;
  });

  const featured = displayArticles.find((a) => a.featured) ?? displayArticles[0];
  const featuredUrl = featured ? articleUrls[featured.id] : undefined;

  return (
    <div style={{ backgroundColor: "var(--bg-primary)", minHeight: "100vh" }}>
      {/* Page Header */}
      <div style={{ padding: "56px 24px 40px", borderBottom: "1px solid var(--border-subtle)" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <p style={{ color: "#00D9FF", fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", fontFamily: "'Inter', sans-serif", marginBottom: 8 }}>
            LATEST FROM THE CREASE
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
            <h1 style={{ color: "#FFFFFF", margin: 0 }}>News & Analysis</h1>
            {isLive && (
              <span className="badge-teal">● Live from ESPN Cricinfo</span>
            )}
            {isLoading && (
              <span style={{ color: "#6B7280", fontSize: 13 }}>Fetching live news…</span>
            )}
          </div>
          <p style={{ color: "#C8C9D4", fontSize: 16 }}>
            {isLive ? "Real-time coverage fetched from ESPN Cricinfo." : "In-depth coverage, expert analysis, and breaking news from every major T20 league."}
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "32px 24px" }}>
        {/* Featured Article */}
        {featured && (
          <div
            className="glass-card"
            style={{ padding: 0, overflow: "hidden", marginBottom: 32, position: "relative" }}
          >
            <div
              style={{
                background: "linear-gradient(135deg, rgba(0,217,255,0.08) 0%, rgba(167,139,250,0.06) 100%)",
                padding: "40px 40px",
                position: "relative",
              }}
            >
              {/* Large cricket icon bg */}
              <div
                style={{
                  position: "absolute",
                  right: 40,
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: 120,
                  opacity: 0.06,
                  display: "none",
                }}
                className="lg:block"
              >
                🏏
              </div>

              <div style={{ marginBottom: 16 }}>
                <span className="badge-red">⚡ Featured</span>
              </div>
              <span
                style={{
                  background: "rgba(0,217,255,0.1)",
                  color: "#00D9FF",
                  border: "1px solid rgba(0,217,255,0.25)",
                  padding: "3px 10px",
                  borderRadius: 6,
                  fontSize: 11,
                  fontWeight: 700,
                  fontFamily: "'Inter', sans-serif",
                  textTransform: "capitalize",
                  display: "inline-block",
                  marginBottom: 16,
                }}
              >
                {featured.leagueTag} · {featured.category}
              </span>
              <h2 style={{ color: "#FFFFFF", fontSize: "clamp(20px, 3vw, 32px)", marginBottom: 12, maxWidth: 700, lineHeight: 1.3 }}>
                {featured.title}
              </h2>
              <p style={{ color: "#C8C9D4", fontSize: 15, lineHeight: 1.6, maxWidth: 600, marginBottom: 24 }}>
                {featured.excerpt}
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF" }}>{featured.author}</div>
                  <div style={{ fontSize: 12, color: "#6B7280", marginTop: 2 }}>
                    {new Date(featured.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })} · {featured.readTime} min read
                    {isLive && <span style={{ color: "#22c55e", marginLeft: 8 }}>· ESPN Cricinfo</span>}
                  </div>
                </div>
                {featuredUrl ? (
                  <a
                    href={featuredUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                    style={{ fontSize: 13 }}
                  >
                    Read Full Article →
                  </a>
                ) : (
                  <Link
                    to={`/leagues/${featured.leagueId}`}
                    className="btn-primary"
                    style={{ fontSize: 13 }}
                  >
                    Read Full Article →
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="glass-card" style={{ padding: 20, marginBottom: 24 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 16 }}>
            {/* Search */}
            <div style={{ position: "relative", flex: "1 1 200px", minWidth: 180 }}>
              <Search size={14} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#6B7280" }} />
              <input
                type="text"
                placeholder="Search articles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  width: "100%",
                  paddingLeft: 34,
                  paddingRight: 12,
                  paddingTop: 9,
                  paddingBottom: 9,
                  borderRadius: 8,
                  border: "1px solid var(--border-subtle)",
                  background: "rgba(255,255,255,0.03)",
                  color: "#FFFFFF",
                  fontSize: 13,
                  fontFamily: "'Lato', sans-serif",
                  outline: "none",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(0,217,255,0.4)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border-subtle)")}
              />
            </div>

            {/* League filter */}
            <select
              value={selectedLeague}
              onChange={(e) => setSelectedLeague(e.target.value)}
              style={{
                padding: "9px 14px",
                borderRadius: 8,
                border: "1px solid var(--border-subtle)",
                background: "rgba(255,255,255,0.03)",
                color: "#C8C9D4",
                fontSize: 13,
                fontFamily: "'Lato', sans-serif",
                cursor: "pointer",
                outline: "none",
              }}
            >
              <option value="all">All Leagues</option>
              {leagues.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.flag} {l.shortName}
                </option>
              ))}
            </select>
          </div>

          {/* Category pills */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            <button
              onClick={() => setSelectedCategory("all")}
              style={{
                padding: "6px 14px",
                borderRadius: 20,
                border: selectedCategory === "all" ? "1px solid rgba(0,217,255,0.5)" : "1px solid var(--border-subtle)",
                background: selectedCategory === "all" ? "rgba(0,217,255,0.15)" : "transparent",
                color: selectedCategory === "all" ? "#00D9FF" : "#C8C9D4",
                fontSize: 13,
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              All
            </button>
            {allCategories.map((cat) => {
              const c = categoryColors[cat] ?? "#00D9FF";
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: "6px 14px",
                    borderRadius: 20,
                    border: selectedCategory === cat ? `1px solid ${c}50` : "1px solid var(--border-subtle)",
                    background: selectedCategory === cat ? `${c}20` : "transparent",
                    color: selectedCategory === cat ? c : "#C8C9D4",
                    fontSize: 13,
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 500,
                    cursor: "pointer",
                    textTransform: "capitalize",
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Article count */}
        <p style={{ color: "#6B7280", fontSize: 13, marginBottom: 20 }}>
          Showing <span style={{ color: "#FFFFFF", fontWeight: 600 }}>{filtered.length}</span> articles
          {isLive && <span style={{ color: "#22c55e", marginLeft: 8 }}>· Live data from ESPN Cricinfo</span>}
        </p>

        {/* Articles grid */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <p style={{ fontSize: 48, marginBottom: 16 }}>📰</p>
            <p style={{ color: "#C8C9D4", fontSize: 16 }}>No articles match your filters.</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
            {filtered.map((article) => (
              <ArticleCard key={article.id} article={article} url={articleUrls[article.id]} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
