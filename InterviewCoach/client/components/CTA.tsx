"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";

const perks = [
  "No credit card required",
  "Cancel anytime",
  "14-day free trial",
];

export default function CTA() {
  return (
    <section
      id="contact"
      style={{
        padding: "120px 0",
        background: "white",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{
        position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
        width: 800, height: 400,
        background: "radial-gradient(ellipse at top, rgba(37,99,235,0.08) 0%, transparent 60%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 24px", position: "relative" }}>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          style={{
            background: "white",
            borderRadius: 32,
            border: "1px solid #e2e8f0",
            boxShadow: "0 24px 64px rgba(0,0,0,0.06)",
            padding: "64px 40px",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Top border glow */}
          <div style={{
            position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
            width: 320, height: 2,
            background: "linear-gradient(90deg, transparent, #2563eb, transparent)",
          }} />

          {/* Icon Badge */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              width: 64, height: 64, borderRadius: 20,
              background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
              boxShadow: "0 12px 24px rgba(37,99,235,0.25)",
              marginBottom: 32,
            }}
          >
            <Sparkles size={32} color="white" />
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
            style={{
              fontSize: "clamp(32px, 4vw, 52px)",
              fontWeight: 900, color: "#0f172a",
              letterSpacing: "-1px", lineHeight: 1.1,
              marginBottom: 20,
            }}
          >
            Ready to Land Your{" "}
            <span style={{
              background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Dream Job?
            </span>
          </motion.h2>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
            style={{
              fontSize: 18, color: "#64748b", lineHeight: 1.7,
              maxWidth: 600, margin: "0 auto 40px",
            }}
          >
            Join over <strong style={{ color: "#0f172a" }}>2,400+ professionals</strong> who
            transformed their interview performance with AI-powered coaching. Start
            practicing today — for free.
          </motion.p>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
            style={{
              display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center",
              marginBottom: 32,
            }}
          >
            <a
              href="#"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "16px 32px", fontSize: 16, fontWeight: 700,
                color: "white", background: "#2563eb",
                borderRadius: 16, textDecoration: "none",
                boxShadow: "0 8px 24px rgba(37,99,235,0.3)",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 12px 32px rgba(37,99,235,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(37,99,235,0.3)";
              }}
            >
              Get Started for Free <ArrowRight size={18} />
            </a>
            <a
              href="#features"
              style={{
                display: "inline-flex", alignItems: "center",
                padding: "16px 32px", fontSize: 16, fontWeight: 600,
                color: "#64748b", background: "white", border: "1.5px solid #e2e8f0",
                borderRadius: 16, textDecoration: "none",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#0f172a";
                e.currentTarget.style.borderColor = "#cbd5e1";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#64748b";
                e.currentTarget.style.borderColor = "#e2e8f0";
              }}
            >
              Explore Features
            </a>
          </motion.div>

          {/* Perks */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.5 }}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              gap: 24, flexWrap: "wrap",
            }}
          >
            {perks.map((perk) => (
              <div key={perk} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: "#64748b" }}>
                <CheckCircle2 size={16} color="#10b981" />
                <span>{perk}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
