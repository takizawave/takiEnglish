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
  MessageSquare,
  BookOpen,
  Clock,
  GitBranch,
  Settings,
  Code,
  BookOpen as ReadingIcon,
  Mic,
  PenTool,
  Volume2,
  Calendar,
} from "lucide-react"

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  activeTab: string
  onTabChange: (tab: string) => void
  userProfile?: any
}

const mainNavItems = [
  { id: "dashboard", label: "Dashboard", icon: TrendingUp },
  { id: "today", label: "Today's Study", icon: Calendar },
  { id: "article", label: "Article Processor", icon: FileText },
  { id: "vocab", label: "Vocabulary", icon: BookOpen },
  { id: "grammar", label: "Grammar", icon: BookOpen },
]

const learningNavItems = [
  { id: "reading", label: "Interactive Reading", icon: ReadingIcon },
  { id: "pronunciation", label: "Pronunciation", icon: Mic },
  { id: "writing", label: "Writing Assistant", icon: PenTool },
  { id: "tts", label: "Text-to-Speech", icon: Volume2 },
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
                        <span className="truncate font-semibold">Atomic Language</span>
        <span className="truncate text-xs">v0.91</span>
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
          

          <SidebarMenuItem>
            <SidebarMenuButton>
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg overflow-hidden">
                <img src="/images/takizawave-avatar.jpg" alt="Atomic Language" className="w-full h-full object-cover" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{userProfile?.full_name || "Atomic Language"}</span>

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
