"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Plus, Search, Volume2, Star } from "lucide-react"

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

export function VocabularyManager() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

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
      word: "efficiently",
      ipa: "/ɪˈfɪʃəntli/",
      definition: "In a way that achieves maximum productivity with minimum wasted effort",
      example: "The team worked efficiently to meet the deadline.",
      synonyms: ["effectively", "productively", "smoothly"],
      difficulty: "intermediate",
      mastery: 85,
      nextReview: "2024-01-17",
      category: "adverb",
    },
    {
      id: "5",
      word: "ourselves",
      ipa: "/aʊəˈselvz/",
      definition: "Used as the object of a verb or preposition when the subject is 'we'",
      example: "We need to challenge ourselves to grow.",
      synonyms: ["us", "we"],
      difficulty: "beginner",
      mastery: 90,
      nextReview: "2024-01-18",
      category: "pronoun",
    },
    {
      id: "6",
      word: "throughout",
      ipa: "/θruːˈaʊt/",
      definition: "In every part of; during the whole time of",
      example: "The theme runs throughout the entire book.",
      synonyms: ["across", "during", "over"],
      difficulty: "intermediate",
      mastery: 70,
      nextReview: "2024-01-19",
      category: "preposition",
    },
    {
      id: "7",
      word: "whereas",
      ipa: "/weərˈæz/",
      definition: "In contrast or comparison with the fact that",
      example: "He prefers tea, whereas I prefer coffee.",
      synonyms: ["while", "although", "though"],
      difficulty: "advanced",
      mastery: 55,
      nextReview: "2024-01-20",
      category: "conjunction",
    },
    {
      id: "8",
      word: "wow",
      ipa: "/waʊ/",
      definition: "Used to express surprise, admiration, or amazement",
      example: "Wow! That's an amazing result!",
      synonyms: ["amazing", "incredible", "fantastic"],
      difficulty: "beginner",
      mastery: 95,
      nextReview: "2024-01-21",
      category: "interjection",
    },
    {
      id: "9",
      word: "carry out",
      ipa: "/ˈkæri aʊt/",
      definition: "To perform or complete a task or duty",
      example: "The team carried out the research successfully.",
      synonyms: ["execute", "perform", "accomplish"],
      difficulty: "intermediate",
      mastery: 65,
      nextReview: "2024-01-22",
      category: "phrasal-verb",
    },
    {
      id: "10",
      word: "break the ice",
      ipa: "/breɪk ðə aɪs/",
      definition: "To initiate conversation in a social setting",
      example: "He told a joke to break the ice at the meeting.",
      synonyms: ["start conversation", "ease tension", "get things going"],
      difficulty: "intermediate",
      mastery: 45,
      nextReview: "2024-01-23",
      category: "idiom",
    },
    {
      id: "11",
      word: "heavy rain",
      ipa: "/ˈhevi reɪn/",
      definition: "Intense or substantial rainfall",
      example: "The heavy rain caused flooding in the area.",
      synonyms: ["downpour", "torrential rain", "pouring rain"],
      difficulty: "beginner",
      mastery: 80,
      nextReview: "2024-01-24",
      category: "collocation",
    },
    {
      id: "12",
      word: "philosophy",
      ipa: "/fɪˈlɒsəfi/",
      definition: "A theory or attitude that acts as a guiding principle for behavior",
      example: "His design philosophy emphasizes user-centered thinking.",
      synonyms: ["approach", "methodology", "principle"],
      difficulty: "intermediate",
      mastery: 70,
      nextReview: "2024-01-25",
      category: "noun",
    },
    {
      id: "13",
      word: "inherent",
      ipa: "/ɪnˈhɪərənt/",
      definition: "Existing in something as a permanent, essential, or characteristic attribute",
      example: "The inherent complexity of modern software development.",
      synonyms: ["intrinsic", "natural", "built-in"],
      difficulty: "advanced",
      mastery: 35,
      nextReview: "2024-01-26",
      category: "adjective",
    },
    {
      id: "14",
      word: "workflow",
      ipa: "/ˈwɜːkfləʊ/",
      definition: "The sequence of industrial, administrative, or other processes through which a piece of work passes",
      example: "We need to streamline our workflow to improve efficiency.",
      synonyms: ["process", "procedure", "system"],
      difficulty: "intermediate",
      mastery: 75,
      nextReview: "2024-01-27",
      category: "noun",
    },
    {
      id: "15",
      word: "iteration",
      ipa: "/ˌɪtəˈreɪʃən/",
      definition: "The repetition of a process or utterance",
      example: "Product development involves many iterations before final release.",
      synonyms: ["repetition", "cycle", "version"],
      difficulty: "intermediate",
      mastery: 60,
      nextReview: "2024-01-28",
      category: "noun",
    }
  ]

  const categories = [
    "all",
    "noun",
    "verb", 
    "adjective",
    "adverb",
    "pronoun",
    "preposition",
    "conjunction",
    "interjection",
    "phrasal-verb",
    "idiom",
    "collocation"
  ]

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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "noun":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "verb":
        return "bg-green-100 text-green-800 border-green-200"
      case "adjective":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "adverb":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "pronoun":
        return "bg-pink-100 text-pink-800 border-pink-200"
      case "preposition":
        return "bg-indigo-100 text-indigo-800 border-indigo-200"
      case "conjunction":
        return "bg-teal-100 text-teal-800 border-teal-200"
      case "interjection":
        return "bg-red-100 text-red-800 border-red-200"
      case "phrasal-verb":
        return "bg-emerald-100 text-emerald-800 border-emerald-200"
      case "idiom":
        return "bg-amber-100 text-amber-800 border-amber-200"
      case "collocation":
        return "bg-cyan-100 text-cyan-800 border-cyan-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5" />
            <span>Vocabulary Tokens</span>
          </CardTitle>
          <CardDescription>Manage your vocabulary as reusable design tokens with spaced repetition</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search vocabulary tokens..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="capitalize"
                >
                  {category === "phrasal-verb" ? "Phrasal Verb" : 
                   category === "all" ? "All" : 
                   category.charAt(0).toUpperCase() + category.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          <Button className="w-full sm:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            Add New Token
          </Button>
        </CardContent>
      </Card>

      {/* Category Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Vocabulary Statistics</CardTitle>
          <CardDescription>Overview of your vocabulary by category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categories.filter(cat => cat !== "all").map((category) => {
              const count = mockTokens.filter(token => token.category === category).length
              const avgMastery = mockTokens
                .filter(token => token.category === category)
                .reduce((sum, token) => sum + token.mastery, 0) / count || 0
              
              return (
                <div key={category} className="text-center p-3 rounded-lg border">
                  <div className="text-2xl font-bold" style={{ color: getCategoryColor(category).split(' ')[1] }}>
                    {count}
                  </div>
                  <div className="text-sm text-slate-600 mb-1">
                    {category === "phrasal-verb" ? "Phrasal Verb" : 
                     category.charAt(0).toUpperCase() + category.slice(1)}
                  </div>
                  <div className="text-xs text-slate-500">
                    Avg: {Math.round(avgMastery)}%
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                <Badge className={getCategoryColor(token.category)}>
                  {token.category === "phrasal-verb" ? "Phrasal Verb" : 
                   token.category.charAt(0).toUpperCase() + token.category.slice(1)}
                </Badge>
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
                <p className="text-xs text-slate-500">Next review: {new Date(token.nextReview).toLocaleDateString()}</p>
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
    </div>
  )
}
