import { ShoppingBasket } from 'lucide-react'
import { Link } from 'react-router-dom'
export function EmptyCart() { return <section className="empty-cart"><ShoppingBasket size={42} /><h1>Tu carrito está vacío</h1><p>Aún no has añadido productos a tu selección.</p><Link to="/#catalogo">Continuar comprando</Link></section> }
