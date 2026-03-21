import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#060e1a",
        borderTop: "1px solid rgba(245,166,35,0.15)",
      }}
      className="mt-auto"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-xl"
                style={{ background: "linear-gradient(135deg, #f5a623, #d4891e)" }}
              >
                🏏
              </div>
              <span className="text-xl font-bold">
                <span style={{ color: "#f5a623" }}>CricLeague</span>
                <span className="text-white"> Hub</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your one-stop destination for all major T20 cricket leagues worldwide.
              Richer data, better design, more cricket.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4" style={{ color: "#f5a623" }}>
              Quick Links
            </h3>
            <div className="flex flex-col gap-2">
              {[
                { to: "/", label: "Home" },
                { to: "/leagues", label: "All Leagues" },
                { to: "/compare", label: "Compare Leagues" },
                { to: "/news", label: "News & Articles" },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                  style={{ textDecoration: "none" }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Leagues */}
          <div>
            <h3 className="font-semibold mb-4" style={{ color: "#f5a623" }}>
              Featured Leagues
            </h3>
            <div className="flex flex-col gap-2">
              {[
                { id: "ipl", name: "IPL 🇮🇳" },
                { id: "bbl", name: "BBL 🇦🇺" },
                { id: "psl", name: "PSL 🇵🇰" },
                { id: "sa20", name: "SA20 🇿🇦" },
                { id: "hundred", name: "The Hundred 🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
              ].map((league) => (
                <Link
                  key={league.id}
                  to={`/leagues/${league.id}`}
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                  style={{ textDecoration: "none" }}
                >
                  {league.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div
          className="mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          <p className="text-gray-500 text-sm">
            © 2025 CricLeague Hub. Built for cricket lovers, by cricket lovers.
          </p>
          <p className="text-gray-600 text-xs">
            Prototype — Data is illustrative & not live
          </p>
        </div>
      </div>
    </footer>
  );
}
