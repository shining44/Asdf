"use client"

import { useState, use } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Star, Minus, Plus, Check, Truck, RefreshCw, Shield, Coffee } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ProductCard } from "@/components/product/product-card"
import { useCart } from "@/lib/cart-context"
import { products, reviews, subscriptionPlans } from "@/lib/data"

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = use(params)
  const router = useRouter()
  const { addItem } = useCart()

  const product = products.find((p) => p.id === id)
  const [quantity, setQuantity] = useState(1)
  const [subscriptionInterval, setSubscriptionInterval] = useState<string | null>(null)

  if (!product) {
    return (
      <div className="container py-20 text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h1 className="text-2xl font-bold">Product not found</h1>
        <p className="mt-2 text-muted-foreground">
          The product you&apos;re looking for doesn&apos;t exist.
        </p>
        <Button className="mt-4" asChild>
          <Link href="/shop">Back to Shop</Link>
        </Button>
      </div>
    )
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  const productReviews = reviews.slice(0, 3)

  const discountedPrice = subscriptionInterval
    ? product.price * (1 - (subscriptionInterval === "weekly" ? 0.2 : subscriptionInterval === "biweekly" ? 0.15 : 0.1))
    : product.price

  const handleAddToCart = () => {
    addItem(
      product,
      quantity,
      subscriptionInterval as "weekly" | "biweekly" | "monthly" | null
    )
  }

  return (
    <div className="container py-8 md:py-12">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/shop" className="hover:text-foreground">
          Shop
        </Link>
        <span>/</span>
        <Link href={`/shop?category=${product.category}`} className="hover:text-foreground capitalize">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Product Image */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted">
            <div className="flex h-full w-full items-center justify-center text-9xl">
              {product.category === "coffee"
                ? "☕"
                : product.category === "equipment"
                ? "⚙️"
                : product.category === "accessories"
                ? "🎁"
                : "📦"}
            </div>
            {/* Badges */}
            <div className="absolute left-4 top-4 flex flex-col gap-2">
              {product.isNew && <Badge className="bg-green-600">New</Badge>}
              {product.isBestSeller && <Badge>Best Seller</Badge>}
              {product.originalPrice && (
                <Badge variant="destructive">
                  {Math.round((1 - product.price / product.originalPrice) * 100)}% Off
                </Badge>
              )}
            </div>
          </div>
          {/* Thumbnail Gallery Placeholder */}
          <div className="flex gap-2">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className={`aspect-square w-20 cursor-pointer overflow-hidden rounded-lg bg-muted ${
                  i === 0 ? "ring-2 ring-primary" : ""
                }`}
              >
                <div className="flex h-full w-full items-center justify-center text-2xl">
                  ☕
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          {/* Origin/Category */}
          <p className="text-sm uppercase tracking-wider text-muted-foreground">
            {product.origin || product.category}
          </p>

          {/* Title */}
          <h1 className="mt-2 text-3xl font-bold md:text-4xl">{product.name}</h1>

          {/* Weight if applicable */}
          {product.weight && (
            <p className="mt-1 text-lg text-muted-foreground">{product.weight}</p>
          )}

          {/* Rating */}
          <div className="mt-4 flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(product.rating)
                      ? "fill-primary text-primary"
                      : "fill-muted text-muted"
                  }`}
                />
              ))}
            </div>
            <span className="font-medium">{product.rating}</span>
            <span className="text-muted-foreground">
              ({product.reviewCount} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="mt-6 flex items-baseline gap-3">
            <span className="text-3xl font-bold">
              ${discountedPrice.toFixed(2)}
            </span>
            {(product.originalPrice || subscriptionInterval) && (
              <span className="text-xl text-muted-foreground line-through">
                ${(product.originalPrice || product.price).toFixed(2)}
              </span>
            )}
            {subscriptionInterval && (
              <Badge variant="secondary" className="ml-2">
                {subscriptionInterval === "weekly"
                  ? "20% off"
                  : subscriptionInterval === "biweekly"
                  ? "15% off"
                  : "10% off"}
              </Badge>
            )}
          </div>

          {/* Flavor Notes */}
          {product.flavorNotes && product.flavorNotes.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-medium">Flavor Notes</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.flavorNotes.map((note) => (
                  <Badge key={note} variant="outline">
                    {note}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Roast Level */}
          {product.roastLevel && (
            <div className="mt-4">
              <h3 className="text-sm font-medium">Roast Level</h3>
              <div className="mt-2 flex items-center gap-2">
                <div className="flex gap-1">
                  {["light", "medium", "dark"].map((level) => (
                    <div
                      key={level}
                      className={`h-3 w-8 rounded-full ${
                        (level === "light" && product.roastLevel === "light") ||
                        (level === "medium" &&
                          (product.roastLevel === "medium" ||
                            product.roastLevel === "dark")) ||
                        (level === "dark" && product.roastLevel === "dark")
                          ? "bg-secondary"
                          : "bg-muted"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm capitalize text-muted-foreground">
                  {product.roastLevel} roast
                </span>
              </div>
            </div>
          )}

          <Separator className="my-6" />

          {/* Subscription Option */}
          {product.isSubscriptionAvailable && (
            <div className="mb-6">
              <h3 className="font-medium mb-3">Purchase Options</h3>
              <RadioGroup
                value={subscriptionInterval || "one-time"}
                onValueChange={(value) =>
                  setSubscriptionInterval(value === "one-time" ? null : value)
                }
                className="space-y-3"
              >
                <div className="flex items-center space-x-3 rounded-lg border p-4">
                  <RadioGroupItem value="one-time" id="one-time" />
                  <Label htmlFor="one-time" className="flex-1 cursor-pointer">
                    <span className="font-medium">One-time purchase</span>
                    <span className="block text-sm text-muted-foreground">
                      ${product.price.toFixed(2)}
                    </span>
                  </Label>
                </div>
                {subscriptionPlans.map((plan) => (
                  <div
                    key={plan.id}
                    className={`flex items-center space-x-3 rounded-lg border p-4 ${
                      subscriptionInterval === plan.interval
                        ? "border-primary bg-primary/5"
                        : ""
                    }`}
                  >
                    <RadioGroupItem value={plan.interval} id={plan.interval} />
                    <Label htmlFor={plan.interval} className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{plan.name}</span>
                        <Badge className="bg-green-600">Save {plan.discount}%</Badge>
                      </div>
                      <span className="block text-sm text-muted-foreground">
                        ${(product.price * (1 - plan.discount / 100)).toFixed(2)} per delivery
                      </span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}

          {/* Quantity and Add to Cart */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 rounded-lg border p-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center font-medium">{quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Button size="lg" className="flex-1" onClick={handleAddToCart}>
              Add to Cart - ${(discountedPrice * quantity).toFixed(2)}
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 text-sm">
              <Truck className="h-5 w-5 text-muted-foreground" />
              <span>Free shipping over $50</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <RefreshCw className="h-5 w-5 text-muted-foreground" />
              <span>30-day returns</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Coffee className="h-5 w-5 text-muted-foreground" />
              <span>Roasted to order</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Shield className="h-5 w-5 text-muted-foreground" />
              <span>Quality guaranteed</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-16">
        <Tabs defaultValue="description">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="reviews">
              Reviews ({product.reviewCount})
            </TabsTrigger>
            <TabsTrigger value="brewing">Brewing Guide</TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-6">
            <div className="prose max-w-none">
              <p className="text-lg leading-relaxed text-muted-foreground">
                {product.longDescription || product.description}
              </p>

              {product.category === "coffee" && (
                <div className="mt-8 grid gap-6 md:grid-cols-3">
                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-medium">Origin</h4>
                      <p className="text-sm text-muted-foreground">
                        {product.origin || "Ethiopia"}
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-medium">Processing</h4>
                      <p className="text-sm text-muted-foreground">Washed</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-medium">Altitude</h4>
                      <p className="text-sm text-muted-foreground">1,800 - 2,200m</p>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <div className="space-y-6">
              {productReviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center font-semibold">
                          {review.author.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium">{review.author}</p>
                          <div className="flex items-center gap-2">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-3.5 w-3.5 ${
                                    i < review.rating
                                      ? "fill-primary text-primary"
                                      : "fill-muted text-muted"
                                  }`}
                                />
                              ))}
                            </div>
                            {review.verified && (
                              <Badge variant="outline" className="text-xs">
                                <Check className="mr-1 h-3 w-3" />
                                Verified
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {new Date(review.date).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="mt-4 text-muted-foreground">{review.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="brewing" className="mt-6">
            <div className="grid gap-8 md:grid-cols-2">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Pour Over</h3>
                  <ol className="space-y-3 text-muted-foreground">
                    <li className="flex gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                        1
                      </span>
                      <span>Grind 20g of coffee to medium-fine consistency</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                        2
                      </span>
                      <span>Heat water to 200°F (93°C)</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                        3
                      </span>
                      <span>Bloom with 40g water for 30 seconds</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                        4
                      </span>
                      <span>Pour remaining water in circular motion</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                        5
                      </span>
                      <span>Total brew time: 3-4 minutes</span>
                    </li>
                  </ol>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Espresso</h3>
                  <ol className="space-y-3 text-muted-foreground">
                    <li className="flex gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                        1
                      </span>
                      <span>Grind 18g of coffee to fine consistency</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                        2
                      </span>
                      <span>Distribute and tamp evenly</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                        3
                      </span>
                      <span>Extract at 200°F for 25-30 seconds</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                        4
                      </span>
                      <span>Target yield: 36g output</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                        5
                      </span>
                      <span>Adjust grind for rich, syrupy shot</span>
                    </li>
                  </ol>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-20">
          <h2 className="text-2xl font-bold">You May Also Like</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
