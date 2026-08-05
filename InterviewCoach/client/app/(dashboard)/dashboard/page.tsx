"use client"

import { useQuery } from "@tanstack/react-query"
import { dataService } from "@/services/api"
import { BentoCard } from "@/components/BentoCard"
import { Target, CheckCircle2, PlayCircle, Trophy, TrendingUp, TrendingDown, ArrowUpRight } from "lucide-react"
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts"

export default function DashboardPage() {
  const { data: stats, isLoading, isError } = useQuery({
    queryKey: ['dashboard'],
    queryFn: dataService.getDashboard,
    retry: false
  })

  const mockStats = {
    totalInterviews: 12,
    completedInterviews: 10,
    ongoingInterviews: 2,
    averageScore: 78,
    highestScore: 92,
    lowestScore: 65,
    recentScores: [
      { date: "Mon", score: 65 },
      { date: "Tue", score: 72 },
      { date: "Wed", score: 68 },
      { date: "Thu", score: 85 },
      { date: "Fri", score: 82 },
      { date: "Sat", score: 92 },
      { date: "Sun", score: 78 },
    ]
  }

  const currentStats = stats || mockStats

  return (
    <div className="space-y-8 pt-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tighter mb-2">Overview</h1>
          <p className="text-muted-foreground text-lg">Your interview performance at a glance.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 auto-rows-[160px]">
        {/* Main large chart bento */}
        <BentoCard className="md:col-span-4 lg:col-span-4 row-span-2" delay={0.1}>
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="font-semibold text-lg">Performance Trend</h3>
              <p className="text-sm text-muted-foreground">Scores over the last 7 days</p>
            </div>
            <div className="flex items-center gap-1 text-sm font-medium bg-black/5 px-2 py-1 rounded-md">
              <TrendingUp className="h-4 w-4" /> +12%
            </div>
          </div>
          <div className="flex-1 w-full min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={currentStats.recentScores} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--foreground)" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="var(--foreground)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
                  dy={10}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--card)', 
                    borderRadius: '8px',
                    border: '1px solid var(--border)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
                  }}
                  itemStyle={{ color: 'var(--foreground)', fontWeight: 'bold' }}
                  cursor={{ stroke: 'var(--border)', strokeWidth: 1, strokeDasharray: '4 4' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="score" 
                  stroke="var(--foreground)" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorScore)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </BentoCard>

        {/* Highlight Stats */}
        <BentoCard className="md:col-span-2 lg:col-span-2 bg-foreground text-background" delay={0.2}>
          <h3 className="text-sm font-medium text-background/70 mb-2">Average Score</h3>
          <div className="flex-1 flex flex-col justify-end">
            <div className="text-5xl font-bold tracking-tighter mb-2">{currentStats.averageScore}</div>
            <div className="text-sm font-medium flex items-center gap-1 text-emerald-400">
              <ArrowUpRight className="h-4 w-4" /> 5% from last week
            </div>
          </div>
        </BentoCard>

        <BentoCard className="md:col-span-2 lg:col-span-2" delay={0.3}>
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Total Interviews</h3>
            <Target className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="flex-1 flex flex-col justify-end">
            <div className="text-4xl font-bold tracking-tighter">{currentStats.totalInterviews}</div>
          </div>
        </BentoCard>

        {/* Small Stats Grid below */}
        <BentoCard className="md:col-span-2 lg:col-span-3" delay={0.4}>
          <div className="flex justify-between items-start">
            <h3 className="text-sm font-medium text-muted-foreground">Completed</h3>
            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
          </div>
          <div className="flex-1 flex items-end">
            <div className="text-3xl font-bold tracking-tighter">{currentStats.completedInterviews}</div>
          </div>
        </BentoCard>

        <BentoCard className="md:col-span-2 lg:col-span-3" delay={0.5}>
          <div className="flex justify-between items-start">
            <h3 className="text-sm font-medium text-muted-foreground">Highest Score</h3>
            <Trophy className="h-5 w-5 text-amber-500" />
          </div>
          <div className="flex-1 flex items-end">
            <div className="text-3xl font-bold tracking-tighter">{currentStats.highestScore}</div>
          </div>
        </BentoCard>
      </div>
    </div>
  )
}
