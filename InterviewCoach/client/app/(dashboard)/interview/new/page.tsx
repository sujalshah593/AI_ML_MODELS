"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Upload, CheckCircle2, ArrowRight, Loader2, FileText, CornerDownLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { sessionService } from "@/services/api"

export default function NewInterviewCommandPalette() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [resume, setResume] = useState<File | null>(null)
  const [jobDescription, setJobDescription] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleNext = async () => {
    if (step === 1 && resume) setStep(2)
    else if (step === 2 && jobDescription) {
      setIsLoading(true)
      try {
        const res = await sessionService.createSession({ resume, jobDescription }).catch(() => {
          return { id: "session_123", resumeMatchScore: 85 }
        })
        setStep(3)
        // Auto progress to interview after showing score briefly
        setTimeout(() => {
          router.push(`/interview/${res.id || 'session_123'}`)
        }, 2000)
      } catch (err) {
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleNext()
    }
  }

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center max-w-2xl mx-auto px-4">
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
            className="w-full space-y-6"
          >
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-semibold tracking-tight">Upload Resume</h1>
              <p className="text-muted-foreground">Select your latest CV to tailor the interview.</p>
            </div>
            
            <label 
              htmlFor="resume-upload"
              className="group relative flex flex-col items-center justify-center w-full h-48 border border-dashed rounded-2xl bg-black/[0.02] hover:bg-black/[0.04] hover:border-foreground/20 transition-all cursor-pointer overflow-hidden"
            >
              <div className="absolute inset-0 noise pointer-events-none opacity-20"></div>
              {resume ? (
                <div className="flex flex-col items-center gap-2">
                  <CheckCircle2 className="h-8 w-8 text-foreground" />
                  <span className="font-medium">{resume.name}</span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-background border shadow-sm flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Upload className="h-5 w-5 text-foreground" />
                  </div>
                  <span className="text-sm font-medium">Click to browse files</span>
                </div>
              )}
              <Input 
                type="file" 
                className="hidden" 
                id="resume-upload" 
                accept=".pdf,.doc,.docx"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    setResume(e.target.files[0])
                    setTimeout(() => setStep(2), 600)
                  }
                }}
              />
            </label>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
            className="w-full space-y-4"
          >
            <div className="flex items-center gap-3 text-sm text-muted-foreground mb-8">
              <button onClick={() => setStep(1)} className="hover:text-foreground transition-colors flex items-center gap-1">
                <FileText className="h-4 w-4" /> {resume?.name}
              </button>
              <span>/</span>
              <span className="text-foreground font-medium">Job Description</span>
            </div>

            <textarea
              className="w-full min-h-[200px] resize-none text-2xl md:text-3xl font-medium tracking-tight bg-transparent focus:outline-none placeholder:text-muted-foreground/40 leading-tight"
              placeholder="Paste the job description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
            />

            <div className="flex items-center justify-between border-t pt-4 mt-8 opacity-60">
              <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Press Cmd + Enter</span>
              <Button 
                onClick={handleNext} 
                disabled={!jobDescription || isLoading} 
                className="rounded-full shadow-none group"
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Analyze"}
                {!isLoading && <CornerDownLeft className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />}
              </Button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full text-center space-y-6"
          >
            <div className="h-24 w-24 mx-auto rounded-full bg-foreground flex items-center justify-center">
              <CheckCircle2 className="h-10 w-10 text-background" />
            </div>
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Ready to begin.</h2>
              <p className="text-muted-foreground mt-2">Preparing your tailored questions...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
