"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { 
  LayoutDashboard, 
  PlusCircle, 
  History, 
  User, 
  LogOut 
} from "lucide-react"
import Cookies from "js-cookie"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "New Interview", href: "/interview/new", icon: PlusCircle },
  { name: "History", href: "/history", icon: History },
  { name: "Profile", href: "/profile", icon: User },
]

export function FloatingDock() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    Cookies.remove("token")
    router.push("/login")
  }

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="glass rounded-full px-4 py-3 flex items-center gap-2 shadow-2xl"
      >
        <div className="flex items-center gap-1 border-r border-black/10 pr-4 mr-2">
           <div className="h-8 w-8 rounded-full bg-foreground flex items-center justify-center text-background font-bold text-xs tracking-tighter">
            AI
          </div>
        </div>
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href) && (item.href !== '/dashboard' || pathname === '/dashboard')
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "relative group flex items-center justify-center h-10 w-10 rounded-full transition-all duration-200",
                isActive 
                  ? "text-foreground" 
                  : "text-muted-foreground hover:bg-black/5 hover:text-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              {isActive && (
                <motion.div
                  layoutId="dock-indicator"
                  className="absolute inset-0 bg-black/5 rounded-full z-[-1]"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
              
              {/* Tooltip */}
              <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-foreground text-background text-xs font-semibold px-2 py-1 rounded-md pointer-events-none whitespace-nowrap">
                {item.name}
              </div>
            </Link>
          )
        })}

        <div className="w-px h-6 bg-black/10 mx-2" />
        
        <button
          onClick={handleLogout}
          className="relative group flex items-center justify-center h-10 w-10 rounded-full text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all duration-200"
        >
          <LogOut className="h-5 w-5" />
          <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-destructive text-destructive-foreground text-xs font-semibold px-2 py-1 rounded-md pointer-events-none whitespace-nowrap">
            Logout
          </div>
        </button>
      </motion.div>
    </div>
  )
}
