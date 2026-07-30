import { AlertCircle, LoaderCircle, PackageOpen } from 'lucide-react'
import { useEffect, useMemo } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { ProductCategoryResults } from '../features/products/components/ProductCategoryResults'
import { ProductCategorySidebar } from '../features/products/components/ProductCategorySidebar'
import { ProductGallery } from '../features/products/components/ProductGallery'
import { ProductInfo } from '../features/products/components/ProductInfo'
import { useProducts } from '../features/products/hooks/use-products'
import { getGameCategories, getProductsByGameAndCategory } from '../features/products/utils/product-categories'
import { useRecentlyViewed } from '../features/recently-viewed/hooks/use-recently-viewed'

export function ProductDetailPage() {
  const { slug } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { data: products = [], isError, isLoading, refetch } = useProducts()
  const { recordProduct } = useRecentlyViewed()
  const product = useMemo(() => products.find((item) => item.slug === slug), [products, slug])

  useEffect(() => {
    if (product) recordProduct(product)
  }, [product, recordProduct])

  if (isLoading) return <div className="product-detail-message catalog-message"><LoaderCircle className="spin" /> Cargando producto…</div>
  if (isError) return <div className="product-detail-message catalog-message catalog-message--error"><AlertCircle /><div><p>No fue posible cargar el producto.</p><button className="catalog-retry-button" onClick={() => void refetch()} type="button">Reintentar</button></div></div>
  if (!product) return <div className="product-detail-message catalog-message catalog-message--empty"><PackageOpen size={38} /><div><h1>Producto no encontrado</h1><p>Es posible que ya no esté disponible en el catálogo.</p><Link to="/">Volver a la tienda</Link></div></div>

  const gameCategories = getGameCategories(products, product.game)
  const requestedCategory = searchParams.get('categoria')
  const isCategoryView = requestedCategory !== null && gameCategories.includes(requestedCategory)
  const activeCategory = requestedCategory !== null && gameCategories.includes(requestedCategory) ? requestedCategory : product.category
  const categoryProducts = isCategoryView ? getProductsByGameAndCategory(products, product.game, activeCategory) : []
  const selectCategory = (category: string) => navigate(`/productos/${product.slug}?categoria=${encodeURIComponent(category)}`)
  const showProduct = () => navigate(`/productos/${product.slug}`)

  return (
    <>
      <nav aria-label="Migas de pan" className="product-breadcrumb"><Link to="/">Inicio</Link><span>/</span><span>{product.game.replace('_', ' ')}</span><span>/</span><span aria-current="page">{product.name}</span></nav>
      <section className="product-detail-layout">
        <ProductCategorySidebar activeCategory={activeCategory} game={product.game} onSelectCategory={selectCategory} products={products} />
        {isCategoryView ? <ProductCategoryResults category={activeCategory} game={product.game} onShowProduct={showProduct} products={categoryProducts} /> : <><ProductGallery imageUrl={product.imageUrl} images={product.gallery} key={product.id} productName={product.name} /><ProductInfo product={product} /></>}
      </section>
      {!isCategoryView && <section className="product-composition">
        <p className="section-kicker">Información</p><h2>Composición y detalles</h2>
        {product.details && product.details.length > 0 ? <ul>{product.details.map((detail) => <li key={detail}>{detail}</li>)}</ul> : <p>{product.description}</p>}
      </section>}
    </>
  )
}
