import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Home, Trophy, BarChart2, Newspaper, Menu, X } from "lucide-react";

const navLinks = [
  { to: "/", label: "Home", icon: Home },
  { to: "/leagues", label: "Leagues", icon: Trophy },
  { to: "/compare", label: "Compare", icon: BarChart2 },
  { to: "/news", label: "News", icon: Newspaper },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      style={{
        background: "rgba(15,17,18,0.85)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        boxShadow: "0 1px 0 rgba(0,217,255,0.1), 0 4px 20px rgba(0,0,0,0.5)",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          {/* Logo */}
          <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 24 }}>🏏</span>
            <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: 18 }}>
              <span style={{ color: "#00D9FF" }}>CricLeague</span>
              <span style={{ color: "#FFFFFF" }}>Hub</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav style={{ display: "flex", alignItems: "center", gap: 4 }} className="hidden md:flex">
            {navLinks.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/"}
                style={({ isActive }) => ({
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "8px 16px",
                  borderRadius: 8,
                  textDecoration: "none",
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 500,
                  fontSize: 14,
                  transition: "all 200ms ease",
                  color: isActive ? "#00D9FF" : "#C8C9D4",
                  background: isActive ? "rgba(0,217,255,0.08)" : "transparent",
                  borderBottom: isActive ? "2px solid #00D9FF" : "2px solid transparent",
                })}
              >
                <Icon size={15} />
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#C8C9D4",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 8,
              borderRadius: 8,
            }}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <div
        className="md:hidden"
        style={{
          maxHeight: menuOpen ? 300 : 0,
          overflow: "hidden",
          transition: "max-height 0.3s ease",
          background: "rgba(15,17,18,0.97)",
          backdropFilter: "blur(20px)",
          borderTop: menuOpen ? "1px solid rgba(255,255,255,0.06)" : "none",
        }}
      >
        <div style={{ padding: "12px 24px", display: "flex", flexDirection: "column", gap: 4 }}>
          {navLinks.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              onClick={() => setMenuOpen(false)}
              style={({ isActive }) => ({
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 16px",
                borderRadius: 8,
                textDecoration: "none",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: 14,
                color: isActive ? "#00D9FF" : "#C8C9D4",
                background: isActive ? "rgba(0,217,255,0.08)" : "transparent",
                borderLeft: isActive ? "2px solid #00D9FF" : "2px solid transparent",
              })}
            >
              <Icon size={15} />
              {label}
            </NavLink>
          ))}
        </div>
      </div>
    </header>
  );
}
