import { HeroCarousel } from '../components/HeroCarousel/HeroCarousel'
import { ProductCatalog } from '../components/ProductCatalog/ProductCatalog'
import { bannerSlides } from '../features/home/banner-slides'
import { useProducts } from '../features/products/hooks/use-products'
import { RecentlyViewedProducts } from '../features/recently-viewed/components/RecentlyViewedProducts'

export function HomePage() {
  const { data: products = [], isError, isLoading, refetch } = useProducts()

  return (
    <>
      <HeroCarousel slides={bannerSlides} />
      <ProductCatalog products={products} isLoading={isLoading} isError={isError} onRetry={() => void refetch()} />
      <RecentlyViewedProducts />
    </>
  )
}
