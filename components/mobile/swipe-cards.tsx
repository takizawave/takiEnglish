"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Volume2, CheckCircle, X } from "lucide-react"

interface SwipeCard {
  id: string
  word: string
  ipa: string
  definition: string
  example: string
  difficulty: "beginner" | "intermediate" | "advanced"
}

interface SwipeCardsProps {
  cards: SwipeCard[]
  onAnswer: (cardId: string, correct: boolean) => void
}

export function SwipeCards({ cards, onAnswer }: SwipeCardsProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)

  const currentCard = cards[currentIndex]

  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setShowAnswer(false)
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      setShowAnswer(false)
    }
  }

  const handleAnswer = (correct: boolean) => {
    onAnswer(currentCard.id, correct)
    setTimeout(() => {
      handleNext()
    }, 1000)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800"
      case "intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (!currentCard) return null

  return (
    <div className="max-w-md mx-auto">
      {/* Progress indicator */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm text-slate-600">
          {currentIndex + 1} of {cards.length}
        </span>
        <div className="flex space-x-1">
          {cards.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === currentIndex ? "bg-blue-600" : index < currentIndex ? "bg-green-500" : "bg-slate-200"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Card */}
      <Card className="min-h-[400px] relative overflow-hidden">
        <CardHeader className="text-center pb-4">
          <div className="flex items-center justify-between mb-2">
            <Badge className={getDifficultyColor(currentCard.difficulty)}>{currentCard.difficulty}</Badge>
            <Button variant="ghost" size="sm">
              <Volume2 className="w-4 h-4" />
            </Button>
          </div>
          <CardTitle className="text-2xl font-bold text-slate-900">{currentCard.word}</CardTitle>
          <p className="text-slate-600">{currentCard.ipa}</p>
        </CardHeader>

        <CardContent className="text-center space-y-6">
          {!showAnswer ? (
            <div className="space-y-4">
              <p className="text-lg text-slate-700">Do you know this word?</p>
              <Button onClick={() => setShowAnswer(true)} className="w-full">
                Show Definition
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-lg">
                <p className="font-medium text-slate-900 mb-2">{currentCard.definition}</p>
                <p className="text-sm text-slate-600 italic">"{currentCard.example}"</p>
              </div>

              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  className="flex-1 border-red-200 text-red-700 hover:bg-red-50 bg-transparent"
                  onClick={() => handleAnswer(false)}
                >
                  <X className="w-4 h-4 mr-2" />
                  Don't Know
                </Button>
                <Button className="flex-1 bg-green-600 hover:bg-green-700" onClick={() => handleAnswer(true)}>
                  <CheckCircle className="w-4 h-4 mr-2" />I Know It
                </Button>
              </div>
            </div>
          )}
        </CardContent>

        {/* Navigation arrows */}
        <div className="absolute top-1/2 left-2 transform -translate-y-1/2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="rounded-full w-8 h-8 p-0"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
        </div>
        <div className="absolute top-1/2 right-2 transform -translate-y-1/2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleNext}
            disabled={currentIndex === cards.length - 1}
            className="rounded-full w-8 h-8 p-0"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    </div>
  )
}
