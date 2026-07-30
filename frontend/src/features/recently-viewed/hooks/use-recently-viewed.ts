import { useCallback, useState } from 'react'
import type { Product } from '../../../types/product'
import { addRecentlyViewedProduct, getRecentlyViewedProducts, saveRecentlyViewedProducts } from '../services/recently-viewed-service'

export function useRecentlyViewed() {
  const [recentProducts, setRecentProducts] = useState<Product[]>(getRecentlyViewedProducts)

  const recordProduct = useCallback((product: Product) => {
    setRecentProducts((currentProducts) => {
      const nextProducts = addRecentlyViewedProduct(currentProducts, product)
      saveRecentlyViewedProducts(nextProducts)
      return nextProducts
    })
  }, [])

  return { recentProducts, recordProduct }
}
