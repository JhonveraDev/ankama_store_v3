import { ShoppingBasket, Zap } from 'lucide-react'
import { useState } from 'react'
import type { Product } from '../../../types/product'
import { ProductPrice } from './ProductPrice'
import { QuantitySelector } from './QuantitySelector'
import { useCart } from '../../cart/hooks/use-cart'
import { useNavigate } from 'react-router-dom'

interface ProductInfoProps {
  product: Product
}

function formatGameName(game: Product['game']): string {
  return game === 'DOFUS_RETRO' ? 'DOFUS Retro' : game
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1)
  const [notice, setNotice] = useState('')
  const { addItem } = useCart()
  const navigate = useNavigate()
  const isInStock = product.isAvailable && product.stock > 0

  const handleAddToCart = () => { addItem(product, quantity); setNotice(`${quantity} ${quantity === 1 ? 'unidad añadida' : 'unidades añadidas'} a tu carrito.`) }
  const handleBuyNow = () => { addItem(product, quantity); navigate('/cart') }

  return (
    <section className="product-info">
      <div className="product-info-meta"><span>{formatGameName(product.game)}</span><span>{product.category}</span></div>
      <div className="product-info-heading">
        {product.badge && <span className="product-info-badge">{product.badge}</span>}
        <h1>{product.name}</h1>
      </div>
      <p className="product-info-description">{product.shortDescription ?? product.description}</p>
      {product.tags && product.tags.length > 0 && <div className="product-tags">{product.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>}
      <ProductPrice discount={product.discount} price={product.price} />
      <QuantitySelector max={Math.max(product.stock, 1)} onChange={setQuantity} value={quantity} />
      <p className={isInStock ? 'product-stock is-available' : 'product-stock'}>{isInStock ? `${product.stock} disponibles` : 'No disponible'}</p>
      <div className="product-purchase-actions">
        <button disabled={!isInStock} onClick={handleAddToCart} type="button"><ShoppingBasket size={20} /> Agregar al carrito</button>
        <button disabled={!isInStock} onClick={handleBuyNow} type="button"><Zap size={20} /> Comprar ahora</button>
      </div>
      {notice && <p className="product-action-notice" role="status">{notice}</p>}
    </section>
  )
}
