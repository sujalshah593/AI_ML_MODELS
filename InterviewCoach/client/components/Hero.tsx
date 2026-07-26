"use client";

import { motion } from "framer-motion";
import {
  CheckCircle2, FileText, Zap, TrendingUp,
  MessageSquare, Code2, Users, Play, ArrowRight,
} from "lucide-react";

const S = {
  section: {
    position: "relative" as const,
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    paddingTop: 64,
    overflow: "hidden",
    background: "#ffffff",
  },
  bg: {
    position: "absolute" as const,
    inset: 0,
    backgroundImage: "radial-gradient(circle, #e2e8f0 1px, transparent 1px)",
    backgroundSize: "28px 28px",
    opacity: 0.6,
    pointerEvents: "none" as const,
  },
  blob1: {
    position: "absolute" as const,
    top: "-20%",
    right: "-10%",
    width: 600,
    height: 600,
    background: "radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%)",
    pointerEvents: "none" as const,
  },
  blob2: {
    position: "absolute" as const,
    bottom: "-20%",
    left: "-10%",
    width: 500,
    height: 500,
    background: "radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)",
    pointerEvents: "none" as const,
  },
  container: {
    position: "relative" as const,
    maxWidth: 1200,
    margin: "0 auto",
    padding: "80px 24px",
    width: "100%",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 64,
    alignItems: "center",
  },
};

const dashboardItems = [
  { icon: FileText, label: "Resume Uploaded", value: "software_engineer_resume.pdf", color: "#10b981", bg: "#ecfdf5", check: true },
  { icon: Zap, label: "AI Interview Ready", value: "18 questions generated", color: "#2563eb", bg: "#eff6ff", check: true },
  { icon: TrendingUp, label: "Performance Score", value: "92%", badge: "Excellent", color: "#7c3aed", bg: "#f5f3ff", check: false },
];

const qtypes = [
  { icon: Code2, label: "Technical", count: 8, color: "#2563eb", bg: "#eff6ff" },
  { icon: Users, label: "HR", count: 5, color: "#10b981", bg: "#ecfdf5" },
  { icon: MessageSquare, label: "Behavioral", count: 5, color: "#f59e0b", bg: "#fffbeb" },
];

export default function Hero() {
  return (
    <section style={S.section}>
      <div style={S.bg} />
      <div style={S.blob1} />
      <div style={S.blob2} />

      <div style={S.container}>
        {/* ── Left Column ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 16px",
              borderRadius: 999,
              border: "1px solid rgba(37,99,235,0.25)",
              background: "#eff6ff",
              fontSize: 13,
              fontWeight: 600,
              color: "#2563eb",
              width: "fit-content",
            }}
          >
            <span style={{
              width: 7, height: 7, borderRadius: "50%",
              background: "#2563eb",
              display: "inline-block",
              animation: "pulse 2s infinite",
            }} />
            AI-Powered Interview Coaching
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
            style={{
              fontSize: "clamp(40px, 5vw, 68px)",
              fontWeight: 900,
              lineHeight: 1.06,
              letterSpacing: "-2px",
              color: "#0f172a",
            }}
          >
            Practice Smarter.{" "}
            <span style={{
              background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Ace Every
            </span>{" "}
            Interview.
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
            style={{
              fontSize: 18,
              lineHeight: 1.7,
              color: "#64748b",
              maxWidth: 500,
            }}
          >
            Upload your resume, paste a job description, and let AI generate
            personalized interview questions with instant feedback and
            performance analysis.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
            style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}
          >
            <a
              href="#"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "14px 28px",
                fontSize: 15,
                fontWeight: 700,
                color: "white",
                background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                borderRadius: 16,
                textDecoration: "none",
                boxShadow: "0 8px 28px rgba(37,99,235,0.35)",
                transition: "all 0.25s",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.transform = "translateY(-2px)";
                el.style.boxShadow = "0 12px 36px rgba(37,99,235,0.45)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "0 8px 28px rgba(37,99,235,0.35)";
              }}
            >
              Get Started Free <ArrowRight size={17} />
            </a>
            <a
              href="#"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "14px 24px",
                fontSize: 15,
                fontWeight: 600,
                color: "#0f172a",
                background: "white",
                border: "1.5px solid #e2e8f0",
                borderRadius: 16,
                textDecoration: "none",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                transition: "all 0.25s",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = "rgba(37,99,235,0.35)";
                el.style.boxShadow = "0 4px 16px rgba(0,0,0,0.1)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = "#e2e8f0";
                el.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)";
              }}
            >
              <span style={{
                width: 32, height: 32, borderRadius: "50%",
                background: "#eff6ff",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <Play size={12} color="#2563eb" style={{ marginLeft: 2 }} />
              </span>
              Watch Demo
            </a>
          </motion.div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            style={{ display: "flex", alignItems: "center", gap: 14 }}
          >
            <div style={{ display: "flex" }}>
              {["#2563eb", "#7c3aed", "#10b981", "#f59e0b"].map((color, i) => (
                <div
                  key={i}
                  style={{
                    width: 32, height: 32, borderRadius: "50%",
                    border: "2.5px solid white",
                    background: color,
                    marginLeft: i === 0 ? 0 : -10,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 11, fontWeight: 800, color: "white",
                  }}
                >
                  {["A", "B", "C", "D"][i]}
                </div>
              ))}
            </div>
            <p style={{ fontSize: 14, color: "#64748b" }}>
              <strong style={{ color: "#0f172a", fontWeight: 700 }}>2,400+</strong> professionals landed their dream job
            </p>
          </motion.div>
        </div>

        {/* ── Right Column: Dashboard Card ── */}
        <motion.div
          initial={{ opacity: 0, x: 50, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          style={{ position: "relative" }}
        >
          {/* Glow behind */}
          <div style={{
            position: "absolute",
            inset: -24,
            background: "linear-gradient(135deg, rgba(37,99,235,0.15) 0%, rgba(124,58,237,0.12) 100%)",
            borderRadius: 32,
            filter: "blur(32px)",
            zIndex: 0,
          }} />

          {/* Main Card */}
          <div style={{
            position: "relative",
            zIndex: 1,
            background: "rgba(255,255,255,0.92)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            borderRadius: 28,
            padding: 24,
            border: "1px solid rgba(226,232,240,0.8)",
            boxShadow: "0 24px 64px rgba(0,0,0,0.12), 0 0 0 1px rgba(255,255,255,0.5)",
          }}>
            {/* Header */}
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
              <div>
                <p style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>
                  Interview Dashboard
                </p>
                <p style={{ fontSize: 15, fontWeight: 700, color: "#0f172a" }}>Software Engineer – Google</p>
              </div>
              <span style={{
                padding: "4px 12px", borderRadius: 999,
                background: "#ecfdf5", color: "#10b981",
                fontSize: 12, fontWeight: 700,
              }}>● Live</span>
            </div>

            {/* Stats */}
            {dashboardItems.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.12, duration: 0.5 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "12px 14px",
                  background: "white",
                  borderRadius: 16,
                  border: "1px solid #e2e8f0",
                  marginBottom: 10,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                }}
              >
                <div style={{
                  width: 38, height: 38, borderRadius: 12,
                  background: item.bg,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <item.icon size={18} color={item.color} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 11, color: "#94a3b8", marginBottom: 2 }}>{item.label}</p>
                  <p style={{ fontSize: 14, fontWeight: 700, color: "#0f172a", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {item.value}
                  </p>
                </div>
                {item.badge ? (
                  <span style={{ padding: "3px 10px", borderRadius: 999, background: item.color, color: "white", fontSize: 11, fontWeight: 800, flexShrink: 0 }}>
                    {item.badge}
                  </span>
                ) : (
                  <CheckCircle2 size={18} color="#10b981" style={{ flexShrink: 0 }} />
                )}
              </motion.div>
            ))}

            {/* Question Breakdown */}
            <p style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", letterSpacing: "0.08em", textTransform: "uppercase", margin: "16px 0 10px" }}>
              Question Breakdown
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 16 }}>
              {qtypes.map((qt, i) => (
                <motion.div
                  key={qt.label}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + i * 0.08, duration: 0.4 }}
                  style={{
                    display: "flex", flexDirection: "column", alignItems: "center",
                    gap: 6, padding: "12px 8px", borderRadius: 14,
                    background: qt.bg,
                    border: "1px solid rgba(0,0,0,0.06)",
                  }}
                >
                  <qt.icon size={16} color={qt.color} />
                  <span style={{ fontSize: 20, fontWeight: 900, color: qt.color }}>{qt.count}</span>
                  <span style={{ fontSize: 10, fontWeight: 600, color: "#94a3b8" }}>{qt.label}</span>
                </motion.div>
              ))}
            </div>

            {/* Progress */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 12, color: "#94a3b8" }}>Session Progress</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#2563eb" }}>6 / 18 answered</span>
              </div>
              <div style={{ height: 8, background: "#e2e8f0", borderRadius: 999, overflow: "hidden" }}>
                <motion.div
                  style={{
                    height: "100%",
                    background: "linear-gradient(90deg, #2563eb, #7c3aed)",
                    borderRadius: 999,
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: "33%" }}
                  transition={{ delay: 1.1, duration: 1, ease: "easeOut" }}
                />
              </div>
            </div>
          </div>

          {/* Floating chips */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.4, type: "spring" }}
            style={{
              position: "absolute", top: -18, right: -18, zIndex: 2,
              background: "white", borderRadius: 14, padding: "10px 14px",
              boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
              border: "1px solid #e2e8f0",
              display: "flex", alignItems: "center", gap: 8,
            }}
          >
            <span style={{ fontSize: 20 }}>🎯</span>
            <div>
              <p style={{ fontSize: 10, color: "#94a3b8", lineHeight: 1 }}>AI Accuracy</p>
              <p style={{ fontSize: 14, fontWeight: 800, color: "#0f172a" }}>98.5%</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.3, duration: 0.4, type: "spring" }}
            style={{
              position: "absolute", bottom: -18, left: -18, zIndex: 2,
              background: "white", borderRadius: 14, padding: "10px 14px",
              boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
              border: "1px solid #e2e8f0",
              display: "flex", alignItems: "center", gap: 8,
            }}
          >
            <span style={{ fontSize: 20 }}>⚡</span>
            <div>
              <p style={{ fontSize: 10, color: "#94a3b8", lineHeight: 1 }}>Instant Feedback</p>
              <p style={{ fontSize: 14, fontWeight: 800, color: "#0f172a" }}>&lt; 2 seconds</p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
