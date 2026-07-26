"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Zap, Crown } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "Free",
    description: "Perfect for your first interviews and getting familiar with AI coaching.",
    icon: Zap,
    color: "#2563eb",
    bg: "#eff6ff",
    features: [
      "5 AI mock interviews per month",
      "Resume analysis (1 resume)",
      "Basic feedback report",
      "3 question categories",
      "Email support",
    ],
    cta: "Get Started Free",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$19",
    period: "/month",
    description: "For serious job seekers who want unlimited practice and deep insights.",
    icon: Crown,
    color: "#7c3aed",
    bg: "#f5f3ff",
    features: [
      "Unlimited AI mock interviews",
      "Multi-resume analysis",
      "Detailed performance analytics",
      "All question categories",
      "Personalized improvement plans",
      "Priority AI feedback",
      "24/7 priority support",
    ],
    cta: "Start 14-Day Free Trial",
    highlighted: true,
    badge: "Most Popular",
  },
];

export default function Pricing() {
  return (
    <section
      id="pricing"
      style={{
        padding: "100px 0",
        background: "#f8fafc",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{
        position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
        width: 700, height: 300,
        background: "radial-gradient(ellipse at center, rgba(37,99,235,0.07) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 24px", position: "relative" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{ textAlign: "center", marginBottom: 56 }}
        >
          <span style={{
            display: "inline-block",
            padding: "6px 18px", borderRadius: 999,
            background: "#eff6ff", color: "#2563eb",
            fontSize: 13, fontWeight: 700, letterSpacing: "0.04em",
            marginBottom: 16,
          }}>
            Simple Pricing
          </span>
          <h2 style={{
            fontSize: "clamp(32px, 4vw, 52px)",
            fontWeight: 900, color: "#0f172a",
            letterSpacing: "-1.5px", lineHeight: 1.1,
            marginBottom: 16,
          }}>
            Invest in Your{" "}
            <span style={{
              background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Career Growth
            </span>
          </h2>
          <p style={{ fontSize: 17, color: "#64748b", lineHeight: 1.7 }}>
            Start free and upgrade when you&apos;re ready. No hidden fees, cancel anytime.
          </p>
        </motion.div>

        {/* Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.15, duration: 0.55, ease: "easeOut" }}
              whileHover={{ y: -4 }}
              style={{
                borderRadius: 24, padding: 36,
                display: "flex", flexDirection: "column",
                position: "relative",
                background: plan.highlighted
                  ? "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)"
                  : "white",
                border: plan.highlighted ? "none" : "1px solid #e2e8f0",
                boxShadow: plan.highlighted
                  ? "0 24px 60px rgba(37,99,235,0.35)"
                  : "0 4px 16px rgba(0,0,0,0.06)",
              }}
            >
              {plan.badge && (
                <div style={{
                  position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)",
                  padding: "5px 18px", borderRadius: 999,
                  background: "white", color: "#7c3aed",
                  fontSize: 12, fontWeight: 800,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
                  border: "1px solid #ddd6fe",
                  whiteSpace: "nowrap",
                }}>
                  ⭐ {plan.badge}
                </div>
              )}

              {/* Icon */}
              <div style={{
                width: 48, height: 48, borderRadius: 14,
                background: plan.highlighted ? "rgba(255,255,255,0.2)" : plan.bg,
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: 20,
              }}>
                <plan.icon size={22} color={plan.highlighted ? "white" : plan.color} />
              </div>

              <h3 style={{ fontSize: 20, fontWeight: 800, color: plan.highlighted ? "white" : "#0f172a", marginBottom: 6 }}>
                {plan.name}
              </h3>
              <p style={{ fontSize: 14, color: plan.highlighted ? "rgba(255,255,255,0.7)" : "#64748b", lineHeight: 1.6, marginBottom: 24 }}>
                {plan.description}
              </p>

              {/* Price */}
              <div style={{ display: "flex", alignItems: "flex-end", gap: 4, marginBottom: 28 }}>
                <span style={{ fontSize: 52, fontWeight: 900, lineHeight: 1, color: plan.highlighted ? "white" : "#0f172a", letterSpacing: "-2px" }}>
                  {plan.price}
                </span>
                {plan.period && (
                  <span style={{ fontSize: 16, color: plan.highlighted ? "rgba(255,255,255,0.6)" : "#94a3b8", paddingBottom: 6 }}>
                    {plan.period}
                  </span>
                )}
              </div>

              {/* Features */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12, flex: 1, marginBottom: 28 }}>
                {plan.features.map((f) => (
                  <div key={f} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <CheckCircle2 size={17} color={plan.highlighted ? "rgba(255,255,255,0.8)" : "#10b981"} style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: 14, color: plan.highlighted ? "rgba(255,255,255,0.85)" : "#374151" }}>{f}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <a
                href="#"
                style={{
                  display: "block", textAlign: "center",
                  padding: "14px", borderRadius: 14,
                  fontWeight: 700, fontSize: 14,
                  textDecoration: "none",
                  transition: "all 0.2s",
                  background: plan.highlighted ? "white" : "#2563eb",
                  color: plan.highlighted ? "#2563eb" : "white",
                  boxShadow: plan.highlighted ? "0 4px 16px rgba(0,0,0,0.12)" : "0 4px 14px rgba(37,99,235,0.35)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget).style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget).style.transform = "translateY(0)";
                }}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          style={{
            textAlign: "center", marginTop: 28,
            fontSize: 14, color: "#94a3b8",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          }}
        >
          <CheckCircle2 size={16} color="#10b981" />
          30-day money-back guarantee on all paid plans
        </motion.p>
      </div>
    </section>
  );
}
