"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2, MessageSquare, Shield, Sparkles } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header className="px-6 h-20 flex items-center justify-between border-b bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-bold text-2xl">
            AI
          </div>
          <span className="font-bold text-xl tracking-tight">InterviewCoach</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button variant="ghost" className="font-semibold">Log in</Button>
          </Link>
          <Link href="/register">
            <Button className="font-semibold rounded-full px-6">Get Started</Button>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden hero-gradient">
          <div className="absolute inset-0 dot-grid pointer-events-none" />
          <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-8 font-medium text-sm">
                <Sparkles className="h-4 w-4" />
                <span>Next-generation AI Interviewing</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
                Ace your next interview with <span className="gradient-text">AI coaching</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                Upload your resume, paste a job description, and practice with our hyper-realistic AI interviewer. Get instant feedback and improve your chances.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/register">
                  <Button size="lg" className="rounded-full h-14 px-8 text-lg w-full sm:w-auto shadow-xl shadow-primary/20 hover:scale-105 transition-transform">
                    Start Practicing Free <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="#how-it-works">
                  <Button size="lg" variant="outline" className="rounded-full h-14 px-8 text-lg w-full sm:w-auto bg-background/50 backdrop-blur-sm">
                    How it Works
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Why choose AI InterviewCoach?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Our platform provides everything you need to build confidence and secure your dream job.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: MessageSquare,
                  title: "Realistic AI Conversations",
                  description: "Experience interview questions tailored specifically to your resume and the exact job description you are targeting."
                },
                {
                  icon: CheckCircle2,
                  title: "Instant Actionable Feedback",
                  description: "Receive immediate scores, strengths, and weaknesses for every answer, along with an ideal response example."
                },
                {
                  icon: Shield,
                  title: "Private & Judgement-Free",
                  description: "Practice as many times as you need in a completely private environment without the pressure of a real human."
                }
              ].map((feature, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass p-8 rounded-2xl relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <feature.icon className="h-24 w-24" />
                  </div>
                  <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                    <feature.icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-12 bg-background">
        <div className="container mx-auto px-6 text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} AI InterviewCoach. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
