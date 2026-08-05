import { FloatingDock } from "@/components/layout/FloatingDock"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen relative bg-background pb-24">
      <div className="absolute inset-0 noise pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-black/5 to-transparent pointer-events-none z-0" />
      <div className="flex-1 flex flex-col relative z-10 max-w-7xl mx-auto w-full">
        <main className="flex-1 p-6 overflow-x-hidden">
          {children}
        </main>
      </div>
      <FloatingDock />
    </div>
  )
}
