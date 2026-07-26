"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Menu, X } from "lucide-react";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: "all 0.3s ease",
        background: scrolled ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.0)",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid #e2e8f0" : "1px solid transparent",
        boxShadow: scrolled ? "0 1px 24px rgba(0,0,0,0.06)" : "none",
      }}
    >
      <nav
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <a href="#" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 12,
              background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 12px rgba(37,99,235,0.35)",
            }}
          >
            <Brain size={20} color="white" />
          </div>
          <span style={{ fontWeight: 800, fontSize: 20, color: "#0f172a", letterSpacing: "-0.5px" }}>
            Interview<span style={{ color: "#2563eb" }}>Coach</span>
          </span>
        </a>

        {/* Desktop nav */}
        <div style={{ display: "flex", alignItems: "center", gap: 4 }} className="hidden-mobile">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{
                padding: "8px 16px",
                fontSize: 14,
                fontWeight: 500,
                color: "#64748b",
                borderRadius: 10,
                textDecoration: "none",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.color = "#0f172a";
                (e.target as HTMLElement).style.background = "#f8fafc";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.color = "#64748b";
                (e.target as HTMLElement).style.background = "transparent";
              }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTAs */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }} className="hidden-mobile">
          <a
            href="#"
            style={{
              padding: "8px 18px",
              fontSize: 14,
              fontWeight: 600,
              color: "#0f172a",
              border: "1.5px solid #e2e8f0",
              borderRadius: 12,
              textDecoration: "none",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.borderColor = "#2563eb";
              (e.target as HTMLElement).style.color = "#2563eb";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.borderColor = "#e2e8f0";
              (e.target as HTMLElement).style.color = "#0f172a";
            }}
          >
            Log in
          </a>
          <a
            href="#"
            style={{
              padding: "8px 18px",
              fontSize: 14,
              fontWeight: 700,
              color: "white",
              background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
              borderRadius: 12,
              textDecoration: "none",
              boxShadow: "0 4px 14px rgba(37,99,235,0.35)",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.transform = "translateY(-1px)";
              (e.target as HTMLElement).style.boxShadow = "0 6px 20px rgba(37,99,235,0.45)";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.transform = "translateY(0)";
              (e.target as HTMLElement).style.boxShadow = "0 4px 14px rgba(37,99,235,0.35)";
            }}
          >
            Get Started →
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            display: "none",
            padding: 8,
            borderRadius: 10,
            background: "transparent",
            border: "none",
            cursor: "pointer",
            color: "#64748b",
          }}
          className="show-mobile"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{
              background: "rgba(255,255,255,0.97)",
              backdropFilter: "blur(16px)",
              borderBottom: "1px solid #e2e8f0",
              padding: "12px 24px 20px",
            }}
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: "block",
                  padding: "12px 16px",
                  fontSize: 15,
                  fontWeight: 500,
                  color: "#64748b",
                  textDecoration: "none",
                  borderRadius: 10,
                }}
              >
                {link.label}
              </a>
            ))}
            <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
              <a
                href="#"
                style={{
                  flex: 1,
                  textAlign: "center",
                  padding: "10px",
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#0f172a",
                  border: "1.5px solid #e2e8f0",
                  borderRadius: 12,
                  textDecoration: "none",
                }}
              >
                Log in
              </a>
              <a
                href="#"
                style={{
                  flex: 1,
                  textAlign: "center",
                  padding: "10px",
                  fontSize: 14,
                  fontWeight: 700,
                  color: "white",
                  background: "#2563eb",
                  borderRadius: 12,
                  textDecoration: "none",
                }}
              >
                Get Started
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
