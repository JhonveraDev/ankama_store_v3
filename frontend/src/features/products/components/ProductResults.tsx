import { useRef } from 'react'
import type { Product } from '../../../types/product'
import { Pagination } from '../../pagination/components/Pagination'
import { ProductCard } from './ProductCard'

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
    requestAnimationFrame(() => {
      const scrollTarget = productsSectionRef.current?.closest<HTMLElement>('[data-product-listing]') ?? productsSectionRef.current
      scrollTarget?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  return <div className="product-results" ref={productsSectionRef}><div className={`product-grid ${className}`.trim()} key={currentPage}>{products.map((product) => <ProductCard key={product.id} product={product} />)}</div><Pagination currentPage={currentPage} onPageChange={handlePageChange} totalPages={totalPages} /></div>
}
