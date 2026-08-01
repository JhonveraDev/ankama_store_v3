import { useMemo } from 'react'

interface UsePaginationOptions<T> {
  currentPage: number
  items: T[]
  itemsPerPage?: number
}

export interface PaginationState<T> {
  currentPage: number
  items: T[]
  totalPages: number
  totalItems: number
}

/** Slices any filtered collection without depending on its rendering context. */
export function usePagination<T>({ currentPage, items, itemsPerPage = 12 }: UsePaginationOptions<T>): PaginationState<T> {
  return useMemo(() => {
    const totalItems = items.length
    const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage))
    const safePage = Math.min(Math.max(1, currentPage), totalPages)
    const start = (safePage - 1) * itemsPerPage

    return {
      currentPage: safePage,
      items: items.slice(start, start + itemsPerPage),
      totalItems,
      totalPages,
    }
  }, [currentPage, items, itemsPerPage])
}
