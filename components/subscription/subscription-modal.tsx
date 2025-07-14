"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Crown, Zap, Star } from "lucide-react"
import { useAuth } from "@/components/auth/auth-provider"

interface SubscriptionModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const plans = [
  {
    name: "Free",
    price: "¥0",
    period: "/month",
    description: "Perfect for getting started",
    features: [
      "5 articles per month",
      "Basic vocabulary tracking",
      "Grammar lint (10 checks/day)",
      "Community support",
    ],
    limitations: ["Limited article processing", "Basic analytics", "No priority support"],
    tier: "free" as const,
    popular: false,
  },
  {
    name: "Pro",
    price: "¥980",
    period: "/month",
    description: "For serious learners",
    features: [
      "Unlimited articles",
      "Advanced vocabulary system",
      "Unlimited grammar lint",
      "Progress analytics",
      "Slack integration",
      "Priority support",
      "Export to Anki/Notion",
    ],
    limitations: [],
    tier: "pro" as const,
    popular: true,
  },
  {
    name: "Enterprise",
    price: "¥2,980",
    period: "/month",
    description: "For teams and organizations",
    features: [
      "Everything in Pro",
      "Team management",
      "Custom integrations",
      "Advanced analytics",
      "API access",
      "Dedicated support",
      "Custom branding",
    ],
    limitations: [],
    tier: "enterprise" as const,
    popular: false,
  },
]

export function SubscriptionModal({ open, onOpenChange }: SubscriptionModalProps) {
  const { profile } = useAuth()
  const [loading, setLoading] = useState<string | null>(null)

  const handleUpgrade = async (tier: string) => {
    setLoading(tier)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Here you would integrate with Stripe or other payment processor
    console.log(`Upgrading to ${tier}`)

    setLoading(null)
    onOpenChange(false)
  }

  const getPlanIcon = (tier: string) => {
    switch (tier) {
      case "free":
        return <Star className="w-5 h-5" />
      case "pro":
        return <Zap className="w-5 h-5" />
      case "enterprise":
        return <Crown className="w-5 h-5" />
      default:
        return <Star className="w-5 h-5" />
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Choose Your Learning Plan</DialogTitle>
          <DialogDescription>
            Unlock the full potential of Learning Platform v0.91 with advanced features
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {plans.map((plan) => (
            <Card
              key={plan.tier}
              className={`relative ${plan.popular ? "border-blue-500 shadow-lg scale-105" : "border-gray-200"}`}
            >
              {plan.popular && (
                <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-blue-500">Most Popular</Badge>
              )}

              <CardHeader className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  {getPlanIcon(plan.tier)}
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                </div>
                <div className="flex items-baseline justify-center space-x-1">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-gray-500">{plan.period}</span>
                </div>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  className="w-full"
                  variant={plan.tier === profile?.subscription_tier ? "outline" : "default"}
                  disabled={plan.tier === profile?.subscription_tier || loading === plan.tier}
                  onClick={() => handleUpgrade(plan.tier)}
                >
                  {loading === plan.tier
                    ? "Processing..."
                    : plan.tier === profile?.subscription_tier
                      ? "Current Plan"
                      : plan.tier === "free"
                        ? "Current Plan"
                        : `Upgrade to ${plan.name}`}
                </Button>

                {plan.tier === "pro" && (
                  <div className="text-center">
                    <p className="text-xs text-gray-500">7-day free trial</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold mb-2">All plans include:</h4>
          <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <Check className="w-3 h-3 text-green-500" />
              <span>Secure data storage</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-3 h-3 text-green-500" />
              <span>GDPR compliant</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-3 h-3 text-green-500" />
              <span>Mobile responsive</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-3 h-3 text-green-500" />
              <span>Regular updates</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
