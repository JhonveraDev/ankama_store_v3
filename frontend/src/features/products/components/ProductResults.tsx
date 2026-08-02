import { useRef } from 'react'
import type { Product } from '../../../types/product'
import { Pagination } from '../../pagination/components/Pagination'
import { ProductCard } from './ProductCard'
import { scrollToProductListing } from '../utils/scroll-to-product-listing'

interface ProductResultsProps {
  className?: string
  currentPage: number
  onPageChange: (page: number) => void
  products: Product[]
  totalPages: number
}

/** Shared grid and paginator used by every product listing. */
export function ProductResults({ className = '', currentPage, onPageChange, products, totalPages }: ProductResultsProps) {
  const productsSectionRef = useRef<HTMLDivElement>(null)

  const handlePageChange = (page: number) => {
    onPageChange(page)
    requestAnimationFrame(() => scrollToProductListing(productsSectionRef.current))
  }

  return <div className="product-results" ref={productsSectionRef}><div className={`product-grid ${className}`.trim()} key={currentPage}>{products.map((product) => <ProductCard key={product.id} product={product} />)}</div><Pagination currentPage={currentPage} onPageChange={handlePageChange} totalPages={totalPages} /></div>
}
