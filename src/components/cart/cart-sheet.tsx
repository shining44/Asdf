"use client"

import Link from "next/link"
import { Minus, Plus, X, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/lib/cart-context"
import { Badge } from "@/components/ui/badge"

export function CartSheet() {
  const {
    items,
    isOpen,
    setCartOpen,
    removeItem,
    updateQuantity,
    subtotal,
    subscriptionDiscount,
    total,
  } = useCart()

  const freeShippingThreshold = 50
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal)

  return (
    <Sheet open={isOpen} onOpenChange={setCartOpen}>
      <SheetContent className="flex w-full flex-col sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Your Cart ({items.length} {items.length === 1 ? "item" : "items"})
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4">
            <div className="rounded-full bg-muted p-6">
              <ShoppingBag className="h-10 w-10 text-muted-foreground" />
            </div>
            <div className="text-center">
              <h3 className="font-semibold">Your cart is empty</h3>
              <p className="text-sm text-muted-foreground">
                Add some delicious Ethiopian coffee to get started.
              </p>
            </div>
            <Button onClick={() => setCartOpen(false)} asChild>
              <Link href="/shop">Start Shopping</Link>
            </Button>
          </div>
        ) : (
          <>
            {/* Free Shipping Progress */}
            {amountToFreeShipping > 0 && (
              <div className="rounded-lg bg-muted p-3">
                <p className="text-sm">
                  Add <span className="font-semibold">${amountToFreeShipping.toFixed(2)}</span> more
                  for free shipping!
                </p>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-background">
                  <div
                    className="h-full bg-primary transition-all"
                    style={{
                      width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%`,
                    }}
                  />
                </div>
              </div>
            )}
            {amountToFreeShipping <= 0 && (
              <div className="rounded-lg bg-green-50 p-3 text-green-800">
                <p className="text-sm font-medium">You&apos;ve unlocked free shipping!</p>
              </div>
            )}

            {/* Cart Items */}
            <div className="flex-1 overflow-auto py-4">
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-4">
                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                      <div className="flex h-full w-full items-center justify-center text-2xl">
                        ☕
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between">
                        <div>
                          <h4 className="font-medium leading-tight">{item.product.name}</h4>
                          {item.product.weight && (
                            <p className="text-sm text-muted-foreground">
                              {item.product.weight}
                            </p>
                          )}
                          {item.subscriptionInterval && (
                            <Badge variant="secondary" className="mt-1">
                              {item.subscriptionInterval === "weekly"
                                ? "Weekly (-20%)"
                                : item.subscriptionInterval === "biweekly"
                                ? "Bi-weekly (-15%)"
                                : "Monthly (-10%)"}
                            </Badge>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => removeItem(item.product.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity - 1)
                            }
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity + 1)
                            }
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <p className="font-medium">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cart Summary */}
            <div className="space-y-4 border-t pt-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {subscriptionDiscount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Subscription Discount</span>
                    <span>-${subscriptionDiscount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>{subtotal >= freeShippingThreshold ? "Free" : "Calculated at checkout"}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <Button className="w-full" size="lg" asChild>
                <Link href="/checkout" onClick={() => setCartOpen(false)}>
                  Checkout
                </Link>
              </Button>
              <Button variant="outline" className="w-full" onClick={() => setCartOpen(false)}>
                Continue Shopping
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
