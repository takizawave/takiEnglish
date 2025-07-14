"use client"

import type * as React from "react"
import { Badge } from "@/components/ui/badge"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import {
  TrendingUp,
  FileText,
  Camera,
  MessageSquare,
  BookOpen,
  Clock,
  GitBranch,
  Settings,
  Crown,
  Code,
  BookOpen as ReadingIcon,
  Mic,
  PenTool,
} from "lucide-react"

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  activeTab: string
  onTabChange: (tab: string) => void
  userProfile?: any
}

const mainNavItems = [
  { id: "dashboard", label: "Dashboard", icon: TrendingUp },
  { id: "article", label: "Article Processor", icon: FileText },
  { id: "ocr", label: "OCR Input", icon: Camera },
  { id: "vocab", label: "Vocabulary", icon: BookOpen },
]

const learningNavItems = [
  { id: "reading", label: "Interactive Reading", icon: ReadingIcon },
  { id: "pronunciation", label: "Pronunciation", icon: Mic },
  { id: "writing", label: "Writing Assistant", icon: PenTool },
]

const toolsNavItems = [
  { id: "lint", label: "Grammar Lint", icon: MessageSquare },
  { id: "review", label: "Review System", icon: Clock },
]

const analyticsNavItems = [
  { id: "progress", label: "Progress", icon: TrendingUp },
  { id: "logs", label: "Build Logs", icon: GitBranch },
]

export function AppSidebar({ activeTab, onTabChange, userProfile, ...props }: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon" className="border-r" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-sidebar-primary-foreground">
                <Code className="size-4 text-white" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">Learning Platform</span>
                <span className="truncate text-xs">takizawave v0.91</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => {
                const Icon = item.icon
                const isActive = activeTab === item.id

                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton tooltip={item.label} isActive={isActive} onClick={() => onTabChange(item.id)}>
                      <Icon />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Learning</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {learningNavItems.map((item) => {
                const Icon = item.icon
                const isActive = activeTab === item.id

                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton tooltip={item.label} isActive={isActive} onClick={() => onTabChange(item.id)}>
                      <Icon />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Tools</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {toolsNavItems.map((item) => {
                const Icon = item.icon
                const isActive = activeTab === item.id

                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton tooltip={item.label} isActive={isActive} onClick={() => onTabChange(item.id)}>
                      <Icon />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Analytics</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {analyticsNavItems.map((item) => {
                const Icon = item.icon
                const isActive = activeTab === item.id

                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton tooltip={item.label} isActive={isActive} onClick={() => onTabChange(item.id)}>
                      <Icon />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          {userProfile?.subscription_tier === "free" && (
            <SidebarMenuItem>
              <SidebarMenuButton className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700">
                <Crown />
                <span>Upgrade to Pro</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}

          <SidebarMenuItem>
            <SidebarMenuButton>
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg overflow-hidden">
                <img src="/images/takizawave-avatar.jpg" alt="takizawave" className="w-full h-full object-cover" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{userProfile?.full_name || "takizawave"}</span>
                <Badge
                  variant="outline"
                  className={`text-xs w-fit ${
                    userProfile?.subscription_tier === "free"
                      ? "bg-gray-50 text-gray-700"
                      : "bg-green-50 text-green-700"
                  }`}
                >
                  {userProfile?.subscription_tier === "free" ? "Free" : "Pro"}
                </Badge>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Settings">
              <Settings />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
