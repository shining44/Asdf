import { ProductPageClient } from "./product-page-client"
import { products } from "@/lib/data"

export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }))
}

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export default function ProductPage({ params }: ProductPageProps) {
  return <ProductPageClient params={params} />
}
