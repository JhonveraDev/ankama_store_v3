import { Link, useParams } from 'react-router-dom'

export function ProductDetailPage() {
  const { slug } = useParams()

  return (
    <section className="product-detail-placeholder">
      <p className="section-kicker">Próximamente</p>
      <h1>Detalle de producto</h1>
      <p>La página de detalle para “{slug}” estará disponible en una próxima etapa.</p>
      <Link to="/">Volver a la tienda</Link>
    </section>
  )
}
