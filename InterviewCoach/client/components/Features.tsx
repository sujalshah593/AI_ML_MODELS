"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { Variants } from "framer-motion";
import { FileSearch, Briefcase, Mic2, MessageSquareText, BarChart3, Lightbulb } from "lucide-react";

const features = [
  {
    icon: FileSearch,
    title: "Resume Analysis",
    description: "Our AI deeply analyzes your resume to identify strengths, gaps, and standout skills that align with your target role.",
    color: "#2563eb", bg: "#eff6ff", border: "#bfdbfe",
  },
  {
    icon: Briefcase,
    title: "Job Description Matching",
    description: "Paste any job description and get a tailored question set that mirrors exactly what recruiters will ask.",
    color: "#7c3aed", bg: "#f5f3ff", border: "#ddd6fe",
  },
  {
    icon: Mic2,
    title: "AI Mock Interviews",
    description: "Simulate real interview scenarios with adaptive AI that adjusts question difficulty based on your responses.",
    color: "#0891b2", bg: "#ecfeff", border: "#a5f3fc",
  },
  {
    icon: MessageSquareText,
    title: "Instant AI Feedback",
    description: "Receive detailed, actionable feedback on every answer within seconds — no waiting, no vague suggestions.",
    color: "#059669", bg: "#ecfdf5", border: "#a7f3d0",
  },
  {
    icon: BarChart3,
    title: "Performance Tracking",
    description: "Track your progress across sessions with visual dashboards, score trends, and comparative analytics.",
    color: "#d97706", bg: "#fffbeb", border: "#fde68a",
  },
  {
    icon: Lightbulb,
    title: "Personalized Tips",
    description: "Get AI-generated improvement plans specific to your weak areas, with curated resources and practice prompts.",
    color: "#dc2626", bg: "#fef2f2", border: "#fecaca",
  },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" },
  }),
};

export default function Features() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="features"
      style={{
        padding: "100px 0",
        background: "#f8fafc",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorations */}
      <div style={{
        position: "absolute", top: -100, right: -100,
        width: 400, height: 400,
        background: "radial-gradient(circle, rgba(37,99,235,0.07) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: -100, left: -100,
        width: 400, height: 400,
        background: "radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", position: "relative" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{ textAlign: "center", marginBottom: 60 }}
        >
          <span style={{
            display: "inline-block",
            padding: "6px 18px", borderRadius: 999,
            background: "#eff6ff", color: "#2563eb",
            fontSize: 13, fontWeight: 700, letterSpacing: "0.04em",
            marginBottom: 16,
          }}>
            Everything You Need
          </span>
          <h2 style={{
            fontSize: "clamp(32px, 4vw, 52px)",
            fontWeight: 900, color: "#0f172a",
            letterSpacing: "-1.5px", lineHeight: 1.1,
            marginBottom: 16,
          }}>
            Built to Get You{" "}
            <span style={{
              background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Hired Faster
            </span>
          </h2>
          <p style={{
            fontSize: 17, color: "#64748b", lineHeight: 1.7,
            maxWidth: 560, margin: "0 auto",
          }}>
            From resume parsing to post-interview analysis, InterviewCoach equips you with every tool to turn preparation into offers.
          </p>
        </motion.div>

        {/* Grid */}
        <div
          ref={ref}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: 20,
          }}
        >
          {features.map((feat, i) => (
            <motion.div
              key={feat.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              style={{
                background: "white",
                borderRadius: 20,
                padding: 28,
                border: "1px solid #e2e8f0",
                boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.boxShadow = "0 16px 48px rgba(0,0,0,0.1)";
                el.style.borderColor = "transparent";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)";
                el.style.borderColor = "#e2e8f0";
              }}
            >
              {/* Icon */}
              <div style={{
                width: 52, height: 52, borderRadius: 16,
                background: feat.bg,
                border: `1.5px solid ${feat.border}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: 20,
              }}>
                <feat.icon size={24} color={feat.color} />
              </div>

              <h3 style={{ fontSize: 17, fontWeight: 800, color: "#0f172a", marginBottom: 10, letterSpacing: "-0.3px" }}>
                {feat.title}
              </h3>
              <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.65 }}>
                {feat.description}
              </p>

              <p style={{ fontSize: 13, fontWeight: 700, color: feat.color, marginTop: 16 }}>
                Learn more →
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
