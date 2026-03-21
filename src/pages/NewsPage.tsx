import { useState } from "react";
import { Link } from "react-router-dom";
import { articles, categories, type Article } from "../data/articles";
import { leagues } from "../data/leagues";

const categoryColors: Record<string, string> = {
  news: "#60a5fa",
  analysis: "#a78bfa",
  interview: "#34d399",
  preview: "#f5a623",
  review: "#f472b6",
};

function ArticleCard({ article }: { article: Article }) {
  return (
    <div
      className="rounded-2xl overflow-hidden card-hover flex flex-col"
      style={{
        backgroundColor: "#112240",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Image placeholder */}
      <div
        className="h-40 flex items-center justify-center relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, #0a1628, #1a3a6b)`,
        }}
      >
        <span className="text-6xl opacity-30">🏏</span>
        <div
          className="absolute top-3 left-3 text-xs font-semibold px-3 py-1.5 rounded-full capitalize"
          style={{
            backgroundColor: `${categoryColors[article.category]}20`,
            color: categoryColors[article.category],
            border: `1px solid ${categoryColors[article.category]}40`,
          }}
        >
          {article.category}
        </div>
        <div
          className="absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-md"
          style={{
            backgroundColor: "rgba(245,166,35,0.15)",
            color: "#f5a623",
          }}
        >
          {article.leagueTag}
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-white font-bold text-base leading-snug mb-2">
          {article.title}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-1">
          {article.excerpt}
        </p>

        <div
          className="flex items-center justify-between pt-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div>
            <div className="text-xs font-medium text-white">{article.author}</div>
            <div className="text-xs text-gray-500 mt-0.5">
              {new Date(article.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}{" "}
              · {article.readTime} min read
            </div>
          </div>
          <Link
            to={`/leagues/${article.leagueId}`}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg transition-all hover:opacity-80"
            style={{
              background: "linear-gradient(135deg, #f5a623, #d4891e)",
              color: "#0a1628",
              textDecoration: "none",
            }}
          >
            Read →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLeague, setSelectedLeague] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = articles.filter((a) => {
    const matchCat = selectedCategory === "all" || a.category === selectedCategory;
    const matchLeague = selectedLeague === "all" || a.leagueId === selectedLeague;
    const matchSearch =
      search === "" ||
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.author.toLowerCase().includes(search.toLowerCase()) ||
      a.leagueTag.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchLeague && matchSearch;
  });

  const featured = articles.filter((a) => a.featured).slice(0, 1)[0];

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
            LATEST FROM THE CREASE
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-3">
            News & Analysis
          </h1>
          <p className="text-gray-400 text-lg">
            In-depth coverage, expert analysis, and breaking news from every major T20 league.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Featured Article */}
        {featured && (
          <div
            className="rounded-2xl overflow-hidden mb-10 relative"
            style={{
              background: "linear-gradient(135deg, #1a3a6b 0%, #112240 100%)",
              border: "1px solid rgba(245,166,35,0.2)",
            }}
          >
            <div className="absolute top-5 left-5">
              <span
                className="text-xs font-semibold px-3 py-1.5 rounded-full"
                style={{
                  background: "linear-gradient(135deg, #f5a623, #d4891e)",
                  color: "#0a1628",
                }}
              >
                ⚡ Featured
              </span>
            </div>
            <div className="p-8 pt-16 md:pt-10 md:pl-80 relative">
              {/* Large flag bg decoration */}
              <div
                className="absolute left-8 top-1/2 -translate-y-1/2 text-9xl opacity-20 hidden md:block"
              >
                🏏
              </div>
              <span
                className="text-xs font-semibold px-2.5 py-1 rounded-md capitalize mb-3 inline-block"
                style={{ backgroundColor: "rgba(245,166,35,0.15)", color: "#f5a623" }}
              >
                {featured.leagueTag} · {featured.category}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 leading-snug">
                {featured.title}
              </h2>
              <p className="text-gray-300 leading-relaxed mb-5 max-w-2xl">
                {featured.excerpt}
              </p>
              <div className="flex items-center gap-4">
                <div>
                  <div className="text-sm font-medium text-white">{featured.author}</div>
                  <div className="text-xs text-gray-400">
                    {new Date(featured.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                    · {featured.readTime} min read
                  </div>
                </div>
                <Link
                  to={`/leagues/${featured.leagueId}`}
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:-translate-y-0.5"
                  style={{
                    background: "linear-gradient(135deg, #f5a623, #d4891e)",
                    color: "#0a1628",
                    textDecoration: "none",
                  }}
                >
                  Read Full Article →
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div
          className="p-5 rounded-2xl mb-8"
          style={{
            backgroundColor: "#112240",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
              <input
                type="text"
                placeholder="Search articles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none"
                style={{
                  backgroundColor: "#0a1628",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              />
            </div>

            {/* League filter */}
            <select
              value={selectedLeague}
              onChange={(e) => setSelectedLeague(e.target.value)}
              className="px-4 py-3 rounded-xl text-sm text-white focus:outline-none cursor-pointer"
              style={{
                backgroundColor: "#0a1628",
                border: "1px solid rgba(255,255,255,0.1)",
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
          <div className="flex flex-wrap gap-2 mt-4">
            <button
              onClick={() => setSelectedCategory("all")}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
              style={
                selectedCategory === "all"
                  ? { background: "linear-gradient(135deg, #f5a623, #d4891e)", color: "#0a1628" }
                  : { backgroundColor: "#0a1628", border: "1px solid rgba(255,255,255,0.08)", color: "#9ca3af" }
              }
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className="px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all"
                style={
                  selectedCategory === cat
                    ? {
                        background: `${categoryColors[cat]}20`,
                        border: `1px solid ${categoryColors[cat]}50`,
                        color: categoryColors[cat],
                      }
                    : { backgroundColor: "#0a1628", border: "1px solid rgba(255,255,255,0.08)", color: "#9ca3af" }
                }
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Article count */}
        <p className="text-gray-400 text-sm mb-6">
          Showing <span className="text-white font-semibold">{filtered.length}</span> articles
        </p>

        {/* Articles grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">📰</p>
            <p className="text-gray-400 text-lg">No articles match your filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
