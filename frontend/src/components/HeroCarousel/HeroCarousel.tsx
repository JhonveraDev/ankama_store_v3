import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { BannerSlide } from '../../features/home/banner-slides'

interface HeroCarouselProps {
  slides: BannerSlide[]
}

export function HeroCarousel({ slides }: HeroCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [loadedImageUrl, setLoadedImageUrl] = useState<string | null>(null)
  const activeSlide = slides[activeIndex]

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % slides.length)
    }, 6000)

    return () => window.clearInterval(timer)
  }, [slides.length])

  useEffect(() => {
    let isCurrentSlide = true
    const image = new Image()

    image.onload = () => {
      if (isCurrentSlide) {
        setLoadedImageUrl(activeSlide.imageUrl)
      }
    }
    image.src = activeSlide.imageUrl

    return () => {
      isCurrentSlide = false
    }
  }, [activeSlide.imageUrl])

  const goToPrevious = () => setActiveIndex((activeIndex - 1 + slides.length) % slides.length)
  const goToNext = () => setActiveIndex((activeIndex + 1) % slides.length)

  return (
    <section className={`hero hero--${activeSlide.theme}`} aria-label="Promociones destacadas">
      {loadedImageUrl === activeSlide.imageUrl && <img className="hero-image" src={activeSlide.imageUrl} alt="" />}
      <div className="hero-content">
        <p className="eyebrow">Explora sin límites</p>
        <h1>{activeSlide.title}</h1>
        <p>{activeSlide.description}</p>
        <a href="#catalogo" className="hero-cta">Ver catálogo</a>
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
