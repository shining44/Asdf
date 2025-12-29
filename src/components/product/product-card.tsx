"use client"

import Link from "next/link"
import { Star, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { useCart } from "@/lib/cart-context"
import { Product } from "@/lib/types"

interface ProductCardProps {
  product: Product
  showQuickAdd?: boolean
}

export function ProductCard({ product, showQuickAdd = true }: ProductCardProps) {
  const { addItem } = useCart()

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product, 1)
  }

  return (
    <Link href={`/shop/${product.id}`}>
      <Card className="group h-full overflow-hidden transition-all hover:shadow-lg">
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden bg-muted">
          <div className="flex h-full w-full items-center justify-center text-6xl transition-transform group-hover:scale-105">
            {product.category === "coffee" ? "☕" : product.category === "equipment" ? "⚙️" : product.category === "accessories" ? "🎁" : "📦"}
          </div>

          {/* Badges */}
          <div className="absolute left-3 top-3 flex flex-col gap-1">
            {product.isNew && (
              <Badge className="bg-green-600">New</Badge>
            )}
            {product.isBestSeller && (
              <Badge className="bg-primary">Best Seller</Badge>
            )}
            {product.originalPrice && (
              <Badge variant="destructive">
                {Math.round((1 - product.price / product.originalPrice) * 100)}% Off
              </Badge>
            )}
          </div>

          {/* Quick Add Button */}
          {showQuickAdd && (
            <Button
              size="sm"
              className="absolute bottom-3 right-3 opacity-0 transition-opacity group-hover:opacity-100"
              onClick={handleQuickAdd}
            >
              <ShoppingBag className="mr-2 h-4 w-4" />
              Quick Add
            </Button>
          )}
        </div>

        <CardContent className="p-4">
          {/* Category/Origin */}
          <p className="text-xs uppercase tracking-wider text-muted-foreground">
            {product.origin || product.category}
          </p>

          {/* Product Name */}
          <h3 className="mt-1 font-semibold leading-tight">{product.name}</h3>

          {/* Weight if applicable */}
          {product.weight && (
            <p className="mt-1 text-sm text-muted-foreground">{product.weight}</p>
          )}

          {/* Rating */}
          <div className="mt-2 flex items-center gap-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3.5 w-3.5 ${
                    i < Math.floor(product.rating)
                      ? "fill-primary text-primary"
                      : "fill-muted text-muted"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              ({product.reviewCount})
            </span>
          </div>

          {/* Flavor Notes */}
          {product.flavorNotes && product.flavorNotes.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {product.flavorNotes.slice(0, 3).map((note) => (
                <span
                  key={note}
                  className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                >
                  {note}
                </span>
              ))}
            </div>
          )}
        </CardContent>

        <CardFooter className="flex items-center justify-between border-t p-4">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          {product.isSubscriptionAvailable && (
            <Badge variant="outline" className="text-xs">
              Subscribe & Save
            </Badge>
          )}
        </CardFooter>
      </Card>
    </Link>
  )
}
