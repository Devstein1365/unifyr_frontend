import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiMenu, FiX, FiUser, FiLogOut } from "react-icons/fi";
import Button from "./ui/Button";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAdmin } = useAuth();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/#services" },
    { name: "Features", href: "/#features" },
    { name: "Demo", href: "/demo" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A192F]/95 backdrop-blur-md border-b border-white/10">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#FFD60A] rounded-lg flex items-center justify-center">
              <span className="text-[#0A192F] font-bold text-xl">U</span>
            </div>
            <span className="text-2xl font-bold text-white">Unifyr</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive =
                location.pathname === link.href ||
                (link.href.startsWith("/#") && location.pathname === "/");
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`font-medium transition-colors ${
                    isActive
                      ? "text-[#FFD60A]"
                      : "text-white/80 hover:text-[#FFD60A]"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            {/* Auth Buttons */}
            {user ? (
              <div className="flex items-center gap-3">
                <Link to={isAdmin() ? "/admin" : "/dashboard"}>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <FiUser size={16} />
                    {user.name}
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    logout();
                    navigate("/auth");
                  }}
                  className="flex items-center gap-2"
                >
                  <FiLogOut size={16} />
                  Logout
                </Button>
              </div>
            ) : (
              <Link to="/auth">
                <Button variant="primary" size="sm">
                  Get Started
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white text-2xl"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            {navLinks.map((link) => {
              const isActive =
                location.pathname === link.href ||
                (link.href.startsWith("/#") && location.pathname === "/");
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`block font-medium py-2 transition-colors ${
                    isActive
                      ? "text-[#FFD60A]"
                      : "text-white/80 hover:text-[#FFD60A]"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              );
            })}

            {/* Mobile Auth Buttons */}
            {user ? (
              <div className="space-y-3 pt-2 border-t border-white/10">
                <Link to={isAdmin() ? "/admin" : "/dashboard"}>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="w-full flex items-center justify-center gap-2"
                  >
                    <FiUser size={16} />
                    {user.name}
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full flex items-center justify-center gap-2"
                  onClick={() => {
                    logout();
                    navigate("/auth");
                    setIsMenuOpen(false);
                  }}
                >
                  <FiLogOut size={16} />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="pt-2 border-t border-white/10">
                <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="primary" size="sm" className="w-full">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
