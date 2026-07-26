"use client";

import { motion } from "framer-motion";
import { Upload, ClipboardList, Mic, Star } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Upload,
    title: "Upload Resume",
    description: "Simply upload your PDF or Word resume. Our AI extracts your skills, experience, and achievements automatically.",
    color: "#2563eb", bg: "#eff6ff", border: "#bfdbfe",
  },
  {
    number: "02",
    icon: ClipboardList,
    title: "Paste Job Description",
    description: "Copy and paste the job listing you're applying for. Our engine maps the requirements to your profile instantly.",
    color: "#7c3aed", bg: "#f5f3ff", border: "#ddd6fe",
  },
  {
    number: "03",
    icon: Mic,
    title: "Practice AI Interview",
    description: "Answer AI-generated questions tailored to your role. Practice as many times as you need at your own pace.",
    color: "#0891b2", bg: "#ecfeff", border: "#a5f3fc",
  },
  {
    number: "04",
    icon: Star,
    title: "Receive Detailed Feedback",
    description: "Get a full breakdown of your performance — tone, completeness, clarity — with a personalized improvement roadmap.",
    color: "#059669", bg: "#ecfdf5", border: "#a7f3d0",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      style={{
        padding: "100px 0",
        background: "white",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Dot grid */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "radial-gradient(circle, #e2e8f0 1px, transparent 1px)",
        backgroundSize: "28px 28px",
        opacity: 0.5,
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", position: "relative" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{ textAlign: "center", marginBottom: 64 }}
        >
          <span style={{
            display: "inline-block",
            padding: "6px 18px", borderRadius: 999,
            background: "#eff6ff", color: "#2563eb",
            fontSize: 13, fontWeight: 700, letterSpacing: "0.04em",
            marginBottom: 16,
          }}>
            Simple Process
          </span>
          <h2 style={{
            fontSize: "clamp(32px, 4vw, 52px)",
            fontWeight: 900, color: "#0f172a",
            letterSpacing: "-1.5px", lineHeight: 1.1,
            marginBottom: 16,
          }}>
            Land Offers in{" "}
            <span style={{
              background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              4 Easy Steps
            </span>
          </h2>
          <p style={{
            fontSize: 17, color: "#64748b", lineHeight: 1.7,
            maxWidth: 520, margin: "0 auto",
          }}>
            From resume upload to receiving feedback, the entire process takes less than 5 minutes to set up.
          </p>
        </motion.div>

        {/* Steps */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 24,
          position: "relative",
        }}>
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.12, duration: 0.55, ease: "easeOut" }}
              style={{
                display: "flex", flexDirection: "column", alignItems: "center",
                textAlign: "center",
                background: "white",
                borderRadius: 20, padding: "36px 24px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 4px 16px rgba(0,0,0,0.05)",
                position: "relative",
              }}
              whileHover={{ y: -4, boxShadow: "0 16px 40px rgba(0,0,0,0.1)" }}
            >
              {/* Step badge */}
              <div style={{
                position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)",
                width: 32, height: 32, borderRadius: "50%",
                background: step.color,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 13, fontWeight: 900, color: "white",
                boxShadow: `0 4px 12px ${step.color}55`,
              }}>
                {i + 1}
              </div>

              {/* Icon */}
              <div style={{
                width: 64, height: 64, borderRadius: 20,
                background: step.bg,
                border: `1.5px solid ${step.border}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: 20, marginTop: 8,
              }}>
                <step.icon size={28} color={step.color} />
              </div>

              <h3 style={{ fontSize: 17, fontWeight: 800, color: "#0f172a", marginBottom: 10, letterSpacing: "-0.3px" }}>
                {step.title}
              </h3>
              <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.65 }}>
                {step.description}
              </p>

              {/* Connector arrow */}
              {i < steps.length - 1 && (
                <div className="connector-arrow" style={{
                  position: "absolute", right: -16, top: "50%", transform: "translateY(-50%)",
                  fontSize: 20, color: "#cbd5e1", zIndex: 1,
                }}>
                  →
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .connector-arrow { display: none !important; }
        }
      `}</style>
    </section>
  );
}
