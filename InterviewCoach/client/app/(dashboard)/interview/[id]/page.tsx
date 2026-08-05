"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, CornerDownLeft, Sparkles, CheckCircle2, AlertCircle, Loader2 } from "lucide-react"
import { sessionService } from "@/services/api"
import { Button } from "@/components/ui/button"
import { useQuery, useQueryClient } from "@tanstack/react-query"

export default function ActiveInterviewPage() {
  const params = useParams()
  const router = useRouter()
  const queryClient = useQueryClient()
  
  const [answer, setAnswer] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedback, setFeedback] = useState<any>(null)
  
  // Fetch current question
  const { data: qData, isLoading } = useQuery({
    queryKey: ['currentQuestion', params.id],
    queryFn: () => sessionService.getQuestion(params.id as string),
    retry: false,
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    if (qData?.completed) {
      router.push(`/report/${params.id}`)
    }
  }, [qData?.completed, params.id])

  const handleSubmit = async () => {
    if (!answer.trim() || !qData) return
    setIsSubmitting(true)
    try {
      const res: any = await sessionService.submitAnswer(params.id as string, answer)
      
      if (res.completed) {
        router.push(`/report/${params.id}`)
        return
      }

      setFeedback({
        aiScore: res.evaluation.score * 10, // backend score is 0-10, scale to 100 for UI
        aiFeedback: res.evaluation.feedback,
        strengths: res.evaluation.strengths,
        weaknesses: res.evaluation.weaknesses,
        idealAnswer: res.evaluation.ideal_answer
      })
    } catch (err) {
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleNext = () => {
    // Clear feedback and answer, then refetch the next question
    setAnswer("")
    setFeedback(null)
    queryClient.invalidateQueries({ queryKey: ['currentQuestion', params.id] })
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleSubmit()
    }
  }

  if (isLoading || qData?.completed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  const totalQ = qData?.total_questions || 5
  const currQ = qData?.question_number || 1

  return (
    <div className="min-h-screen flex flex-col bg-background relative selection:bg-foreground selection:text-background">
      <div className="absolute inset-0 noise pointer-events-none opacity-40"></div>
      
      {/* Progress Header */}
      <header className="p-6 flex items-center justify-between relative z-10">
        <div className="font-medium text-sm tracking-widest uppercase text-muted-foreground">
          Question {currQ} / {totalQ}
        </div>
        <div className="flex gap-1.5">
          {Array.from({ length: totalQ }).map((_, i) => (
            <div 
              key={i} 
              className={`h-1 w-12 rounded-full transition-colors ${i + 1 === currQ ? 'bg-foreground' : i + 1 < currQ ? 'bg-foreground/20' : 'bg-black/5'}`} 
            />
          ))}
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto w-full px-6 relative z-10 py-12">
        <AnimatePresence mode="wait">
          {!feedback ? (
            <motion.div
              key="question"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, filter: "blur(10px)" }}
              className="w-full space-y-12"
            >
              <div className="space-y-4">
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-foreground bg-black/5 px-3 py-1.5 rounded-full">
                  {qData?.category} Question
                </span>
                <h1 className="text-4xl md:text-5xl font-medium tracking-tight leading-tight">
                  {qData?.question}
                </h1>
              </div>
              
              <div className="relative group">
                <textarea
                  className="w-full min-h-[250px] resize-none text-xl md:text-2xl text-foreground/80 bg-transparent focus:outline-none placeholder:text-muted-foreground/30 leading-relaxed"
                  placeholder="Start typing your response..."
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  onKeyDown={handleKeyDown}
                  autoFocus
                />
              </div>

              <div className="flex items-center justify-between border-t border-black/5 pt-6 opacity-80">
                <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                  <kbd className="font-sans px-2 py-1 rounded bg-black/5 border border-black/5">Cmd</kbd> + <kbd className="font-sans px-2 py-1 rounded bg-black/5 border border-black/5">Enter</kbd> to submit
                </span>
                <Button 
                  onClick={handleSubmit} 
                  disabled={!answer.trim() || isSubmitting} 
                  className="rounded-full px-6"
                >
                  {isSubmitting ? "Analyzing..." : "Submit"} <CornerDownLeft className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="feedback"
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              className="w-full space-y-12"
            >
              <div className="flex items-start justify-between gap-8 border-b border-black/5 pb-12">
                <div className="space-y-4 max-w-2xl">
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-foreground bg-black/5 px-3 py-1.5 rounded-full">
                    <Sparkles className="h-4 w-4" /> AI Analysis
                  </div>
                  <p className="text-2xl md:text-3xl font-medium tracking-tight leading-relaxed">
                    {feedback.aiFeedback}
                  </p>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Score</span>
                  <span className="text-7xl font-bold tracking-tighter">{feedback.aiScore}</span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-emerald-600 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" /> Strengths
                  </h3>
                  <ul className="space-y-4">
                    {feedback.strengths.map((s: string, i: number) => (
                      <li key={i} className="text-lg text-foreground/80 leading-relaxed border-l-2 border-emerald-500 pl-4">
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-6">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-amber-600 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" /> Areas for Improvement
                  </h3>
                  <ul className="space-y-4">
                    {feedback.weaknesses.map((w: string, i: number) => (
                      <li key={i} className="text-lg text-foreground/80 leading-relaxed border-l-2 border-amber-500 pl-4">
                        {w}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex justify-end pt-8">
                <Button onClick={handleNext} size="lg" className="rounded-full px-8 shadow-xl shadow-black/5 hover:scale-105 transition-transform">
                  {currQ < totalQ ? "Next Question" : "View Full Report"} <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}
