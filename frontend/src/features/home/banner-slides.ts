export interface BannerSlide {
  title: string
  description: string
  imageUrl: string
  theme: 'violet' | 'amber' | 'teal'
}

export const bannerSlides: BannerSlide[] = [
  {
    title: 'Tu próxima aventura empieza aquí',
    description: 'Descubre colecciones, accesorios y artículos para explorar nuevos mundos.',
    imageUrl: '/media/banners/home-01.webp',
    theme: 'violet',
  },
  {
    title: 'Colecciones que cuentan historias',
    description: 'Encuentra piezas únicas para acompañar cada una de tus aventuras.',
    imageUrl: '/media/banners/home-02.webp',
    theme: 'amber',
  },
  {
    title: 'Hecho para quienes juegan',
    description: 'Una tienda preparada para descubrir, guardar y compartir lo que te inspira.',
    imageUrl: '/media/banners/home-03.webp',
    theme: 'teal',
  },
]
