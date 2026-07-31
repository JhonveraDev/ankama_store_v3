import { Check, ChevronRight, CircleAlert, CreditCard, LockKeyhole, PackageCheck, ShieldCheck, WalletCards } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../features/auth/hooks/use-auth'
import { useCart } from '../features/cart/hooks/use-cart'

const format = (amount: number) => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(amount)

export function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'wallet'>('card')
  const { items, subtotal, discount, total, totalQuantity } = useCart()
  const { user } = useAuth()

  if (!items.length) return <section className="checkout-empty"><PackageCheck size={38} /><h1>Tu carrito está vacío</h1><p>Agrega un producto antes de continuar al pago.</p><Link to="/">Ir a la tienda</Link></section>

  return <section className="checkout-page">
    <div className="checkout-heading"><div><p>Compra segura</p><h1>Finaliza tu pedido</h1><span>Revisa tu información y elige un método de pago.</span></div><Link to="/cart">Volver al carrito</Link></div>
    <ol className="checkout-steps" aria-label="Progreso de compra"><li className="is-complete"><Check size={15} /><span>Carrito</span></li><li className="is-current"><b>2</b><span>Pago</span></li><li><b>3</b><span>Confirmación</span></li></ol>
    <p className="checkout-demo-notice"><CircleAlert size={18} /><strong>Modo de demostración:</strong> No se realizarán cobros. No ingreses datos de pago reales.</p>
    <div className="checkout-layout">
      <div className="checkout-main">
        <section className="checkout-card"><div className="checkout-card-title"><span className="checkout-title-icon"><ShieldCheck size={21} /></span><div><h2>Cuenta y entrega</h2><p>Tu pedido quedará asociado a esta cuenta.</p></div></div><div className="checkout-account"><img alt="" src="/media/general/default_avatar.png" /><div><strong>{user?.username}</strong><span>{user?.email}</span></div><span className="checkout-account-status"><Check size={14} /> Verificada</span></div></section>
        <section className="checkout-card"><div className="checkout-card-title"><span className="checkout-title-icon"><CreditCard size={21} /></span><div><h2>Método de pago</h2><p>Selecciona cómo quieres pagar tu pedido.</p></div></div><div className="checkout-payment-options"><label className={paymentMethod === 'card' ? 'is-selected' : ''}><input checked={paymentMethod === 'card'} name="payment" onChange={() => setPaymentMethod('card')} type="radio" /><CreditCard size={22} /><span><b>Tarjeta de crédito o débito</b><small>Pago seguro procesado por nuestro proveedor.</small></span><i /></label><label className={paymentMethod === 'wallet' ? 'is-selected' : ''}><input checked={paymentMethod === 'wallet'} name="payment" onChange={() => setPaymentMethod('wallet')} type="radio" /><WalletCards size={22} /><span><b>Saldo de cuenta</b><small>Próximamente podrás usar tu saldo Arcadia.</small></span><i /></label></div>{paymentMethod === 'card' && <div className="checkout-card-form"><label>Nombre en la tarjeta<input autoComplete="cc-name" placeholder="Nombre completo" /></label><label>Número de tarjeta<input autoComplete="cc-number" inputMode="numeric" placeholder="0000 0000 0000 0000" /></label><div><label>Vencimiento<input autoComplete="cc-exp" placeholder="MM / AA" /></label><label>CVV<input autoComplete="cc-csc" inputMode="numeric" placeholder="•••" /></label></div></div>}</section>
      </div>
      <aside className="checkout-order-summary"><h2>Resumen del pedido</h2><p className="checkout-item-count">{totalQuantity} {totalQuantity === 1 ? 'producto' : 'productos'} en tu pedido</p><div className="checkout-items">{items.map((item) => <article key={item.product.id}><img alt="" src={item.product.imageUrl} /><div><h3>{item.product.name}</h3><span>{item.quantity} × {format(item.product.price.amount)}</span></div><strong>{format(item.product.price.amount * item.quantity)}</strong></article>)}</div><dl><div><dt>Subtotal</dt><dd>{format(subtotal)}</dd></div>{discount > 0 && <div className="checkout-discount"><dt>Descuentos</dt><dd>-{format(discount)}</dd></div>}<div className="checkout-total"><dt>Total</dt><dd>{format(total)}</dd></div></dl><button className="checkout-pay-button" type="button">Continuar al pago <ChevronRight size={19} /></button><p className="checkout-security"><LockKeyhole size={15} /> Tus datos están protegidos mediante cifrado seguro.</p></aside>
    </div>
  </section>
}
