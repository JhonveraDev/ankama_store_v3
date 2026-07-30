import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { BannerSlide } from '../../features/home/banner-slides'

interface HeroCarouselProps {
  slides: BannerSlide[]
}

export function HeroCarousel({ slides }: HeroCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % slides.length)
    }, 6000)

    return () => window.clearInterval(timer)
  }, [slides.length])

  const goToPrevious = () => setActiveIndex((activeIndex - 1 + slides.length) % slides.length)
  const goToNext = () => setActiveIndex((activeIndex + 1) % slides.length)

  return (
    <section className="hero" aria-label="Promociones destacadas">
      <div className="hero-track" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
        {slides.map((slide, index) => (
          <div className="hero-slide" key={slide.imageUrl} aria-hidden={index !== activeIndex}>
            <img className="hero-image" src={slide.imageUrl} alt={index === activeIndex ? slide.alt : ''} />
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
