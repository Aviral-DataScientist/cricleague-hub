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
      style={{
        background: "rgba(6,14,26,0.85)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        boxShadow: "0 1px 0 rgba(245,166,35,0.15), 0 4px 20px rgba(0,0,0,0.4)",
        borderBottom: "1px solid rgba(245,166,35,0.1)",
      }}
      className="sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group" style={{ textDecoration: "none" }}>
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold"
              style={{
                background: "linear-gradient(135deg, #f5a623, #d4891e)",
                boxShadow: "0 0 16px rgba(245,166,35,0.4)",
                flexShrink: 0,
              }}
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
                  `relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "font-semibold"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`
                }
                style={({ isActive }) =>
                  isActive
                    ? {
                        background: "rgba(245,166,35,0.12)",
                        color: "#f5a623",
                        boxShadow: "inset 0 0 0 1px rgba(245,166,35,0.25)",
                      }
                    : {}
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    {isActive && (
                      <span
                        style={{
                          position: "absolute",
                          bottom: -1,
                          left: "50%",
                          transform: "translateX(-50%)",
                          width: "60%",
                          height: 2,
                          background: "linear-gradient(90deg, transparent, #f5a623, transparent)",
                          borderRadius: 2,
                        }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-300 hover:text-white p-2 rounded-lg transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            style={menuOpen ? { background: "rgba(245,166,35,0.1)", color: "#f5a623" } : {}}
          >
            <div
              style={{
                width: 20,
                height: 2,
                background: "currentColor",
                marginBottom: 5,
                borderRadius: 1,
                transition: "transform 0.2s",
                transform: menuOpen ? "rotate(45deg) translateY(7px)" : "none",
              }}
            />
            <div
              style={{
                width: 20,
                height: 2,
                background: "currentColor",
                marginBottom: 5,
                borderRadius: 1,
                opacity: menuOpen ? 0 : 1,
                transition: "opacity 0.2s",
              }}
            />
            <div
              style={{
                width: 20,
                height: 2,
                background: "currentColor",
                borderRadius: 1,
                transition: "transform 0.2s",
                transform: menuOpen ? "rotate(-45deg) translateY(-7px)" : "none",
              }}
            />
          </button>
        </div>
      </div>

      {/* Gold gradient line at bottom */}
      <div
        style={{
          height: 1,
          background: "linear-gradient(90deg, transparent, rgba(245,166,35,0.2), transparent)",
        }}
      />

      {/* Mobile Nav */}
      <div
        className="md:hidden overflow-hidden"
        style={{
          maxHeight: menuOpen ? 300 : 0,
          transition: "max-height 0.3s ease",
          background: "rgba(6,14,26,0.95)",
          backdropFilter: "blur(20px)",
          borderTop: menuOpen ? "1px solid rgba(245,166,35,0.1)" : "none",
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
                    ? "font-semibold"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                }`
              }
              style={({ isActive }) =>
                isActive
                  ? {
                      background: "rgba(245,166,35,0.12)",
                      color: "#f5a623",
                      border: "1px solid rgba(245,166,35,0.2)",
                    }
                  : {}
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>
    </header>
  );
}
