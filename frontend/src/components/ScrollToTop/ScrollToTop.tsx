import { useLayoutEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom'

export function ScrollToTop() {
  const { pathname, search } = useLocation()
  const navigationSearch = useMemo(() => {
    const params = new URLSearchParams(search)
    params.delete('page')
    return params.toString()
  }, [search])

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname, navigationSearch])

  return null
}
