import type { Product } from '../../../types/product'

export function filterProductsByName(products: Product[], query: string): Product[] {
  const normalizedQuery = query.trim().toLocaleLowerCase()

  if (!normalizedQuery) return []

  return products.filter((product) => product.name.toLocaleLowerCase().includes(normalizedQuery))
}
