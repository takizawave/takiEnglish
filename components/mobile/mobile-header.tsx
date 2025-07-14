"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Bell, Search, Code } from "lucide-react"
import { MobileNav } from "./mobile-nav"

interface MobileHeaderProps {
  activeTab: string
  onTabChange: (tab: string) => void
  todayProgress: number
  userProfile?: any
}

const getTabTitle = (activeTab: string) => {
  const titles: { [key: string]: string } = {
    dashboard: "Dashboard",
    article: "Article Processor",
  
    lint: "Grammar Lint",
    vocab: "Vocabulary",
    review: "Review System",
    logs: "Build Logs",
    progress: "Progress",
  }
      return titles[activeTab] || "Atomic Language"
}

export function MobileHeader({ activeTab, onTabChange, todayProgress, userProfile }: MobileHeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <MobileNav activeTab={activeTab} onTabChange={onTabChange} userProfile={userProfile} />
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded flex items-center justify-center">
                <Code className="w-3 h-3 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-slate-900 text-sm">{getTabTitle(activeTab)}</h1>
                <p className="text-xs text-slate-500">Atomic Language</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="hidden sm:flex">
              <Search className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Bell className="w-4 h-4" />
            </Button>
            <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
              {todayProgress}%
            </Badge>
          </div>
        </div>

        {/* Progress bar for mobile */}
        <div className="mt-3">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-slate-600">Daily Progress</span>
            <span className="text-xs font-medium text-slate-900">{todayProgress}%</span>
          </div>
          <Progress value={todayProgress} className="h-1.5" />
        </div>
      </div>
    </header>
  )
}
