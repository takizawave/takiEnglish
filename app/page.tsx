"use client"

import { useState } from "react"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/desktop/app-sidebar"
import { DesktopHeader } from "@/components/desktop/desktop-header"
import { MobileHeader } from "@/components/mobile/mobile-header"
import { MobileBottomNav } from "@/components/mobile/mobile-bottom-nav"
import { MobileDashboard } from "@/components/mobile/mobile-dashboard"
import { MobileArticleProcessor } from "@/components/mobile/mobile-article-processor"
import { MobileVocabularyManager } from "@/components/mobile/mobile-vocabulary-manager"
import { MobileProgressDashboard } from "@/components/mobile/mobile-progress-dashboard"

import { GrammarLint } from "@/components/grammar-lint"
import { ReviewSystem } from "@/components/review-system"
import { BuildLog } from "@/components/build-log"
import { ProgressDashboard } from "@/components/progress-dashboard"
import { VocabularyManager } from "@/components/vocabulary-manager"
import { ArticleProcessor } from "@/components/article-processor"
import { InteractiveReading } from "@/components/learning-materials/interactive-reading"
import { PronunciationTrainer } from "@/components/learning-materials/pronunciation-trainer"
import { WritingAssistant } from "@/components/learning-materials/writing-assistant"
import { TextToSpeech } from "@/components/ui/text-to-speech"
import { ComprehensiveGrammar } from "@/components/learning-materials/comprehensive-grammar"
import { TodaysStudy } from "@/components/learning-materials/todays-study"

export default function LearningPlatformMobile() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [todayProgress, setTodayProgress] = useState(65)

    // Mock user profile
  const userProfile = {
    full_name: "Atomic Language",
  }

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }

  return (
    <>
      {/* Desktop Layout */}
      <SidebarProvider className="hidden md:flex">
        <AppSidebar activeTab={activeTab} onTabChange={handleTabChange} userProfile={userProfile} />
        <SidebarInset className="flex flex-col min-h-screen">
          <DesktopHeader activeTab={activeTab} todayProgress={todayProgress} userProfile={userProfile} />
          <main className="flex-1 p-6 overflow-auto">
            <div className="max-w-7xl mx-auto">
              <Tabs value={activeTab} onValueChange={handleTabChange}>
                <TabsContent value="dashboard" className="mt-0">
                  <ProgressDashboard />
                </TabsContent>

                <TabsContent value="today" className="mt-0">
                  <TodaysStudy />
                </TabsContent>

                <TabsContent value="article" className="mt-0">
                  <ArticleProcessor />
                </TabsContent>



                <TabsContent value="lint" className="mt-0">
                  <GrammarLint />
                </TabsContent>

                <TabsContent value="vocab" className="mt-0">
                  <VocabularyManager />
                </TabsContent>

                <TabsContent value="grammar" className="mt-0">
                  <ComprehensiveGrammar />
                </TabsContent>

                <TabsContent value="reading" className="mt-0">
                  <InteractiveReading />
                </TabsContent>

                <TabsContent value="pronunciation" className="mt-0">
                  <PronunciationTrainer />
                </TabsContent>

                <TabsContent value="writing" className="mt-0">
                  <WritingAssistant />
                </TabsContent>

                <TabsContent value="tts" className="mt-0">
                  <TextToSpeech />
                </TabsContent>

                <TabsContent value="review" className="mt-0">
                  <ReviewSystem />
                </TabsContent>

                <TabsContent value="logs" className="mt-0">
                  <BuildLog />
                </TabsContent>

                <TabsContent value="progress" className="mt-0">
                  <ProgressDashboard />
                </TabsContent>
              </Tabs>
            </div>
          </main>
        </SidebarInset>
      </SidebarProvider>

      {/* Mobile Layout */}
      <div className="md:hidden min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <MobileHeader
          activeTab={activeTab}
          onTabChange={handleTabChange}
          todayProgress={todayProgress}
          userProfile={userProfile}
        />

        <main className="container mx-auto px-4 py-4 max-w-4xl">
          <Tabs value={activeTab} onValueChange={handleTabChange}>
            <TabsContent value="dashboard">
              <MobileDashboard onTabChange={handleTabChange} />
            </TabsContent>

            <TabsContent value="today">
              <TodaysStudy />
            </TabsContent>

            <TabsContent value="article">
              <MobileArticleProcessor />
            </TabsContent>



            <TabsContent value="lint">
              <GrammarLint />
            </TabsContent>

            <TabsContent value="vocab">
              <MobileVocabularyManager />
            </TabsContent>

            <TabsContent value="grammar">
              <ComprehensiveGrammar />
            </TabsContent>

            <TabsContent value="reading">
              <InteractiveReading />
            </TabsContent>

            <TabsContent value="pronunciation">
              <PronunciationTrainer />
            </TabsContent>

            <TabsContent value="writing">
              <WritingAssistant />
            </TabsContent>

            <TabsContent value="tts">
              <TextToSpeech />
            </TabsContent>

            <TabsContent value="review">
              <ReviewSystem />
            </TabsContent>

            <TabsContent value="logs">
              <BuildLog />
            </TabsContent>

            <TabsContent value="progress">
              <MobileProgressDashboard />
            </TabsContent>
          </Tabs>
        </main>

        <MobileBottomNav activeTab={activeTab} onTabChange={handleTabChange} />
      </div>
    </>
  )
}
