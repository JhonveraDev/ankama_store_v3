import { useCallback, useEffect, useMemo, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { Product } from '../../../types/product'
import { usePagination } from '../../pagination/hooks/use-pagination'

export type ProductSort = 'relevancia' | 'price-asc' | 'price-desc' | 'ogrines-asc' | 'ogrines-desc'

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

    const isOgrinesSort = sort.startsWith('ogrines')
    const direction = sort.endsWith('asc') ? 1 : -1

    return [...filteredProducts].sort((first, second) => {
      if (isOgrinesSort) {
        const firstOgrines = first.price.ogrines
        const secondOgrines = second.price.ogrines

        if (firstOgrines === undefined && secondOgrines === undefined) return 0
        if (firstOgrines === undefined) return 1
        if (secondOgrines === undefined) return -1

        return direction * (firstOgrines - secondOgrines)
      }

      return direction * (first.price.amount - second.price.amount)
    })
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
