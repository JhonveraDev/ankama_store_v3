import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from 'react'
import type { BannerSlide } from '../../features/home/banner-slides'

interface HeroCarouselProps {
  slides: BannerSlide[]
  autoplayInterval?: number
  ariaLabel?: string
}

export function HeroCarousel({ slides, autoplayInterval = 6000, ariaLabel = 'Promociones destacadas' }: HeroCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [timerKey, setTimerKey] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const dragStartX = useRef<number | null>(null)
  const thumbnailCount = slides.length
  const thumbnailShellWidth = Math.min(1120, (thumbnailCount * 130) + (Math.max(0, thumbnailCount - 1) * 20) + (thumbnailCount < 3 ? 64 : 128))
  const mobileThumbnailShellWidth = (thumbnailCount * 110) + (Math.max(0, thumbnailCount - 1) * 12) + 32

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % slides.length)
      setTimerKey((currentKey) => currentKey + 1)
    }, autoplayInterval)

    return () => window.clearTimeout(timer)
  }, [activeIndex, autoplayInterval, slides.length, timerKey])

  const showSlide = (index: number) => {
    setActiveIndex(index)
    setTimerKey((currentKey) => currentKey + 1)
  }

  const goToPrevious = () => showSlide((activeIndex - 1 + slides.length) % slides.length)
  const goToNext = () => showSlide((activeIndex + 1) % slides.length)

  const handlePointerDown = (event: PointerEvent<HTMLElement>) => {
    dragStartX.current = event.clientX
    setIsDragging(true)
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (dragStartX.current === null) {
      return
    }

    setDragOffset(event.clientX - dragStartX.current)
  }

  const finishDrag = (event: PointerEvent<HTMLElement>) => {
    if (dragStartX.current === null) {
      return
    }

    const distance = event.clientX - dragStartX.current
    const dragThreshold = 80

    if (distance <= -dragThreshold) {
      goToNext()
    } else if (distance >= dragThreshold) {
      goToPrevious()
    }

    dragStartX.current = null
    setDragOffset(0)
    setIsDragging(false)
  }

  const cancelDrag = () => {
    dragStartX.current = null
    setDragOffset(0)
    setIsDragging(false)
  }

  return (
    <section className="hero" aria-label={ariaLabel}>
      <div
        className={`hero-viewport${isDragging ? ' is-dragging' : ''}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={finishDrag}
        onPointerCancel={cancelDrag}
      >
        <div className="hero-track" style={{ transform: `translateX(calc(-${activeIndex * 100}% + ${dragOffset}px))` }}>
          {slides.map((slide, index) => (
            <div className="hero-slide" key={slide.imageUrl} aria-hidden={index !== activeIndex}>
              <img className="hero-image" src={slide.imageUrl} alt={index === activeIndex ? slide.alt : ''} draggable={false} />
            </div>
          ))}
        </div>

        <button className="hero-arrow hero-arrow--previous" type="button" onPointerDown={(event) => event.stopPropagation()} onClick={goToPrevious} aria-label="Banner anterior"><ChevronLeft /></button>
        <button className="hero-arrow hero-arrow--next" type="button" onPointerDown={(event) => event.stopPropagation()} onClick={goToNext} aria-label="Siguiente banner"><ChevronRight /></button>
      </div>

      <div className="hero-thumbnail-shell" style={{ '--hero-thumbnail-shell-width': `${thumbnailShellWidth}px`, '--hero-mobile-thumbnail-shell-width': `${mobileThumbnailShellWidth}px` } as CSSProperties}>
        <div className={`hero-thumbnails${slides.length < 3 ? ' is-compact' : ''}`} role="tablist" aria-label="Seleccionar banner">
          {slides.map((slide, index) => (
            <button
              key={slide.imageUrl}
              type="button"
              className="hero-thumbnail"
              aria-label={`Ver banner ${index + 1}`}
              aria-selected={index === activeIndex}
              onClick={() => showSlide(index)}
            >
              <img src={slide.thumbnailUrl} alt="" />
              <span className="thumbnail-progress-track">
                {index === activeIndex && <span className="thumbnail-progress" key={timerKey} />}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
