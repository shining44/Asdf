import Link from "next/link"
import { ArrowRight, Award, Coffee, Globe, Heart, Leaf, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const timeline = [
  {
    year: "1953",
    title: "The Beginning",
    description:
      "Tomoca opens its doors in Addis Ababa's Piazza district, becoming the first to roast and serve Ethiopian coffee locally using Italian techniques.",
  },
  {
    year: "1960s",
    title: "Growing Reputation",
    description:
      "Word spreads about Tomoca's exceptional coffee. The café becomes a gathering place for intellectuals, artists, and coffee lovers.",
  },
  {
    year: "1974-1991",
    title: "Surviving Hardship",
    description:
      "Through the Derg regime's challenging years, Tomoca perseveres, keeping the tradition of quality coffee alive for loyal customers.",
  },
  {
    year: "1990s",
    title: "Expansion Begins",
    description:
      "With economic liberalization, Tomoca expands beyond the original café, opening new locations across Addis Ababa.",
  },
  {
    year: "2015",
    title: "Tokyo Opening",
    description:
      "Tomoca opens its first international café in Tokyo, Japan, introducing Ethiopian coffee culture to Asia.",
  },
  {
    year: "2020",
    title: "Nairobi Launch",
    description:
      "The first African location outside Ethiopia opens at Two Rivers Mall in Nairobi, Kenya.",
  },
  {
    year: "Today",
    title: "Global Reach",
    description:
      "Now shipping worldwide, Tomoca brings its legendary 70+ year coffee heritage to coffee lovers everywhere.",
  },
]

const values = [
  {
    icon: Coffee,
    title: "Quality First",
    description:
      "We source only the finest 100% Ethiopian Arabica beans from the highland regions of Harar, Yirgacheffe, and Sidamo.",
  },
  {
    icon: Heart,
    title: "Tradition & Heritage",
    description:
      "Our Italian roasting techniques have been passed down through three generations, preserving our legendary taste.",
  },
  {
    icon: Leaf,
    title: "Sustainability",
    description:
      "We work directly with Ethiopian farmers, ensuring fair prices and supporting sustainable farming practices.",
  },
  {
    icon: Users,
    title: "Community",
    description:
      "Coffee is about connection. Our cafés are gathering places where conversations happen over the perfect cup.",
  },
]

const stats = [
  { value: "70+", label: "Years of Excellence" },
  { value: "20+", label: "Locations Worldwide" },
  { value: "1M+", label: "Cups Served Annually" },
  { value: "100%", label: "Ethiopian Arabica" },
]

export default function AboutPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-secondary text-secondary-foreground py-20 md:py-32">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4 bg-primary/20 text-primary">Our Story</Badge>
            <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl">
              Ethiopia&apos;s Coffee Legacy,
              <span className="block text-primary">Since 1953</span>
            </h1>
            <p className="mt-6 text-lg text-secondary-foreground/80">
              From a small corner café in Addis Ababa&apos;s Piazza district to coffee lovers
              around the world, Tomoca has been sharing Ethiopia&apos;s legendary coffee
              heritage for over seven decades.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-b">
        <div className="container py-12">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl font-bold text-primary md:text-5xl">
                  {stat.value}
                </div>
                <div className="mt-2 text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Origin Story */}
      <section className="container py-16 md:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted">
            <div className="flex h-full w-full items-center justify-center">
              <div className="text-center">
                <div className="text-9xl">🏛️</div>
                <p className="mt-4 text-sm text-muted-foreground">
                  The Original Tomoca Café, Piazza District, Addis Ababa
                </p>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold md:text-4xl">
              Where It All Began
            </h2>
            <div className="mt-6 space-y-4 text-muted-foreground">
              <p>
                On February 8, 1953, in the heart of Addis Ababa&apos;s historic Piazza
                district, a small coffee shop opened its doors. Its name, &ldquo;TO.MO.CA,&rdquo;
                came from the Italian phrase <em>Torrefazione Moderna Café</em> — &ldquo;Modern
                Coffee Roasting&rdquo; — a nod to the Italian roasting techniques that would
                define its legendary taste.
              </p>
              <p>
                At a time when almost all Ethiopian coffee was exported raw, Tomoca did
                something revolutionary: they roasted and served Ethiopia&apos;s finest
                highland-grown Arabica beans right here at home. The result was a rich,
                bold espresso that captured the essence of Ethiopian coffee culture while
                honoring Italian café traditions.
              </p>
              <p>
                Today, that original shop still stands, its walls stained yellow from
                decades of roasting. The wooden counters are worn smooth by generations
                of coffee lovers who have gathered here. And the aroma — that unmistakable
                scent of freshly roasted Harar beans — still pulls people in from the street,
                just as it has for over 70 years.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      {/* Timeline */}
      <section className="container py-16 md:py-24">
        <div className="text-center">
          <h2 className="text-3xl font-bold md:text-4xl">Our Journey</h2>
          <p className="mt-2 text-muted-foreground">
            Seven decades of Ethiopian coffee excellence
          </p>
        </div>
        <div className="relative mt-12">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 hidden h-full w-0.5 bg-border md:left-1/2 md:block" />

          <div className="space-y-8">
            {timeline.map((item, index) => (
              <div
                key={item.year}
                className={`relative flex flex-col md:flex-row ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Year Badge - Mobile */}
                <div className="mb-4 flex items-center gap-4 md:hidden">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                    {item.year}
                  </div>
                  <h3 className="font-semibold">{item.title}</h3>
                </div>

                {/* Content */}
                <div className="md:w-1/2 md:px-8">
                  <Card
                    className={index % 2 === 0 ? "md:ml-auto" : "md:mr-auto"}
                  >
                    <CardContent className="p-6">
                      <h3 className="hidden font-semibold md:block">{item.title}</h3>
                      <p className="text-muted-foreground md:mt-2">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Year Badge - Desktop */}
                <div className="absolute left-1/2 top-4 hidden -translate-x-1/2 md:block">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                    {item.year}
                  </div>
                </div>

                {/* Spacer for alternate layout */}
                <div className="hidden md:block md:w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Coffee Ceremony */}
      <section className="bg-muted/50 py-16 md:py-24">
        <div className="container">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="order-2 lg:order-1">
              <Badge className="mb-4">Ethiopian Heritage</Badge>
              <h2 className="text-3xl font-bold md:text-4xl">
                The Coffee Ceremony
              </h2>
              <div className="mt-6 space-y-4 text-muted-foreground">
                <p>
                  Ethiopia is the birthplace of coffee, and the Ethiopian coffee ceremony
                  is one of the world&apos;s oldest and most beautiful traditions. It&apos;s not
                  just about drinking coffee — it&apos;s about community, hospitality, and
                  connection.
                </p>
                <p>
                  In traditional ceremonies, green beans are roasted in a pan over an
                  open fire, ground by hand with a mortar and pestle, then brewed in a
                  clay pot called a <em>jebena</em>. The coffee is served in small
                  handleless cups, often accompanied by frankincense and popcorn.
                </p>
                <p>
                  At Tomoca, we honor this tradition while making it accessible to the
                  modern world. Our standing-room cafés capture the spirit of gathering
                  for coffee, and our roasts bring the essence of the ceremony to your
                  home, wherever you are.
                </p>
              </div>
              <Button className="mt-8" asChild>
                <Link href="/shop?category=gifts">
                  Explore Ceremony Sets
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="relative order-1 aspect-[4/3] overflow-hidden rounded-2xl bg-muted lg:order-2">
              <div className="flex h-full w-full items-center justify-center">
                <div className="text-center">
                  <div className="text-9xl">☕</div>
                  <p className="mt-4 text-sm text-muted-foreground">
                    Traditional Ethiopian Coffee Ceremony
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="container py-16 md:py-24">
        <div className="text-center">
          <h2 className="text-3xl font-bold md:text-4xl">What We Stand For</h2>
          <p className="mt-2 text-muted-foreground">
            The principles that guide everything we do
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => (
            <Card key={value.title}>
              <CardContent className="p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <value.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 font-semibold">{value.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {value.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Global Presence */}
      <section className="bg-secondary text-secondary-foreground py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Globe className="mx-auto h-12 w-12 text-primary" />
            <h2 className="mt-6 text-3xl font-bold md:text-4xl">
              From Addis Ababa to the World
            </h2>
            <p className="mt-4 text-secondary-foreground/80">
              What started as a single café has grown into a global movement.
              Today, Tomoca operates cafés in Ethiopia, Japan, and Kenya, while
              shipping our legendary beans to coffee lovers on every continent.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Badge className="bg-secondary-foreground/10 text-secondary-foreground">
                Addis Ababa, Ethiopia
              </Badge>
              <Badge className="bg-secondary-foreground/10 text-secondary-foreground">
                Tokyo, Japan
              </Badge>
              <Badge className="bg-secondary-foreground/10 text-secondary-foreground">
                Nairobi, Kenya
              </Badge>
              <Badge className="bg-secondary-foreground/10 text-secondary-foreground">
                Worldwide Shipping
              </Badge>
            </div>
            <Button className="mt-8" asChild>
              <Link href="/cafes">
                Find a Café Near You
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="container py-16">
        <div className="text-center">
          <Award className="mx-auto h-10 w-10 text-primary" />
          <h2 className="mt-4 text-2xl font-bold">Awards & Recognition</h2>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-3 sm:gap-6">
          {[
            "Kenya Beverage Awards 2021",
            "World's 100 Best Coffee Shops",
            "TripAdvisor Certificate of Excellence",
            "Ethiopian Coffee Excellence Award",
          ].map((award) => (
            <Badge key={award} variant="outline" className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm">
              {award}
            </Badge>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t py-16">
        <div className="container text-center">
          <h2 className="text-2xl font-bold">Experience the Legend</h2>
          <p className="mt-2 text-muted-foreground">
            Join the millions who have discovered Ethiopia&apos;s finest coffee
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/shop">
                Shop Our Coffee
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/subscriptions">Start a Subscription</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
