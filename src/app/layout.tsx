import type { Metadata } from "next"
import "./globals.css"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { CartProvider } from "@/lib/cart-context"

export const metadata: Metadata = {
  title: "Tomoca Coffee | Ethiopia's Legendary Coffee Since 1953",
  description: "Experience authentic Ethiopian coffee from Tomoca, Addis Ababa's iconic coffee roaster since 1953. Shop premium Harar, Yirgacheffe, and Sidamo beans, brewing equipment, and more.",
  keywords: ["Ethiopian coffee", "Tomoca", "Harar coffee", "specialty coffee", "coffee subscription", "Addis Ababa"],
  openGraph: {
    title: "Tomoca Coffee | Ethiopia's Legendary Coffee Since 1953",
    description: "Experience authentic Ethiopian coffee from Tomoca, Addis Ababa's iconic coffee roaster since 1953.",
    type: "website",
    locale: "en_US",
    siteName: "Tomoca Coffee",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tomoca Coffee | Ethiopia's Legendary Coffee Since 1953",
    description: "Experience authentic Ethiopian coffee from Tomoca, Addis Ababa's iconic coffee roaster since 1953.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <CartProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  )
}
