import Link from "next/link"
import { MapPin, Clock, Phone, ExternalLink, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const locations = [
  {
    city: "Addis Ababa",
    country: "Ethiopia",
    flagship: true,
    cafes: [
      {
        name: "Tomoca Original - Piazza",
        address: "Piazza, Churchill Avenue",
        hours: "6:00 AM - 9:00 PM",
        phone: "+251 11 111 1234",
        description: "The original 1953 café. Experience where the legend began.",
        features: ["Historic Location", "Standing Room", "Fresh Roasting"],
      },
      {
        name: "Tomoca - Bole",
        address: "Bole Road, Near Friendship Mall",
        hours: "7:00 AM - 10:00 PM",
        phone: "+251 11 222 5678",
        description: "Modern café with seating, located in Addis's business district.",
        features: ["Seating Available", "WiFi", "Meeting Space"],
      },
      {
        name: "Tomoca Galleria",
        address: "Kazanchis, Near Radisson Blu",
        hours: "7:00 AM - 9:00 PM",
        phone: "+251 11 333 9012",
        description: "Art-focused café combining coffee with Ethiopian art exhibits.",
        features: ["Art Gallery", "Seating", "Cultural Events"],
      },
    ],
  },
  {
    city: "Tokyo",
    country: "Japan",
    flagship: false,
    cafes: [
      {
        name: "Tomoca Tokyo",
        address: "Shibuya-ku, Tokyo",
        hours: "8:00 AM - 8:00 PM",
        phone: "+81 3 1234 5678",
        description: "Our first international café, bringing Ethiopian coffee to Japan since 2015.",
        features: ["Japanese Service", "Ethiopian Beans", "Specialty Drinks"],
      },
    ],
  },
  {
    city: "Nairobi",
    country: "Kenya",
    flagship: false,
    cafes: [
      {
        name: "Tomoca Nairobi - Two Rivers",
        address: "Two Rivers Mall, Limuru Road",
        hours: "9:00 AM - 9:00 PM",
        phone: "+254 20 765 4321",
        description: "Our East African hub, opened in 2020. Experience the Sprice!",
        features: ["Mall Location", "Full Menu", "Kenyan & Ethiopian Blends"],
      },
    ],
  },
]

export default function CafesPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-secondary text-secondary-foreground py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4 bg-primary/20 text-primary">Our Cafés</Badge>
            <h1 className="text-4xl font-bold md:text-5xl">
              Visit Us Around the World
            </h1>
            <p className="mt-4 text-lg text-secondary-foreground/80">
              From our original 1953 café in Addis Ababa to Tokyo and Nairobi,
              experience Tomoca&apos;s legendary coffee in person.
            </p>
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="container py-12 md:py-20">
        <div className="space-y-16">
          {locations.map((location) => (
            <div key={location.city}>
              <div className="flex items-center gap-3 mb-8">
                <h2 className="text-2xl font-bold md:text-3xl">
                  {location.city}, {location.country}
                </h2>
                {location.flagship && (
                  <Badge>Flagship</Badge>
                )}
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {location.cafes.map((cafe) => (
                  <Card key={cafe.name} className="overflow-hidden">
                    {/* Café Image Placeholder */}
                    <div className="aspect-video bg-muted">
                      <div className="flex h-full w-full items-center justify-center text-4xl">
                        ☕
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-lg">{cafe.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {cafe.description}
                      </p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-start gap-3 text-sm">
                        <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                        <span>{cafe.address}</span>
                      </div>
                      <div className="flex items-start gap-3 text-sm">
                        <Clock className="h-4 w-4 mt-0.5 text-muted-foreground" />
                        <span>{cafe.hours}</span>
                      </div>
                      <div className="flex items-start gap-3 text-sm">
                        <Phone className="h-4 w-4 mt-0.5 text-muted-foreground" />
                        <span>{cafe.phone}</span>
                      </div>

                      <Separator />

                      <div className="flex flex-wrap gap-2">
                        {cafe.features.map((feature) => (
                          <Badge key={feature} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>

                      <Button variant="outline" className="w-full">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Get Directions
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* The Experience Section */}
      <section className="bg-muted/50 py-16">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold md:text-3xl">
              The Tomoca Experience
            </h2>
            <p className="mt-4 text-muted-foreground">
              At Tomoca, coffee is more than a drink — it&apos;s a ritual. Our cafés,
              especially the original Piazza location, maintain the traditional
              standing-room-only format. There are no laptops, no lengthy stays —
              just excellent coffee enjoyed quickly and socially, the Italian way.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="font-semibold">Quick & Focused</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Standing counters encourage quick enjoyment, keeping focus on
                  the coffee itself.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">👥</div>
                <h3 className="font-semibold">Social Atmosphere</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Meet friends, chat with neighbors, experience the communal
                  spirit of Ethiopian coffee.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">🔥</div>
                <h3 className="font-semibold">Fresh Roasted</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Many of our cafés roast on-site daily, filling the air with
                  irresistible aromas.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Signature Drinks */}
      <section className="container py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold md:text-3xl">Signature Drinks</h2>
          <p className="mt-2 text-muted-foreground">
            Must-try beverages at any Tomoca café
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              name: "Tomoca Macchiato",
              description:
                "Our legendary macchiato — a small but mighty shot of espresso with just a touch of steamed milk.",
              price: "From $2.50",
            },
            {
              name: "The Sprice",
              description:
                'A unique Tomoca creation blending Ethiopian coffee with Kenyan tea. Known as the "dancing drink" for its layered flavors.',
              price: "From $3.00",
            },
            {
              name: "Ethiopian Espresso",
              description:
                "Pure, unadulterated excellence. Rich, bold, with deep chocolate notes and a lingering finish.",
              price: "From $2.00",
            },
          ].map((drink) => (
            <Card key={drink.name}>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg">{drink.name}</h3>
                <p className="mt-2 text-muted-foreground">{drink.description}</p>
                <p className="mt-4 font-medium text-primary">{drink.price}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-secondary text-secondary-foreground py-16">
        <div className="container text-center">
          <h2 className="text-2xl font-bold">Can&apos;t Visit Us in Person?</h2>
          <p className="mt-2 text-secondary-foreground/80">
            Bring Tomoca&apos;s legendary coffee to your home
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/shop">
                Shop Our Coffee
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-secondary-foreground/20" asChild>
              <Link href="/subscriptions">Start a Subscription</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
