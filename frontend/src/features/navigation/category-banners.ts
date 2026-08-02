import type { BannerSlide } from '../home/banner-slides'

const bannerCounts: Record<string, number> = {
  dofus: 2,
  'dofus-retro': 3,
  wakfu: 4,
  waven: 2,
  'premium-games': 2,
}

export function getCategoryBannerSlides(categorySlug: string): BannerSlide[] {
  const count = bannerCounts[categorySlug] ?? 0
  if (!count) return []

  return Array.from({ length: count }, (_, index) => {
    const sequence = String(index + 1).padStart(2, '0')
    return {
      imageUrl: `/media/banners/${categorySlug}/main/banner_${sequence}_large.jpg`,
      thumbnailUrl: `/media/banners/${categorySlug}/thumbnails/banner_${sequence}_thumbnail.jpg`,
      alt: `Promoción ${index + 1} de ${categorySlug.replaceAll('-', ' ')}`,
    }
  })
}
