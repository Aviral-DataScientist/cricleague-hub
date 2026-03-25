import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#040a14",
        borderTop: "1px solid rgba(245,166,35,0.08)",
      }}
      className="mt-auto"
    >
      {/* Decorative gold gradient line at top */}
      <div
        style={{
          height: 1,
          background: "linear-gradient(90deg, transparent, rgba(245,166,35,0.5), transparent)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-xl"
                style={{
                  background: "linear-gradient(135deg, #f5a623, #d4891e)",
                  boxShadow: "0 0 16px rgba(245,166,35,0.3)",
                }}
              >
                🏏
              </div>
              <span className="text-xl font-bold">
                <span style={{ color: "#f5a623" }}>CricLeague</span>
                <span className="text-white"> Hub</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Your one-stop destination for all major T20 cricket leagues worldwide.
              Richer data, better design, more cricket.
            </p>
            <p
              className="text-xs"
              style={{ color: "rgba(245,166,35,0.5)" }}
            >
              Data sourced from cricsheet.org
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3
              className="font-semibold mb-5 text-sm uppercase tracking-wider"
              style={{ color: "#f5a623" }}
            >
              Quick Links
            </h3>
            <div className="flex flex-col gap-3">
              {[
                { to: "/", label: "Home" },
                { to: "/leagues", label: "All Leagues" },
                { to: "/compare", label: "Compare Leagues" },
                { to: "/news", label: "News & Articles" },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-gray-400 hover:text-white text-sm transition-colors flex items-center gap-2 group"
                  style={{ textDecoration: "none" }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      width: 4,
                      height: 4,
                      borderRadius: "50%",
                      background: "rgba(245,166,35,0.4)",
                      transition: "background 0.2s",
                    }}
                    className="group-hover:bg-yellow-400"
                  />
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Leagues */}
          <div>
            <h3
              className="font-semibold mb-5 text-sm uppercase tracking-wider"
              style={{ color: "#f5a623" }}
            >
              Featured Leagues
            </h3>
            <div className="flex flex-col gap-3">
              {[
                { id: "ipl", name: "IPL", flag: "🇮🇳" },
                { id: "bbl", name: "BBL", flag: "🇦🇺" },
                { id: "psl", name: "PSL", flag: "🇵🇰" },
                { id: "hundred", name: "The Hundred", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
                { id: "t20blast", name: "T20 Blast", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
              ].map((league) => (
                <Link
                  key={league.id}
                  to={`/leagues/${league.id}`}
                  className="text-gray-400 hover:text-white text-sm transition-colors flex items-center gap-2"
                  style={{ textDecoration: "none" }}
                >
                  <span>{league.flag}</span>
                  <span>{league.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div
          className="mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p className="text-gray-500 text-sm">
            © 2025 CricLeague Hub. Built for cricket lovers, by cricket lovers.
          </p>
          <p className="text-xs" style={{ color: "rgba(245,166,35,0.4)" }}>
            Real data from cricsheet.org & ESPN Cricinfo
          </p>
        </div>
      </div>
    </footer>
  );
}
