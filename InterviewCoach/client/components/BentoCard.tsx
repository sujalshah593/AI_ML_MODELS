"use client"

import { ReactNode } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface BentoCardProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function BentoCard({ children, className, delay = 0 }: BentoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, type: "spring", stiffness: 100 }}
      className={cn("bento-card group flex flex-col p-6", className)}
    >
      {/* Subtle spotlight effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-black/5 via-transparent to-transparent pointer-events-none" />
      {children}
    </motion.div>
  )
}
