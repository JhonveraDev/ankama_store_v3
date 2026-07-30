import type { ProductPrice as ProductPriceType, ProductDiscount } from '../../../types/product'

interface ProductPriceProps {
  price: ProductPriceType
  discount?: ProductDiscount
}

function formatPrice(price: ProductPriceType, amount = price.amount): string {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: price.currency }).format(amount)
}

export function ProductPrice({ price, discount }: ProductPriceProps) {
  return (
    <div className="product-price-panel">
      {discount && <span className="product-original-price">{formatPrice(price, discount.originalAmount)}</span>}
      <strong>{formatPrice(price)}</strong>
      {discount && <span className="product-discount">-{discount.percentage}%</span>}
    </div>
  )
}
