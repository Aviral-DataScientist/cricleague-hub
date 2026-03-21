import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/leagues", label: "Leagues" },
    { to: "/compare", label: "Compare" },
    { to: "/news", label: "News" },
  ];

  return (
    <header
      style={{ backgroundColor: "#081020", borderBottom: "1px solid rgba(245,166,35,0.2)" }}
      className="sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold"
              style={{ background: "linear-gradient(135deg, #f5a623, #d4891e)" }}
            >
              🏏
            </div>
            <div>
              <span className="text-xl font-bold" style={{ color: "#f5a623" }}>
                CricLeague
              </span>
              <span className="text-xl font-bold text-white"> Hub</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "text-white font-semibold"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`
                }
                style={({ isActive }) =>
                  isActive
                    ? {
                        background: "rgba(245,166,35,0.15)",
                        color: "#f5a623",
                        borderBottom: "2px solid #f5a623",
                      }
                    : {}
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-300 hover:text-white p-2 rounded-lg"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-5 h-0.5 bg-current mb-1" />
            <div className="w-5 h-0.5 bg-current mb-1" />
            <div className="w-5 h-0.5 bg-current" />
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div
          className="md:hidden border-t"
          style={{
            backgroundColor: "#081020",
            borderColor: "rgba(245,166,35,0.1)",
          }}
        >
          <div className="px-4 py-3 flex flex-col gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "text-white"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`
                }
                style={({ isActive }) =>
                  isActive
                    ? { background: "rgba(245,166,35,0.15)", color: "#f5a623" }
                    : {}
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
