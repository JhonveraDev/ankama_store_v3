import { CreditCard, Headphones, Instagram, Truck } from 'lucide-react'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <section><h2>Compra con confianza</h2><p><Headphones size={18} /> Atención y contacto</p><p><CreditCard size={18} /> Pago seguro</p><p><Truck size={18} /> Entrega a domicilio</p></section>
        <section><h2>Información</h2><a href="#legal">Términos y condiciones</a><a href="#legal">Privacidad</a><a href="#legal">Preguntas frecuentes</a></section>
        <section><h2>Síguenos</h2><div className="social-links"><a href="#instagram" aria-label="Instagram"><Instagram /></a><a href="#facebook" aria-label="Facebook">f</a><a href="#youtube" aria-label="YouTube">▶</a></div></section>
      </div>
      <div className="footer-bottom"><span className="footer-brand">arcadia store</span><span>© 2026 Arcadia Store. Proyecto educativo.</span></div>
    </footer>
  )
}
