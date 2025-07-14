"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { GitBranch, Clock, CheckCircle, AlertCircle, ExternalLink } from "lucide-react"

interface BuildLogEntry {
  id: string
  timestamp: string
  type: "ocr" | "lint" | "vocab" | "review"
  status: "success" | "warning" | "error"
  message: string
  details: string
  duration: number
  links?: { label: string; url: string }[]
}

export function BuildLog() {
  const buildLogs: BuildLogEntry[] = [
    {
      id: "1",
      timestamp: "2024-01-15T10:30:00Z",
      type: "ocr",
      status: "success",
      message: "OCR processing completed",
      details: "Extracted 247 words from textbook Chapter 3, processed 15 new vocabulary tokens",
      duration: 2.3,
      links: [
        { label: "View in Notion", url: "#" },
        { label: "Original Image", url: "#" },
      ],
    },
    {
      id: "2",
      timestamp: "2024-01-15T10:25:00Z",
      type: "lint",
      status: "warning",
      message: "Grammar lint found 3 issues",
      details: "Subject-verb agreement (2), Word choice suggestion (1)",
      duration: 1.8,
      links: [{ label: "View Corrections", url: "#" }],
    },
    {
      id: "3",
      timestamp: "2024-01-15T09:45:00Z",
      type: "vocab",
      status: "success",
      message: "Vocabulary sync completed",
      details: "Added 8 new tokens, updated 12 existing entries with IPA and examples",
      duration: 0.9,
      links: [{ label: "Vocabulary Dashboard", url: "#" }],
    },
    {
      id: "4",
      timestamp: "2024-01-15T08:00:00Z",
      type: "review",
      status: "success",
      message: "Daily review notification sent",
      details: "Slack DM sent with 15 items for review, 3 grammar units, 12 vocabulary tokens",
      duration: 0.2,
      links: [
        { label: "Open Slack", url: "#" },
        { label: "Review Items", url: "#" },
      ],
    },
    {
      id: "5",
      timestamp: "2024-01-14T22:15:00Z",
      type: "ocr",
      status: "error",
      message: "OCR processing failed",
      details: "Image quality too low, unable to extract text reliably",
      duration: 5.1,
      links: [{ label: "Retry Processing", url: "#" }],
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "warning":
        return <AlertCircle className="w-4 h-4 text-yellow-500" />
      case "error":
        return <AlertCircle className="w-4 h-4 text-red-500" />
      default:
        return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-50 border-green-200 text-green-800"
      case "warning":
        return "bg-yellow-50 border-yellow-200 text-yellow-800"
      case "error":
        return "bg-red-50 border-red-200 text-red-800"
      default:
        return "bg-gray-50 border-gray-200 text-gray-800"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "ocr":
        return "bg-blue-100 text-blue-800"
      case "lint":
        return "bg-purple-100 text-purple-800"
      case "vocab":
        return "bg-green-100 text-green-800"
      case "review":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <GitBranch className="w-5 h-5" />
            <span>Build Logs</span>
          </CardTitle>
          <CardDescription>
            Real-time pipeline execution logs and commit messages from your learning sessions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-slate-600">Pipeline Active</span>
              </div>
              <div className="text-slate-500">Last build: {new Date(buildLogs[0].timestamp).toLocaleString()}</div>
            </div>
            <Button variant="outline" size="sm">
              <ExternalLink className="w-4 h-4 mr-2" />
              View in Notion
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {buildLogs.map((log, index) => (
          <Card
            key={log.id}
            className={`border-l-4 ${
              log.status === "success"
                ? "border-l-green-500"
                : log.status === "warning"
                  ? "border-l-yellow-500"
                  : "border-l-red-500"
            }`}
          >
            <CardContent className="pt-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  {getStatusIcon(log.status)}
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center space-x-3">
                      <h4 className="font-medium text-slate-900">{log.message}</h4>
                      <Badge className={getTypeColor(log.type)}>{log.type.toUpperCase()}</Badge>
                      <Badge variant="outline" className={getStatusColor(log.status)}>
                        {log.status}
                      </Badge>
                    </div>

                    <p className="text-sm text-slate-600">{log.details}</p>

                    <div className="flex items-center space-x-4 text-xs text-slate-500">
                      <span>{new Date(log.timestamp).toLocaleString()}</span>
                      <span>Duration: {log.duration}s</span>
                    </div>

                    {log.links && log.links.length > 0 && (
                      <div className="flex space-x-2 mt-3">
                        {log.links.map((link, linkIndex) => (
                          <Button key={linkIndex} variant="outline" size="sm" className="text-xs h-7 bg-transparent">
                            <ExternalLink className="w-3 h-3 mr-1" />
                            {link.label}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-slate-50">
        <CardContent className="pt-4">
          <div className="text-center text-sm text-slate-600">
            <p>Pipeline logs are automatically synced to your Notion workspace</p>
            <p className="text-xs text-slate-500 mt-1">Retention: 30 days • GDPR compliant • Encrypted in transit</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
