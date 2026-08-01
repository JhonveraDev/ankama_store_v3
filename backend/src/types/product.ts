export type ProductGame = string

export interface ProductPrice {
  amount: number
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
  ogrinePrice?: number
  imageUrl: string
  stock: number
  badge?: string
  isFeatured: boolean
  isAvailable: boolean
}
