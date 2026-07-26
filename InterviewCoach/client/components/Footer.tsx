"use client";

import { Brain } from "lucide-react";

const quickLinks = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "X (Twitter)",
    href: "https://x.com",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ background: "white", borderTop: "1px solid #e2e8f0", paddingTop: 80, paddingBottom: 40 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", 
          gap: 60, 
          marginBottom: 60 
        }}>
          
          {/* Brand */}
          <div>
            <a href="#" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", marginBottom: 20 }}>
              <div style={{
                width: 38, height: 38, borderRadius: 12,
                background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Brain size={20} color="white" />
              </div>
              <span style={{ fontWeight: 800, fontSize: 20, color: "#0f172a", letterSpacing: "-0.5px" }}>
                Interview<span style={{ color: "#2563eb" }}>Coach</span>
              </span>
            </a>
            <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.7, marginBottom: 24, maxWidth: 300 }}>
              AI-powered interview coaching that helps you practice smarter, build
              confidence, and land your dream job faster.
            </p>
            {/* Socials */}
            <div style={{ display: "flex", gap: 12 }}>
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: 40, height: 40, borderRadius: 12,
                    border: "1px solid #e2e8f0",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#64748b", transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#2563eb";
                    e.currentTarget.style.borderColor = "#bfdbfe";
                    e.currentTarget.style.background = "#eff6ff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#64748b";
                    e.currentTarget.style.borderColor = "#e2e8f0";
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: "#0f172a", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 20 }}>
              Quick Links
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 16 }}>
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    style={{ fontSize: 14, color: "#64748b", textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={(e) => e.currentTarget.style.color = "#2563eb"}
                    onMouseLeave={(e) => e.currentTarget.style.color = "#64748b"}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: "#0f172a", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 20 }}>
              Stay Updated
            </h3>
            <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.6, marginBottom: 20 }}>
              Get interview tips, AI feature updates, and career resources — no spam.
            </p>
            <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", gap: 8 }}>
              <input
                type="email"
                placeholder="you@example.com"
                style={{
                  flex: 1, padding: "12px 16px", borderRadius: 12,
                  border: "1px solid #e2e8f0", background: "#f8fafc",
                  fontSize: 14, color: "#0f172a", outline: "none",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#2563eb";
                  e.currentTarget.style.boxShadow = "0 0 0 2px rgba(37,99,235,0.1)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "#e2e8f0";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
              <button
                type="submit"
                style={{
                  padding: "12px 20px", borderRadius: 12,
                  background: "#2563eb", color: "white",
                  fontSize: 14, fontWeight: 600, border: "none", cursor: "pointer",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = "#1d4ed8"}
                onMouseLeave={(e) => e.currentTarget.style.background = "#2563eb"}
              >
                Subscribe
              </button>
            </form>
          </div>

        </div>

        {/* Bottom */}
        <div style={{
          paddingTop: 32, borderTop: "1px solid #e2e8f0",
          display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 20,
          alignItems: "center",
        }}>
          <p style={{ fontSize: 13, color: "#94a3b8" }}>
            © {currentYear} InterviewCoach. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: 24 }}>
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((text) => (
              <a
                key={text}
                href="#"
                style={{ fontSize: 13, color: "#94a3b8", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={(e) => e.currentTarget.style.color = "#64748b"}
                onMouseLeave={(e) => e.currentTarget.style.color = "#94a3b8"}
              >
                {text}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
