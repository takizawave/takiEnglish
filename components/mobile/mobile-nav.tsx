"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import {
  Menu,
  TrendingUp,
  FileText,
  MessageSquare,
  BookOpen,
  Clock,
  GitBranch,
  Settings,
} from "lucide-react"

interface MobileNavProps {
  activeTab: string
  onTabChange: (tab: string) => void
  userProfile?: any
}

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: TrendingUp },
  { id: "article", label: "Article Processor", icon: FileText },
  { id: "vocab", label: "Vocabulary", icon: BookOpen },
  { id: "grammar", label: "Grammar", icon: BookOpen },
  { id: "lint", label: "Grammar Lint", icon: MessageSquare },
  { id: "review", label: "Review", icon: Clock },
  { id: "logs", label: "Build Logs", icon: GitBranch },
  { id: "progress", label: "Progress", icon: TrendingUp },
]

export function MobileNav({ activeTab, onTabChange, userProfile }: MobileNavProps) {
  const [open, setOpen] = useState(false)

  const handleTabChange = (tabId: string) => {
    onTabChange(tabId)
    setOpen(false)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm">
          <Menu className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 p-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b bg-gradient-to-r from-blue-50 to-purple-50">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-slate-900">Atomic Language</h2>
                <p className="text-xs text-slate-600">v0.91</p>
              </div>
            </div>

            {userProfile && (
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img src="/images/takizawave-avatar.jpg" alt="Atomic Language" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm text-slate-900">{userProfile.full_name || "Atomic Language"}</p>

                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex-1 p-4">
            <nav className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = activeTab === item.id

                return (
                  <Button
                    key={item.id}
                    variant={isActive ? "default" : "ghost"}
                    className={`w-full justify-start h-12 ${
                      isActive ? "bg-blue-600 text-white" : "text-slate-700 hover:bg-slate-100"
                    }`}
                    onClick={() => handleTabChange(item.id)}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {item.label}
                  </Button>
                )
              })}
            </nav>
          </div>

          {/* Footer */}
          <div className="p-4 border-t">
            <Button variant="outline" className="w-full justify-start bg-transparent mb-2">
              <Settings className="w-4 h-4 mr-3" />
              Settings
            </Button>

          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
