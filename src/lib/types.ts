export interface Product {
  id: string
  name: string
  description: string
  longDescription?: string
  price: number
  originalPrice?: number
  image: string
  images?: string[]
  category: "coffee" | "equipment" | "accessories" | "gifts"
  subcategory?: string
  weight?: string
  origin?: string
  roastLevel?: "light" | "medium" | "dark"
  flavorNotes?: string[]
  rating: number
  reviewCount: number
  inStock: boolean
  isNew?: boolean
  isBestSeller?: boolean
  isSubscriptionAvailable?: boolean
}

export interface CartItem {
  product: Product
  quantity: number
  subscriptionInterval?: "weekly" | "biweekly" | "monthly" | null
}

export interface Review {
  id: string
  author: string
  rating: number
  date: string
  content: string
  verified: boolean
}

export interface SubscriptionPlan {
  id: string
  name: string
  interval: "weekly" | "biweekly" | "monthly"
  discount: number
  description: string
}
