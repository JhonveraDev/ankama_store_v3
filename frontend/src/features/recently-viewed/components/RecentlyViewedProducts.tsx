import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useRecentlyViewed } from '../hooks/use-recently-viewed'
import { ProductCard } from '../../products/components/ProductCard'

export function RecentlyViewedProducts() {
  const { recentProducts } = useRecentlyViewed()
  const trackRef = useRef<HTMLDivElement>(null)
  const [canScroll, setCanScroll] = useState(false)

  const updateScrollState = useCallback(() => {
    const track = trackRef.current
    setCanScroll(Boolean(track && track.scrollWidth > track.clientWidth))
  }, [])

  useEffect(() => {
    updateScrollState()
    const track = trackRef.current
    if (!track) return undefined

    const observer = new ResizeObserver(updateScrollState)
    observer.observe(track)
    return () => observer.disconnect()
  }, [recentProducts, updateScrollState])

  if (recentProducts.length === 0) return null

  const moveCarousel = (direction: 1 | -1) => {
    trackRef.current?.scrollBy({ left: direction * 300, behavior: 'smooth' })
  }

  return (
    <section className="recently-viewed-section" aria-labelledby="recently-viewed-title">
      <div className="recently-viewed-heading"><span aria-hidden="true" /><h2 id="recently-viewed-title">Tus últimos artículos consultados</h2></div>
      <div className="recently-viewed-carousel">
        {canScroll && <button aria-label="Ver productos anteriores" className="recently-viewed-arrow recently-viewed-arrow--previous" onClick={() => moveCarousel(-1)} type="button"><ChevronLeft size={24} /></button>}
        <div className="recently-viewed-track" ref={trackRef}>{recentProducts.map((product) => <ProductCard key={product.id} product={product} />)}</div>
        {canScroll && <button aria-label="Ver más productos consultados" className="recently-viewed-arrow recently-viewed-arrow--next" onClick={() => moveCarousel(1)} type="button"><ChevronRight size={24} /></button>}
      </div>
    </section>
  )
}
