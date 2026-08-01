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
  return <><div className={`product-grid ${className}`.trim()} key={currentPage}>{products.map((product) => <ProductCard key={product.id} product={product} />)}</div><Pagination currentPage={currentPage} onPageChange={onPageChange} totalPages={totalPages} /></>
}
