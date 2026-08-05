"use client"

import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"

interface StatsCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  description?: string
  trend?: number
}

export function StatsCard({ title, value, icon: Icon, description, trend }: StatsCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="glass overflow-hidden relative">
        <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-primary/10 blur-2xl pointer-events-none" />
        <CardContent className="p-6 flex flex-col justify-between h-full relative z-10">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium text-muted-foreground">
              {title}
            </h3>
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Icon className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-bold">{value}</div>
            {description && (
              <p className="text-xs text-muted-foreground mt-1 font-medium">
                {trend !== undefined && (
                  <span className={trend > 0 ? "text-emerald-500" : trend < 0 ? "text-red-500" : "text-muted-foreground"}>
                    {trend > 0 ? "+" : ""}{trend}%{" "}
                  </span>
                )}
                {description}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
