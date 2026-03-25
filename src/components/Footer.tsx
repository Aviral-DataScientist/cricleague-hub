import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#0a0c0d",
        borderTop: "1px solid rgba(0,217,255,0.1)",
        marginTop: "auto",
      }}
    >
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "48px 24px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 40 }}>
          {/* Logo + tagline */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <span style={{ fontSize: 22 }}>🏏</span>
              <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: 18 }}>
                <span style={{ color: "#00D9FF" }}>CricLeague</span>
                <span style={{ color: "#FFFFFF" }}>Hub</span>
              </span>
            </div>
            <p style={{ color: "#C8C9D4", fontSize: 14, lineHeight: 1.6 }}>
              The ultimate destination for T20 cricket league stats, news, and comparisons.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: 1, textTransform: "uppercase", color: "#00D9FF", marginBottom: 16 }}>
              Quick Links
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { to: "/", label: "Home" },
                { to: "/leagues", label: "All Leagues" },
                { to: "/compare", label: "Compare Leagues" },
                { to: "/news", label: "News & Articles" },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  style={{ color: "#C8C9D4", textDecoration: "none", fontSize: 14, transition: "color 200ms" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#00D9FF")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#C8C9D4")}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Attribution */}
          <div>
            <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: 1, textTransform: "uppercase", color: "#00D9FF", marginBottom: 16 }}>
              Data Sources
            </h3>
            <p style={{ color: "#C8C9D4", fontSize: 14, lineHeight: 1.8 }}>
              Stats: cricsheet.org<br />
              News: ESPN Cricinfo
            </p>
          </div>
        </div>

        <div
          style={{
            marginTop: 40,
            paddingTop: 20,
            borderTop: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          <p style={{ color: "#6B7280", fontSize: 13 }}>
            © 2025 CricLeague Hub. Built for cricket lovers.
          </p>
          <p style={{ color: "rgba(0,217,255,0.4)", fontSize: 12 }}>
            Stats: cricsheet.org | News: ESPN Cricinfo
          </p>
        </div>
      </div>
    </footer>
  );
}
