import { Link } from 'react-router-dom'
import type { Product } from '../../../types/product'

interface RecentlyViewedCardProps {
  product: Product
}

export function RecentlyViewedCard({ product }: RecentlyViewedCardProps) {
  return (
    <Link aria-label={`Ver ${product.name}`} className="recently-viewed-card" to={`/productos/${product.slug}`}>
      <div><img alt="" src={product.imageUrl} onError={(event) => { event.currentTarget.hidden = true }} /></div>
      <span>{product.name}</span>
    </Link>
  )
}
