import type { Product } from '../../../types/product'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <img src={product.imageUrl} alt={product.name} className="product-image" onError={(event) => { event.currentTarget.hidden = true }} />
        {product.badge && <span className="product-tag">{product.badge}</span>}
      </div>
      <div className="product-details">
        <p className="product-category">{product.game.replace('_', ' ')} · {product.category}</p>
        <h3>{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <p className="product-price">
          {new Intl.NumberFormat('es-CO', { style: 'currency', currency: product.price.currency }).format(product.price.amount)}
        </p>
      </div>
    </article>
  )
}
