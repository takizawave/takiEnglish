"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Clock, CheckCircle, X, RotateCcw, Calendar } from "lucide-react"

interface ReviewItem {
  id: string
  type: "vocabulary" | "grammar" | "example"
  content: string
  question: string
  options?: string[]
  correctAnswer: string
  difficulty: "easy" | "medium" | "hard"
  lastReviewed: string
}

export function ReviewSystem() {
  const [currentReview, setCurrentReview] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [reviewResults, setReviewResults] = useState<boolean[]>([])
  const [sessionComplete, setSessionComplete] = useState(false)

  const todayReviews: ReviewItem[] = [
    {
      id: "1",
      type: "vocabulary",
      content: "sophisticated",
      question: 'What does "sophisticated" mean?',
      options: [
        "Simple and basic",
        "Having great knowledge or experience",
        "Confused and unclear",
        "Young and inexperienced",
      ],
      correctAnswer: "Having great knowledge or experience",
      difficulty: "medium",
      lastReviewed: "2024-01-10",
    },
    {
      id: "2",
      type: "grammar",
      content: "Present Perfect",
      question: "Choose the correct sentence:",
      options: [
        "I have went to the store",
        "I have gone to the store",
        "I has gone to the store",
        "I have go to the store",
      ],
      correctAnswer: "I have gone to the store",
      difficulty: "easy",
      lastReviewed: "2024-01-08",
    },
    {
      id: "3",
      type: "example",
      content: "Business Email",
      question: 'Complete the sentence: "I would like to _____ a meeting for next week."',
      options: ["make", "do", "schedule", "create"],
      correctAnswer: "schedule",
      difficulty: "hard",
      lastReviewed: "2024-01-12",
    },
  ]

  const handleAnswer = (selectedAnswer: string) => {
    const isCorrect = selectedAnswer === todayReviews[currentReview].correctAnswer
    const newResults = [...reviewResults, isCorrect]
    setReviewResults(newResults)
    setShowAnswer(true)

    setTimeout(() => {
      if (currentReview < todayReviews.length - 1) {
        setCurrentReview(currentReview + 1)
        setShowAnswer(false)
      } else {
        setSessionComplete(true)
      }
    }, 2000)
  }

  const resetSession = () => {
    setCurrentReview(0)
    setShowAnswer(false)
    setReviewResults([])
    setSessionComplete(false)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "hard":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "vocabulary":
        return "📚"
      case "grammar":
        return "📝"
      case "example":
        return "💼"
      default:
        return "📖"
    }
  }

  if (sessionComplete) {
    const correctAnswers = reviewResults.filter(Boolean).length
    const accuracy = Math.round((correctAnswers / reviewResults.length) * 100)

    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center space-x-2">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <span>Review Session Complete!</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-center">
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="text-2xl font-bold text-blue-600">{reviewResults.length}</div>
              <div className="text-sm text-slate-600">Total Questions</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-green-600">{correctAnswers}</div>
              <div className="text-sm text-slate-600">Correct Answers</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-purple-600">{accuracy}%</div>
              <div className="text-sm text-slate-600">Accuracy</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Session Progress</span>
              <span>{accuracy}%</span>
            </div>
            <Progress value={accuracy} className="h-3" />
          </div>

          <div className="flex space-x-4 justify-center">
            <Button onClick={resetSession} variant="outline">
              <RotateCcw className="w-4 h-4 mr-2" />
              Review Again
            </Button>
            <Button>
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Next Review
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  const currentItem = todayReviews[currentReview]
  const progress = ((currentReview + 1) / todayReviews.length) * 100

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="w-5 h-5" />
            <span>Today's Review</span>
          </CardTitle>
          <CardDescription>Spaced repetition system - Review items scheduled for today</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">
                Question {currentReview + 1} of {todayReviews.length}
              </span>
              <Badge variant="outline">{Math.round(progress)}% Complete</Badge>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardContent>
      </Card>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{getTypeIcon(currentItem.type)}</span>
              <div>
                <CardTitle className="text-lg">{currentItem.content}</CardTitle>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge className={getDifficultyColor(currentItem.difficulty)}>{currentItem.difficulty}</Badge>
                  <Badge variant="outline" className="capitalize">
                    {currentItem.type}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <h3 className="text-lg font-medium mb-4">{currentItem.question}</h3>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {currentItem.options?.map((option, index) => {
              let buttonClass = "justify-start text-left h-auto p-4"

              if (showAnswer) {
                if (option === currentItem.correctAnswer) {
                  buttonClass += " bg-green-100 border-green-300 text-green-800"
                } else if (reviewResults[currentReview] === false && option !== currentItem.correctAnswer) {
                  buttonClass += " bg-red-100 border-red-300 text-red-800"
                }
              }

              return (
                <Button
                  key={index}
                  variant="outline"
                  className={buttonClass}
                  onClick={() => !showAnswer && handleAnswer(option)}
                  disabled={showAnswer}
                >
                  <span className="mr-3 font-bold text-slate-400">{String.fromCharCode(65 + index)}.</span>
                  {option}
                  {showAnswer && option === currentItem.correctAnswer && (
                    <CheckCircle className="w-4 h-4 ml-auto text-green-600" />
                  )}
                  {showAnswer && reviewResults[currentReview] === false && option !== currentItem.correctAnswer && (
                    <X className="w-4 h-4 ml-auto text-red-600" />
                  )}
                </Button>
              )
            })}
          </div>

          {showAnswer && (
            <div
              className={`p-4 rounded-lg ${
                reviewResults[currentReview] ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"
              }`}
            >
              <div className="flex items-center space-x-2 mb-2">
                {reviewResults[currentReview] ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <X className="w-5 h-5 text-red-600" />
                )}
                <span className={`font-medium ${reviewResults[currentReview] ? "text-green-800" : "text-red-800"}`}>
                  {reviewResults[currentReview] ? "Correct!" : "Incorrect"}
                </span>
              </div>
              {!reviewResults[currentReview] && (
                <p className="text-sm text-red-700">
                  The correct answer is: <strong>{currentItem.correctAnswer}</strong>
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
