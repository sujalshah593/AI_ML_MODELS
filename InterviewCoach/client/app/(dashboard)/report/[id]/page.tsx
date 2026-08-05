"use client"

import { useParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { Download, CheckCircle2, AlertCircle, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { sessionService } from "@/services/api"
import { InterviewReport } from "@/types"

export default function ReportPage() {
  const params = useParams()
  
  // Mock fallback
  const mockReport: InterviewReport = {
    sessionId: params.id as string,
    overallScore: 82,
    feedback: "You demonstrated a strong understanding of frontend technologies and system design. Your answers were well-structured, but you could improve by providing more concrete examples and metrics to back up your achievements.",
    strengths: [
      "Excellent technical knowledge of React and Next.js",
      "Clear and concise communication",
      "Structured problem-solving approach"
    ],
    weaknesses: [
      "Lack of quantifiable metrics in behavioral answers",
      "Slight hesitation when discussing backend integration"
    ],
    qna: [
      {
        question: { id: "1", sessionId: params.id as string, questionText: "Tell me about a time you had to optimize the performance of a React application.", order: 1 },
        answer: {
          questionId: "1",
          answerText: "I noticed our main dashboard was rendering slowly. I used React Profiler to identify bottlenecks and implemented React.memo and useMemo for expensive calculations. I also virtualized long lists. This made the app much faster.",
          aiScore: 75,
          aiFeedback: "Good start, but lacks specific details. How much faster did it get? What metrics did you track?",
          strengths: ["Identified correct tools (Profiler, memoization)"],
          weaknesses: ["No specific performance metrics mentioned"]
        },
        idealAnswer: "In my previous role, our main analytics dashboard had a 4-second render time for large datasets. I used React Profiler and identified that unnecessary re-renders in our data grid were the bottleneck. I implemented React.memo for the rows, useMemo for the sorting algorithm, and introduced react-window for list virtualization. These changes reduced the render time to under 800ms (an 80% improvement) and increased our Lighthouse performance score from 65 to 92."
      }
    ]
  }

  const { data, isLoading } = useQuery({
    queryKey: ['report', params.id],
    queryFn: () => sessionService.getReport(params.id as string),
    retry: false
  })

  const report = data || mockReport

  const handleDownload = async () => {
    try {
      const blob = await sessionService.getPdf(params.id as string)
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `Interview-Report-${params.id}.pdf`
      a.click()
    } catch (err) {
      console.log("Mock PDF download")
      alert("PDF download would start here.")
    }
  }

  if (isLoading && !data) {
    return <div className="flex h-96 items-center justify-center">Loading report...</div>
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Interview Report</h1>
          <p className="text-muted-foreground mt-2">Detailed analysis and feedback from your session.</p>
        </div>
        <Button onClick={handleDownload} className="gap-2 rounded-full px-6">
          <Download className="h-4 w-4" /> Download PDF
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="glass md:col-span-1 flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Overall Score</div>
          <div className="relative h-40 w-40 flex items-center justify-center">
            <svg className="absolute inset-0 h-full w-full transform -rotate-90">
              <circle cx="80" cy="80" r="72" fill="none" stroke="currentColor" strokeWidth="10" className="text-muted/20" />
              <circle 
                cx="80" cy="80" r="72" fill="none" 
                stroke="url(#overall-gradient)" strokeWidth="10" strokeLinecap="round"
                strokeDasharray="452" strokeDashoffset={452 - (452 * report.overallScore) / 100}
                className="transition-all duration-1000 ease-out"
              />
              <defs>
                <linearGradient id="overall-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" />
                  <stop offset="100%" stopColor="hsl(var(--secondary))" />
                </linearGradient>
              </defs>
            </svg>
            <span className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-primary to-secondary">
              {report.overallScore}
            </span>
          </div>
        </Card>
        
        <Card className="glass md:col-span-2 p-8 flex flex-col justify-center">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" /> Executive Summary
          </h3>
          <p className="text-muted-foreground leading-relaxed text-lg">{report.feedback}</p>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-emerald-100 bg-emerald-50/30">
          <CardHeader>
            <CardTitle className="text-emerald-700 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" /> Key Strengths
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {report.strengths.map((s, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 text-xs font-bold">{i + 1}</span>
                  <span className="text-emerald-900 font-medium">{s}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card className="border-amber-100 bg-amber-50/30">
          <CardHeader>
            <CardTitle className="text-amber-700 flex items-center gap-2">
              <AlertCircle className="h-5 w-5" /> Areas for Improvement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {report.weaknesses.map((w, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-600 text-xs font-bold">{i + 1}</span>
                  <span className="text-amber-900 font-medium">{w}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12 space-y-6">
        <h3 className="text-2xl font-bold tracking-tight">Question Analysis</h3>
        
        {report.qna.map((item, idx) => (
          <Card key={idx} className="glass overflow-hidden">
            <div className="border-b bg-muted/30 p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm font-semibold text-primary mb-2">Question {idx + 1}</div>
                  <h4 className="text-xl font-semibold leading-relaxed">{item.question.questionText}</h4>
                </div>
                <div className="flex flex-col items-center justify-center bg-background rounded-lg border p-3 min-w-[80px]">
                  <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-1">Score</span>
                  <span className="text-2xl font-bold">{item.answer.aiScore}</span>
                </div>
              </div>
            </div>
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x">
                <div className="p-6 space-y-4">
                  <h5 className="font-semibold text-muted-foreground">Your Answer</h5>
                  <p className="text-foreground leading-relaxed">{item.answer.answerText}</p>
                  
                  <div className="mt-6 rounded-lg bg-primary/5 border p-4 space-y-2">
                    <h5 className="font-semibold text-primary flex items-center gap-2">
                      <SparklesIcon className="h-4 w-4" /> AI Feedback
                    </h5>
                    <p className="text-sm text-foreground/80 leading-relaxed">{item.answer.aiFeedback}</p>
                  </div>
                </div>
                <div className="p-6 bg-muted/10 space-y-4">
                  <h5 className="font-semibold text-muted-foreground">Ideal Structure</h5>
                  <p className="text-foreground/80 leading-relaxed">{item.idealAnswer}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function SparklesIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    </svg>
  )
}
