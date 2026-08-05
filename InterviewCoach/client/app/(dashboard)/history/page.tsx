"use client"

import { useState } from "react"
import Link from "next/link"
import { useQuery } from "@tanstack/react-query"
import { Search, Filter, Eye, Download, Trash2, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { dataService } from "@/services/api"
import { InterviewSession } from "@/types"

export default function HistoryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  
  // Mock fallback
  const mockHistory: InterviewSession[] = [
    { id: "s1", status: "completed", createdAt: "2026-08-01T10:00:00Z", overallScore: 85 },
    { id: "s2", status: "completed", createdAt: "2026-08-02T14:30:00Z", overallScore: 92 },
    { id: "s3", status: "ongoing", createdAt: "2026-08-04T09:15:00Z", overallScore: undefined },
    { id: "s4", status: "completed", createdAt: "2026-07-28T16:45:00Z", overallScore: 78 },
    { id: "s5", status: "completed", createdAt: "2026-07-20T11:20:00Z", overallScore: 88 },
  ]

  const { data, isLoading } = useQuery({
    queryKey: ['history'],
    queryFn: dataService.getHistory,
    retry: false
  })

  const history = data || mockHistory
  const filteredHistory = history.filter(item => 
    (item.createdAt || '').includes(searchTerm) || 
    (item.status === 'completed' && String(item.overallScore || '').includes(searchTerm))
  )

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Interview History</h1>
          <p className="text-muted-foreground mt-2">View and manage your past interview sessions.</p>
        </div>
        <Link href="/interview/new">
          <Button className="rounded-full shadow-md">New Interview</Button>
        </Link>
      </div>

      <Card className="glass overflow-hidden">
        <div className="p-4 border-b flex items-center justify-between gap-4 bg-muted/20">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Search by date or score..." 
              className="pl-9 bg-background/50 focus:bg-background transition-colors"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" size="sm" className="gap-2 hidden sm:flex">
            <Filter className="h-4 w-4" /> Filter
          </Button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/40">
              <tr>
                <th className="px-6 py-4 font-semibold">Date & Time</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Score</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredHistory.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-muted-foreground">
                    No interviews found.
                  </td>
                </tr>
              ) : (
                filteredHistory.map((session) => (
                  <tr key={session.id} className="border-b last:border-0 hover:bg-muted/10 transition-colors">
                    <td className="px-6 py-4 font-medium text-foreground">
                      {formatDate(session.createdAt)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        session.status === 'completed' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400' : 
                        'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                      }`}>
                        {session.status === 'completed' ? 'Completed' : 'Ongoing'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {session.status === 'completed' ? (
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-16 bg-muted rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${session.overallScore! >= 80 ? 'bg-emerald-500' : session.overallScore! >= 60 ? 'bg-amber-500' : 'bg-red-500'}`}
                              style={{ width: `${session.overallScore}%` }}
                            />
                          </div>
                          <span className="font-semibold">{session.overallScore}</span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {session.status === 'completed' ? (
                          <>
                            <Link href={`/report/${session.id}`}>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </Link>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                              <Download className="h-4 w-4" />
                            </Button>
                          </>
                        ) : (
                          <Link href={`/interview/${session.id}`}>
                            <Button variant="link" size="sm" className="h-8 px-2">Continue</Button>
                          </Link>
                        )}
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Simple pagination mock */}
        <div className="p-4 border-t flex items-center justify-between text-sm text-muted-foreground bg-muted/10">
          <div>Showing 1 to {filteredHistory.length} of {filteredHistory.length} entries</div>
          <div className="flex gap-1">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm" disabled>Next</Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
