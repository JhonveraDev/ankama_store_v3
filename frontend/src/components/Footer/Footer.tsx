import { CreditCard, Headphones, Instagram, Truck, Youtube } from 'lucide-react'

const paymentMethods = [
  ['visa.e2003b09.svg', 'Visa'], ['mastercard.922a6884.svg', 'Mastercard'], ['diners.91c98abf.svg', 'Diners Club'], ['elo.f9efb352.svg', 'Elo'], ['hipercard.0a46bc08.svg', 'Hipercard'], ['jcb.8a5525fb.svg', 'JCB'], ['discover.9a720a7a.svg', 'Discover'], ['cmr.7ede9b0b.svg', 'CMR'], ['hf.139d8d7f.svg', 'Método de pago'], ['bl.04b91be9.svg', 'Método de pago'], ['bz.36f6e56d.svg', 'Método de pago'], ['o2.e434268f.svg', 'Método de pago'], ['o3.22787294.svg', 'Método de pago'], ['o5.c8bdc6da.svg', 'Método de pago'], ['o6.ac059e4b.svg', 'Método de pago'], ['o7.ca26c66d.svg', 'Método de pago'], ['oa.1d523029.svg', 'Método de pago'], ['ou.f667f226.svg', 'Método de pago'], ['ox.7cbd1a1f.svg', 'Método de pago'], ['oy.73a715f4.svg', 'Método de pago'],
]

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-grid">
          <section className="footer-commitments">
            <h2>Nuestros compromisos</h2>
            <ul>
              <li><Headphones aria-hidden="true" size={31} /><span>Servicio de atención al cliente y contacto</span></li>
              <li><CreditCard aria-hidden="true" size={31} /><span>Pago con tarjeta bancaria</span></li>
              <li><Truck aria-hidden="true" size={31} /><span>Entrega</span></li>
            </ul>
          </section>
          <section className="footer-information">
            <h2>Información</h2>
            <nav aria-label="Información legal"><a href="#legal">Menciones legales</a><a href="#legal">Condiciones generales de venta</a><a href="#legal">Condiciones generales de uso</a><a href="#legal">Política de privacidad</a><a href="#legal">Configuración de cookies</a></nav>
          </section>
          <section className="footer-social">
            <h2>Ankama en las redes</h2>
            <div className="social-links"><a aria-label="Facebook" className="social-facebook" href="#facebook">f</a><a aria-label="X" className="social-x" href="#x">𝕏</a><a aria-label="Instagram" className="social-instagram" href="#instagram"><Instagram size={25} /></a><a aria-label="YouTube" className="social-youtube" href="#youtube"><Youtube size={25} /></a></div>
          </section>
        </div>
        <section aria-label="Medios de pago" className="footer-payments">
          <h2>Nuestros medios de pago</h2>
          <div className="payment-methods">{paymentMethods.map(([fileName, label]) => <img alt={label} className="payment-method" key={fileName} src={`/media/payments/${fileName}`} />)}</div>
        </section>
      </div>
      <div className="footer-bottom"><div className="footer-bottom-content"><img alt="Ankama" className="footer-logo" src="/media/general/logo-inline-white.svg" /><span aria-hidden="true" className="footer-divider" /><span>Copyright © 2026 Ankama. Todos los derechos reservados.</span></div></div>
    </footer>
  )
}
