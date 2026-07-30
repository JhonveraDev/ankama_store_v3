import { AlertCircle, LoaderCircle, PackageOpen } from 'lucide-react'
import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ProductGallery } from '../features/products/components/ProductGallery'
import { ProductInfo } from '../features/products/components/ProductInfo'
import { useProducts } from '../features/products/hooks/use-products'

export function ProductDetailPage() {
  const { slug } = useParams()
  const { data: products = [], isError, isLoading, refetch } = useProducts()
  const product = useMemo(() => products.find((item) => item.slug === slug), [products, slug])

  if (isLoading) return <div className="product-detail-message catalog-message"><LoaderCircle className="spin" /> Cargando producto…</div>
  if (isError) return <div className="product-detail-message catalog-message catalog-message--error"><AlertCircle /><div><p>No fue posible cargar el producto.</p><button className="catalog-retry-button" onClick={() => void refetch()} type="button">Reintentar</button></div></div>
  if (!product) return <div className="product-detail-message catalog-message catalog-message--empty"><PackageOpen size={38} /><div><h1>Producto no encontrado</h1><p>Es posible que ya no esté disponible en el catálogo.</p><Link to="/">Volver a la tienda</Link></div></div>

  return (
    <>
      <nav aria-label="Migas de pan" className="product-breadcrumb"><Link to="/">Inicio</Link><span>/</span><span>{product.game.replace('_', ' ')}</span><span>/</span><span aria-current="page">{product.name}</span></nav>
      <section className="product-detail-layout">
        <aside className="product-detail-context">
          <p className="section-kicker">Explorar</p>
          <h2>{product.game.replace('_', ' ')}</h2>
          <dl><div><dt>Categoría</dt><dd>{product.category}</dd></div><div><dt>Disponibilidad</dt><dd>{product.isAvailable ? 'En stock' : 'Agotado'}</dd></div></dl>
        </aside>
        <ProductGallery imageUrl={product.imageUrl} images={product.gallery} key={product.id} productName={product.name} />
        <ProductInfo product={product} />
      </section>
      <section className="product-composition">
        <p className="section-kicker">Información</p><h2>Composición y detalles</h2>
        {product.details && product.details.length > 0 ? <ul>{product.details.map((detail) => <li key={detail}>{detail}</li>)}</ul> : <p>{product.description}</p>}
      </section>
    </>
  )
}
