import type { Product } from '../../../types/product'

const RECENTLY_VIEWED_KEY = 'ankama-store.recently-viewed'
export const RECENTLY_VIEWED_LIMIT = 8

export function getRecentlyViewedProducts(): Product[] {
  try {
    const storedProducts: unknown = JSON.parse(window.localStorage.getItem(RECENTLY_VIEWED_KEY) ?? '[]')
    if (!Array.isArray(storedProducts)) return []

    return storedProducts.filter((product): product is Product => (
      typeof product === 'object' && product !== null && 'id' in product && 'slug' in product && 'name' in product
    )).slice(0, RECENTLY_VIEWED_LIMIT)
  } catch {
    return []
  }
}

export function addRecentlyViewedProduct(products: Product[], product: Product): Product[] {
  return [product, ...products.filter((item) => item.id !== product.id)].slice(0, RECENTLY_VIEWED_LIMIT)
}

export function saveRecentlyViewedProducts(products: Product[]): void {
  window.localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(products.slice(0, RECENTLY_VIEWED_LIMIT)))
}
