import { ChevronRight, PackageOpen } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { ProductCard } from '../features/products/components/ProductCard'
import { useProducts } from '../features/products/hooks/use-products'
import { CategorySidebar } from '../features/navigation/components/CategorySidebar'
import { findNavigationCategory, findNavigationItem, getNavigationGameValue, getNavigationPath } from '../features/navigation/navigation-routes'

export function NavigationCatalogPage() {
  const { category: categorySlug, game: gameSlug } = useParams()
  const { data: allProducts = [] } = useProducts()
  const navigationItem = gameSlug ? findNavigationItem(gameSlug) : undefined
  const category = navigationItem && categorySlug ? findNavigationCategory(navigationItem, categorySlug) : undefined

  if (!navigationItem || (categorySlug && !category)) return <Navigate replace to="/" />

  const products = allProducts.filter((product) => product.game === getNavigationGameValue(navigationItem.label) && (!category || product.category === category))
  const title = category ?? navigationItem.label

  return <section className="navigation-catalog-page">
    <nav aria-label="Breadcrumb" className="catalog-breadcrumbs"><Link to="/">Inicio</Link><ChevronRight size={14} /><Link to={getNavigationPath(navigationItem)}>{navigationItem.label}</Link>{category && <><ChevronRight size={14} /><span>{category}</span></>}</nav>
    <div className="navigation-catalog-layout"><CategorySidebar activeCategory={category} item={navigationItem} productCount={products.length} /><div className="navigation-catalog-content"><header className="navigation-catalog-heading"><p className="section-kicker">{navigationItem.label}</p><h1>{title}</h1><p>{category ? `Encuentra artículos seleccionados de ${category}.` : `Explora todas las categorías disponibles para ${navigationItem.label}.`}</p></header>{products.length ? <><div className="navigation-catalog-meta"><span>{products.length} productos</span><label>Ordenar por <select defaultValue="relevancia"><option value="relevancia">Relevancia</option><option value="price-asc">Precio: menor a mayor</option><option value="price-desc">Precio: mayor a menor</option></select></label></div><div className="product-grid navigation-product-grid">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div><nav aria-label="Paginación" className="catalog-pagination"><button aria-current="page" type="button">1</button></nav></> : <div className="catalog-message catalog-message--empty"><PackageOpen size={38} /><div><h3>Próximamente habrá productos aquí</h3><p>Esta categoría aún no tiene productos disponibles.</p></div></div>}</div></div>
  </section>
}
