"use client"

import { Button } from "@/components/ui/button"
import {
  TrendingUp,
  FileText,
  BookOpen,
  Clock,
  MoreHorizontal,
  ArrowLeft,
  Home,
  Settings,
  Share,
  Star,
  Play,
  Pause,
  SkipForward,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface AdaptiveBottomNavProps {
  activeTab: string
  onTabChange: (tab: string) => void
  currentView?: string
  onBack?: () => void
  onAction?: (action: string) => void
}

const mainNavItems = [
  { id: "dashboard", label: "Home", icon: TrendingUp },
  { id: "article", label: "Article", icon: FileText },

  { id: "vocab", label: "Vocab", icon: BookOpen },
]

const moreNavItems = [
  { id: "review", label: "Review", icon: Clock },
  { id: "lint", label: "Grammar Lint" },
  { id: "logs", label: "Build Logs" },
  { id: "progress", label: "Progress" },
]

export function AdaptiveBottomNav({ activeTab, onTabChange, currentView, onBack, onAction }: AdaptiveBottomNavProps) {
  const isMoreActive = moreNavItems.some((item) => item.id === activeTab)

  // 2階層目の場合の特別なナビゲーション
  if (currentView && currentView !== "main") {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t md:hidden z-40">
        <div className="grid grid-cols-5 h-16">
          {/* 戻るボタン */}
          <Button
            variant="ghost"
            className="h-full rounded-none flex flex-col items-center justify-center space-y-1 text-slate-600"
            onClick={onBack}
          >
            <ArrowLeft className="w-5 h-5 text-slate-500" />
            <span className="text-xs text-slate-500">Back</span>
          </Button>

          {/* ホームボタン */}
          <Button
            variant="ghost"
            className="h-full rounded-none flex flex-col items-center justify-center space-y-1 text-slate-600"
            onClick={() => onTabChange("dashboard")}
          >
            <Home className="w-5 h-5 text-slate-500" />
            <span className="text-xs text-slate-500">Home</span>
          </Button>

          {/* コンテキスト依存のアクション */}
          {currentView === "vocab-study" && (
            <>
              <Button
                variant="ghost"
                className="h-full rounded-none flex flex-col items-center justify-center space-y-1 text-slate-600"
                onClick={() => onAction?.("pause")}
              >
                <Pause className="w-5 h-5 text-slate-500" />
                <span className="text-xs text-slate-500">Pause</span>
              </Button>
              <Button
                variant="ghost"
                className="h-full rounded-none flex flex-col items-center justify-center space-y-1 text-slate-600"
                onClick={() => onAction?.("skip")}
              >
                <SkipForward className="w-5 h-5 text-slate-500" />
                <span className="text-xs text-slate-500">Skip</span>
              </Button>
            </>
          )}

          {currentView === "vocab-manage" && (
            <>
              <Button
                variant="ghost"
                className="h-full rounded-none flex flex-col items-center justify-center space-y-1 text-slate-600"
                onClick={() => onAction?.("add")}
              >
                <FileText className="w-5 h-5 text-slate-500" />
                <span className="text-xs text-slate-500">Add</span>
              </Button>
              <Button
                variant="ghost"
                className="h-full rounded-none flex flex-col items-center justify-center space-y-1 text-slate-600"
                onClick={() => onAction?.("favorite")}
              >
                <Star className="w-5 h-5 text-slate-500" />
                <span className="text-xs text-slate-500">Favorite</span>
              </Button>
            </>
          )}

          {currentView === "article-process" && (
            <>
              <Button
                variant="ghost"
                className="h-full rounded-none flex flex-col items-center justify-center space-y-1 text-slate-600"
                onClick={() => onAction?.("save")}
              >
                <FileText className="w-5 h-5 text-slate-500" />
                <span className="text-xs text-slate-500">Save</span>
              </Button>
              <Button
                variant="ghost"
                className="h-full rounded-none flex flex-col items-center justify-center space-y-1 text-slate-600"
                onClick={() => onAction?.("share")}
              >
                <Share className="w-5 h-5 text-slate-500" />
                <span className="text-xs text-slate-500">Share</span>
              </Button>
            </>
          )}

          {currentView === "review-session" && (
            <>
              <Button
                variant="ghost"
                className="h-full rounded-none flex flex-col items-center justify-center space-y-1 text-slate-600"
                onClick={() => onAction?.("hint")}
              >
                <Settings className="w-5 h-5 text-slate-500" />
                <span className="text-xs text-slate-500">Hint</span>
              </Button>
              <Button
                variant="ghost"
                className="h-full rounded-none flex flex-col items-center justify-center space-y-1 text-slate-600"
                onClick={() => onAction?.("restart")}
              >
                <Play className="w-5 h-5 text-slate-500" />
                <span className="text-xs text-slate-500">Restart</span>
              </Button>
            </>
          )}

          {/* その他のビューの場合のデフォルトアクション */}
          {!["vocab-study", "vocab-manage", "article-process", "review-session"].includes(currentView) && (
            <>
              <Button
                variant="ghost"
                className="h-full rounded-none flex flex-col items-center justify-center space-y-1 text-slate-600"
                onClick={() => onAction?.("settings")}
              >
                <Settings className="w-5 h-5 text-slate-500" />
                <span className="text-xs text-slate-500">Settings</span>
              </Button>
              <Button
                variant="ghost"
                className="h-full rounded-none flex flex-col items-center justify-center space-y-1 text-slate-600"
                onClick={() => onAction?.("share")}
              >
                <Share className="w-5 h-5 text-slate-500" />
                <span className="text-xs text-slate-500">Share</span>
              </Button>
            </>
          )}

          {/* メニューボタン */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-full rounded-none flex flex-col items-center justify-center space-y-1 text-slate-600"
              >
                <MoreHorizontal className="w-5 h-5 text-slate-500" />
                <span className="text-xs text-slate-500">Menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {mainNavItems.map((item) => (
                <DropdownMenuItem
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={activeTab === item.id ? "bg-blue-50 text-blue-600" : ""}
                >
                  {item.label}
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem onClick={() => onTabChange("progress")}>Progress Dashboard</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    )
  }

  // 1階層目の通常のナビゲーション
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
