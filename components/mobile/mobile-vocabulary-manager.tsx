"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Plus, Search, Volume2, VolumeX, Star, Grid, List, Play, Pause } from "lucide-react"
import { SwipeCards } from "./swipe-cards"

interface VocabToken {
  id: string
  word: string
  ipa: string
  definition: string
  example: string
  synonyms: string[]
  difficulty: "beginner" | "intermediate" | "advanced"
  mastery: number
  nextReview: string
  category: string
}

export function MobileVocabularyManager() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [viewMode, setViewMode] = useState<"cards" | "list">("cards")
  const [isReading, setIsReading] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentReadingWord, setCurrentReadingWord] = useState("")

  const mockTokens: VocabToken[] = [
    {
      id: "1",
      word: "sophisticated",
      ipa: "/səˈfɪstɪkeɪtɪd/",
      definition: "Having great knowledge or experience",
      example: "She has sophisticated taste in art.",
      synonyms: ["refined", "cultured", "worldly"],
      difficulty: "advanced",
      mastery: 75,
      nextReview: "2024-01-16",
      category: "adjective",
    },
    {
      id: "2",
      word: "implement",
      ipa: "/ˈɪmpləmənt/",
      definition: "To put a decision or plan into effect",
      example: "We need to implement the new policy.",
      synonyms: ["execute", "carry out", "apply"],
      difficulty: "intermediate",
      mastery: 60,
      nextReview: "2024-01-15",
      category: "verb",
    },
    {
      id: "3",
      word: "paradigm",
      ipa: "/ˈpærədaɪm/",
      definition: "A typical example or pattern of something",
      example: "This represents a new paradigm in software development.",
      synonyms: ["model", "framework", "pattern"],
      difficulty: "advanced",
      mastery: 40,
      nextReview: "2024-01-14",
      category: "noun",
    },
    {
      id: "4",
      word: "collaborate",
      ipa: "/kəˈlæbəreɪt/",
      definition: "To work jointly on an activity or project",
      example: "We need to collaborate on this project.",
      synonyms: ["cooperate", "work together", "team up"],
      difficulty: "intermediate",
      mastery: 85,
      nextReview: "2024-01-18",
      category: "verb",
    },
    {
      id: "5",
      word: "innovative",
      ipa: "/ˈɪnəveɪtɪv/",
      definition: "Featuring new methods; advanced and original",
      example: "The company is known for its innovative approach.",
      synonyms: ["creative", "original", "groundbreaking"],
      difficulty: "intermediate",
      mastery: 55,
      nextReview: "2024-01-17",
      category: "adjective",
    },
  ]

  const categories = ["all", "noun", "verb", "adjective", "adverb"]

  const filteredTokens = mockTokens.filter((token) => {
    const matchesSearch =
      token.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
      token.definition.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || token.category === selectedCategory
    return matchesSearch && matchesCategory
  })

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

  const getMasteryColor = (mastery: number) => {
    if (mastery >= 80) return "text-green-600"
    if (mastery >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const handleVocabAnswer = (cardId: string, correct: boolean) => {
    console.log(`Card ${cardId}: ${correct ? "Correct" : "Incorrect"}`)
  }

  const speakWord = (word: string) => {
    if ('speechSynthesis' in window) {
      // 既存の読み上げを停止
      window.speechSynthesis.cancel()
      
      const utterance = new SpeechSynthesisUtterance(word)
      utterance.lang = 'en-US'
      utterance.rate = 0.8
      utterance.pitch = 1
      utterance.volume = isMuted ? 0 : 1
      
      utterance.onstart = () => {
        setIsReading(true)
        setCurrentReadingWord(word)
      }
      
      utterance.onend = () => {
        setIsReading(false)
        setCurrentReadingWord("")
      }
      
      utterance.onpause = () => {
        setIsReading(false)
      }
      
      utterance.onresume = () => {
        setIsReading(true)
      }
      
      window.speechSynthesis.speak(utterance)
    }
  }

  const stopReading = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      setIsReading(false)
      setCurrentReadingWord("")
    }
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-lg">
            <BookOpen className="w-5 h-5" />
            <span>Vocabulary Manager</span>
          </CardTitle>
          <CardDescription className="flex items-center justify-between">
            <span>Manage your vocabulary tokens with spaced repetition</span>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleMute}
                className={isMuted ? "bg-gray-50 text-gray-700 border-gray-200" : ""}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </Button>
              {isReading && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={stopReading}
                  className="bg-red-50 text-red-700 border-red-200"
                >
                  <Pause className="w-4 h-4" />
                </Button>
              )}
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search vocabulary..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Button variant="outline" size="icon" onClick={() => setViewMode(viewMode === "cards" ? "list" : "cards")}>
              {viewMode === "cards" ? <List className="w-4 h-4" /> : <Grid className="w-4 h-4" />}
            </Button>
          </div>

          <div className="flex space-x-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="capitalize whitespace-nowrap"
              >
                {category}
              </Button>
            ))}
          </div>

          <Button className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Add New Token
          </Button>
        </CardContent>
      </Card>

      <Tabs defaultValue="study" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="study">Study Mode</TabsTrigger>
          <TabsTrigger value="manage">Manage</TabsTrigger>
        </TabsList>

        <TabsContent value="study" className="space-y-4">
          <div className="text-center mb-4">
            <h3 className="text-lg font-semibold text-slate-900">Vocabulary Review</h3>
            <p className="text-sm text-slate-600">Swipe through your vocabulary cards</p>
          </div>
          <SwipeCards cards={filteredTokens} onAnswer={handleVocabAnswer} />
        </TabsContent>

        <TabsContent value="manage" className="space-y-4">
          {/* 現在読み上げ中の単語表示 */}
          {currentReadingWord && (
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-3">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                  <span className="text-sm text-blue-700 font-medium">Reading:</span>
                  <span className="font-bold text-blue-900">{currentReadingWord}</span>
                </div>
              </CardContent>
            </Card>
          )}

          {viewMode === "list" ? (
            <div className="space-y-3">
              {filteredTokens.map((token) => (
                <Card key={token.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <span className="font-semibold text-slate-900">{token.word}</span>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={isReading && currentReadingWord === token.word ? stopReading : () => speakWord(token.word)}
                          className={isReading && currentReadingWord === token.word ? "text-red-600" : ""}
                        >
                          {isReading && currentReadingWord === token.word ? (
                            <Pause className="w-3 h-3" />
                          ) : (
                            <Volume2 className="w-3 h-3" />
                          )}
                        </Button>
                      </div>
                      <Badge className={getDifficultyColor(token.difficulty)}>{token.difficulty}</Badge>
                    </div>

                    <p className="text-sm text-slate-600 mb-2">{token.ipa}</p>
                    <p className="text-sm text-slate-700 mb-3">{token.definition}</p>

                    <div className="bg-slate-50 p-2 rounded text-sm italic text-slate-600 mb-3">"{token.example}"</div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">Mastery</span>
                        <span className={`font-medium ${getMasteryColor(token.mastery)}`}>{token.mastery}%</span>
                      </div>
                      <Progress value={token.mastery} className="h-2" />
                      <p className="text-xs text-slate-500">
                        Next review: {new Date(token.nextReview).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="flex space-x-2 mt-3">
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        <Star className="w-3 h-3 mr-1" />
                        Review
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredTokens.map((token) => (
                <Card key={token.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{token.word}</CardTitle>
                      <Button variant="ghost" size="sm">
                        <Volume2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-slate-600">{token.ipa}</span>
                      <Badge className={getDifficultyColor(token.difficulty)}>{token.difficulty}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-slate-700">{token.definition}</p>

                    <div className="bg-slate-50 p-3 rounded-lg">
                      <p className="text-sm italic text-slate-600">"{token.example}"</p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-500 mb-1">Synonyms:</p>
                      <div className="flex flex-wrap gap-1">
                        {token.synonyms.map((synonym) => (
                          <Badge key={synonym} variant="outline" className="text-xs">
                            {synonym}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">Mastery</span>
                        <span className={`font-medium ${getMasteryColor(token.mastery)}`}>{token.mastery}%</span>
                      </div>
                      <Progress value={token.mastery} className="h-2" />
                      <p className="text-xs text-slate-500">
                        Next review: {new Date(token.nextReview).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        <Star className="w-3 h-3 mr-1" />
                        Review
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
