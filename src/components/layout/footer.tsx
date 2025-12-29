import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail } from "lucide-react"

const footerLinks = {
  shop: [
    { name: "All Coffee", href: "/shop?category=coffee" },
    { name: "Equipment", href: "/shop?category=equipment" },
    { name: "Accessories", href: "/shop?category=accessories" },
    { name: "Gift Sets", href: "/shop?category=gifts" },
    { name: "Subscriptions", href: "/subscriptions" },
  ],
  company: [
    { name: "Our Story", href: "/about" },
    { name: "Café Locations", href: "/cafes" },
    { name: "Wholesale", href: "/wholesale" },
    { name: "Press", href: "/press" },
    { name: "Careers", href: "/careers" },
  ],
  support: [
    { name: "Contact Us", href: "/contact" },
    { name: "FAQs", href: "/faq" },
    { name: "Shipping & Returns", href: "/shipping" },
    { name: "Track Order", href: "/track" },
    { name: "Brewing Guides", href: "/guides" },
  ],
}

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "https://facebook.com" },
  { name: "Instagram", icon: Instagram, href: "https://instagram.com" },
  { name: "Twitter", icon: Twitter, href: "https://twitter.com" },
  { name: "YouTube", icon: Youtube, href: "https://youtube.com" },
]

export function Footer() {
  return (
    <footer className="border-t bg-secondary text-secondary-foreground">
      {/* Newsletter Section */}
      <div className="border-b border-secondary-foreground/10">
        <div className="container py-12">
          <div className="mx-auto max-w-xl text-center">
            <h3 className="text-2xl font-semibold">Join the Tomoca Family</h3>
            <p className="mt-2 text-secondary-foreground/80">
              Subscribe for exclusive offers, brewing tips, and stories from Ethiopia&apos;s coffee heartland.
            </p>
            <form className="mt-6 flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-secondary-foreground/10 border-secondary-foreground/20 text-secondary-foreground placeholder:text-secondary-foreground/50"
              />
              <Button variant="default" className="shrink-0">
                Subscribe
              </Button>
            </form>
            <p className="mt-3 text-xs text-secondary-foreground/60">
              By subscribing, you agree to our Privacy Policy and consent to receive updates.
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block">
              <span className="text-3xl font-bold tracking-tight">TO.MO.CA</span>
              <span className="block text-xs tracking-[0.3em] text-secondary-foreground/60">
                SINCE 1953
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-secondary-foreground/80">
              Ethiopia&apos;s legendary coffee roaster, bringing the authentic taste of Addis Ababa to the world since 1953.
            </p>

            {/* Contact Info */}
            <div className="mt-6 space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Piazza, Addis Ababa, Ethiopia</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+251 11 111 1234</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>hello@tomocacoffee.com</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-6 flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="rounded-full bg-secondary-foreground/10 p-2 transition-colors hover:bg-secondary-foreground/20"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-semibold">Shop</h4>
            <ul className="mt-4 space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-secondary-foreground/80 transition-colors hover:text-secondary-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold">Company</h4>
            <ul className="mt-4 space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-secondary-foreground/80 transition-colors hover:text-secondary-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-semibold">Support</h4>
            <ul className="mt-4 space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-secondary-foreground/80 transition-colors hover:text-secondary-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-secondary-foreground/10">
        <div className="container flex flex-col items-center justify-between gap-4 py-6 md:flex-row">
          <p className="text-sm text-secondary-foreground/60">
            © {new Date().getFullYear()} Tomoca Coffee. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-secondary-foreground/60">
            <Link href="/privacy" className="hover:text-secondary-foreground">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-secondary-foreground">
              Terms of Service
            </Link>
            <Link href="/cookies" className="hover:text-secondary-foreground">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
