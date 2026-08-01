import { Link } from 'react-router-dom'
import type { Product } from '../../../types/product'
import { getProductGameLogo } from '../utils/product-game-logo'

interface ProductCardProps {
  product: Product
}

function formatPrice(amount: number, currency: string): string {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency }).format(amount)
}

function formatOgrines(amount: number): string {
  return new Intl.NumberFormat('es-CO').format(amount)
}

export function ProductCard({ product }: ProductCardProps) {
  const gameLogo = getProductGameLogo(product.game)

  return (
    <Link aria-label={`Ver ${product.name}`} className="product-card" to={`/productos/${product.slug}`}>
      <div className="product-image-wrap">
        <img alt={product.name} className="product-image" onError={(event) => { event.currentTarget.hidden = true }} src={product.imageUrl} />
        {product.badge && <span className="product-tag">{product.badge}</span>}
      </div>
      <div className="product-card-info">
        {gameLogo && <img alt="" aria-hidden="true" className="product-game-logo" src={gameLogo} />}
        <h3 title={product.name}>{product.name}</h3>
      </div>
      <div className="product-price" aria-label={`Precio: ${formatPrice(product.price.amount, product.price.currency)}${product.ogrinePrice !== undefined ? ` or ${formatOgrines(product.ogrinePrice)} Ogrinas` : ''}`}>
        <span>{formatPrice(product.price.amount, product.price.currency)}</span>
        {product.ogrinePrice !== undefined && <><span className="product-price-separator">or</span><span className="product-ogrine-price"><img alt="" aria-hidden="true" src="/media/general/ogrine_coin.svg" />{formatOgrines(product.ogrinePrice)} Ogrinas</span></>}
      </div>
    </Link>
  )
}
