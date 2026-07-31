import { createContext } from 'react'
import type { Product } from '../../../types/product'
import type { CartItemData } from '../services/cart-service'

export interface CartContextValue {
  items: CartItemData[]
  totalQuantity: number
  subtotal: number
  discount: number
  total: number
  addItem: (product: Product, quantity?: number) => void
  updateQuantity: (id: string, quantity: number) => void
  removeItem: (id: string) => void
}

export const CartContext = createContext<CartContextValue | null>(null)
