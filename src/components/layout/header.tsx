"use client"

import Link from "next/link"
import { useState } from "react"
import { ShoppingBag, Menu, User, Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from "@/lib/cart-context"
import { CartSheet } from "@/components/cart/cart-sheet"

const navigation = [
  { name: "Shop", href: "/shop" },
  { name: "Subscriptions", href: "/subscriptions" },
  { name: "Our Story", href: "/about" },
  { name: "Cafés", href: "/cafes" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { itemCount, toggleCart } = useCart()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Announcement Bar */}
      <div className="bg-secondary text-secondary-foreground">
        <div className="container flex h-9 items-center justify-center text-sm">
          <p>Free shipping on orders over $50 | Subscribe & save up to 20%</p>
        </div>
      </div>

      {/* Main Header */}
      <div className="container flex h-16 items-center justify-between">
        {/* Mobile Menu Button */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80">
            <SheetHeader>
              <SheetTitle className="text-left">
                <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                  <span className="text-xl font-bold tracking-tight">TO.MO.CA</span>
                </Link>
              </SheetTitle>
            </SheetHeader>
            <nav className="mt-8 flex flex-col gap-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-lg font-medium transition-colors hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="my-4 h-px bg-border" />
              <Link
                href="/account"
                className="text-lg font-medium transition-colors hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                My Account
              </Link>
            </nav>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold tracking-tight text-secondary md:text-3xl">
              TO.MO.CA
            </span>
            <span className="text-[10px] tracking-[0.3em] text-muted-foreground">
              SINCE 1953
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:gap-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="hidden md:flex" aria-label="Search">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="hidden md:flex" aria-label="Account">
            <User className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={toggleCart}
            aria-label="Open cart"
          >
            <ShoppingBag className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                {itemCount}
              </span>
            )}
          </Button>
        </div>
      </div>

      {/* Cart Sheet */}
      <CartSheet />
    </header>
  )
}
