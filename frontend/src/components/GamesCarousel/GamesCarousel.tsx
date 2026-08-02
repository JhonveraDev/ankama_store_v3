import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCallback, useEffect, useRef, useState, type PointerEvent } from 'react'
import { Link } from 'react-router-dom'
import { navigationItems, type NavigationItem } from '../../features/navigation/navigation-items'
import { getNavigationPath } from '../../features/navigation/navigation-routes'

interface GamesCarouselProps {
  items?: NavigationItem[]
  title?: string
}

/** A reusable, touch-friendly carousel for the games available in the store. */
export function GamesCarousel({ items = navigationItems, title = 'Nuestros juegos' }: GamesCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const dragStart = useRef<{ scrollLeft: number; x: number } | null>(null)
  const dragged = useRef(false)
  const [isDragging, setIsDragging] = useState(false)
  const [navigation, setNavigation] = useState({ canGoNext: false, canGoPrevious: false })

  const updateNavigation = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    setNavigation({ canGoPrevious: track.scrollLeft > 1, canGoNext: track.scrollLeft + track.clientWidth < track.scrollWidth - 1 })
  }, [])

  useEffect(() => {
    updateNavigation()
    const track = trackRef.current
    if (!track) return undefined
    const resizeObserver = new ResizeObserver(updateNavigation)
    resizeObserver.observe(track)
    track.addEventListener('scroll', updateNavigation, { passive: true })
    return () => {
      resizeObserver.disconnect()
      track.removeEventListener('scroll', updateNavigation)
    }
  }, [items, updateNavigation])

  const move = (direction: 1 | -1) => {
    const track = trackRef.current
    if (track) track.scrollBy({ left: direction * (track.clientWidth * .78), behavior: 'smooth' })
  }

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return
    if ((event.target as HTMLElement).closest('a, button')) return
    const track = event.currentTarget
    dragStart.current = { scrollLeft: track.scrollLeft, x: event.clientX }
    dragged.current = false
    setIsDragging(true)
    track.setPointerCapture(event.pointerId)
  }

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragStart.current) return
    const distance = event.clientX - dragStart.current.x
    if (Math.abs(distance) > 6) dragged.current = true
    event.currentTarget.scrollLeft = dragStart.current.scrollLeft - distance
  }

  const finishDrag = () => {
    dragStart.current = null
    setIsDragging(false)
    window.setTimeout(() => { dragged.current = false }, 0)
  }

  return (
    <section aria-labelledby="games-carousel-title" className="games-carousel-section">
      <div className="games-carousel-heading"><span aria-hidden="true" /><h2 id="games-carousel-title">{title}</h2></div>
      <div className="games-carousel-shell">
        <button aria-label="Ver juegos anteriores" className="games-carousel-arrow games-carousel-arrow--previous" disabled={!navigation.canGoPrevious} onClick={() => move(-1)} type="button"><ChevronLeft size={28} /></button>
        <div className={`games-carousel-track${isDragging ? ' is-dragging' : ''}`} onClickCapture={(event) => { if (dragged.current) event.preventDefault() }} onPointerCancel={finishDrag} onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={finishDrag} ref={trackRef}>
          {items.map((item) => <article className="games-carousel-card" key={item.label}>
            <Link aria-label={`Descubrir ${item.label}`} className="games-carousel-game-link" to={getNavigationPath(item)}>
              <img alt={item.label} className="games-carousel-image" draggable={false} loading="lazy" src={item.imageUrl} />
            </Link>
            <Link className="games-carousel-discover" to={getNavigationPath(item)}>Discover</Link>
          </article>)}
        </div>
        <button aria-label="Ver más juegos" className="games-carousel-arrow games-carousel-arrow--next" disabled={!navigation.canGoNext} onClick={() => move(1)} type="button"><ChevronRight size={28} /></button>
      </div>
    </section>
  )
}
