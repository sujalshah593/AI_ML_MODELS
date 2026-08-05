import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/lib/react-query";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "InterviewCoach – Practice Smarter. Ace Every Interview.",
  description:
    "Upload your resume, paste a job description, and let AI generate personalized interview questions with instant feedback and performance analysis.",
  keywords: [
    "AI interview coach",
    "interview practice",
    "resume analysis",
    "job preparation",
    "mock interview",
  ],
  openGraph: {
    title: "InterviewCoach – AI-Powered Interview Preparation",
    description:
      "Practice smarter and ace every interview with AI-powered coaching, personalized questions, and instant feedback.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className="min-h-screen antialiased bg-background text-foreground">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
