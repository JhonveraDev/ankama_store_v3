import type { Product } from '../../../types/product'

const CART_KEY = 'arcadia-store.cart'

export interface CartItemData { product: Product; quantity: number }

export function loadCart(): CartItemData[] {
  try {
    const value: unknown = JSON.parse(window.localStorage.getItem(CART_KEY) ?? '[]')
    return Array.isArray(value) ? value.filter((item): item is CartItemData => typeof item === 'object' && item !== null && 'product' in item && 'quantity' in item) : []
  } catch { return [] }
}

export function saveCart(items: CartItemData[]): void { window.localStorage.setItem(CART_KEY, JSON.stringify(items)) }
