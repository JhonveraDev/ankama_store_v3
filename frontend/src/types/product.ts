export type ProductGame = string

export interface ProductPrice {
  amount: number
  currency: string
}

export interface ProductDiscount {
  originalAmount: number
  percentage: number
}

export interface Product {
  id: string
  slug: string
  name: string
  description: string
  game: ProductGame
  category: string
  subcategory?: string
  price: ProductPrice
  imageUrl: string
  gallery?: string[]
  shortDescription?: string
  discount?: ProductDiscount
  tags?: string[]
  details?: string[]
  stock: number
  badge?: string
  isFeatured: boolean
  isAvailable: boolean
}
