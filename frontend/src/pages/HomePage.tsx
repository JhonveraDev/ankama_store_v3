import { useState } from 'react'
import { Footer } from '../components/Footer/Footer'
import { Header } from '../components/Header/Header'
import { HeroCarousel } from '../components/HeroCarousel/HeroCarousel'
import { ProductCatalog } from '../components/ProductCatalog/ProductCatalog'
import { bannerSlides } from '../features/home/banner-slides'
import { useProducts } from '../features/products/hooks/use-products'

export function HomePage() {
  const [searchTerm, setSearchTerm] = useState('')
  const { data: products = [], isError, isLoading, refetch } = useProducts()

  return (
    <>
      <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <HeroCarousel slides={bannerSlides} />
      <ProductCatalog products={products} isLoading={isLoading} isError={isError} searchTerm={searchTerm} onRetry={() => void refetch()} />
      <Footer />
    </>
  )
}
