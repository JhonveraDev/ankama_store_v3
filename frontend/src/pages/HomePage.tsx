import { HeroCarousel } from '../components/HeroCarousel/HeroCarousel'
import { ProductCatalog } from '../components/ProductCatalog/ProductCatalog'
import { bannerSlides } from '../features/home/banner-slides'
import { RecentlyViewedProducts } from '../features/recently-viewed/components/RecentlyViewedProducts'

export function HomePage() {
  return (
    <>
      <HeroCarousel slides={bannerSlides} />
      <ProductCatalog />
      <RecentlyViewedProducts />
    </>
  )
}
