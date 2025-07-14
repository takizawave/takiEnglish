"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { FileText, Loader2, CheckCircle } from "lucide-react"
import { useAuth } from "@/components/auth/auth-provider"
import { supabase } from "@/lib/supabase"

export function ArticleProcessorSaaS() {
  const { user, profile } = useAuth()
  const [rawData, setRawData] = useState("")
  const [articleTitle, setArticleTitle] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [processingStep, setProcessingStep] = useState("")
  const [progress, setProgress] = useState(0)
  const [monthlyUsage, setMonthlyUsage] = useState(0)
  const [savedArticles, setSavedArticles] = useState<any[]>([])

  const getUsageLimit = () => {
    return Number.POSITIVE_INFINITY
  }

  const canProcessArticle = () => {
    return true
  }

  useEffect(() => {
    if (user) {
      fetchMonthlyUsage()
      fetchSavedArticles()
    }
  }, [user])

  const fetchMonthlyUsage = async () => {
    if (!user) return

    const startOfMonth = new Date()
    startOfMonth.setDate(1)
    startOfMonth.setHours(0, 0, 0, 0)

    const { count } = await supabase
      .from("articles")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id)
      .gte("created_at", startOfMonth.toISOString())

    setMonthlyUsage(count || 0)
  }

  const fetchSavedArticles = async () => {
    if (!user) return

    const { data } = await supabase
      .from("articles")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(5)

    setSavedArticles(data || [])
  }

  const processArticle = async () => {
    if (!user || !rawData.trim()) return

    setIsProcessing(true)
    setProgress(0)

    try {
      // Save article to database
      const { data: article, error } = await supabase
        .from("articles")
        .insert({
          user_id: user.id,
          title: articleTitle || "Untitled Article",
          raw_content: rawData,
          status: "processing",
          reading_time: Math.ceil(rawData.split(" ").length / 200),
        })
        .select()
        .single()

      if (error) throw error

      // Simulate processing steps
      setProcessingStep("Analyzing text structure...")
      setProgress(20)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setProcessingStep("Extracting vocabulary tokens...")
      setProgress(40)
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setProcessingStep("Identifying grammar patterns...")
      setProgress(60)
      await new Promise((resolve) => setTimeout(resolve, 1200))

      setProcessingStep("Generating comprehension questions...")
      setProgress(80)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock processed content
      const processedContent = {
        summary: "This article discusses modern software development practices...",
        vocabulary: [
          {
            word: "methodology",
            ipa: "/ˌmeθəˈdɒlədʒi/",
            definition: "A system of methods used in a particular area",
            context: "Agile methodology has revolutionized development",
          },
        ],
        grammarPoints: [
          {
            rule: "Present Perfect for Experience",
            examples: ["Developers have adopted agile practices"],
            explanation: "Used to describe completed actions with present relevance",
          },
        ],
        comprehensionQuestions: [
          {
            question: "What is the main benefit of agile methodology?",
            options: ["Reduced costs", "Improved productivity", "Faster deployment", "Better quality"],
            correct: 1,
            explanation: "The article emphasizes productivity improvements",
          },
        ],
      }

      // Update article with processed content
      await supabase
        .from("articles")
        .update({
          processed_content: processedContent,
          status: "completed",
          difficulty: rawData.length > 2000 ? "advanced" : rawData.length > 1000 ? "intermediate" : "beginner",
        })
        .eq("id", article.id)

      // Save vocabulary tokens
      for (const vocab of processedContent.vocabulary) {
        await supabase.from("vocabulary_tokens").insert({
          user_id: user.id,
          article_id: article.id,
          word: vocab.word,
          ipa: vocab.ipa,
          definition: vocab.definition,
          example: vocab.context,
          difficulty: "intermediate",
          mastery_level: 0,
          next_review: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          review_count: 0,
        })
      }

      // Record learning session
      await supabase.from("learning_sessions").insert({
        user_id: user.id,
        session_type: "article_processing",
        duration_minutes: 5,
        items_completed: 1,
        accuracy_score: 100,
      })

      setProgress(100)
      setProcessingStep("Processing complete!")

      // Refresh data
      fetchMonthlyUsage()
      fetchSavedArticles()
    } catch (error) {
      console.error("Error processing article:", error)
      setProcessingStep("Processing failed")
    } finally {
      setIsProcessing(false)
      setTimeout(() => {
        setProcessingStep("")
        setProgress(0)
      }, 2000)
    }
  }

  const usageLimit = getUsageLimit()
  const usagePercentage = usageLimit === Number.POSITIVE_INFINITY ? 0 : (monthlyUsage / usageLimit) * 100

  return (
    <div className="space-y-6">
      {/* Usage Card */}
      <Card className={`${usagePercentage > 80 ? "border-orange-200 bg-orange-50" : ""}`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Monthly Usage</CardTitle>

          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Articles Processed</span>
              <span>
                {monthlyUsage} / {usageLimit === Number.POSITIVE_INFINITY ? "∞" : usageLimit}
              </span>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Article Processor */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="w-5 h-5" />
            <span>Article to Learning Material Processor</span>
          </CardTitle>
          <CardDescription>
            Transform any article into structured learning materials with AI-powered analysis
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">


          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Article Title</label>
              <Input
                placeholder="Enter article title..."
                value={articleTitle}
                onChange={(e) => setArticleTitle(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Article Content</label>
              <Textarea
                placeholder="Paste your article content here..."
                value={rawData}
                onChange={(e) => setRawData(e.target.value)}
                className="min-h-[200px] font-mono text-sm"
              />
              <div className="flex justify-between items-center mt-2 text-xs text-slate-500">
                <span>{rawData.split(" ").filter((word) => word.length > 0).length} words</span>
                <span>Est. reading time: {Math.ceil(rawData.split(" ").length / 200)} min</span>
              </div>
            </div>

            <Button
              onClick={processArticle}
              disabled={isProcessing || !rawData.trim()}
              className="w-full"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Processing Article...
                </>
              ) : (
                <>
                  <FileText className="w-4 h-4 mr-2" />
                  Generate Learning Materials
                </>
              )}
            </Button>

            {isProcessing && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">{processingStep}</span>
                  <span className="text-slate-600">{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Recent Articles */}
      {savedArticles.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Articles</CardTitle>
            <CardDescription>Your recently processed learning materials</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {savedArticles.map((article) => (
                <div key={article.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">{article.title}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {article.difficulty}
                      </Badge>
                      <span className="text-xs text-slate-500">
                        {new Date(article.created_at).toLocaleDateString()}
                      </span>
                      <span className="text-xs text-slate-500">{article.reading_time} min read</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={article.status === "completed" ? "default" : "secondary"}>{article.status}</Badge>
                    {article.status === "completed" && <CheckCircle className="w-4 h-4 text-green-500" />}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
