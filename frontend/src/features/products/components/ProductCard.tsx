import type { Product } from '../../../types/product'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <img src={product.imageUrl} alt={product.name} className="product-image" />
        <span className="product-tag">Disponible</span>
      </div>
      <div className="product-details">
        <p className="product-category">{product.category}</p>
        <h3>{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <p className="product-price">
          {new Intl.NumberFormat('es-CO', { style: 'currency', currency: product.currency }).format(product.price)}
        </p>
      </div>
    </article>
  )
}
