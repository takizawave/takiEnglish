"use client"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Bell, Search, Settings } from "lucide-react"

interface DesktopHeaderProps {
  activeTab: string
  todayProgress: number
  userProfile?: any
}

const getTabTitle = (activeTab: string) => {
  const titles: { [key: string]: string } = {
    dashboard: "Dashboard",
    article: "Article Processor",
    ocr: "OCR Input",
    lint: "Grammar Lint",
    vocab: "Vocabulary",
    review: "Review System",
    logs: "Build Logs",
    progress: "Progress",
  }
  return titles[activeTab] || "Learning Platform"
}

const getTabDescription = (activeTab: string) => {
  const descriptions: { [key: string]: string } = {
    dashboard: "Overview of your learning progress and quick actions",
    article: "Transform articles into structured learning materials",
    ocr: "Extract text from images for processing",
    lint: "AI-powered grammar checking and suggestions",
    vocab: "Manage your vocabulary tokens with spaced repetition",
    review: "Practice and review your learning materials",
    logs: "View processing history and system logs",
    progress: "Detailed analytics and progress tracking",
  }
  return descriptions[activeTab] || "Welcome to your learning platform"
}

export function DesktopHeader({ activeTab, todayProgress, userProfile }: DesktopHeaderProps) {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-background">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />

      <div className="flex-1 flex items-center justify-between">
        <div className="min-w-0 flex-1">
          <h1 className="text-lg font-semibold text-slate-900 truncate">{getTabTitle(activeTab)}</h1>
          <p className="text-sm text-slate-600 truncate">{getTabDescription(activeTab)}</p>
        </div>

        <div className="flex items-center space-x-4 ml-4">
          {/* Daily Progress */}
          <div className="hidden lg:flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm font-medium text-slate-900">{todayProgress}%</p>
              <p className="text-xs text-slate-600">Daily Goal</p>
            </div>
            <div className="w-24">
              <Progress value={todayProgress} className="h-2" />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="sm">
              <Search className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Bell className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
