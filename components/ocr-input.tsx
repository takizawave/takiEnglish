"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Camera, Upload, Loader2, CheckCircle } from "lucide-react"

export function OCRInput() {
  const [ocrText, setOcrText] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [processedResult, setProcessedResult] = useState<any>(null)

  const handleImageUpload = async () => {
    setIsProcessing(true)

    // Simulate OCR processing
    setTimeout(() => {
      const mockOcrText = `Chapter 3: Present Perfect Tense

The present perfect tense is used to describe actions that happened at an unspecified time in the past or actions that started in the past and continue to the present.

Formation: Subject + have/has + past participle

Examples:
- I have studied English for five years.
- She has visited Japan twice.
- They have never seen this movie.

Common time expressions:
- already, yet, just, ever, never, since, for`

      setOcrText(mockOcrText)
      setIsProcessing(false)

      // Auto-process after OCR
      setTimeout(() => {
        processText(mockOcrText)
      }, 1000)
    }, 2000)
  }

  const processText = async (text: string) => {
    setIsProcessing(true)

    // Simulate GPT processing
    setTimeout(() => {
      const result = {
        summary: "Present Perfect Tense usage and formation with examples and time expressions",
        tokens: [
          {
            word: "present perfect",
            ipa: "/ˈprezənt ˈpɜːrfɪkt/",
            definition: "A verb tense expressing completed action",
          },
          {
            word: "past participle",
            ipa: "/pæst pɑːrˈtɪsəpəl/",
            definition: "The form of a verb used in perfect tenses",
          },
          { word: "unspecified", ipa: "/ʌnˈspesəˌfaɪd/", definition: "Not clearly defined or stated" },
        ],
        category: "Grammar",
        difficulty: "Intermediate",
        estimatedTime: "15 minutes",
      }

      setProcessedResult(result)
      setIsProcessing(false)
    }, 3000)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Camera className="w-5 h-5" />
            <span>OCR Text Input</span>
          </CardTitle>
          <CardDescription>
            Upload textbook images or paste text for processing through the learning pipeline
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-4">
            <Button onClick={handleImageUpload} disabled={isProcessing} className="flex items-center space-x-2">
              {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
              <span>Simulate Image Upload</span>
            </Button>
            <Badge variant="outline" className="flex items-center space-x-1">
              <span>Pipeline: OCR → GPT → Notion</span>
            </Badge>
          </div>

          <Textarea
            placeholder="OCR extracted text will appear here..."
            value={ocrText}
            onChange={(e) => setOcrText(e.target.value)}
            className="min-h-[200px] font-mono text-sm"
          />

          {ocrText && !processedResult && (
            <Button onClick={() => processText(ocrText)} disabled={isProcessing} variant="outline">
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Processing with GPT...
                </>
              ) : (
                "Process Text"
              )}
            </Button>
          )}
        </CardContent>
      </Card>

      {processedResult && (
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-green-800">
              <CheckCircle className="w-5 h-5" />
              <span>Processing Complete</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-green-800 mb-2">Summary</h4>
              <p className="text-green-700 text-sm">{processedResult.summary}</p>
            </div>

            <div>
              <h4 className="font-semibold text-green-800 mb-2">Extracted Tokens</h4>
              <div className="space-y-2">
                {processedResult.tokens.map((token: any, index: number) => (
                  <div key={index} className="bg-white p-3 rounded-lg border">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-slate-900">{token.word}</span>
                      <span className="text-sm text-slate-600">{token.ipa}</span>
                    </div>
                    <p className="text-sm text-slate-700">{token.definition}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex space-x-4 text-sm">
              <Badge variant="secondary">{processedResult.category}</Badge>
              <Badge variant="outline">{processedResult.difficulty}</Badge>
              <Badge variant="outline">{processedResult.estimatedTime}</Badge>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
