"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PenTool, CheckCircle, AlertCircle, Lightbulb, Target, Award, Edit3, Sparkles } from "lucide-react"

interface WritingSuggestion {
  type: "grammar" | "style" | "vocabulary" | "structure"
  original: string
  suggestion: string
  explanation: string
  severity: "low" | "medium" | "high"
}

interface WritingPrompt {
  id: string
  title: string
  description: string
  category: "academic" | "business" | "creative" | "casual"
  difficulty: "beginner" | "intermediate" | "advanced"
  wordCount: number
  prompt: string
}

interface WritingScore {
  overall: number
  grammar: number
  vocabulary: number
  coherence: number
  style: number
  feedback: string[]
}

export function WritingAssistant() {
  const [currentText, setCurrentText] = useState("")
  const [selectedPrompt, setSelectedPrompt] = useState<WritingPrompt | null>(null)
  const [suggestions, setSuggestions] = useState<WritingSuggestion[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [writingScore, setWritingScore] = useState<WritingScore | null>(null)
  const [wordCount, setWordCount] = useState(0)
  const [characterCount, setCharacterCount] = useState(0)

  const writingPrompts: WritingPrompt[] = [
    {
      id: "1",
      title: "Technology Impact Essay",
      description: "Write about how technology has changed our daily lives",
      category: "academic",
      difficulty: "intermediate",
      wordCount: 300,
      prompt: "Discuss the ways in which technology has transformed our daily routines and interactions. Consider both positive and negative impacts."
    },
    {
      id: "2",
      title: "Design Philosophy Analysis",
      description: "Analyze Yuhki Yamashita's design philosophy",
      category: "academic",
      difficulty: "advanced",
      wordCount: 400,
      prompt: "Analyze Yuhki Yamashita's design philosophy of 'embracing the mess.' How does this approach challenge traditional design thinking? What are the benefits and potential drawbacks of this methodology?"
    },
    {
      id: "3",
      title: "Product Quality Strategy",
      description: "Write about Karri Saarinen's approach to product quality",
      category: "business",
      difficulty: "advanced",
      wordCount: 350,
      prompt: "Based on Karri Saarinen's 10 rules for crafting products, write an analysis of how quality can be a competitive differentiator in today's market. Focus on his principles of 'going small and aiming high' and 'quality is not perfection.'"
    },
    {
      id: "4",
      title: "Business Email",
      description: "Write a professional email to a client",
      category: "business",
      difficulty: "beginner",
      wordCount: 150,
      prompt: "Write a professional email to a client explaining a delay in project delivery. Be apologetic but confident."
    },
    {
      id: "5",
      title: "Creative Story",
      description: "Write a short creative story",
      category: "creative",
      difficulty: "advanced",
      wordCount: 500,
      prompt: "Write a short story about a person who discovers they can see into the future, but only for 24 hours."
    },
    {
      id: "6",
      title: "Travel Blog Post",
      description: "Write about a memorable travel experience",
      category: "casual",
      difficulty: "intermediate",
      wordCount: 250,
      prompt: "Describe your most memorable travel experience. What made it special and what did you learn from it?"
    }
  ]

  const handleTextChange = (text: string) => {
    setCurrentText(text)
    setWordCount(text.trim().split(/\s+/).filter(word => word.length > 0).length)
    setCharacterCount(text.length)
  }

  const analyzeWriting = async () => {
    if (!currentText.trim()) return

    setIsAnalyzing(true)
    
    // Simulate analysis
    setTimeout(() => {
      const mockSuggestions: WritingSuggestion[] = [
        {
          type: "grammar",
          original: "I goes to the store",
          suggestion: "I go to the store",
          explanation: "Use the base form of the verb 'go' with the first person singular pronoun 'I'",
          severity: "high"
        },
        {
          type: "vocabulary",
          original: "very good",
          suggestion: "excellent, outstanding, remarkable",
          explanation: "Consider using more specific and impactful vocabulary",
          severity: "medium"
        },
        {
          type: "style",
          original: "This is a very important thing",
          suggestion: "This is crucial",
          explanation: "More concise and direct expression",
          severity: "low"
        }
      ]

      const mockScore: WritingScore = {
        overall: 78,
        grammar: 85,
        vocabulary: 72,
        coherence: 80,
        style: 75,
        feedback: [
          "Good overall structure and flow",
          "Consider varying sentence length for better rhythm",
          "Some grammatical errors need attention",
          "Vocabulary could be more sophisticated"
        ]
      }

      setSuggestions(mockSuggestions)
      setWritingScore(mockScore)
      setIsAnalyzing(false)
    }, 2000)
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "grammar":
        return <CheckCircle className="w-4 h-4" />
      case "style":
        return <Edit3 className="w-4 h-4" />
      case "vocabulary":
        return <Sparkles className="w-4 h-4" />
      case "structure":
        return <Lightbulb className="w-4 h-4" />
      default:
        return <AlertCircle className="w-4 h-4" />
    }
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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "academic":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "business":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "creative":
        return "bg-pink-100 text-pink-800 border-pink-200"
      case "casual":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <PenTool className="w-5 h-5" />
            <span>Writing Assistant</span>
          </CardTitle>
          <CardDescription>
            Get AI-powered writing suggestions, grammar checks, and improvement tips
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="write" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="write">Write</TabsTrigger>
              <TabsTrigger value="prompts">Prompts</TabsTrigger>
              <TabsTrigger value="analysis">Analysis</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs defaultValue="write" className="w-full">
            <TabsContent value="write" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Writing Editor</CardTitle>
                  <CardDescription>
                    Write your text and get real-time suggestions
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-slate-600">
                    <span>Word count: {wordCount}</span>
                    <span>Characters: {characterCount}</span>
                  </div>
                  
                  <Textarea
                    placeholder="Start writing here..."
                    value={currentText}
                    onChange={(e) => handleTextChange(e.target.value)}
                    className="min-h-[300px] resize-none"
                  />
                  
                  <div className="flex justify-between">
                    <Button variant="outline">
                      <Edit3 className="w-4 h-4 mr-2" />
                      Clear
                    </Button>
                    <Button 
                      onClick={analyzeWriting}
                      disabled={!currentText.trim() || isAnalyzing}
                    >
                      {isAnalyzing ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Analyze Writing
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="prompts" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Writing Prompts</CardTitle>
                  <CardDescription>
                    Choose from various writing prompts to get started
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {writingPrompts.map((prompt) => (
                      <Card 
                        key={prompt.id} 
                        className={`cursor-pointer hover:shadow-md transition-shadow ${
                          selectedPrompt?.id === prompt.id ? 'ring-2 ring-blue-500' : ''
                        }`}
                        onClick={() => setSelectedPrompt(prompt)}
                      >
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">{prompt.title}</CardTitle>
                            <Badge className={getDifficultyColor(prompt.difficulty)}>
                              {prompt.difficulty}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className={getCategoryColor(prompt.category)}>
                              {prompt.category}
                            </Badge>
                            <span className="text-sm text-slate-600">{prompt.wordCount} words</span>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-slate-700 mb-3">{prompt.description}</p>
                          <p className="text-sm italic text-slate-600">"{prompt.prompt}"</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {selectedPrompt && (
                <Card>
                  <CardHeader>
                    <CardTitle>Selected Prompt</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">{selectedPrompt.title}</h4>
                      <p className="text-sm text-slate-700 mb-3">{selectedPrompt.prompt}</p>
                      <div className="flex items-center space-x-2">
                        <Badge className={getDifficultyColor(selectedPrompt.difficulty)}>
                          {selectedPrompt.difficulty}
                        </Badge>
                        <Badge variant="outline" className={getCategoryColor(selectedPrompt.category)}>
                          {selectedPrompt.category}
                        </Badge>
                        <span className="text-sm text-slate-600">Target: {selectedPrompt.wordCount} words</span>
                      </div>
                    </div>
                    <Button 
                      onClick={() => {
                        setCurrentText("")
                        setSelectedPrompt(null)
                      }}
                    >
                      Start Writing
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="analysis" className="space-y-4">
              {writingScore ? (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Award className="w-5 h-5" />
                      <span>Writing Analysis</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-blue-600 mb-2">
                        {writingScore.overall}%
                      </div>
                      <p className="text-slate-600">Overall Writing Score</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center space-y-2">
                        <div className="text-2xl font-bold text-green-600">{writingScore.grammar}%</div>
                        <div className="text-sm text-slate-600">Grammar</div>
                        <Progress value={writingScore.grammar} className="h-2" />
                      </div>
                      <div className="text-center space-y-2">
                        <div className="text-2xl font-bold text-purple-600">{writingScore.vocabulary}%</div>
                        <div className="text-sm text-slate-600">Vocabulary</div>
                        <Progress value={writingScore.vocabulary} className="h-2" />
                      </div>
                      <div className="text-center space-y-2">
                        <div className="text-2xl font-bold text-orange-600">{writingScore.coherence}%</div>
                        <div className="text-sm text-slate-600">Coherence</div>
                        <Progress value={writingScore.coherence} className="h-2" />
                      </div>
                      <div className="text-center space-y-2">
                        <div className="text-2xl font-bold text-pink-600">{writingScore.style}%</div>
                        <div className="text-sm text-slate-600">Style</div>
                        <Progress value={writingScore.style} className="h-2" />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium">Feedback</h4>
                      {writingScore.feedback.map((feedback, index) => (
                        <div key={index} className="flex items-start space-x-2 p-3 bg-slate-50 rounded-lg">
                          <Lightbulb className="w-4 h-4 text-blue-600 mt-0.5" />
                          <span className="text-sm text-slate-700">{feedback}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="text-center py-8">
                    <PenTool className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-600">Write something and analyze it to see your score</p>
                  </CardContent>
                </Card>
              )}

              {suggestions.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Writing Suggestions</CardTitle>
                    <CardDescription>
                      {suggestions.length} suggestions to improve your writing
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {suggestions.map((suggestion, index) => (
                        <div key={index} className="p-4 border rounded-lg">
                          <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0">
                              {getTypeIcon(suggestion.type)}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <Badge className={getSeverityColor(suggestion.severity)}>
                                  {suggestion.severity}
                                </Badge>
                                <Badge variant="outline" className="capitalize">
                                  {suggestion.type}
                                </Badge>
                              </div>
                              <div className="space-y-2">
                                <div>
                                  <span className="text-sm text-slate-600">Original: </span>
                                  <span className="text-sm font-medium">{suggestion.original}</span>
                                </div>
                                <div>
                                  <span className="text-sm text-slate-600">Suggestion: </span>
                                  <span className="text-sm font-medium text-green-700">{suggestion.suggestion}</span>
                                </div>
                                <p className="text-sm text-slate-700">{suggestion.explanation}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-4 h-4" />
                <span>Writing Goals</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Daily Writing</span>
                  <span>450/500 words</span>
                </div>
                <Progress value={90} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Weekly Essays</span>
                  <span>3/5 essays</span>
                </div>
                <Progress value={60} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Grammar Score</span>
                  <span>85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Writing Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <p className="text-sm text-slate-700">
                  Start with a clear thesis statement
                </p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <p className="text-sm text-slate-700">
                  Use transition words to connect ideas
                </p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <p className="text-sm text-slate-700">
                  Vary sentence structure for better flow
                </p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <p className="text-sm text-slate-700">
                  Proofread for grammar and spelling
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Common Writing Errors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="p-2 bg-red-50 rounded border border-red-200">
                  <div className="text-sm font-medium text-red-800">Subject-Verb Agreement</div>
                  <div className="text-xs text-red-700">Ensure verbs match their subjects</div>
                </div>
                <div className="p-2 bg-yellow-50 rounded border border-yellow-200">
                  <div className="text-sm font-medium text-yellow-800">Run-on Sentences</div>
                  <div className="text-xs text-yellow-700">Break long sentences into shorter ones</div>
                </div>
                <div className="p-2 bg-blue-50 rounded border border-blue-200">
                  <div className="text-sm font-medium text-blue-800">Passive Voice</div>
                  <div className="text-xs text-blue-700">Use active voice when possible</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
