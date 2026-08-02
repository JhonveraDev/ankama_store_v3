import { useCallback, useEffect, useMemo, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { Product } from '../../../types/product'
import { usePagination } from '../../pagination/hooks/use-pagination'

type ProductSort = 'relevancia' | 'price-asc' | 'price-desc'

interface UseProductCatalogOptions {
  category?: string
  game?: string
  products: Product[]
  resetKey?: string
  sort?: ProductSort
  itemsPerPage?: number
}

/** Shared filtering, sorting, URL pagination, and reset behavior for all product listings. */
export function useProductCatalog({ category, game, products, resetKey = '', sort = 'relevancia', itemsPerPage = 12 }: UseProductCatalogOptions) {
  const [searchParams, setSearchParams] = useSearchParams()
  const requestedPage = Number(searchParams.get('page')) || 1
  const previousResetKey = useRef(resetKey)
  const filteredProducts = useMemo(() => products.filter((product) => (!game || product.game === game) && (!category || product.category === category)), [category, game, products])
  const sortedProducts = useMemo(() => {
    if (sort === 'relevancia') return filteredProducts
    return [...filteredProducts].sort((first, second) => sort === 'price-asc' ? first.price.amount - second.price.amount : second.price.amount - first.price.amount)
  }, [filteredProducts, sort])
  const pagination = usePagination({ currentPage: requestedPage, items: sortedProducts, itemsPerPage })
  const setPage = useCallback((page: number) => setSearchParams((current) => {
    const next = new URLSearchParams(current)
    next.set('page', String(page))
    return next
  }), [setSearchParams])

  useEffect(() => {
    if (previousResetKey.current !== resetKey) {
      previousResetKey.current = resetKey
      if (requestedPage !== 1) setPage(1)
    }
  }, [requestedPage, resetKey, setPage])

  return { ...pagination, products: sortedProducts, setPage }
}
