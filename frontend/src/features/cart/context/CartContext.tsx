import { useCallback, useMemo, useState, type ReactNode } from 'react'
import type { Product } from '../../../types/product'
import { loadCart, saveCart, type CartItemData } from '../services/cart-service'
import { CartContext } from './cart-context'

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItemData[]>(loadCart)
  const commit = useCallback((nextItems: CartItemData[]) => { saveCart(nextItems); setItems(nextItems) }, [])
  const addItem = useCallback((product: Product, quantity = 1) => {
    const existing = items.find((item) => item.product.id === product.id)
    const nextItems = existing ? items.map((item) => item.product.id === product.id ? { ...item, quantity: Math.min(product.stock, item.quantity + quantity) } : item) : [...items, { product, quantity: Math.min(product.stock, quantity) }]
    commit(nextItems)
  }, [commit, items])
  const updateQuantity = useCallback((id: string, quantity: number) => commit(items.map((item) => item.product.id === id ? { ...item, quantity: Math.min(Math.max(1, quantity), item.product.stock) } : item)), [commit, items])
  const removeItem = useCallback((id: string) => commit(items.filter((item) => item.product.id !== id)), [commit, items])
  const value = useMemo(() => {
    const subtotal = items.reduce((sum, item) => sum + (item.product.discount?.originalAmount ?? item.product.price.amount) * item.quantity, 0)
    const discount = items.reduce((sum, item) => sum + (item.product.discount ? Math.max(0, item.product.discount.originalAmount - item.product.price.amount) * item.quantity : 0), 0)
    return { items, totalQuantity: items.reduce((sum, item) => sum + item.quantity, 0), subtotal, discount, total: subtotal - discount, addItem, updateQuantity, removeItem }
  }, [addItem, items, removeItem, updateQuantity])
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
