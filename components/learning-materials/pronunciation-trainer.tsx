"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mic, MicOff, Volume2, Play, Pause, RotateCcw, Target, Award, CheckCircle, XCircle } from "lucide-react"

interface Phoneme {
  symbol: string
  description: string
  examples: string[]
  difficulty: "easy" | "medium" | "hard"
  audioUrl?: string
}

interface Word {
  word: string
  pronunciation: string
  phonemes: string[]
  difficulty: "beginner" | "intermediate" | "advanced"
  audioUrl?: string
}

interface PronunciationScore {
  overall: number
  accuracy: number
  fluency: number
  intonation: number
  feedback: string[]
}

export function PronunciationTrainer() {
  const [isRecording, setIsRecording] = useState(false)
  const [currentExercise, setCurrentExercise] = useState<"phonemes" | "words" | "sentences">("phonemes")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [scores, setScores] = useState<PronunciationScore[]>([])
  const [showResults, setShowResults] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])

  const phonemes: Phoneme[] = [
    {
      symbol: "/θ/",
      description: "Voiceless dental fricative (th in 'think')",
      examples: ["think", "three", "bath"],
      difficulty: "hard"
    },
    {
      symbol: "/ð/",
      description: "Voiced dental fricative (th in 'this')",
      examples: ["this", "that", "father"],
      difficulty: "hard"
    },
    {
      symbol: "/æ/",
      description: "Near-open front unrounded vowel (a in 'cat')",
      examples: ["cat", "hat", "map"],
      difficulty: "medium"
    },
    {
      symbol: "/ʌ/",
      description: "Open-mid back unrounded vowel (u in 'cup')",
      examples: ["cup", "luck", "bus"],
      difficulty: "medium"
    },
    {
      symbol: "/ɜː/",
      description: "Open-mid central unrounded vowel (ir in 'bird')",
      examples: ["bird", "girl", "work"],
      difficulty: "hard"
    }
  ]

  const words: Word[] = [
    {
      word: "sophisticated",
      pronunciation: "/səˈfɪstɪkeɪtɪd/",
      phonemes: ["s", "ə", "f", "ɪ", "s", "t", "ɪ", "k", "eɪ", "t", "ɪ", "d"],
      difficulty: "advanced"
    },
    {
      word: "entrepreneur",
      pronunciation: "/ˌɒntrəprəˈnɜː/",
      phonemes: ["ɒ", "n", "t", "r", "ə", "p", "r", "ə", "n", "ɜː"],
      difficulty: "advanced"
    },
    {
      word: "pronunciation",
      pronunciation: "/prəˌnʌnsiˈeɪʃən/",
      phonemes: ["p", "r", "ə", "n", "ʌ", "n", "s", "i", "eɪ", "ʃ", "ən"],
      difficulty: "intermediate"
    },
    {
      word: "technology",
      pronunciation: "/tekˈnɒlədʒi/",
      phonemes: ["t", "e", "k", "n", "ɒ", "l", "ə", "dʒ", "i"],
      difficulty: "intermediate"
    },
    {
      word: "philosophy",
      pronunciation: "/fɪˈlɒsəfi/",
      phonemes: ["f", "ɪ", "l", "ɒ", "s", "ə", "f", "i"],
      difficulty: "intermediate"
    },
    {
      word: "impenetrable",
      pronunciation: "/ɪmˈpenɪtrəbəl/",
      phonemes: ["ɪ", "m", "p", "e", "n", "ɪ", "t", "r", "ə", "b", "əl"],
      difficulty: "advanced"
    },
    {
      word: "differentiator",
      pronunciation: "/ˌdɪfəˈrenʃieɪtə/",
      phonemes: ["d", "ɪ", "f", "ə", "r", "e", "n", "ʃ", "i", "eɪ", "t", "ə"],
      difficulty: "advanced"
    },
    {
      word: "deliberation",
      pronunciation: "/dɪˌlɪbəˈreɪʃən/",
      phonemes: ["d", "ɪ", "l", "ɪ", "b", "ə", "r", "eɪ", "ʃ", "ən"],
      difficulty: "advanced"
    }
  ]

  const sentences = [
    "The quick brown fox jumps over the lazy dog.",
    "How much wood would a woodchuck chuck?",
    "She sells seashells by the seashore.",
    "Peter Piper picked a peck of pickled peppers."
  ]

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data)
      }

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' })
        analyzePronunciation(audioBlob)
      }

      mediaRecorder.start()
      setIsRecording(true)
    } catch (error) {
      console.error('Error accessing microphone:', error)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop())
      setIsRecording(false)
    }
  }

  const analyzePronunciation = (audioBlob: Blob) => {
    // Simulate pronunciation analysis
    setTimeout(() => {
      const score: PronunciationScore = {
        overall: Math.floor(Math.random() * 30) + 70, // 70-100
        accuracy: Math.floor(Math.random() * 30) + 70,
        fluency: Math.floor(Math.random() * 30) + 70,
        intonation: Math.floor(Math.random() * 30) + 70,
        feedback: [
          "Good pronunciation of the target sound",
          "Try to hold the vowel sound longer",
          "Pay attention to stress patterns"
        ]
      }
      
      setScores([...scores, score])
      
      if (currentIndex < getCurrentItems().length - 1) {
        setCurrentIndex(currentIndex + 1)
      } else {
        setShowResults(true)
      }
    }, 2000)
  }

  const getCurrentItems = () => {
    switch (currentExercise) {
      case "phonemes":
        return phonemes
      case "words":
        return words
      case "sentences":
        return sentences
      default:
        return phonemes
    }
  }

  const getCurrentItem = () => {
    const items = getCurrentItems()
    return items[currentIndex]
  }

  const playAudio = () => {
    setIsPlaying(true)
    // Simulate audio playback
    setTimeout(() => setIsPlaying(false), 2000)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
      case "beginner":
        return "bg-green-100 text-green-800 border-green-200"
      case "medium":
      case "intermediate":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "hard":
      case "advanced":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const calculateAverageScore = () => {
    if (scores.length === 0) return 0
    const total = scores.reduce((sum, score) => sum + score.overall, 0)
    return Math.round(total / scores.length)
  }

  const resetExercise = () => {
    setCurrentIndex(0)
    setScores([])
    setShowResults(false)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Mic className="w-5 h-5" />
            <span>Pronunciation Trainer</span>
          </CardTitle>
          <CardDescription>
            Practice pronunciation with phonemes, words, and sentences using voice recognition
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={currentExercise} onValueChange={(value) => {
            setCurrentExercise(value as "phonemes" | "words" | "sentences")
            resetExercise()
          }}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="phonemes">Phonemes</TabsTrigger>
              <TabsTrigger value="words">Words</TabsTrigger>
              <TabsTrigger value="sentences">Sentences</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {!showResults ? (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>
                    {currentExercise === "phonemes" && "Phoneme Practice"}
                    {currentExercise === "words" && "Word Pronunciation"}
                    {currentExercise === "sentences" && "Sentence Practice"}
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-slate-600">
                      {currentIndex + 1} of {getCurrentItems().length}
                    </span>
                    <Progress 
                      value={((currentIndex + 1) / getCurrentItems().length) * 100} 
                      className="w-24"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {currentExercise === "phonemes" && (
                  <div className="text-center space-y-4">
                    <div className="text-6xl font-bold text-blue-600">
                      {getCurrentItem().symbol}
                    </div>
                    <p className="text-lg text-slate-700">{getCurrentItem().description}</p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {getCurrentItem().examples.map((example, index) => (
                        <Badge key={index} variant="outline">
                          {example}
                        </Badge>
                      ))}
                    </div>
                    <Badge className={getDifficultyColor(getCurrentItem().difficulty)}>
                      {getCurrentItem().difficulty}
                    </Badge>
                  </div>
                )}

                {currentExercise === "words" && (
                  <div className="text-center space-y-4">
                    <div className="text-4xl font-bold text-blue-600">
                      {getCurrentItem().word}
                    </div>
                    <div className="text-2xl text-slate-600 font-mono">
                      {getCurrentItem().pronunciation}
                    </div>
                    <div className="flex flex-wrap justify-center gap-1">
                      {getCurrentItem().phonemes.map((phoneme, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {phoneme}
                        </Badge>
                      ))}
                    </div>
                    <Badge className={getDifficultyColor(getCurrentItem().difficulty)}>
                      {getCurrentItem().difficulty}
                    </Badge>
                  </div>
                )}

                {currentExercise === "sentences" && (
                  <div className="text-center space-y-4">
                    <div className="text-xl font-medium text-slate-800 leading-relaxed">
                      "{getCurrentItem()}"
                    </div>
                    <p className="text-sm text-slate-600">
                      Focus on clear pronunciation and natural rhythm
                    </p>
                  </div>
                )}

                <div className="flex justify-center space-x-4">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={playAudio}
                    disabled={isPlaying}
                  >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                    <span className="ml-2">Listen</span>
                  </Button>

                  <Button
                    size="lg"
                    onClick={isRecording ? stopRecording : startRecording}
                    className={isRecording ? "bg-red-600 hover:bg-red-700" : ""}
                  >
                    {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                    <span className="ml-2">
                      {isRecording ? "Stop Recording" : "Start Recording"}
                    </span>
                  </Button>
                </div>

                {isRecording && (
                  <div className="text-center">
                    <div className="animate-pulse text-red-600 font-medium">
                      Recording... Speak now!
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="w-5 h-5" />
                  <span>Practice Results</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    {calculateAverageScore()}%
                  </div>
                  <p className="text-slate-600">
                    Overall pronunciation score
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {scores.map((score, index) => (
                    <Card key={index} className="p-4">
                      <div className="text-center space-y-2">
                        <div className="text-2xl font-bold text-green-600">
                          {score.overall}%
                        </div>
                        <div className="text-sm text-slate-600">
                          {currentExercise === "phonemes" && `Phoneme ${index + 1}`}
                          {currentExercise === "words" && `Word ${index + 1}`}
                          {currentExercise === "sentences" && `Sentence ${index + 1}`}
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>Accuracy</span>
                            <span>{score.accuracy}%</span>
                          </div>
                          <Progress value={score.accuracy} className="h-1" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>Fluency</span>
                            <span>{score.fluency}%</span>
                          </div>
                          <Progress value={score.fluency} className="h-1" />
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">Feedback</h4>
                  {scores[0]?.feedback.map((feedback, index) => (
                    <div key={index} className="flex items-start space-x-2 p-3 bg-slate-50 rounded-lg">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                      <span className="text-sm text-slate-700">{feedback}</span>
                    </div>
                  ))}
                </div>

                <Button 
                  className="w-full" 
                  onClick={resetExercise}
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Practice Again
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-4 h-4" />
                <span>Pronunciation Goals</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Daily Practice</span>
                  <span>12/15 min</span>
                </div>
                <Progress value={80} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Weekly Accuracy</span>
                  <span>87%</span>
                </div>
                <Progress value={87} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Phonemes Mastered</span>
                  <span>24/44</span>
                </div>
                <Progress value={55} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Common Phonemes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {phonemes.slice(0, 3).map((phoneme, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-slate-50 rounded">
                    <span className="font-mono text-lg">{phoneme.symbol}</span>
                    <Badge className={getDifficultyColor(phoneme.difficulty)}>
                      {phoneme.difficulty}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tips for Better Pronunciation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <p className="text-sm text-slate-700">
                  Record yourself and compare with native speakers
                </p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <p className="text-sm text-slate-700">
                  Practice in front of a mirror to see mouth movements
                </p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <p className="text-sm text-slate-700">
                  Focus on stress patterns and intonation
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
