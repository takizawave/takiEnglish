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
  Calendar, 
  Clock, 
  Target, 
  CheckCircle, 
  XCircle, 
  Volume2, 
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  Eye,
  PenTool,
  BookOpen,
  Brain,
  TrendingUp,
  Zap,
  Star,
  Timer,
  Award,
  Flame,
  CalendarDays,
  BarChart3,
  Lightbulb,
  RefreshCw,
  ChevronRight,
  ChevronLeft,
  BookMarked,
  Users,
  Trophy,
  Activity,
  Mic
} from "lucide-react"

interface StudyItem {
  id: string
  type: 'vocabulary' | 'grammar' | 'reading' | 'listening' | 'speaking' | 'writing'
  title: string
  content: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  timeEstimate: number // in minutes
  lastReviewed?: Date
  nextReview?: Date
  reviewCount: number
  mastery: number // 0-100
  tags: string[]
}

interface DailyProgress {
  date: string
  completedItems: number
  totalTime: number
  streak: number
  accuracy: number
}

const studyItems: StudyItem[] = [
  {
    id: "vocab-001",
    type: "vocabulary",
    title: "Essential Business Terms",
    content: "Learn 5 essential business vocabulary words with context and usage examples.",
    difficulty: "intermediate",
    timeEstimate: 3,
    reviewCount: 0,
    mastery: 0,
    tags: ["business", "vocabulary"]
  },
  {
    id: "grammar-001",
    type: "grammar",
    title: "Present Perfect vs Past Simple",
    content: "Practice choosing between present perfect and past simple in context.",
    difficulty: "intermediate",
    timeEstimate: 4,
    reviewCount: 0,
    mastery: 0,
    tags: ["grammar", "tenses"]
  },
  {
    id: "reading-001",
    type: "reading",
    title: "Short Article Comprehension",
    content: "Read a short article and answer comprehension questions.",
    difficulty: "beginner",
    timeEstimate: 5,
    reviewCount: 0,
    mastery: 0,
    tags: ["reading", "comprehension"]
  },
  {
    id: "listening-001",
    type: "listening",
    title: "Daily Conversation Practice",
    content: "Listen to a short conversation and practice understanding natural speech.",
    difficulty: "intermediate",
    timeEstimate: 4,
    reviewCount: 0,
    mastery: 0,
    tags: ["listening", "conversation"]
  },
  {
    id: "speaking-001",
    type: "speaking",
    title: "Pronunciation Practice",
    content: "Practice pronunciation of common English sounds and words.",
    difficulty: "beginner",
    timeEstimate: 3,
    reviewCount: 0,
    mastery: 0,
    tags: ["speaking", "pronunciation"]
  },
  {
    id: "writing-001",
    type: "writing",
    title: "Sentence Structure Practice",
    content: "Practice writing clear and grammatically correct sentences.",
    difficulty: "intermediate",
    timeEstimate: 4,
    reviewCount: 0,
    mastery: 0,
    tags: ["writing", "grammar"]
  }
]

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'beginner': return 'bg-green-100 text-green-800'
    case 'intermediate': return 'bg-yellow-100 text-yellow-800'
    case 'advanced': return 'bg-red-100 text-red-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'vocabulary': return <BookOpen className="w-4 h-4" />
    case 'grammar': return <PenTool className="w-4 h-4" />
    case 'reading': return <Eye className="w-4 h-4" />
    case 'listening': return <Volume2 className="w-4 h-4" />
    case 'speaking': return <Mic className="w-4 h-4" />
    case 'writing': return <PenTool className="w-4 h-4" />
    default: return <BookOpen className="w-4 h-4" />
  }
}

export function TodaysStudy() {
  const [currentItem, setCurrentItem] = useState<StudyItem | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(600) // 10 minutes in seconds
  const [dailyProgress, setDailyProgress] = useState<DailyProgress>({
    date: new Date().toISOString().split('T')[0],
    completedItems: 0,
    totalTime: 0,
    streak: 7,
    accuracy: 85
  })
  const [studyHistory, setStudyHistory] = useState<StudyItem[]>([])
  const [activeTab, setActiveTab] = useState("today")

  // Ebbinghaus forgetting curve intervals (in days)
  const reviewIntervals = [1, 3, 7, 14, 30, 90]

  useEffect(() => {
    if (currentItem) {
      setTimeRemaining(currentItem.timeEstimate * 60)
    }
  }, [currentItem])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => prev - 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isPlaying, timeRemaining])

  const startStudy = (item: StudyItem) => {
    setCurrentItem(item)
    setCurrentIndex(studyItems.findIndex(i => i.id === item.id))
    setIsPlaying(true)
  }

  const completeItem = () => {
    if (!currentItem) return

    const updatedItem = {
      ...currentItem,
      reviewCount: currentItem.reviewCount + 1,
      mastery: Math.min(100, currentItem.mastery + 20),
      lastReviewed: new Date(),
      nextReview: new Date(Date.now() + reviewIntervals[Math.min(currentItem.reviewCount, reviewIntervals.length - 1)] * 24 * 60 * 60 * 1000)
    }

    setStudyHistory(prev => [...prev, updatedItem])
    setDailyProgress(prev => ({
      ...prev,
      completedItems: prev.completedItems + 1,
      totalTime: prev.totalTime + currentItem.timeEstimate
    }))

    // Move to next item or finish
    if (currentIndex < studyItems.length - 1) {
      setCurrentIndex(prev => prev + 1)
      setCurrentItem(studyItems[currentIndex + 1])
    } else {
      setCurrentItem(null)
      setIsPlaying(false)
    }
  }

  const getItemsDueForReview = () => {
    const today = new Date()
    return studyHistory.filter(item => 
      item.nextReview && new Date(item.nextReview) <= today
    )
  }

  const getRecommendedItems = () => {
    const dueItems = getItemsDueForReview()
    const newItems = studyItems.filter(item => 
      !studyHistory.some(h => h.id === item.id)
    )
    return [...dueItems, ...newItems].slice(0, 3)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  if (currentItem) {
    return (
      <div className="space-y-6">
        {/* Study Session Header */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Timer className="w-5 h-5" />
                  Study Session
                </CardTitle>
                <CardDescription>
                  {currentItem.title} • {formatTime(timeRemaining)} remaining
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={getDifficultyColor(currentItem.difficulty)}>
                  {currentItem.difficulty}
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Progress value={(600 - timeRemaining) / 600 * 100} className="mb-4" />
            
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                {getTypeIcon(currentItem.type)}
                <h3 className="font-semibold">{currentItem.title}</h3>
              </div>
              
              <p className="text-gray-600">{currentItem.content}</p>
              
              <div className="flex gap-2">
                {currentItem.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button onClick={completeItem} className="flex-1">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Complete
                </Button>
                <Button variant="outline" onClick={() => setCurrentItem(null)}>
                  <XCircle className="w-4 h-4 mr-2" />
                  Skip
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Daily Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Today's Study Progress
          </CardTitle>
          <CardDescription>
            Keep your learning streak alive! Complete your daily 10-minute study session.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{dailyProgress.completedItems}</div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{dailyProgress.totalTime}min</div>
              <div className="text-sm text-gray-600">Study Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{dailyProgress.streak}</div>
              <div className="text-sm text-gray-600">Day Streak</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{dailyProgress.accuracy}%</div>
              <div className="text-sm text-gray-600">Accuracy</div>
            </div>
          </div>
          
          <div className="mt-4">
            <Progress value={(dailyProgress.completedItems / 3) * 100} />
            <p className="text-sm text-gray-600 mt-2">
              {3 - dailyProgress.completedItems} more items to complete today's goal
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Study Options */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="today">Today's Focus</TabsTrigger>
          <TabsTrigger value="review">Review</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Recommended for Today
              </CardTitle>
              <CardDescription>
                Based on your learning progress and the Ebbinghaus forgetting curve
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {getRecommendedItems().map((item, index) => (
                  <Card key={item.id} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100">
                            {getTypeIcon(item.type)}
                          </div>
                          <div>
                            <h3 className="font-semibold">{item.title}</h3>
                            <p className="text-sm text-gray-600">{item.content}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge className={getDifficultyColor(item.difficulty)}>
                                {item.difficulty}
                              </Badge>
                              <span className="text-xs text-gray-500">
                                {item.timeEstimate} min
                              </span>
                            </div>
                          </div>
                        </div>
                        <Button onClick={() => startStudy(item)}>
                          <Play className="w-4 h-4 mr-2" />
                          Start
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="review" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RefreshCw className="w-5 h-5" />
                Due for Review
              </CardTitle>
              <CardDescription>
                Items that need review based on the forgetting curve
              </CardDescription>
            </CardHeader>
            <CardContent>
              {getItemsDueForReview().length > 0 ? (
                <div className="space-y-4">
                  {getItemsDueForReview().map(item => (
                    <Card key={item.id} className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-100">
                              {getTypeIcon(item.type)}
                            </div>
                            <div>
                              <h3 className="font-semibold">{item.title}</h3>
                              <p className="text-sm text-gray-600">
                                Last reviewed: {item.lastReviewed?.toLocaleDateString()}
                              </p>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="outline">
                                  Review #{item.reviewCount}
                                </Badge>
                                <div className="flex items-center gap-1">
                                  <Star className="w-3 h-3 text-yellow-500" />
                                  <span className="text-xs">{item.mastery}% mastery</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <Button onClick={() => startStudy(item)}>
                            <RefreshCw className="w-4 h-4 mr-2" />
                            Review
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Brain className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No items due for review today!</p>
                  <p className="text-sm text-gray-500">Great job keeping up with your studies.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="progress" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Learning Analytics
              </CardTitle>
              <CardDescription>
                Track your progress and learning patterns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Study Distribution</h4>
                  <div className="space-y-2">
                    {['vocabulary', 'grammar', 'reading', 'listening', 'speaking', 'writing'].map(type => {
                      const count = studyHistory.filter(item => item.type === type).length
                      const percentage = studyHistory.length > 0 ? (count / studyHistory.length) * 100 : 0
                      return (
                        <div key={type} className="flex items-center justify-between">
                          <span className="capitalize">{type}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full" 
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                            <span className="text-sm text-gray-600">{count}</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3">Mastery Levels</h4>
                  <div className="space-y-2">
                    {['beginner', 'intermediate', 'advanced'].map(level => {
                      const items = studyHistory.filter(item => item.difficulty === level)
                      const avgMastery = items.length > 0 
                        ? items.reduce((sum, item) => sum + item.mastery, 0) / items.length 
                        : 0
                      return (
                        <div key={level} className="flex items-center justify-between">
                          <span className="capitalize">{level}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-green-600 h-2 rounded-full" 
                                style={{ width: `${avgMastery}%` }}
                              />
                            </div>
                            <span className="text-sm text-gray-600">{Math.round(avgMastery)}%</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col">
              <BookOpen className="w-6 h-6 mb-2" />
              <span className="text-sm">Vocabulary</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <PenTool className="w-6 h-6 mb-2" />
              <span className="text-sm">Grammar</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Volume2 className="w-6 h-6 mb-2" />
              <span className="text-sm">Listening</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Mic className="w-6 h-6 mb-2" />
              <span className="text-sm">Speaking</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 

export function TodaysFocusFullPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold mb-2">Today's Focus</h2>
      {studyItems.map((item) => (
        <Card key={item.id} className="border rounded-lg p-3 bg-white shadow-sm">
          <CardContent className="p-0">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                {getTypeIcon(item.type)}
                <span className="font-semibold text-base">{item.title}</span>
              </div>
              <Badge className={getDifficultyColor(item.difficulty)}>{item.difficulty}</Badge>
            </div>
            <div className="text-slate-700 mb-1 text-sm">{item.content}</div>
            <div className="flex flex-wrap gap-2 text-slate-500 text-xs mb-1">
              <span>{item.timeEstimate} min</span>
              {item.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
} 