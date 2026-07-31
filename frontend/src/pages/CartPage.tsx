import { CartItem } from '../features/cart/components/CartItem'
import { CartSummary } from '../features/cart/components/CartSummary'
import { EmptyCart } from '../features/cart/components/EmptyCart'
import { useCart } from '../features/cart/hooks/use-cart'

export function CartPage() { const { items, subtotal, discount, total, updateQuantity, removeItem } = useCart(); if (!items.length) return <EmptyCart />; return <section className="cart-page"><div className="cart-list"><h1>Tu carrito <span>({items.length})</span></h1><p className="cart-notice">Tus productos se guardan automáticamente en esta selección.</p>{items.map((item) => <CartItem item={item} key={item.product.id} onQuantityChange={(quantity) => updateQuantity(item.product.id, quantity)} onRemove={() => removeItem(item.product.id)} />)}</div><CartSummary disabled={!items.length} discount={discount} subtotal={subtotal} total={total} /></section> }
