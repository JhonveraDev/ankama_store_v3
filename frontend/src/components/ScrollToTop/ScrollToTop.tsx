import { useLayoutEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom'

export function ScrollToTop() {
  const { pathname, search, state } = useLocation()
  const preserveProductListingScroll = (state as { preserveProductListingScroll?: boolean } | null)?.preserveProductListingScroll === true
  const navigationSearch = useMemo(() => {
    const params = new URLSearchParams(search)
    params.delete('page')
    return params.toString()
  }, [search])

  useLayoutEffect(() => {
    if (preserveProductListingScroll) return
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname, navigationSearch, preserveProductListingScroll])

  return null
}
