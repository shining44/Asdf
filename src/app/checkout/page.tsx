"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Lock, CreditCard, Truck, Check, ChevronRight, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/lib/cart-context"

export default function CheckoutPage() {
  const { items, subtotal, subscriptionDiscount, total, clearCart } = useCart()
  const [step, setStep] = useState<"information" | "shipping" | "payment" | "confirmation">("information")
  const [shippingMethod, setShippingMethod] = useState("standard")

  const shippingCost = subtotal >= 50 ? 0 : shippingMethod === "express" ? 12.99 : 5.99
  const finalTotal = total + shippingCost

  const estimatedDeliveryDate = useMemo(() => {
    const deliveryDate = new Date()
    deliveryDate.setDate(deliveryDate.getDate() + 5)
    return deliveryDate.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    })
  }, [])

  if (items.length === 0 && step !== "confirmation") {
    return (
      <div className="container py-20 text-center">
        <div className="text-6xl mb-4">🛒</div>
        <h1 className="text-2xl font-bold">Your cart is empty</h1>
        <p className="mt-2 text-muted-foreground">
          Add some products before checking out.
        </p>
        <Button className="mt-4" asChild>
          <Link href="/shop">Continue Shopping</Link>
        </Button>
      </div>
    )
  }

  const handleSubmitOrder = () => {
    // Simulate order submission
    clearCart()
    setStep("confirmation")
  }

  if (step === "confirmation") {
    return (
      <div className="container py-20">
        <div className="mx-auto max-w-lg text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="mt-6 text-2xl font-bold">Order Confirmed!</h1>
          <p className="mt-2 text-muted-foreground">
            Thank you for your order. We&apos;ll email you a confirmation with tracking
            details once your coffee is roasted and shipped.
          </p>
          <Card className="mt-8 text-left">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 text-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Truck className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Estimated Delivery</p>
                  <p className="text-muted-foreground">
                    {estimatedDeliveryDate}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button asChild>
              <Link href="/shop">Continue Shopping</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8 md:py-12">
      {/* Back Link */}
      <Link
        href="/shop"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to shopping
      </Link>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Progress Steps */}
          <div className="mb-8 flex items-center justify-between">
            {["Information", "Shipping", "Payment"].map((s, i) => {
              const stepKey = s.toLowerCase() as typeof step
              const isActive = step === stepKey
              const isPast =
                (step === "shipping" && i === 0) ||
                (step === "payment" && i < 2)
              return (
                <div key={s} className="flex items-center">
                  <div
                    className={`flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full text-xs sm:text-sm font-medium ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : isPast
                        ? "bg-green-100 text-green-600"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {isPast ? <Check className="h-3 w-3 sm:h-4 sm:w-4" /> : i + 1}
                  </div>
                  <span
                    className={`ml-1.5 sm:ml-2 text-xs sm:text-sm hidden xs:block ${
                      isActive ? "font-medium" : "text-muted-foreground"
                    }`}
                  >
                    {s}
                  </span>
                  {i < 2 && (
                    <ChevronRight className="mx-2 sm:mx-4 h-4 w-4 text-muted-foreground" />
                  )}
                </div>
              )
            })}
          </div>

          {/* Information Step */}
          {step === "information" && (
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" className="mt-1" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    className="mt-1"
                  />
                </div>

                <Separator className="my-6" />

                <h3 className="font-medium">Shipping Address</h3>

                <div>
                  <Label htmlFor="address">Street Address</Label>
                  <Input id="address" placeholder="123 Main St" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="apartment">Apartment, suite, etc. (optional)</Label>
                  <Input id="apartment" placeholder="Apt 4B" className="mt-1" />
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="New York" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input id="state" placeholder="NY" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="zip">ZIP Code</Label>
                    <Input id="zip" placeholder="10001" className="mt-1" />
                  </div>
                </div>

                <Button className="w-full mt-6" onClick={() => setStep("shipping")}>
                  Continue to Shipping
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Shipping Step */}
          {step === "shipping" && (
            <Card>
              <CardHeader>
                <CardTitle>Shipping Method</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={shippingMethod} onValueChange={setShippingMethod}>
                  <div
                    className={`flex items-center justify-between rounded-lg border p-4 cursor-pointer ${
                      shippingMethod === "standard" ? "border-primary bg-primary/5" : ""
                    }`}
                    onClick={() => setShippingMethod("standard")}
                  >
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="standard" id="standard" />
                      <Label htmlFor="standard" className="cursor-pointer">
                        <span className="font-medium">Standard Shipping</span>
                        <span className="block text-sm text-muted-foreground">
                          5-8 business days
                        </span>
                      </Label>
                    </div>
                    <span className="font-medium">
                      {subtotal >= 50 ? "Free" : "$5.99"}
                    </span>
                  </div>

                  <div
                    className={`flex items-center justify-between rounded-lg border p-4 cursor-pointer mt-3 ${
                      shippingMethod === "express" ? "border-primary bg-primary/5" : ""
                    }`}
                    onClick={() => setShippingMethod("express")}
                  >
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="express" id="express" />
                      <Label htmlFor="express" className="cursor-pointer">
                        <span className="font-medium">Express Shipping</span>
                        <span className="block text-sm text-muted-foreground">
                          2-3 business days
                        </span>
                      </Label>
                    </div>
                    <span className="font-medium">$12.99</span>
                  </div>
                </RadioGroup>

                {subtotal >= 50 && shippingMethod === "standard" && (
                  <div className="mt-4 rounded-lg bg-green-50 p-3 text-sm text-green-800">
                    <Check className="inline h-4 w-4 mr-1" />
                    You qualify for free standard shipping!
                  </div>
                )}

                <div className="mt-6 flex gap-4">
                  <Button variant="outline" onClick={() => setStep("information")}>
                    Back
                  </Button>
                  <Button className="flex-1" onClick={() => setStep("payment")}>
                    Continue to Payment
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Payment Step */}
          {step === "payment" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  Secure Payment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <div className="relative mt-1">
                    <Input
                      id="cardNumber"
                      placeholder="4242 4242 4242 4242"
                      className="pr-12"
                    />
                    <CreditCard className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input id="expiry" placeholder="MM/YY" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="cvc">CVC</Label>
                    <Input id="cvc" placeholder="123" className="mt-1" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="cardName">Name on Card</Label>
                  <Input id="cardName" placeholder="John Doe" className="mt-1" />
                </div>

                <div className="mt-6 flex gap-4">
                  <Button variant="outline" onClick={() => setStep("shipping")}>
                    Back
                  </Button>
                  <Button className="flex-1" onClick={handleSubmitOrder}>
                    Place Order - ${finalTotal.toFixed(2)}
                  </Button>
                </div>

                <p className="text-center text-xs text-muted-foreground mt-4">
                  <Lock className="inline h-3 w-3 mr-1" />
                  Your payment information is encrypted and secure
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <div>
          <Card className="sticky top-32">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Items */}
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-3">
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-muted">
                      <div className="flex h-full w-full items-center justify-center text-xl">
                        ☕
                      </div>
                      <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-xs text-secondary-foreground">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium leading-tight">{item.product.name}</p>
                      {item.product.weight && (
                        <p className="text-xs text-muted-foreground">
                          {item.product.weight}
                        </p>
                      )}
                      {item.subscriptionInterval && (
                        <Badge variant="outline" className="mt-1 text-xs">
                          {item.subscriptionInterval}
                        </Badge>
                      )}
                    </div>
                    <p className="font-medium">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <Separator />

              {/* Totals */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {subscriptionDiscount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Subscription Discount</span>
                    <span>-${subscriptionDiscount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>
                    {step === "information"
                      ? "Calculated next"
                      : shippingCost === 0
                      ? "Free"
                      : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-base">
                  <span>Total</span>
                  <span>
                    ${step === "information" ? total.toFixed(2) : finalTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Lock className="h-3 w-3" />
                  Secure Checkout
                </span>
                <span className="flex items-center gap-1">
                  <Truck className="h-3 w-3" />
                  Fast Shipping
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
