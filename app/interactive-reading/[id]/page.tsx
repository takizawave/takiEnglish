import { notFound } from "next/navigation"
import { readingPassages, WordDefinition, ReadingPassage } from "@/lib/reading-passages"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { BookOpen, Eye, Volume2, VolumeX, Target } from "lucide-react"
import { useState } from "react"

function getDifficultyColor(difficulty: string) {
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

function highlightVocabulary(text: string, passage: ReadingPassage, onWordClick: (word: string) => void) {
  const words = text.split(' ')
  return words.map((word, index) => {
    const cleanWord = word.replace(/[.,!?;:]/g, '')
    const isVocabulary = passage.vocabulary.some(v => v.word.toLowerCase() === cleanWord.toLowerCase())
    if (isVocabulary) {
      return (
        <span
          key={index}
          className="cursor-pointer text-blue-600 hover:text-blue-800 underline decoration-dotted"
          onClick={() => onWordClick(cleanWord)}
        >
          {word}
        </span>
      )
    }
    return <span key={index}>{word}</span>
  }).reduce((prev, curr, index) => {
    return index < words.length - 1 ? [prev, curr, ' '] : [prev, curr]
  }, [] as React.ReactNode[])
}

export default function InteractiveReadingDetailPage({ params }: { params: { id: string } }) {
  const passage = readingPassages.find(p => p.id === params.id)
  const [selectedWord, setSelectedWord] = useState<WordDefinition | null>(null)
  const [showDefinitions, setShowDefinitions] = useState(false)
  const [isReading, setIsReading] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [activeTab, setActiveTab] = useState("reading")

  if (!passage) {
    notFound()
  }

  const speakText = (text: string) => {
    if (typeof window !== "undefined" && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const utterance = new window.SpeechSynthesisUtterance(text)
      utterance.lang = 'en-US'
      utterance.rate = 0.9
      utterance.pitch = 1
      utterance.volume = isMuted ? 0 : 1
      utterance.onstart = () => setIsReading(true)
      utterance.onend = () => setIsReading(false)
      utterance.onpause = () => setIsReading(false)
      utterance.onresume = () => setIsReading(true)
      window.speechSynthesis.speak(utterance)
    }
  }

  const stopReading = () => {
    if (typeof window !== "undefined" && 'speechSynthesis' in window) {
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
            <span>Interactive Reading</span>
          </CardTitle>
          <CardDescription>
            記事の詳細ページ（URL: /interactive-reading/{params.id}）
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg mt-4">
            <div className="flex items-center space-x-4">
              <Badge className={getDifficultyColor(passage.difficulty)}>
                {passage.difficulty}
              </Badge>
              <span className="text-sm text-slate-600">
                {passage.wordCount} words • {passage.estimatedTime} min read
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="reading">Reading</TabsTrigger>
              <TabsTrigger value="quiz">Vocabulary Review</TabsTrigger>
            </TabsList>
            <TabsContent value="reading" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>{passage.title}</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowDefinitions(!showDefinitions)}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      {showDefinitions ? "Hide" : "Show"} Definitions
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={isReading ? stopReading : () => speakText(passage.content)}
                      className={isReading ? "bg-red-50 text-red-700 border-red-200" : ""}
                    >
                      {isReading ? (
                        <>
                          <VolumeX className="w-4 h-4 mr-2" />
                          Stop Reading
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-4 h-4 mr-2" />
                          Read Aloud
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={toggleMute}
                      className={isMuted ? "bg-gray-50 text-gray-700 border-gray-200" : ""}
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none">
                    <div className="text-lg leading-relaxed space-y-4">
                      {highlightVocabulary(passage.content, passage, setSelectedWord)}
                    </div>
                  </div>
                  {showDefinitions && (
                    <div className="mt-6 p-4 bg-slate-50 rounded-lg">
                      <h4 className="font-medium mb-3">Vocabulary</h4>
                      <div className="space-y-2">
                        {passage.vocabulary.map((vocab, index) => (
                          <div key={index} className="flex items-start space-x-2">
                            <Badge variant="outline" className="text-xs">
                              {vocab.difficulty}
                            </Badge>
                            <div>
                              <span className="font-medium">{vocab.word}</span>
                              <span className="text-sm text-slate-600 ml-2">[{vocab.pronunciation}]</span>
                              <p className="text-sm text-slate-700">{vocab.definition}</p>
                              <p className="text-sm italic text-slate-600">"{vocab.example}"</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="quiz" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BookOpen className="w-4 h-4" />
                    <span>Vocabulary Review</span>
                  </CardTitle>
                  <CardDescription>
                    Review all vocabulary from this passage. Click on words to hear pronunciation.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {passage.vocabulary.map((vocab, index) => (
                      <div
                        key={index}
                        className="p-4 bg-white rounded-lg border hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => {
                          setSelectedWord(vocab)
                          speakText(vocab.word)
                        }}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-semibold text-lg text-slate-900">{vocab.word}</span>
                          <Badge className={getDifficultyColor(vocab.difficulty)}>
                            {vocab.difficulty}
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-600 mb-2">[{vocab.pronunciation}]</p>
                        <p className="text-sm text-slate-700 mb-2">{vocab.definition}</p>
                        <div className="bg-slate-50 p-2 rounded text-sm italic text-slate-600">
                          "{vocab.example}"
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Study Tips</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Click on any word to hear its pronunciation</li>
                      <li>• Review difficult words more frequently</li>
                      <li>• Practice using these words in your own sentences</li>
                      <li>• Return to the reading to see words in context</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        <div className="space-y-4">
          {selectedWord && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{selectedWord.word}</CardTitle>
                <CardDescription>[{selectedWord.pronunciation}]</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-slate-700">{selectedWord.definition}</p>
                <div className="bg-slate-50 p-3 rounded-lg">
                  <p className="text-sm italic text-slate-600">"{selectedWord.example}"</p>
                </div>
                <Badge className={getDifficultyColor(selectedWord.difficulty)}>
                  {selectedWord.difficulty}
                </Badge>
              </CardContent>
            </Card>
          )}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-4 h-4" />
                <span>Reading Goals</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Daily Reading</span>
                  <span>15/20 min</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Weekly Articles</span>
                  <span>3/5 articles</span>
                </div>
                <Progress value={60} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Comprehension</span>
                  <span>85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 