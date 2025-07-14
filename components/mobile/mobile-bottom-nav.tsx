"use client"

import { Button } from "@/components/ui/button"
import { TrendingUp, FileText, Camera, BookOpen, Clock, MoreHorizontal, BookOpen as ReadingIcon, Mic, PenTool } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface MobileBottomNavProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const mainNavItems = [
  { id: "dashboard", label: "Home", icon: TrendingUp },
  { id: "article", label: "Article", icon: FileText },
  { id: "ocr", label: "Scan", icon: Camera },
  { id: "vocab", label: "Vocab", icon: BookOpen },
]

const moreNavItems = [
  { id: "reading", label: "Reading", icon: ReadingIcon },
  { id: "pronunciation", label: "Pronunciation", icon: Mic },
  { id: "writing", label: "Writing", icon: PenTool },
  { id: "review", label: "Review", icon: Clock },
  { id: "lint", label: "Grammar Lint" },
  { id: "logs", label: "Build Logs" },
  { id: "progress", label: "Progress" },
]

export function MobileBottomNav({ activeTab, onTabChange }: MobileBottomNavProps) {
  const isMoreActive = moreNavItems.some((item) => item.id === activeTab)

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t md:hidden z-40">
      <div className="grid grid-cols-5 h-16">
        {mainNavItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id

          return (
            <Button
              key={item.id}
              variant="ghost"
              className={`h-full rounded-none flex flex-col items-center justify-center space-y-1 ${
                isActive ? "text-blue-600 bg-blue-50" : "text-slate-600"
              }`}
              onClick={() => onTabChange(item.id)}
            >
              <Icon className={`w-5 h-5 ${isActive ? "text-blue-600" : "text-slate-500"}`} />
              <span className={`text-xs ${isActive ? "text-blue-600 font-medium" : "text-slate-500"}`}>
                {item.label}
              </span>
            </Button>
          )
        })}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className={`h-full rounded-none flex flex-col items-center justify-center space-y-1 ${
                isMoreActive ? "text-blue-600 bg-blue-50" : "text-slate-600"
              }`}
            >
              <MoreHorizontal className={`w-5 h-5 ${isMoreActive ? "text-blue-600" : "text-slate-500"}`} />
              <span className={`text-xs ${isMoreActive ? "text-blue-600 font-medium" : "text-slate-500"}`}>More</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {moreNavItems.map((item) => (
              <DropdownMenuItem
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={activeTab === item.id ? "bg-blue-50 text-blue-600" : ""}
              >
                {item.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
