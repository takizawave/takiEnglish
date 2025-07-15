"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  BookOpen, 
  CheckCircle, 
  XCircle, 
  Volume2, 
  VolumeX, 
  Target,
  Play,
  Pause,
  RotateCcw,
  Eye,
  PenTool,
  MessageSquare,
  Clock,
  TrendingUp,
  Award,
  Lightbulb,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Star,
  Bookmark,
  Share2
} from "lucide-react"

interface GrammarModule {
  id: string
  title: string
  subtitle: string
  description: string
  difficulty: "beginner" | "intermediate" | "advanced"
  egInUseUnits: string
  keyActivity: string
  japanesePainPoint: string
  estimatedTime: number
  lessons: GrammarLesson[]
  completed: boolean
  progress: number
}

interface GrammarLesson {
  id: string
  title: string
  type: "preview" | "lecture" | "practice" | "task" | "reflection"
  content: string
  exercises: GrammarExercise[]
  completed: boolean
}

interface GrammarExercise {
  id: string
  type: "cloze" | "multiple-choice" | "transformation" | "error-correction" | "translation"
  question: string
  options?: string[]
  correctAnswer: string
  explanation: string
  completed: boolean
  userAnswer?: string
}

const grammarModules: GrammarModule[] = [
  {
    id: "articles-countability",
    title: "Articles & Countability",
    subtitle: "Master a/an/the and singular/plural distinctions",
    description: "Learn the English article system and countability rules that don't exist in Japanese. This module focuses on the three main article types and how they interact with countable/uncountable nouns.",
    difficulty: "intermediate",
    egInUseUnits: "67-78",
    keyActivity: "Write a Tokyo Airbnb listing; peers hunt for missing a/an/the",
    japanesePainPoint: "No article system in Japanese, singular/plural confusions",
    estimatedTime: 120,
    progress: 0,
    completed: false,
    lessons: [
      {
        id: "preview-1",
        title: "Preview Quiz: Articles & Countability",
        type: "preview",
        content: "Test your current knowledge of articles and countability with real-world examples",
        exercises: [
          {
            id: "preview-1-1",
            type: "cloze",
            question: "I bought ___ apple and ___ orange at ___ store near ___ station.",
            correctAnswer: "an, an, the, the",
            explanation: "Use 'an' before vowel sounds, 'the' for specific locations",
            completed: false
          },
          {
            id: "preview-1-2",
            type: "multiple-choice",
            question: "Which sentence is correct?",
            options: [
              "I need informations about the project",
              "I need information about the project",
              "I need an information about the project",
              "I need some informations about the project"
            ],
            correctAnswer: "I need information about the project",
            explanation: "Information is uncountable, so no article needed",
            completed: false
          },
          {
            id: "preview-1-3",
            type: "error-correction",
            question: "Correct the article errors: 'I went to university to study economics. University was very expensive.'",
            correctAnswer: "I went to university to study economics. The university was very expensive.",
            explanation: "First mention uses zero article, second mention uses 'the' for specific university",
            completed: false
          }
        ],
        completed: false
      },
      {
        id: "lecture-1",
        title: "Mini-Lecture: Articles in Context",
        type: "lecture",
        content: "Learn the three main article rules: indefinite (a/an), definite (the), and zero article. Understand when to use each type and how they interact with countable and uncountable nouns.",
        exercises: [
          {
            id: "lecture-1-1",
            type: "multiple-choice",
            question: "When do we use 'the'?",
            options: [
              "For any specific noun",
              "For first mention of countable nouns",
              "For previously mentioned or unique items",
              "For all plural nouns"
            ],
            correctAnswer: "For previously mentioned or unique items",
            explanation: "The definite article 'the' is used for specific, known items",
            completed: false
          }
        ],
        completed: false
      },
      {
        id: "practice-1",
        title: "Guided Practice: Article Usage",
        type: "practice",
        content: "Practice with real-world examples and get instant feedback on article usage",
        exercises: [
          {
            id: "practice-1-1",
            type: "transformation",
            question: "Transform: 'I saw movie yesterday' (add appropriate articles)",
            correctAnswer: "I saw a movie yesterday",
            explanation: "Use 'a' for first mention of countable nouns",
            completed: false
          },
          {
            id: "practice-1-2",
            type: "cloze",
            question: "___ sun rises in ___ east and sets in ___ west.",
            correctAnswer: "The, the, the",
            explanation: "Use 'the' for unique natural phenomena and directions",
            completed: false
          },
          {
            id: "practice-1-3",
            type: "translation",
            question: "Translate: '私は大学で経済学を勉強しています' (I study economics at university)",
            correctAnswer: "I study economics at university",
            explanation: "No article needed for general institutions",
            completed: false
          }
        ],
        completed: false
      },
      {
        id: "task-1",
        title: "Real-life Task: Airbnb Listing",
        type: "task",
        content: "Write a Tokyo Airbnb listing using proper articles. Include descriptions of the apartment, nearby attractions, and house rules.",
        exercises: [
          {
            id: "task-1-1",
            type: "transformation",
            question: "Write 3 sentences about your ideal apartment using correct articles",
            correctAnswer: "Sample: I want an apartment near the station. The apartment should have a balcony. There should be a supermarket within walking distance.",
            explanation: "Practice using articles in real-world context",
            completed: false
          }
        ],
        completed: false
      },
      {
        id: "reflection-1",
        title: "Reflection Journal: Articles",
        type: "reflection",
        content: "Reflect on your learning and identify areas for improvement. What was most challenging about articles?",
        exercises: [],
        completed: false
      }
    ]
  },
  {
    id: "present-past",
    title: "Present vs Past",
    subtitle: "Distinguish between present and past forms",
    description: "Master the difference between present and past tenses that Japanese combines. Learn to express time accurately in English.",
    difficulty: "beginner",
    egInUseUnits: "1-5, 13",
    keyActivity: "Two-timeline diary; feedback on aspect choice",
    japanesePainPoint: "Japanese '-ta' covers both present and past",
    estimatedTime: 90,
    progress: 0,
    completed: false,
    lessons: [
      {
        id: "preview-2",
        title: "Preview Quiz: Present vs Past",
        type: "preview",
        content: "Test your understanding of present vs past forms",
        exercises: [
          {
            id: "preview-2-1",
            type: "multiple-choice",
            question: "Which form is correct for a current habit?",
            options: [
              "I am working here for 5 years",
              "I work here for 5 years",
              "I have been working here for 5 years",
              "I worked here for 5 years"
            ],
            correctAnswer: "I have been working here for 5 years",
            explanation: "Present perfect continuous for ongoing actions",
            completed: false
          },
          {
            id: "preview-2-2",
            type: "multiple-choice",
            question: "Which sentence describes a completed action?",
            options: [
              "I am reading a book",
              "I read books every day",
              "I have read this book",
              "I will read this book"
            ],
            correctAnswer: "I have read this book",
            explanation: "Present perfect for completed actions with present relevance",
            completed: false
          }
        ],
        completed: false
      },
      {
        id: "lecture-2",
        title: "Mini-Lecture: Time Expressions",
        type: "lecture",
        content: "Learn how to express different time periods and states in English",
        exercises: [],
        completed: false
      },
      {
        id: "practice-2",
        title: "Guided Practice: Tense Selection",
        type: "practice",
        content: "Practice choosing the correct tense for different situations",
        exercises: [
          {
            id: "practice-2-1",
            type: "transformation",
            question: "Change to past tense: 'I work in Tokyo'",
            correctAnswer: "I worked in Tokyo",
            explanation: "Simple past for completed actions",
            completed: false
          }
        ],
        completed: false
      }
    ]
  },
  {
    id: "present-perfect-past-simple",
    title: "Present Perfect vs Past Simple",
    subtitle: "Master 'I've been' vs 'I went'",
    description: "Learn when to use present perfect vs past simple. Understand the difference between completed actions with present relevance and simple past events.",
    difficulty: "intermediate",
    egInUseUnits: "15-20",
    keyActivity: "Record a podcast recap using time markers",
    japanesePainPoint: "Confusion between 'I've been' and 'I went'",
    estimatedTime: 100,
    progress: 0,
    completed: false,
    lessons: [
      {
        id: "preview-3",
        title: "Preview Quiz: Present Perfect vs Past Simple",
        type: "preview",
        content: "Test your understanding of when to use present perfect vs past simple",
        exercises: [
          {
            id: "preview-3-1",
            type: "multiple-choice",
            question: "Which sentence is correct for a recent experience?",
            options: [
              "I went to Paris last year",
              "I have been to Paris last year",
              "I have been to Paris",
              "I go to Paris"
            ],
            correctAnswer: "I have been to Paris",
            explanation: "Present perfect for experiences without specific time",
            completed: false
          },
          {
            id: "preview-3-2",
            type: "multiple-choice",
            question: "Which sentence describes a completed action at a specific time?",
            options: [
              "I have finished my homework",
              "I finished my homework at 10 PM",
              "I am finishing my homework",
              "I finish my homework"
            ],
            correctAnswer: "I finished my homework at 10 PM",
            explanation: "Past simple for completed actions with specific time",
            completed: false
          }
        ],
        completed: false
      },
      {
        id: "lecture-3",
        title: "Mini-Lecture: Time Markers",
        type: "lecture",
        content: "Learn the key time markers that determine whether to use present perfect or past simple",
        exercises: [
          {
            id: "lecture-3-1",
            type: "multiple-choice",
            question: "Which time marker goes with present perfect?",
            options: [
              "yesterday",
              "last week",
              "ever",
              "in 2020"
            ],
            correctAnswer: "ever",
            explanation: "Present perfect with indefinite time markers",
            completed: false
          }
        ],
        completed: false
      },
      {
        id: "practice-3",
        title: "Guided Practice: Tense Selection",
        type: "practice",
        content: "Practice choosing between present perfect and past simple",
        exercises: [
          {
            id: "practice-3-1",
            type: "transformation",
            question: "Change to present perfect: 'I visited Tokyo in 2019'",
            correctAnswer: "I have visited Tokyo",
            explanation: "Remove specific time for present perfect",
            completed: false
          },
          {
            id: "practice-3-2",
            type: "cloze",
            question: "I ___ (never/be) to New York, but I ___ (go) to Los Angeles last summer.",
            correctAnswer: "have never been, went",
            explanation: "Present perfect for experience, past simple for specific time",
            completed: false
          }
        ],
        completed: false
      },
      {
        id: "task-3",
        title: "Real-life Task: Podcast Recap",
        type: "task",
        content: "Record a podcast recap using both present perfect and past simple appropriately",
        exercises: [],
        completed: false
      }
    ]
  },
  {
    id: "future-forms",
    title: "Future Forms",
    subtitle: "Will / Going to / Present Continuous",
    description: "Master the different ways to express future in English. Learn when to use will, going to, and present continuous for future plans.",
    difficulty: "intermediate",
    egInUseUnits: "21-24",
    keyActivity: "Plan a trip in chat; negotiate schedules",
    japanesePainPoint: "Japanese has simpler future expression",
    estimatedTime: 110,
    progress: 0,
    completed: false,
    lessons: [
      {
        id: "preview-4",
        title: "Preview Quiz: Future Forms",
        type: "preview",
        content: "Test your understanding of different future forms",
        exercises: [
          {
            id: "preview-4-1",
            type: "multiple-choice",
            question: "Which form expresses a spontaneous decision?",
            options: [
              "I am going to help you",
              "I will help you",
              "I am helping you tomorrow",
              "I help you"
            ],
            correctAnswer: "I will help you",
            explanation: "Will for spontaneous decisions",
            completed: false
          },
          {
            id: "preview-4-2",
            type: "multiple-choice",
            question: "Which form expresses a planned future action?",
            options: [
              "I will meet my friend",
              "I am going to meet my friend",
              "I meet my friend",
              "I am meeting my friend"
            ],
            correctAnswer: "I am going to meet my friend",
            explanation: "Going to for planned actions",
            completed: false
          }
        ],
        completed: false
      },
      {
        id: "lecture-4",
        title: "Mini-Lecture: Future Form Usage",
        type: "lecture",
        content: "Learn the three main ways to express future: will (spontaneous), going to (planned), present continuous (arranged)",
        exercises: [
          {
            id: "lecture-4-1",
            type: "multiple-choice",
            question: "When do we use present continuous for future?",
            options: [
              "For any future action",
              "For arranged future events",
              "For spontaneous decisions",
              "For general plans"
            ],
            correctAnswer: "For arranged future events",
            explanation: "Present continuous for arranged future events",
            completed: false
          }
        ],
        completed: false
      },
      {
        id: "practice-4",
        title: "Guided Practice: Future Form Selection",
        type: "practice",
        content: "Practice choosing the correct future form for different situations",
        exercises: [
          {
            id: "practice-4-1",
            type: "transformation",
            question: "Express as spontaneous decision: 'I help you with your homework'",
            correctAnswer: "I will help you with your homework",
            explanation: "Use will for spontaneous decisions",
            completed: false
          },
          {
            id: "practice-4-2",
            type: "cloze",
            question: "I ___ (go) to the movies tomorrow. I ___ (meet) my friend at 7 PM.",
            correctAnswer: "am going, am meeting",
            explanation: "Going to for plan, present continuous for arrangement",
            completed: false
          }
        ],
        completed: false
      },
      {
        id: "task-4",
        title: "Real-life Task: Trip Planning",
        type: "task",
        content: "Plan a trip using different future forms appropriately",
        exercises: [],
        completed: false
      }
    ]
  },
  {
    id: "relative-clauses",
    title: "Relative Clauses & Pronouns",
    subtitle: "Master restrictive and non-restrictive clauses",
    description: "Learn to use relative clauses effectively",
    difficulty: "advanced",
    egInUseUnits: "92-97",
    keyActivity: "Mystery object guessing game with restrictive clauses",
    japanesePainPoint: "Japanese modifier order differs from English",
    estimatedTime: 130,
    progress: 0,
    completed: false,
    lessons: []
  },
  {
    id: "gerunds-infinitives",
    title: "Gerunds vs Infinitives",
    subtitle: "Avoid verb-pattern mix-ups",
    description: "Learn when to use gerunds vs infinitives. Master the verb patterns that cause common errors for Japanese learners.",
    difficulty: "intermediate",
    egInUseUnits: "53-57",
    keyActivity: "Live product-pitch fix-up session",
    japanesePainPoint: "Common errors like 'enjoy to' instead of 'enjoy -ing'",
    estimatedTime: 120,
    progress: 0,
    completed: false,
    lessons: [
      {
        id: "preview-6",
        title: "Preview Quiz: Gerunds vs Infinitives",
        type: "preview",
        content: "Test your understanding of gerund and infinitive usage",
        exercises: [
          {
            id: "preview-6-1",
            type: "multiple-choice",
            question: "Which is correct after 'enjoy'?",
            options: [
              "I enjoy to read books",
              "I enjoy reading books",
              "I enjoy read books",
              "I enjoy reads books"
            ],
            correctAnswer: "I enjoy reading books",
            explanation: "Enjoy takes gerund (-ing form)",
            completed: false
          },
          {
            id: "preview-6-2",
            type: "multiple-choice",
            question: "Which is correct after 'want'?",
            options: [
              "I want going home",
              "I want to go home",
              "I want go home",
              "I want goes home"
            ],
            correctAnswer: "I want to go home",
            explanation: "Want takes infinitive (to + base form)",
            completed: false
          }
        ],
        completed: false
      },
      {
        id: "lecture-6",
        title: "Mini-Lecture: Verb Patterns",
        type: "lecture",
        content: "Learn which verbs take gerunds, which take infinitives, and which can take both",
        exercises: [
          {
            id: "lecture-6-1",
            type: "multiple-choice",
            question: "Which verb can take both gerund and infinitive?",
            options: [
              "enjoy",
              "want",
              "start",
              "finish"
            ],
            correctAnswer: "start",
            explanation: "Start can take both forms with similar meaning",
            completed: false
          }
        ],
        completed: false
      },
      {
        id: "practice-6",
        title: "Guided Practice: Pattern Recognition",
        type: "practice",
        content: "Practice recognizing and using correct verb patterns",
        exercises: [
          {
            id: "practice-6-1",
            type: "transformation",
            question: "Correct: 'I suggest to go to the movies'",
            correctAnswer: "I suggest going to the movies",
            explanation: "Suggest takes gerund, not infinitive",
            completed: false
          },
          {
            id: "practice-6-2",
            type: "cloze",
            question: "I decided ___ (study) abroad. I'm looking forward to ___ (meet) new people.",
            correctAnswer: "to study, meeting",
            explanation: "Decide takes infinitive, look forward to takes gerund",
            completed: false
          }
        ],
        completed: false
      },
      {
        id: "task-6",
        title: "Real-life Task: Product Pitch",
        type: "task",
        content: "Create and present a product pitch using correct gerund/infinitive patterns",
        exercises: [],
        completed: false
      }
    ]
  },
  {
    id: "modals-politeness",
    title: "Modals & Politeness",
    subtitle: "Master keigo vs modal politeness",
    description: "Learn to use modals for politeness and formality",
    difficulty: "intermediate",
    egInUseUnits: "24, 31-36",
    keyActivity: "Customer-support email role-play graded on tone ladder",
    japanesePainPoint: "Overuse of 'can', confusion with keigo system",
    estimatedTime: 140,
    progress: 0,
    completed: false,
    lessons: []
  },
  {
    id: "conditionals",
    title: "Conditionals",
    subtitle: "Master all conditional types (0, 1, 2, 3, mixed)",
    description: "Learn to use conditionals effectively in real situations. Master the five main conditional types and their specific uses.",
    difficulty: "advanced",
    egInUseUnits: "37-40",
    keyActivity: "Video replies: 'If I were CEO…' brainstorm",
    japanesePainPoint: "Japanese conditional system differs significantly",
    estimatedTime: 150,
    progress: 0,
    completed: false,
    lessons: [
      {
        id: "preview-8",
        title: "Preview Quiz: Conditionals",
        type: "preview",
        content: "Test your understanding of different conditional types",
        exercises: [
          {
            id: "preview-8-1",
            type: "multiple-choice",
            question: "Which conditional type is this: 'If you heat water to 100°C, it boils'?",
            options: [
              "Zero conditional",
              "First conditional",
              "Second conditional",
              "Third conditional"
            ],
            correctAnswer: "Zero conditional",
            explanation: "Zero conditional for general truths",
            completed: false
          },
          {
            id: "preview-8-2",
            type: "multiple-choice",
            question: "Which conditional expresses a hypothetical situation?",
            options: [
              "If it rains, I will stay home",
              "If it rained, I would stay home",
              "If it had rained, I would have stayed home",
              "If it rains, I stay home"
            ],
            correctAnswer: "If it rained, I would stay home",
            explanation: "Second conditional for hypothetical present/future",
            completed: false
          }
        ],
        completed: false
      },
      {
        id: "lecture-8",
        title: "Mini-Lecture: Conditional Types",
        type: "lecture",
        content: "Learn the five conditional types: 0 (general truths), 1 (real future), 2 (hypothetical), 3 (past hypothetical), mixed",
        exercises: [
          {
            id: "lecture-8-1",
            type: "multiple-choice",
            question: "What tense is used in the if-clause of a second conditional?",
            options: [
              "Present simple",
              "Past simple",
              "Present perfect",
              "Future simple"
            ],
            correctAnswer: "Past simple",
            explanation: "Second conditional uses past simple in if-clause",
            completed: false
          }
        ],
        completed: false
      },
      {
        id: "practice-8",
        title: "Guided Practice: Conditional Construction",
        type: "practice",
        content: "Practice constructing different types of conditionals",
        exercises: [
          {
            id: "practice-8-1",
            type: "transformation",
            question: "Transform to second conditional: 'If I have money, I will buy a car'",
            correctAnswer: "If I had money, I would buy a car",
            explanation: "Use past simple and would for hypothetical",
            completed: false
          },
          {
            id: "practice-8-2",
            type: "cloze",
            question: "If I ___ (be) you, I ___ (study) harder for the exam.",
            correctAnswer: "were, would study",
            explanation: "Second conditional with 'were' for all persons",
            completed: false
          }
        ],
        completed: false
      },
      {
        id: "task-8",
        title: "Real-life Task: CEO Scenario",
        type: "task",
        content: "Create video replies imagining 'If I were CEO...' scenarios",
        exercises: [],
        completed: false
      }
    ]
  },
  {
    id: "prepositions-phrasal-verbs",
    title: "Prepositions & Phrasal Verbs",
    subtitle: "Master spatial metaphors and phrasal verbs",
    description: "Learn prepositions and phrasal verbs in context",
    difficulty: "advanced",
    egInUseUnits: "120-136",
    keyActivity: "AR city-navigation task choosing correct preps/phrasals",
    japanesePainPoint: "Spatial metaphors differ between languages",
    estimatedTime: 160,
    progress: 0,
    completed: false,
    lessons: []
  },
  {
    id: "discourse-grammar",
    title: "Discourse Grammar",
    subtitle: "Master linkers, ellipsis, and spoken chunks",
    description: "Learn to connect ideas and use natural spoken English",
    difficulty: "advanced",
    egInUseUnits: "113-118, 145",
    keyActivity: "Record & transcribe café chat; self-analyze discourse markers",
    japanesePainPoint: "Different discourse patterns between languages",
    estimatedTime: 140,
    progress: 0,
    completed: false,
    lessons: []
  }
]

export function ComprehensiveGrammar() {
  const [selectedModule, setSelectedModule] = useState<GrammarModule | null>(null)
  const [currentLesson, setCurrentLesson] = useState<GrammarLesson | null>(null)
  const [activeTab, setActiveTab] = useState("overview")
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({})
  const [showResults, setShowResults] = useState(false)
  const [isReading, setIsReading] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

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

  const calculateOverallProgress = () => {
    const totalModules = grammarModules.length
    const completedModules = grammarModules.filter(m => m.completed).length
    return Math.round((completedModules / totalModules) * 100)
  }

  const handleModuleSelect = (module: GrammarModule) => {
    setSelectedModule(module)
    setCurrentLesson(null)
    setActiveTab("module")
  }

  const handleLessonSelect = (lesson: GrammarLesson) => {
    setCurrentLesson(lesson)
    setActiveTab("lesson")
  }

  const handleAnswerSubmit = (exerciseId: string, answer: string) => {
    setUserAnswers(prev => ({ ...prev, [exerciseId]: answer }))
  }

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'en-US'
      utterance.rate = 0.9
      utterance.pitch = 1
      utterance.volume = isMuted ? 0 : 1
      
      utterance.onstart = () => setIsReading(true)
      utterance.onend = () => setIsReading(false)
      
      window.speechSynthesis.speak(utterance)
    }
  }

  const stopReading = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      setIsReading(false)
    }
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5" />
            <span>Comprehensive Grammar Course</span>
          </CardTitle>
          <CardDescription>
            Master English grammar through interactive lessons based on English Grammar in Use
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Course Overview */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900">Course Progress</h3>
                <Badge variant="outline">{calculateOverallProgress()}% Complete</Badge>
              </div>
              <Progress value={calculateOverallProgress()} className="w-full" />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{grammarModules.length}</div>
                  <div className="text-sm text-slate-600">Total Modules</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {grammarModules.filter(m => m.completed).length}
                  </div>
                  <div className="text-sm text-slate-600">Completed</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {grammarModules.filter(m => m.progress > 0 && !m.completed).length}
                  </div>
                  <div className="text-sm text-slate-600">In Progress</div>
                </div>
              </div>
            </div>

            {/* Module Selection */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-900">Grammar Modules</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {grammarModules.map((module) => (
                  <div
                    key={module.id}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${
                      selectedModule?.id === module.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                    onClick={() => handleModuleSelect(module)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-semibold text-slate-900 line-clamp-2">{module.title}</h4>
                      <Badge className={getDifficultyColor(module.difficulty)}>
                        {module.difficulty}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-600 mb-2">{module.subtitle}</p>
                    <div className="space-y-2 text-xs text-slate-500">
                      <div className="flex items-center space-x-4">
                        <span>EG Units: {module.egInUseUnits}</span>
                        <span>•</span>
                        <span>{module.estimatedTime} min</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Target className="w-3 h-3" />
                        <span className="line-clamp-1">{module.japanesePainPoint}</span>
                      </div>
                    </div>
                    {module.progress > 0 && (
                      <div className="mt-3">
                        <Progress value={module.progress} className="h-2" />
                        <div className="text-xs text-slate-500 mt-1">{module.progress}% complete</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Selected Module Details */}
            {selectedModule && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-900">{selectedModule.title}</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedModule(null)}
                  >
                    ← Back to Modules
                  </Button>
                </div>
                
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Key Activity</h4>
                  <p className="text-sm text-slate-600 mb-3">{selectedModule.keyActivity}</p>
                  
                  <h4 className="font-semibold mb-2">Japanese Pain Point</h4>
                  <p className="text-sm text-slate-600 mb-3">{selectedModule.japanesePainPoint}</p>
                  
                  <div className="flex items-center space-x-4 text-sm text-slate-500">
                    <span>English Grammar in Use Units: {selectedModule.egInUseUnits}</span>
                    <span>•</span>
                    <span>Estimated Time: {selectedModule.estimatedTime} minutes</span>
                  </div>
                </div>

                {/* Lessons */}
                <div className="space-y-3">
                  <h4 className="font-semibold">Lessons</h4>
                  {selectedModule.lessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-all ${
                        currentLesson?.id === lesson.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                      onClick={() => handleLessonSelect(lesson)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            lesson.completed 
                              ? 'bg-green-100 text-green-600' 
                              : 'bg-slate-100 text-slate-600'
                          }`}>
                            {lesson.completed ? <CheckCircle className="w-4 h-4" /> : 
                             lesson.type === 'preview' ? <Eye className="w-4 h-4" /> :
                             lesson.type === 'lecture' ? <BookOpen className="w-4 h-4" /> :
                             lesson.type === 'practice' ? <PenTool className="w-4 h-4" /> :
                             lesson.type === 'task' ? <MessageSquare className="w-4 h-4" /> :
                             <Clock className="w-4 h-4" />}
                          </div>
                          <div>
                            <div className="font-medium text-sm">{lesson.title}</div>
                            <div className="text-xs text-slate-500 capitalize">{lesson.type}</div>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Current Lesson */}
            {currentLesson && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-900">{currentLesson.title}</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentLesson(null)}
                  >
                    ← Back to Module
                  </Button>
                </div>

                <div className="bg-slate-50 p-4 rounded-lg">
                  <p className="text-sm text-slate-600">{currentLesson.content}</p>
                </div>

                {/* Exercises */}
                {currentLesson.exercises.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="font-semibold">Exercises</h4>
                    {currentLesson.exercises.map((exercise) => (
                      <Card key={exercise.id}>
                        <CardContent className="pt-6">
                          <div className="space-y-4">
                            <div>
                              <Label className="text-sm font-medium">{exercise.question}</Label>
                              
                              {exercise.type === 'multiple-choice' && exercise.options && (
                                <div className="space-y-2 mt-2">
                                  {exercise.options.map((option, index) => (
                                    <div key={index} className="flex items-center space-x-2">
                                      <input
                                        type="radio"
                                        name={exercise.id}
                                        value={option}
                                        onChange={(e) => handleAnswerSubmit(exercise.id, e.target.value)}
                                        className="w-4 h-4"
                                      />
                                      <Label className="text-sm">{option}</Label>
                                    </div>
                                  ))}
                                </div>
                              )}
                              
                              {exercise.type === 'cloze' && (
                                <Input
                                  placeholder="Enter your answer"
                                  value={userAnswers[exercise.id] || ''}
                                  onChange={(e) => handleAnswerSubmit(exercise.id, e.target.value)}
                                  className="mt-2"
                                />
                              )}
                              
                              {exercise.type === 'transformation' && (
                                <Textarea
                                  placeholder="Enter your transformed sentence"
                                  value={userAnswers[exercise.id] || ''}
                                  onChange={(e) => handleAnswerSubmit(exercise.id, e.target.value)}
                                  className="mt-2"
                                />
                              )}
                            </div>
                            
                            {userAnswers[exercise.id] && (
                              <div className="p-3 rounded-lg bg-blue-50">
                                <div className="flex items-center space-x-2 mb-2">
                                  <Lightbulb className="w-4 h-4 text-blue-600" />
                                  <span className="text-sm font-medium text-blue-900">Explanation</span>
                                </div>
                                <p className="text-sm text-blue-800">{exercise.explanation}</p>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => speakText(currentLesson.content)}
                      disabled={isReading}
                    >
                      {isReading ? <Pause className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      {isReading ? 'Stop' : 'Listen'}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={toggleMute}
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </Button>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Bookmark className="w-4 h-4 mr-2" />
                      Bookmark
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 