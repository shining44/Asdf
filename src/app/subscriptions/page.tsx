"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, ArrowLeft, Check, Coffee, Truck, RefreshCw, Pause, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useCart } from "@/lib/cart-context"
import { coffeeProducts, subscriptionPlans } from "@/lib/data"

const quizQuestions = [
  {
    id: "strength",
    question: "How do you like your coffee?",
    options: [
      { value: "mild", label: "Mild & Smooth", description: "Lighter roasts with subtle flavors" },
      { value: "balanced", label: "Balanced", description: "Medium roast, the best of both worlds" },
      { value: "bold", label: "Bold & Strong", description: "Dark roast with intense flavor" },
    ],
  },
  {
    id: "flavor",
    question: "What flavors do you enjoy?",
    options: [
      { value: "fruity", label: "Fruity & Floral", description: "Bright, citrusy, with berry notes" },
      { value: "chocolaty", label: "Chocolaty & Nutty", description: "Rich, smooth, with caramel hints" },
      { value: "earthy", label: "Earthy & Spiced", description: "Deep, complex, with warm spices" },
    ],
  },
  {
    id: "brewing",
    question: "How do you brew your coffee?",
    options: [
      { value: "espresso", label: "Espresso Machine", description: "Quick, concentrated shots" },
      { value: "pourover", label: "Pour Over / Drip", description: "Clean, nuanced extraction" },
      { value: "french-press", label: "French Press / Immersion", description: "Full-bodied, rich brews" },
    ],
  },
  {
    id: "frequency",
    question: "How often do you drink coffee?",
    options: [
      { value: "daily-multiple", label: "Multiple cups a day", description: "Can't start the day without it" },
      { value: "daily-one", label: "About one cup a day", description: "A cherished daily ritual" },
      { value: "few-times", label: "A few times a week", description: "Weekend coffee enthusiast" },
    ],
  },
]

const benefits = [
  { icon: Coffee, title: "Fresh Roasted", description: "Every order roasted to order" },
  { icon: Truck, title: "Free Shipping", description: "Always free on subscriptions" },
  { icon: RefreshCw, title: "Flexible Schedule", description: "Change frequency anytime" },
  { icon: Pause, title: "Easy to Manage", description: "Skip, pause, or cancel anytime" },
]

export default function SubscriptionsPage() {
  const { addItem } = useCart()
  const [showQuiz, setShowQuiz] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [selectedPlan, setSelectedPlan] = useState<string>("biweekly")
  const [recommendedProduct, setRecommendedProduct] = useState<typeof coffeeProducts[0] | null>(null)

  const currentQuestion = quizQuestions[currentStep]

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [currentQuestion.id]: value })
  }

  const handleNext = () => {
    if (currentStep < quizQuestions.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Calculate recommendation
      const recommendation = calculateRecommendation(answers)
      setRecommendedProduct(recommendation)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const calculateRecommendation = (answers: Record<string, string>) => {
    // Simple recommendation logic based on answers
    const { strength, flavor } = answers

    if (strength === "bold" || flavor === "chocolaty") {
      return coffeeProducts.find((p) => p.roastLevel === "dark") || coffeeProducts[0]
    } else if (strength === "mild" || flavor === "fruity") {
      return coffeeProducts.find((p) => p.roastLevel === "light") || coffeeProducts[0]
    } else {
      return coffeeProducts.find((p) => p.roastLevel === "medium") || coffeeProducts[0]
    }
  }

  const handleAddToCart = () => {
    if (recommendedProduct) {
      addItem(
        recommendedProduct,
        1,
        selectedPlan as "weekly" | "biweekly" | "monthly"
      )
    }
  }

  const resetQuiz = () => {
    setCurrentStep(0)
    setAnswers({})
    setRecommendedProduct(null)
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-secondary text-secondary-foreground py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4 bg-primary/20 text-primary">Subscribe & Save</Badge>
            <h1 className="text-4xl font-bold md:text-5xl">
              Fresh Coffee, Delivered on Your Schedule
            </h1>
            <p className="mt-4 text-lg text-secondary-foreground/80">
              Join thousands of coffee lovers who never run out of Tomoca&apos;s legendary Ethiopian coffee.
              Save up to 20%, get free shipping, and manage your subscription with ease.
            </p>
            <Button size="xl" className="mt-8" onClick={() => setShowQuiz(true)}>
              Find Your Perfect Coffee
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Quiz Modal / Section */}
      {showQuiz && !recommendedProduct && (
        <section className="container py-12">
          <Card className="mx-auto max-w-2xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Find Your Perfect Coffee</CardTitle>
                  <CardDescription>
                    Question {currentStep + 1} of {quizQuestions.length}
                  </CardDescription>
                </div>
                <Button variant="ghost" onClick={() => setShowQuiz(false)}>
                  Skip Quiz
                </Button>
              </div>
              {/* Progress Bar */}
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full bg-primary transition-all"
                  style={{
                    width: `${((currentStep + 1) / quizQuestions.length) * 100}%`,
                  }}
                />
              </div>
            </CardHeader>
            <CardContent>
              <h2 className="text-xl font-semibold">{currentQuestion.question}</h2>
              <RadioGroup
                value={answers[currentQuestion.id] || ""}
                onValueChange={handleAnswer}
                className="mt-6 space-y-3"
              >
                {currentQuestion.options.map((option) => (
                  <div
                    key={option.value}
                    className={`flex items-center space-x-3 rounded-lg border p-4 cursor-pointer transition-colors ${
                      answers[currentQuestion.id] === option.value
                        ? "border-primary bg-primary/5"
                        : "hover:border-muted-foreground/50"
                    }`}
                    onClick={() => handleAnswer(option.value)}
                  >
                    <RadioGroupItem value={option.value} id={option.value} />
                    <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                      <span className="font-medium">{option.label}</span>
                      <span className="block text-sm text-muted-foreground">
                        {option.description}
                      </span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 0}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button
                onClick={handleNext}
                disabled={!answers[currentQuestion.id]}
              >
                {currentStep === quizQuestions.length - 1 ? "Get Recommendation" : "Next"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </section>
      )}

      {/* Recommendation Result */}
      {recommendedProduct && (
        <section className="container py-12">
          <Card className="mx-auto max-w-3xl">
            <CardHeader className="text-center">
              <Badge className="mx-auto mb-2 bg-green-100 text-green-800">
                <Check className="mr-1 h-3 w-3" />
                Your Perfect Match
              </Badge>
              <CardTitle className="text-2xl">We Recommend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center gap-6 md:flex-row">
                <div className="aspect-square w-48 overflow-hidden rounded-xl bg-muted">
                  <div className="flex h-full w-full items-center justify-center text-7xl">
                    ☕
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <p className="text-sm uppercase tracking-wider text-muted-foreground">
                    {recommendedProduct.origin}
                  </p>
                  <h3 className="mt-1 text-2xl font-bold">{recommendedProduct.name}</h3>
                  {recommendedProduct.weight && (
                    <p className="text-muted-foreground">{recommendedProduct.weight}</p>
                  )}
                  <div className="mt-2 flex items-center justify-center gap-1 md:justify-start">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(recommendedProduct.rating)
                            ? "fill-primary text-primary"
                            : "fill-muted text-muted"
                        }`}
                      />
                    ))}
                    <span className="ml-1 text-sm text-muted-foreground">
                      ({recommendedProduct.reviewCount} reviews)
                    </span>
                  </div>
                  <p className="mt-4 text-muted-foreground">
                    {recommendedProduct.description}
                  </p>

                  {/* Flavor Notes */}
                  {recommendedProduct.flavorNotes && (
                    <div className="mt-4 flex flex-wrap justify-center gap-2 md:justify-start">
                      {recommendedProduct.flavorNotes.map((note) => (
                        <Badge key={note} variant="outline">
                          {note}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <Separator className="my-6" />

              {/* Subscription Plan Selection */}
              <div>
                <h4 className="font-medium mb-4">Choose Your Delivery Schedule</h4>
                <RadioGroup
                  value={selectedPlan}
                  onValueChange={setSelectedPlan}
                  className="grid gap-4 md:grid-cols-3"
                >
                  {subscriptionPlans.map((plan) => (
                    <div
                      key={plan.id}
                      className={`flex flex-col items-center rounded-lg border p-4 cursor-pointer transition-colors ${
                        selectedPlan === plan.interval
                          ? "border-primary bg-primary/5"
                          : "hover:border-muted-foreground/50"
                      }`}
                      onClick={() => setSelectedPlan(plan.interval)}
                    >
                      <RadioGroupItem
                        value={plan.interval}
                        id={plan.interval}
                        className="sr-only"
                      />
                      <Badge className="mb-2 bg-green-600">Save {plan.discount}%</Badge>
                      <span className="font-semibold">{plan.name}</span>
                      <span className="text-2xl font-bold text-primary mt-1">
                        ${(recommendedProduct.price * (1 - plan.discount / 100)).toFixed(2)}
                      </span>
                      <span className="text-sm text-muted-foreground">per delivery</span>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4 sm:flex-row sm:justify-between">
              <Button variant="outline" onClick={resetQuiz}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retake Quiz
              </Button>
              <Button size="lg" onClick={handleAddToCart}>
                Start Subscription
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </section>
      )}

      {/* Benefits Section */}
      <section className="container py-16">
        <h2 className="text-center text-2xl font-bold">Why Subscribe?</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => (
            <Card key={benefit.title}>
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="rounded-full bg-primary/10 p-3">
                  <benefit.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 font-semibold">{benefit.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      {/* How It Works */}
      <section className="container py-16">
        <h2 className="text-center text-2xl font-bold">How It Works</h2>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {[
            {
              step: 1,
              title: "Choose Your Coffee",
              description:
                "Take our quiz or browse our selection to find your perfect roast.",
            },
            {
              step: 2,
              title: "Set Your Schedule",
              description:
                "Pick weekly, bi-weekly, or monthly delivery. Change anytime.",
            },
            {
              step: 3,
              title: "Enjoy Fresh Coffee",
              description:
                "We roast your beans to order and ship them straight to your door.",
            },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                {item.step}
              </div>
              <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Subscription Plans Overview */}
      <section className="bg-muted/50 py-16">
        <div className="container">
          <h2 className="text-center text-2xl font-bold">Subscription Plans</h2>
          <p className="mt-2 text-center text-muted-foreground">
            Choose the delivery frequency that works for you
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {subscriptionPlans.map((plan) => (
              <Card
                key={plan.id}
                className={plan.interval === "biweekly" ? "border-primary ring-2 ring-primary" : ""}
              >
                {plan.interval === "biweekly" && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge>Most Popular</Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle>{plan.name}</CardTitle>
                  <div className="mt-2">
                    <span className="text-4xl font-bold text-primary">
                      {plan.discount}%
                    </span>
                    <span className="text-muted-foreground"> off</span>
                  </div>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground">{plan.description}</p>
                  <ul className="mt-6 space-y-2 text-sm">
                    <li className="flex items-center justify-center gap-2">
                      <Check className="h-4 w-4 text-green-600" />
                      Free shipping on every order
                    </li>
                    <li className="flex items-center justify-center gap-2">
                      <Check className="h-4 w-4 text-green-600" />
                      Cancel or pause anytime
                    </li>
                    <li className="flex items-center justify-center gap-2">
                      <Check className="h-4 w-4 text-green-600" />
                      Change coffee selection anytime
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={() => setShowQuiz(true)}>
                    Get Started
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container py-16">
        <h2 className="text-center text-2xl font-bold">Frequently Asked Questions</h2>
        <div className="mx-auto mt-10 max-w-3xl space-y-4">
          {[
            {
              q: "Can I change my coffee selection?",
              a: "Yes! You can change your coffee, grind size, or bag size at any time through your account dashboard.",
            },
            {
              q: "How do I pause or cancel my subscription?",
              a: "You can pause or cancel your subscription anytime with no fees. Just log into your account and manage your subscription settings.",
            },
            {
              q: "When will my coffee be shipped?",
              a: "We roast your coffee fresh and ship it within 1-2 business days. Your delivery date depends on your selected frequency.",
            },
            {
              q: "What if I don't like my coffee?",
              a: "We stand behind our coffee. If you're not satisfied, contact us and we'll make it right with a replacement or refund.",
            },
          ].map((faq, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <h3 className="font-semibold">{faq.q}</h3>
                <p className="mt-2 text-muted-foreground">{faq.a}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
