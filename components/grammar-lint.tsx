"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, CheckCircle, Loader2, MessageSquare } from "lucide-react"

interface LintError {
  before: string
  after: string
  rule: string
  explanation: string
  severity: "error" | "warning" | "suggestion"
}

export function GrammarLint() {
  const [inputText, setInputText] = useState("")
  const [isLinting, setIsLinting] = useState(false)
  const [lintResults, setLintResults] = useState<LintError[]>([])
  const [lintScore, setLintScore] = useState<number | null>(null)

  const runGrammarLint = async () => {
    if (!inputText.trim()) return

    setIsLinting(true)

    // Simulate GPT grammar checking
    setTimeout(() => {
      const mockErrors: LintError[] = [
        {
          before: "I has a pen",
          after: "I have a pen",
          rule: "Subject-Verb Agreement",
          explanation: "Use 'have' with first person singular 'I'",
          severity: "error",
        },
        {
          before: "She go to school",
          after: "She goes to school",
          rule: "Third Person Singular",
          explanation: "Add 's' to verbs with third person singular subjects",
          severity: "error",
        },
        {
          before: "very good",
          after: "excellent",
          rule: "Word Choice",
          explanation: "Consider using more specific adjectives",
          severity: "suggestion",
        },
      ]

      // Filter errors based on input text
      const relevantErrors = mockErrors.filter((error) => inputText.toLowerCase().includes(error.before.toLowerCase()))

      setLintResults(relevantErrors)
      setLintScore(Math.max(0, 100 - relevantErrors.length * 15))
      setIsLinting(false)
    }, 2000)
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "error":
        return "text-red-600 bg-red-50 border-red-200"
      case "warning":
        return "text-yellow-600 bg-yellow-50 border-yellow-200"
      case "suggestion":
        return "text-blue-600 bg-blue-50 border-blue-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "error":
        return <AlertCircle className="w-4 h-4 text-red-500" />
      case "warning":
        return <AlertCircle className="w-4 h-4 text-yellow-500" />
      case "suggestion":
        return <MessageSquare className="w-4 h-4 text-blue-500" />
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageSquare className="w-5 h-5" />
            <span>Grammar Lint</span>
          </CardTitle>
          <CardDescription>AI-powered grammar checking with detailed explanations and suggestions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Enter your English text here for grammar checking..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="min-h-[120px]"
          />

          <div className="flex items-center justify-between">
            <Button
              onClick={runGrammarLint}
              disabled={isLinting || !inputText.trim()}
              className="flex items-center space-x-2"
            >
              {isLinting ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
              <span>{isLinting ? "Linting..." : "Run Grammar Lint"}</span>
            </Button>

            {lintScore !== null && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-slate-600">Grammar Score:</span>
                <Badge
                  variant={lintScore >= 80 ? "default" : lintScore >= 60 ? "secondary" : "destructive"}
                  className="text-sm"
                >
                  {lintScore}/100
                </Badge>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {lintResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Lint Results</span>
              <Badge variant="outline">
                {lintResults.length} issue{lintResults.length !== 1 ? "s" : ""} found
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {lintResults.map((error, index) => (
              <div key={index} className={`p-4 rounded-lg border ${getSeverityColor(error.severity)}`}>
                <div className="flex items-start space-x-3">
                  {getSeverityIcon(error.severity)}
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs">
                        {error.rule}
                      </Badge>
                      <Badge variant={error.severity === "error" ? "destructive" : "secondary"} className="text-xs">
                        {error.severity}
                      </Badge>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center space-x-2 text-sm">
                        <span className="text-red-600 line-through">{error.before}</span>
                        <span className="text-slate-400">→</span>
                        <span className="text-green-600 font-medium">{error.after}</span>
                      </div>
                      <p className="text-sm text-slate-700">{error.explanation}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {lintResults.length === 0 && lintScore === 100 && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-3 text-green-800">
              <CheckCircle className="w-6 h-6" />
              <div>
                <h3 className="font-semibold">Perfect Grammar!</h3>
                <p className="text-sm text-green-700">No issues found in your text.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
