import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useRef, useState, type PointerEvent } from 'react'
import type { BannerSlide } from '../../features/home/banner-slides'

interface HeroCarouselProps {
  slides: BannerSlide[]
}

export function HeroCarousel({ slides }: HeroCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const dragStartX = useRef<number | null>(null)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % slides.length)
    }, 6000)

    return () => window.clearInterval(timer)
  }, [slides.length])

  const goToPrevious = () => setActiveIndex((currentIndex) => (currentIndex - 1 + slides.length) % slides.length)
  const goToNext = () => setActiveIndex((currentIndex) => (currentIndex + 1) % slides.length)

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

  return (
    <section
      className={`hero${isDragging ? ' is-dragging' : ''}`}
      aria-label="Promociones destacadas"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={finishDrag}
      onPointerCancel={finishDrag}
    >
      <div className="hero-track" style={{ transform: `translateX(calc(-${activeIndex * 100}% + ${dragOffset}px))` }}>
        {slides.map((slide, index) => (
          <div className="hero-slide" key={slide.imageUrl} aria-hidden={index !== activeIndex}>
            <img className="hero-image" src={slide.imageUrl} alt={index === activeIndex ? slide.alt : ''} draggable={false} />
          </div>
        ))}
      </div>

      <div className="hero-controls">
        <button type="button" onClick={goToPrevious} aria-label="Banner anterior"><ChevronLeft /></button>
        <div className="hero-dots" role="tablist" aria-label="Seleccionar banner">
          {slides.map((slide, index) => (
            <button
              key={slide.imageUrl}
              type="button"
              className={index === activeIndex ? 'is-active' : ''}
              aria-label={`Ver banner ${index + 1}`}
              aria-selected={index === activeIndex}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
        <button type="button" onClick={goToNext} aria-label="Siguiente banner"><ChevronRight /></button>
      </div>
    </section>
  )
}
