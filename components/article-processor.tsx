"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Loader2, CheckCircle, BookOpen, Target, Clock } from "lucide-react"

interface ProcessedArticle {
  title: string
  summary: string
  readingTime: number
  difficulty: "beginner" | "intermediate" | "advanced"
  vocabulary: {
    word: string
    ipa: string
    definition: string
    context: string
    frequency: number
  }[]
  grammarPoints: {
    rule: string
    examples: string[]
    explanation: string
  }[]
  comprehensionQuestions: {
    question: string
    options: string[]
    correct: number
    explanation: string
  }[]
  keyPhrases: string[]
  topics: string[]
}

export function ArticleProcessor() {
  const [rawData, setRawData] = useState("")
  const [articleTitle, setArticleTitle] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [processedArticle, setProcessedArticle] = useState<ProcessedArticle | null>(null)
  const [processingStep, setProcessingStep] = useState("")
  const [progress, setProgress] = useState(0)

  const processArticle = async () => {
    if (!rawData.trim()) return

    setIsProcessing(true)
    setProgress(0)

    // Step 1: Text Analysis
    setProcessingStep("Analyzing text structure...")
    setProgress(20)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Step 2: Vocabulary Extraction
    setProcessingStep("Extracting vocabulary tokens...")
    setProgress(40)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Step 3: Grammar Analysis
    setProcessingStep("Identifying grammar patterns...")
    setProgress(60)
    await new Promise((resolve) => setTimeout(resolve, 1200))

    // Step 4: Question Generation
    setProcessingStep("Generating comprehension questions...")
    setProgress(80)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Step 5: Finalization
    setProcessingStep("Finalizing learning materials...")
    setProgress(100)
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Mock processed result
    const result: ProcessedArticle = {
      title: articleTitle || "Processed Article",
      summary:
        "This article discusses modern software development practices, focusing on agile methodologies and their impact on team productivity and project success rates.",
      readingTime: Math.ceil(rawData.split(" ").length / 200),
      difficulty: rawData.length > 2000 ? "advanced" : rawData.length > 1000 ? "intermediate" : "beginner",
      vocabulary: [
        {
          word: "methodology",
          ipa: "/ˌmeθəˈdɒlədʒi/",
          definition: "A system of methods used in a particular area of study or activity",
          context: "Agile methodology has revolutionized software development",
          frequency: 3,
        },
        {
          word: "implementation",
          ipa: "/ˌɪmplɪmenˈteɪʃən/",
          definition: "The process of putting a decision or plan into effect",
          context: "The implementation of new features requires careful planning",
          frequency: 5,
        },
        {
          word: "scalability",
          ipa: "/ˌskeɪləˈbɪləti/",
          definition: "The capacity to be changed in size or scale",
          context: "System scalability is crucial for growing applications",
          frequency: 2,
        },
      ],
      grammarPoints: [
        {
          rule: "Present Perfect for Experience",
          examples: ["Developers have adopted agile practices", "The team has implemented continuous integration"],
          explanation: "Used to describe actions completed at an unspecified time with relevance to the present",
        },
        {
          rule: "Passive Voice in Technical Writing",
          examples: ["The system was designed to handle high traffic", "New features are being developed by the team"],
          explanation: "Common in technical documentation to focus on actions rather than actors",
        },
      ],
      comprehensionQuestions: [
        {
          question: "What is the main benefit of agile methodology mentioned in the article?",
          options: [
            "Reduced development costs",
            "Improved team productivity",
            "Faster deployment cycles",
            "Better code quality",
          ],
          correct: 1,
          explanation: "The article emphasizes how agile practices improve team collaboration and productivity",
        },
        {
          question: "According to the text, what is essential for system scalability?",
          options: [
            "Large development teams",
            "Expensive hardware",
            "Careful architecture planning",
            "Latest programming languages",
          ],
          correct: 2,
          explanation: "The article stresses the importance of thoughtful system design for scalability",
        },
      ],
      keyPhrases: [
        "agile methodology",
        "continuous integration",
        "system architecture",
        "development lifecycle",
        "team collaboration",
      ],
      topics: ["Software Development", "Project Management", "Technology", "Team Productivity"],
    }

    setProcessedArticle(result)
    setIsProcessing(false)
    setProcessingStep("")
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800 border-green-200"
      case "intermediate":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "advanced":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="w-5 h-5" />
            <span>Article to Learning Material Processor</span>
          </CardTitle>
          <CardDescription>
            Transform any article raw data into structured learning materials with vocabulary, grammar, and
            comprehension exercises
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Article Title (Optional)</label>
              <Input
                placeholder="Enter article title..."
                value={articleTitle}
                onChange={(e) => setArticleTitle(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Article Raw Data</label>
              <Textarea
                placeholder="Paste your article content here... (news articles, blog posts, technical documentation, etc.)"
                value={rawData}
                onChange={(e) => setRawData(e.target.value)}
                className="min-h-[200px] font-mono text-sm"
              />
              <div className="flex justify-between items-center mt-2 text-xs text-slate-500">
                <span>{rawData.split(" ").filter((word) => word.length > 0).length} words</span>
                <span>Est. reading time: {Math.ceil(rawData.split(" ").length / 200)} min</span>
              </div>
            </div>

            <Button onClick={processArticle} disabled={isProcessing || !rawData.trim()} className="w-full">
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

      {processedArticle && (
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-green-800">
              <CheckCircle className="w-5 h-5" />
              <span>Learning Materials Generated</span>
            </CardTitle>
            <div className="flex items-center space-x-2 mt-2">
              <Badge className={getDifficultyColor(processedArticle.difficulty)}>{processedArticle.difficulty}</Badge>
              <Badge variant="outline">
                <Clock className="w-3 h-3 mr-1" />
                {processedArticle.readingTime} min read
              </Badge>
              <Badge variant="outline">{processedArticle.vocabulary.length} vocabulary items</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="vocabulary">Vocabulary</TabsTrigger>
                <TabsTrigger value="grammar">Grammar</TabsTrigger>
                <TabsTrigger value="quiz">Quiz</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div>
                  <h3 className="font-semibold text-green-800 mb-2">Article Summary</h3>
                  <p className="text-green-700 text-sm bg-white p-3 rounded-lg border">{processedArticle.summary}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-green-800 mb-2">Key Topics</h3>
                  <div className="flex flex-wrap gap-2">
                    {processedArticle.topics.map((topic, index) => (
                      <Badge key={index} variant="secondary">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-green-800 mb-2">Key Phrases</h3>
                  <div className="flex flex-wrap gap-2">
                    {processedArticle.keyPhrases.map((phrase, index) => (
                      <Badge key={index} variant="outline" className="bg-white">
                        {phrase}
                      </Badge>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="vocabulary" className="space-y-4">
                {processedArticle.vocabulary.map((vocab, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg border">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <span className="font-semibold text-slate-900">{vocab.word}</span>
                        <span className="text-sm text-slate-600">{vocab.ipa}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        Used {vocab.frequency}x
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-700 mb-2">{vocab.definition}</p>
                    <div className="bg-slate-50 p-2 rounded text-sm italic text-slate-600">
                      Context: "{vocab.context}"
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="grammar" className="space-y-4">
                {processedArticle.grammarPoints.map((grammar, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg border">
                    <h4 className="font-semibold text-slate-900 mb-2">{grammar.rule}</h4>
                    <p className="text-sm text-slate-700 mb-3">{grammar.explanation}</p>
                    <div className="space-y-2">
                      <h5 className="text-sm font-medium text-slate-800">Examples:</h5>
                      {grammar.examples.map((example, exIndex) => (
                        <div key={exIndex} className="bg-slate-50 p-2 rounded text-sm">
                          {example}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="quiz" className="space-y-4">
                {processedArticle.comprehensionQuestions.map((question, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg border">
                    <h4 className="font-medium text-slate-900 mb-3">
                      {index + 1}. {question.question}
                    </h4>
                    <div className="space-y-2 mb-3">
                      {question.options.map((option, optIndex) => (
                        <div
                          key={optIndex}
                          className={`p-2 rounded border text-sm ${
                            optIndex === question.correct
                              ? "bg-green-50 border-green-200 text-green-800"
                              : "bg-slate-50 border-slate-200"
                          }`}
                        >
                          {String.fromCharCode(65 + optIndex)}. {option}
                          {optIndex === question.correct && (
                            <CheckCircle className="w-4 h-4 inline ml-2 text-green-600" />
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="bg-blue-50 p-3 rounded border border-blue-200">
                      <p className="text-sm text-blue-800">
                        <strong>Explanation:</strong> {question.explanation}
                      </p>
                    </div>
                  </div>
                ))}
              </TabsContent>
            </Tabs>

            <div className="mt-6 flex space-x-4">
              <Button className="flex-1">
                <BookOpen className="w-4 h-4 mr-2" />
                Add to Learning Path
              </Button>
              <Button variant="outline" className="flex-1 bg-transparent">
                <Target className="w-4 h-4 mr-2" />
                Start Practice Session
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
