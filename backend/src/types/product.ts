export type ProductGame = string

export interface ProductPrice {
  amount: number
  ogrines?: number
  currency: string
}

export interface Product {
  id: string
  slug: string
  name: string
  description: string
  game: ProductGame
  category: string
  price: ProductPrice
  imageUrl: string
  stock: number
  badge?: string
  isFeatured: boolean
  isAvailable: boolean
}
