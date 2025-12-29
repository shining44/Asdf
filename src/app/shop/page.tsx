"use client"

import { useState, useMemo, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Filter, SlidersHorizontal, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ProductCard } from "@/components/product/product-card"
import { products } from "@/lib/data"

const categories = [
  { id: "all", name: "All Products" },
  { id: "coffee", name: "Coffee" },
  { id: "equipment", name: "Equipment" },
  { id: "accessories", name: "Accessories" },
  { id: "gifts", name: "Gifts" },
]

const roastLevels = [
  { id: "all", name: "All Roasts" },
  { id: "light", name: "Light Roast" },
  { id: "medium", name: "Medium Roast" },
  { id: "dark", name: "Dark Roast" },
]

const sortOptions = [
  { id: "featured", name: "Featured" },
  { id: "newest", name: "Newest" },
  { id: "price-asc", name: "Price: Low to High" },
  { id: "price-desc", name: "Price: High to Low" },
  { id: "rating", name: "Highest Rated" },
]

function ShopContent() {
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get("category") || "all"

  const [category, setCategory] = useState(initialCategory)
  const [roastLevel, setRoastLevel] = useState("all")
  const [sortBy, setSortBy] = useState("featured")
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const filteredProducts = useMemo(() => {
    let filtered = [...products]

    // Filter by category
    if (category !== "all") {
      filtered = filtered.filter((p) => p.category === category)
    }

    // Filter by roast level (only for coffee)
    if (roastLevel !== "all") {
      filtered = filtered.filter(
        (p) => p.category !== "coffee" || p.roastLevel === roastLevel
      )
    }

    // Sort
    switch (sortBy) {
      case "newest":
        filtered = filtered.filter((p) => p.isNew).concat(filtered.filter((p) => !p.isNew))
        break
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "featured":
      default:
        filtered = filtered.filter((p) => p.isBestSeller).concat(filtered.filter((p) => !p.isBestSeller))
    }

    return filtered
  }, [category, roastLevel, sortBy])

  const activeFiltersCount = [
    category !== "all",
    roastLevel !== "all",
  ].filter(Boolean).length

  const clearFilters = () => {
    setCategory("all")
    setRoastLevel("all")
    setSortBy("featured")
  }

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Category Filter */}
      <div>
        <h3 className="font-semibold mb-3">Category</h3>
        <RadioGroup value={category} onValueChange={setCategory}>
          {categories.map((cat) => (
            <div key={cat.id} className="flex items-center space-x-2">
              <RadioGroupItem value={cat.id} id={`category-${cat.id}`} />
              <Label htmlFor={`category-${cat.id}`} className="cursor-pointer">
                {cat.name}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <Separator />

      {/* Roast Level Filter (only show for coffee) */}
      {(category === "all" || category === "coffee") && (
        <>
          <div>
            <h3 className="font-semibold mb-3">Roast Level</h3>
            <RadioGroup value={roastLevel} onValueChange={setRoastLevel}>
              {roastLevels.map((level) => (
                <div key={level.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={level.id} id={`roast-${level.id}`} />
                  <Label htmlFor={`roast-${level.id}`} className="cursor-pointer">
                    {level.name}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <Separator />
        </>
      )}

      {/* Clear Filters */}
      {activeFiltersCount > 0 && (
        <Button variant="outline" onClick={clearFilters} className="w-full">
          Clear All Filters
        </Button>
      )}
    </div>
  )

  return (
    <div className="flex gap-8">
      {/* Desktop Sidebar Filters */}
      <aside className="hidden w-64 shrink-0 lg:block">
        <div className="sticky top-32">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </h2>
            {activeFiltersCount > 0 && (
              <Badge variant="secondary">{activeFiltersCount} active</Badge>
            )}
          </div>
          <Card>
            <CardContent className="p-4">
              <FilterContent />
            </CardContent>
          </Card>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        {/* Toolbar */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {/* Mobile Filter Button */}
            <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden">
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  Filters
                  {activeFiltersCount > 0 && (
                    <Badge variant="secondary" className="ml-2">
                      {activeFiltersCount}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FilterContent />
                </div>
              </SheetContent>
            </Sheet>

            <p className="text-sm text-muted-foreground">
              {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
            </p>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <Label htmlFor="sort" className="text-sm whitespace-nowrap">
              Sort by:
            </Label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-md border border-input bg-background px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
            >
              {sortOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Active Filters */}
        {activeFiltersCount > 0 && (
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            {category !== "all" && (
              <Badge variant="secondary" className="gap-1">
                {categories.find((c) => c.id === category)?.name}
                <button
                  onClick={() => setCategory("all")}
                  className="ml-1 hover:text-foreground"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {roastLevel !== "all" && (
              <Badge variant="secondary" className="gap-1">
                {roastLevels.find((r) => r.id === roastLevel)?.name}
                <button
                  onClick={() => setRoastLevel("all")}
                  className="ml-1 hover:text-foreground"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Clear all
            </Button>
          </div>
        )}

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold">No products found</h3>
            <p className="mt-2 text-muted-foreground">
              Try adjusting your filters to find what you&apos;re looking for.
            </p>
            <Button className="mt-4" onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

function ShopLoading() {
  return (
    <div className="flex gap-8">
      <aside className="hidden w-64 shrink-0 lg:block">
        <div className="h-96 animate-pulse rounded-lg bg-muted" />
      </aside>
      <div className="flex-1">
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-80 animate-pulse rounded-lg bg-muted" />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function ShopPage() {
  return (
    <div className="container py-8 md:py-12">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold md:text-4xl">Shop</h1>
        <p className="mt-2 text-muted-foreground">
          Discover Ethiopia&apos;s finest coffee beans, brewing equipment, and accessories.
        </p>
      </div>

      <Suspense fallback={<ShopLoading />}>
        <ShopContent />
      </Suspense>
    </div>
  )
}
