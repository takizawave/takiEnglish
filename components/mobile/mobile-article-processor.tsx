"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Loader2, CheckCircle, Mic, Type, Link, BookOpen, Target, Clock } from "lucide-react"

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

export function MobileArticleProcessor() {
  const [inputMethod, setInputMethod] = useState<"text" | "voice" | "url">("text")
  const [rawData, setRawData] = useState("")
  const [articleTitle, setArticleTitle] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isRecording, setIsRecording] = useState(false)
  const [processedResult, setProcessedResult] = useState<ProcessedArticle | null>(null)



  const handleVoiceInput = () => {
    setIsRecording(!isRecording)
    if (!isRecording) {
      // Simulate voice recording
      setTimeout(() => {
        setRawData(
          "Voice input: The future of technology lies in artificial intelligence and machine learning. These technologies will continue to shape our world in unprecedented ways.",
        )
        setIsRecording(false)
      }, 3000)
    }
  }

  const handleUrlFetch = () => {
    // Simulate URL fetching
    setRawData(
      "Fetched from URL: Modern web development has evolved significantly with the introduction of new frameworks and tools. React, Vue, and Angular have become the cornerstone technologies for building interactive user interfaces.",
    )
  }

  const processArticle = async () => {
    if (!rawData.trim()) return

    setIsProcessing(true)
    setProgress(0)

    // Simulate processing steps
    const steps = [
      "Analyzing content structure...",
      "Extracting key vocabulary...",
      "Identifying grammar patterns...",
      "Generating comprehension questions...",
      "Creating learning materials...",
    ]

    for (let i = 0; i < steps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setProgress(((i + 1) / steps.length) * 100)
    }

    // Set detailed processing results
    setProcessedResult({
      title: articleTitle || "Karri Saarinen's 10 Rules for Crafting Products",
      summary:
        "Linear's CEO shares his philosophy on building high-quality products through craft-focused development, small teams, and opinionated design decisions that prioritize excellence over speed.",
      readingTime: Math.ceil(rawData.split(" ").length / 200),
      difficulty: "advanced",
      vocabulary: [
        {
          word: "impenetrable",
          ipa: "/ɪmˈpenɪtrəbəl/",
          definition: "Impossible to pass through or enter; impossible to understand",
          context: "Making impenetrable quality his differentiator in a crowded startup market",
          frequency: 1,
        },
        {
          word: "differentiator",
          ipa: "/ˌdɪfəˈrenʃieɪtər/",
          definition: "A factor that distinguishes one product or service from others",
          context: "Making impenetrable quality his differentiator in a crowded startup market",
          frequency: 1,
        },
        {
          word: "mantra",
          ipa: "/ˈmæntrə/",
          definition: "A statement or slogan repeated frequently",
          context: "An alternative to the Zuckerberg 'move fast and break things' mantra",
          frequency: 1,
        },
        {
          word: "resonates",
          ipa: "/ˈrezəneɪts/",
          definition: "Evokes a feeling of shared emotion or belief",
          context: "Which may have worked years ago but no longer resonates in today's market",
          frequency: 1,
        },
        {
          word: "deliberation",
          ipa: "/dɪˌlɪbəˈreɪʃən/",
          definition: "Long and careful consideration or discussion",
          context: "The more opinions and deliberation you introduce, which dilutes the quality",
          frequency: 1,
        },
        {
          word: "silos",
          ipa: "/ˈsaɪloʊz/",
          definition: "Isolated departments or groups within an organization",
          context: "An over-specialized team creates silos",
          frequency: 2,
        },
        {
          word: "opinionated",
          ipa: "/əˈpɪnjəneɪtɪd/",
          definition: "Having strong, definite views and expressing them readily",
          context: "The best design is opinionated",
          frequency: 1,
        },
        {
          word: "crutch",
          ipa: "/krʌtʃ/",
          definition: "Something used as a support or aid, often excessively",
          context: "Data can be a crutch",
          frequency: 1,
        },
        {
          word: "intuition",
          ipa: "/ˌɪntuˈɪʃən/",
          definition: "The ability to understand something instinctively",
          context: "You must develop and trust your intuition",
          frequency: 1,
        },
        {
          word: "iterate",
          ipa: "/ˈɪtəreɪt/",
          definition: "Perform or utter repeatedly; make repeated versions",
          context: "Start with something rough and iterate toward polished craft",
          frequency: 1,
        },
      ],
      grammarPoints: [
        {
          rule: "Conditional Sentences (Type 1)",
          examples: [
            "If you want to build a culture of quality, you need buy-in from the top",
            "If you can't do everything well, start by doing less",
          ],
          explanation: "Used to express real possibilities and their likely results in the present or future",
        },
        {
          rule: "Comparative and Superlative Forms",
          examples: [
            "The more people you have, the more opinions you introduce",
            "The more specific your product's purpose, the better it will perform",
            "The simplest way to increase quality is to reduce scope",
          ],
          explanation: "Used to compare quantities, qualities, or degrees between different things",
        },
        {
          rule: "Present Perfect for Experience and Results",
          examples: [
            "Karri has built his success by making quality his differentiator",
            "We've found that when everyone understands how designs are implemented",
          ],
          explanation: "Used to describe actions completed at an unspecified time with present relevance",
        },
        {
          rule: "Gerunds and Infinitives",
          examples: [
            "Getting people to notice and care",
            "Building with craft",
            "To design with craft, you must develop your intuition",
          ],
          explanation: "Gerunds (-ing forms) and infinitives (to + verb) used as nouns or to express purpose",
        },
      ],
      comprehensionQuestions: [
        {
          question: "According to Karri, what is a startup's biggest challenge?",
          options: [
            "Finding enough funding",
            "Getting people to notice and care",
            "Hiring the right talent",
            "Scaling the technology",
          ],
          correct: 1,
          explanation:
            "Karri explicitly states that craft solved 'what Karri calls a startup's biggest challenge: getting people to notice and care.'",
        },
        {
          question: "What does Karri mean by 'handoff to dev'?",
          options: [
            "Transferring ownership between team members",
            "Moving from design to development phase",
            "Delegating responsibility to developers",
            "All of the above",
          ],
          correct: 3,
          explanation:
            "Handoff refers to the traditional process where work is passed between specialized roles, creating silos and reducing shared responsibility for quality.",
        },
        {
          question: "Why does Linear avoid making decisions based on data?",
          options: [
            "Data is unreliable",
            "They don't have access to good data",
            "Craft requires developing and trusting intuition",
            "Data is too expensive to collect",
          ],
          correct: 2,
          explanation:
            "Karri argues that 'to design with craft, you must develop and trust your intuition' and that quality is hard to measure, requiring comfort with decisions without data as a guide.",
        },
        {
          question: "What is Karri's view on the relationship between team size and quality?",
          options: [
            "Larger teams produce higher quality work",
            "Team size doesn't affect quality",
            "Small, high-quality teams produce good work quickly",
            "Medium-sized teams are optimal",
          ],
          correct: 2,
          explanation:
            "Karri states that 'small, high quality teams produce good work, quickly' while more people introduce more opinions and deliberation that dilute quality.",
        },
        {
          question: "How should teams view the product specification according to rule #5?",
          options: [
            "As the final goal to achieve",
            "As the baseline minimum viable product",
            "As a suggestion to consider",
            "As the maximum they should build",
          ],
          correct: 1,
          explanation:
            "Karri emphasizes that 'for quality, you need a team that views the spec as the baseline, not the finish line.'",
        },
      ],
      keyPhrases: [
        "move fast and break things",
        "impenetrable quality",
        "craft-oriented people",
        "connected teams",
        "handoff to dev",
        "quality bar",
        "opinionated design",
        "reduce scope",
        "data can be a crutch",
        "trust your intuition",
      ],
      topics: ["Product Development", "Leadership", "Startup Strategy", "Quality Management", "Team Building"],
    })

    setIsProcessing(false)
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
    <div className="space-y-4">
      {/* Input Method Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Choose Input Method</CardTitle>
          <CardDescription>Select how you want to add your article content</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant={inputMethod === "text" ? "default" : "outline"}
              className="h-20 flex flex-col space-y-2"
              onClick={() => setInputMethod("text")}
            >
              <Type className="w-6 h-6" />
              <span className="text-sm">Type Text</span>
            </Button>

            <Button
              variant={inputMethod === "voice" ? "default" : "outline"}
              className="h-20 flex flex-col space-y-2"
              onClick={() => setInputMethod("voice")}
            >
              <Mic className="w-6 h-6" />
              <span className="text-sm">Voice</span>
            </Button>
            <Button
              variant={inputMethod === "url" ? "default" : "outline"}
              className="h-20 flex flex-col space-y-2"
              onClick={() => setInputMethod("url")}
            >
              <Link className="w-6 h-6" />
              <span className="text-sm">URL</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Input Content */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Article Content</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Article title (optional)"
            value={articleTitle}
            onChange={(e) => setArticleTitle(e.target.value)}
          />

          {inputMethod === "text" && (
            <Textarea
              placeholder="Paste or type your article content here..."
              value={rawData}
              onChange={(e) => setRawData(e.target.value)}
              className="min-h-[150px] text-sm"
            />
          )}



          {inputMethod === "voice" && (
            <div className="text-center space-y-4">
              <div
                className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center ${isRecording ? "bg-red-100 animate-pulse" : "bg-slate-100"}`}
              >
                <Mic className={`w-8 h-8 ${isRecording ? "text-red-600" : "text-slate-400"}`} />
              </div>
              <Button onClick={handleVoiceInput} variant={isRecording ? "destructive" : "default"} className="w-full">
                {isRecording ? "Stop Recording" : "Start Recording"}
              </Button>
              {isRecording && <p className="text-sm text-slate-600">Listening...</p>}
            </div>
          )}

          {inputMethod === "url" && (
            <div className="space-y-4">
              <Input placeholder="Enter article URL..." />
              <Button onClick={handleUrlFetch} className="w-full">
                <Link className="w-4 h-4 mr-2" />
                Fetch Article
              </Button>
            </div>
          )}

          {rawData && (
            <div className="space-y-2">
              <div className="text-xs text-slate-500 flex justify-between">
                <span>{rawData.split(" ").length} words</span>
                <span>~{Math.ceil(rawData.split(" ").length / 200)} min read</span>
              </div>
              <div className="max-h-32 overflow-y-auto bg-slate-50 p-3 rounded text-sm">
                {rawData.substring(0, 200)}...
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Process Button */}
      <Button onClick={processArticle} disabled={isProcessing || !rawData.trim()} className="w-full h-12">
        {isProcessing ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
            Processing...
          </>
        ) : (
          <>
            <FileText className="w-4 h-4 mr-2" />
            Generate Learning Materials
          </>
        )}
      </Button>

      {isProcessing && (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Processing article...</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </CardContent>
        </Card>
      )}

      {processedResult && (
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-green-800">
              <CheckCircle className="w-5 h-5" />
              <span>Learning Materials Generated</span>
            </CardTitle>
            <div className="flex items-center space-x-2 mt-2">
              <Badge className={getDifficultyColor(processedResult.difficulty)}>{processedResult.difficulty}</Badge>
              <Badge variant="outline">
                <Clock className="w-3 h-3 mr-1" />
                {processedResult.readingTime} min read
              </Badge>
              <Badge variant="outline">{processedResult.vocabulary.length} vocabulary items</Badge>
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
                  <p className="text-green-700 text-sm bg-white p-3 rounded-lg border">{processedResult.summary}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-green-800 mb-2">Key Topics</h3>
                  <div className="flex flex-wrap gap-2">
                    {processedResult.topics.map((topic, index) => (
                      <Badge key={index} variant="secondary">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-green-800 mb-2">Key Phrases</h3>
                  <div className="flex flex-wrap gap-2">
                    {processedResult.keyPhrases.map((phrase, index) => (
                      <Badge key={index} variant="outline" className="bg-white">
                        {phrase}
                      </Badge>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="vocabulary" className="space-y-4">
                {processedResult.vocabulary.map((vocab, index) => (
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
                {processedResult.grammarPoints.map((grammar, index) => (
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
                {processedResult.comprehensionQuestions.map((question, index) => (
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
