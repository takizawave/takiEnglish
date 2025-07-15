import Link from "next/link"
import { readingPassages } from "@/lib/reading-passages"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen } from "lucide-react"

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

export default function InteractiveReadingListPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5" />
            <span>Interactive Reading</span>
          </CardTitle>
          <CardDescription>
            記事を選択してください（各記事は個別のURLを持ちます）
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {readingPassages.map((passage) => (
              <Link
                key={passage.id}
                href={`/interactive-reading/${passage.id}`}
                className="block"
              >
                <div
                  className={
                    `p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md border-slate-200 hover:border-blue-400 bg-white`
                  }
                >
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-semibold text-slate-900 line-clamp-2">{passage.title}</h4>
                    <Badge className={getDifficultyColor(passage.difficulty)}>
                      {passage.difficulty}
                    </Badge>
                  </div>
                  <div className="space-y-2 text-sm text-slate-600">
                    <div className="flex items-center space-x-4">
                      <span>{passage.wordCount} words</span>
                      <span>•</span>
                      <span>{passage.estimatedTime} min read</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <BookOpen className="w-4 h-4" />
                      <span>{passage.vocabulary.length} vocabulary words</span>
                    </div>
                  </div>
                  <div className="mt-3 text-xs text-slate-500 line-clamp-2">
                    {passage.content.substring(0, 120)}...
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 