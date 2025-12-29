import Link from "next/link"
import { ArrowRight, Coffee, Truck, Award, RefreshCw, Star, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ProductCard } from "@/components/product/product-card"
import { featuredProducts, reviews } from "@/lib/data"

const features = [
  {
    icon: Coffee,
    title: "Roasted Fresh",
    description: "Every order is roasted to order using our 70+ year Italian technique.",
  },
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Complimentary shipping on all orders over $50.",
  },
  {
    icon: Award,
    title: "Premium Quality",
    description: "100% Ethiopian Arabica beans from the finest highland regions.",
  },
  {
    icon: RefreshCw,
    title: "Subscribe & Save",
    description: "Up to 20% off with our flexible subscription plans.",
  },
]

const categoryCards = [
  {
    title: "Coffee Beans",
    description: "Our legendary roasts",
    image: "☕",
    href: "/shop?category=coffee",
    bgClass: "bg-gradient-to-br from-amber-100 to-orange-50",
  },
  {
    title: "Equipment",
    description: "Brew like a pro",
    image: "⚙️",
    href: "/shop?category=equipment",
    bgClass: "bg-gradient-to-br from-stone-100 to-stone-50",
  },
  {
    title: "Gift Sets",
    description: "Perfect presents",
    image: "🎁",
    href: "/shop?category=gifts",
    bgClass: "bg-gradient-to-br from-rose-100 to-pink-50",
  },
]

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-secondary text-secondary-foreground">
        <div className="absolute inset-0 bg-[url('/images/coffee-pattern.png')] opacity-5" />
        <div className="container relative py-20 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4 bg-primary/20 text-primary hover:bg-primary/30">
              Est. 1953 in Addis Ababa
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
              Ethiopia&apos;s Legendary
              <span className="block text-primary">Coffee Experience</span>
            </h1>
            <p className="mt-6 text-lg text-secondary-foreground/80 md:text-xl">
              For over 70 years, Tomoca has been serving the finest Ethiopian coffee.
              Now, experience our legendary Harar roast delivered fresh to your door.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="xl" asChild>
                <Link href="/shop">
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="xl" variant="outline" className="border-secondary-foreground/20 hover:bg-secondary-foreground/10" asChild>
                <Link href="/subscriptions">Start Subscription</Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-secondary-foreground/60">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <span>4.9/5 from 2,000+ reviews</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Ships worldwide</span>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
          >
            <path
              d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="hsl(var(--background))"
            />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div key={feature.title} className="flex items-start gap-4">
              <div className="rounded-lg bg-primary/10 p-3">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">{feature.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Separator />

      {/* Category Cards */}
      <section className="container py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Shop by Category</h2>
          <p className="mt-2 text-muted-foreground">
            Everything you need for the perfect cup
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {categoryCards.map((category) => (
            <Link key={category.title} href={category.href}>
              <Card className={`group h-48 overflow-hidden transition-all hover:shadow-lg ${category.bgClass}`}>
                <CardContent className="flex h-full items-center justify-between p-6">
                  <div>
                    <h3 className="text-xl font-bold">{category.title}</h3>
                    <p className="mt-1 text-muted-foreground">{category.description}</p>
                    <Button variant="link" className="mt-4 p-0">
                      Shop now <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                  <div className="text-7xl transition-transform group-hover:scale-110">
                    {category.image}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-muted/50 py-16">
        <div className="container">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold">Best Sellers</h2>
              <p className="mt-2 text-muted-foreground">
                Our most loved products, trusted by thousands
              </p>
            </div>
            <Button variant="outline" asChild className="hidden md:flex">
              <Link href="/shop">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Button asChild>
              <Link href="/shop">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Heritage Section */}
      <section className="container py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted">
            <div className="flex h-full w-full items-center justify-center">
              <div className="text-center">
                <div className="text-9xl">🏛️</div>
                <p className="mt-4 text-sm text-muted-foreground">Historic Tomoca Café, Piazza District</p>
              </div>
            </div>
          </div>
          <div>
            <Badge className="mb-4">Our Heritage</Badge>
            <h2 className="text-3xl font-bold md:text-4xl">
              70+ Years of Ethiopian Coffee Excellence
            </h2>
            <div className="mt-6 space-y-4 text-muted-foreground">
              <p>
                In 1953, on a quiet corner of Addis Ababa&apos;s Piazza district, Tomoca opened its doors
                and changed Ethiopian coffee culture forever. We were the first to bring Italian roasting
                techniques to Ethiopia&apos;s legendary beans.
              </p>
              <p>
                Today, that same dedication to quality lives on. Every batch of Tomoca coffee is still
                roasted using the techniques passed down through three generations, ensuring every cup
                captures the bold, rich character that made us legendary.
              </p>
              <p>
                From our iconic standing-room cafés in Addis Ababa to coffee lovers around the world,
                we&apos;re proud to share Ethiopia&apos;s coffee heritage with you.
              </p>
            </div>
            <Button className="mt-8" asChild>
              <Link href="/about">
                Discover Our Story
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Subscription CTA */}
      <section className="bg-secondary text-secondary-foreground">
        <div className="container py-20">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4 bg-primary/20 text-primary">Subscribe & Save</Badge>
            <h2 className="text-3xl font-bold md:text-4xl">
              Never Run Out of Great Coffee
            </h2>
            <p className="mt-4 text-secondary-foreground/80">
              Join thousands of coffee lovers who get fresh Tomoca beans delivered on their schedule.
              Save up to 20%, get free shipping, and skip or cancel anytime.
            </p>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {[
                { discount: "10%", interval: "Monthly", popular: false },
                { discount: "15%", interval: "Every 2 Weeks", popular: true },
                { discount: "20%", interval: "Weekly", popular: false },
              ].map((plan) => (
                <Card
                  key={plan.interval}
                  className={`relative ${plan.popular ? "border-primary ring-2 ring-primary" : ""}`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge>Most Popular</Badge>
                    </div>
                  )}
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl font-bold text-primary">{plan.discount}</div>
                    <div className="mt-1 text-sm text-muted-foreground">off every order</div>
                    <Separator className="my-4" />
                    <div className="font-medium">{plan.interval}</div>
                    <div className="mt-1 text-sm text-muted-foreground">delivery</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Button size="xl" className="mt-10" asChild>
              <Link href="/subscriptions">
                Start Your Subscription
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="container py-20">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Loved by Coffee Enthusiasts</h2>
          <p className="mt-2 text-muted-foreground">
            See what our customers are saying
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.slice(0, 3).map((review) => (
            <Card key={review.id}>
              <CardContent className="p-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < review.rating ? "fill-primary text-primary" : "fill-muted text-muted"
                      }`}
                    />
                  ))}
                </div>
                <p className="mt-4 text-muted-foreground">&ldquo;{review.content}&rdquo;</p>
                <div className="mt-4 flex items-center gap-2">
                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center font-semibold text-muted-foreground">
                    {review.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium">{review.author}</p>
                    {review.verified && (
                      <p className="text-xs text-muted-foreground">Verified Buyer</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button variant="outline" asChild>
            <Link href="/reviews">Read All Reviews</Link>
          </Button>
        </div>
      </section>

      {/* Instagram/Social Section */}
      <section className="bg-muted/50 py-16">
        <div className="container text-center">
          <h2 className="text-2xl font-bold">Follow @TomocaCoffee</h2>
          <p className="mt-2 text-muted-foreground">
            Join our community of coffee lovers
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="aspect-square overflow-hidden rounded-lg bg-muted">
                <div className="flex h-full w-full items-center justify-center text-4xl">
                  ☕
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
