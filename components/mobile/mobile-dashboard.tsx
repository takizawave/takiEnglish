"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Target, TrendingUp, BookOpen, Clock, Award, ChevronRight } from "lucide-react"

interface MobileDashboardProps {
  onTabChange: (tab: string) => void
}

export function MobileDashboard({ onTabChange }: MobileDashboardProps) {
  const todayProgress = 65
  const weeklyVelocity = 42
  const streakDays = 7

  const quickActions = [
    { label: "Process Article", icon: "📄", action: "article" },
    { label: "Review Vocab", icon: "📚", action: "vocab" },
    { label: "Grammar Check", icon: "✏️", action: "lint" },
    { label: "Take Photo", icon: "📷", action: "ocr" },
  ]

  const recentActivity = [
    { type: "article", title: "AI Technology Article", time: "2 hours ago", status: "completed" },
    { type: "review", title: "Vocabulary Review", time: "4 hours ago", status: "completed" },
    { type: "grammar", title: "Grammar Check", time: "1 day ago", status: "completed" },
  ]

  return (
    <div className="space-y-4 pb-20">
      {/* Today's Progress */}
      <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-blue-900 flex items-center space-x-2 text-lg">
            <Target className="w-5 h-5" />
            <span>Today's Progress</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-blue-700">Daily Goal</span>
              <span className="text-sm font-medium text-blue-900">{todayProgress}%</span>
            </div>
            <Progress value={todayProgress} className="h-3" />
            <div className="flex justify-between text-xs text-blue-600">
              <span>39 min completed</span>
              <span>21 min remaining</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="pt-4">
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-green-600">{weeklyVelocity}</div>
              <div className="text-xs text-slate-600">Weekly Points</div>
              <Badge variant="outline" className="text-xs bg-green-50 text-green-700">
                +12% this week
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-orange-600">{streakDays}</div>
              <div className="text-xs text-slate-600">Day Streak</div>
              <Badge variant="outline" className="text-xs bg-orange-50 text-orange-700">
                🔥 On fire!
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-16 flex flex-col space-y-1 bg-transparent"
                onClick={() => onTabChange(action.action)}
              >
                <span className="text-xl">{action.icon}</span>
                <span className="text-xs">{action.label}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Learning Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center space-x-2">
            <TrendingUp className="w-5 h-5" />
            <span>This Week</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <span className="text-sm">Articles Processed</span>
              </div>
              <span className="font-medium">12</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Award className="w-4 h-4 text-green-600" />
                <span className="text-sm">Vocabulary Learned</span>
              </div>
              <span className="font-medium">47</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-purple-600" />
                <span className="text-sm">Study Time</span>
              </div>
              <span className="font-medium">4.2h</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium text-sm">{activity.title}</p>
                  <p className="text-xs text-slate-600">{activity.time}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-xs bg-green-50 text-green-700">
                    {activity.status}
                  </Badge>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
