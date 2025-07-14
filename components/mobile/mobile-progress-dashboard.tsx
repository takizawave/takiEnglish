"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Calendar, Award } from "lucide-react"

export function MobileProgressDashboard() {
  const weeklyData = [
    { day: "Mon", completed: 8, target: 10 },
    { day: "Tue", completed: 12, target: 10 },
    { day: "Wed", completed: 6, target: 10 },
    { day: "Thu", completed: 15, target: 10 },
    { day: "Fri", completed: 9, target: 10 },
    { day: "Sat", completed: 4, target: 8 },
    { day: "Sun", completed: 7, target: 8 },
  ]

  const achievements = [
    { title: "7-Day Streak", description: "Completed daily reviews for a week", earned: true },
    { title: "Grammar Master", description: "Achieved 90% accuracy in grammar lint", earned: true },
    { title: "Vocabulary Builder", description: "Added 50+ tokens to your collection", earned: false },
    { title: "Speed Learner", description: "Completed 100 reviews in a day", earned: false },
  ]

  const totalCompleted = weeklyData.reduce((sum, day) => sum + day.completed, 0)
  const totalTarget = weeklyData.reduce((sum, day) => sum + day.target, 0)
  const weeklyProgress = Math.round((totalCompleted / totalTarget) * 100)

  return (
    <div className="space-y-4 pb-20">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-lg">
            <TrendingUp className="w-5 h-5" />
            <span>Weekly Progress</span>
          </CardTitle>
          <CardDescription>Your learning velocity and consistency this week</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-600">Overall Progress</span>
            <span className="text-sm font-medium">{weeklyProgress}%</span>
          </div>
          <Progress value={weeklyProgress} className="h-3" />

          <div className="grid grid-cols-7 gap-1 mt-4">
            {weeklyData.map((day, index) => (
              <div key={index} className="text-center space-y-2">
                <div className="text-xs text-slate-600">{day.day}</div>
                <div className="relative">
                  <div className="w-full bg-slate-200 rounded-full h-12 flex items-end justify-center">
                    <div
                      className={`w-full rounded-full transition-all duration-300 ${
                        day.completed >= day.target ? "bg-green-500" : "bg-blue-500"
                      }`}
                      style={{ height: `${Math.min((day.completed / day.target) * 100, 100)}%` }}
                    />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-medium text-white">{day.completed}</span>
                  </div>
                </div>
                <div className="text-xs text-slate-500">/{day.target}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-lg">
            <Award className="w-5 h-5" />
            <span>Achievements</span>
          </CardTitle>
          <CardDescription>Unlock badges as you progress through your learning journey</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className={`flex items-center space-x-3 p-3 rounded-lg border ${
                achievement.earned ? "bg-yellow-50 border-yellow-200" : "bg-slate-50 border-slate-200"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  achievement.earned ? "bg-yellow-500 text-white" : "bg-slate-300 text-slate-500"
                }`}
              >
                <Award className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <h4 className={`font-medium text-sm ${achievement.earned ? "text-yellow-800" : "text-slate-600"}`}>
                  {achievement.title}
                </h4>
                <p className={`text-xs ${achievement.earned ? "text-yellow-700" : "text-slate-500"}`}>
                  {achievement.description}
                </p>
              </div>
              {achievement.earned && <Badge className="bg-yellow-500 text-white text-xs">Earned</Badge>}
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-lg">
            <Calendar className="w-5 h-5" />
            <span>Learning Metrics</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center space-y-2 p-3 bg-blue-50 rounded-lg">
              <div className="text-xl font-bold text-blue-600">247</div>
              <div className="text-xs text-slate-600">Total Tokens</div>
            </div>
            <div className="text-center space-y-2 p-3 bg-green-50 rounded-lg">
              <div className="text-xl font-bold text-green-600">89%</div>
              <div className="text-xs text-slate-600">Avg. Accuracy</div>
            </div>
            <div className="text-center space-y-2 p-3 bg-purple-50 rounded-lg">
              <div className="text-xl font-bold text-purple-600">12</div>
              <div className="text-xs text-slate-600">Day Streak</div>
            </div>
            <div className="text-center space-y-2 p-3 bg-orange-50 rounded-lg">
              <div className="text-xl font-bold text-orange-600">4.2h</div>
              <div className="text-xs text-slate-600">This Week</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
