import { ChevronRight, PackageOpen } from 'lucide-react'
import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { ProductResults } from '../features/products/components/ProductResults'
import { useProductCatalog } from '../features/products/hooks/use-product-catalog'
import { useProducts } from '../features/products/hooks/use-products'
import { CategorySidebar } from '../features/navigation/components/CategorySidebar'
import type { NavigationItem } from '../features/navigation/navigation-items'
import { findNavigationCategory, findNavigationItem, getNavigationGameValue, getNavigationPath } from '../features/navigation/navigation-routes'
import { getCategoryBannerSlides } from '../features/navigation/category-banners'
import { HeroCarousel } from '../components/HeroCarousel/HeroCarousel'

type SortOption = 'relevancia' | 'price-asc' | 'price-desc'

export function NavigationCatalogPage() {
  const { category: categorySlug, game: gameSlug } = useParams()
  const navigationItem = gameSlug ? findNavigationItem(gameSlug) : undefined
  const category = navigationItem && categorySlug ? findNavigationCategory(navigationItem, categorySlug) : undefined

  if (!navigationItem || (categorySlug && !category)) return <Navigate replace to="/" />

  const bannerSlides = getCategoryBannerSlides(getNavigationPath(navigationItem).slice(1))

  return <>{bannerSlides.length > 0 && <HeroCarousel ariaLabel={`Promociones de ${navigationItem.label}`} slides={bannerSlides} />}<NavigationCatalogContent category={category} navigationItem={navigationItem} /></>
}

interface NavigationCatalogContentProps {
  category?: string
  navigationItem: NavigationItem
}

function NavigationCatalogContent({ category, navigationItem }: NavigationCatalogContentProps) {
  const [sort, setSort] = useState<SortOption>('relevancia')
  const { data: allProducts = [] } = useProducts()

  const catalog = useProductCatalog({ category, game: getNavigationGameValue(navigationItem.label), products: allProducts, resetKey: `${navigationItem.label}-${category ?? ''}-${sort}`, sort })
  const title = category ?? navigationItem.label

  const changeSort = (value: SortOption) => {
    setSort(value)
  }

  return (
    <section className="navigation-catalog-page">
      <nav aria-label="Breadcrumb" className="catalog-breadcrumbs"><Link to="/">Inicio</Link><ChevronRight size={14} /><Link to={getNavigationPath(navigationItem)}>{navigationItem.label}</Link>{category && <><ChevronRight size={14} /><span>{category}</span></>}</nav>
      <div className="navigation-catalog-layout">
        <CategorySidebar activeCategory={category} item={navigationItem} productCount={catalog.totalItems} />
        <div className="navigation-catalog-content">
          <header className="navigation-catalog-heading"><p className="section-kicker">{navigationItem.label}</p><h1>{title}</h1><p>{category ? `Encuentra artículos seleccionados de ${category}.` : `Explora todas las categorías disponibles para ${navigationItem.label}.`}</p></header>
          {catalog.totalItems ? <>
            <div className="navigation-catalog-meta"><span>{catalog.totalItems} productos</span><label>Ordenar por <select onChange={(event) => changeSort(event.target.value as SortOption)} value={sort}><option value="relevancia">Relevancia</option><option value="price-asc">Precio: menor a mayor</option><option value="price-desc">Precio: mayor a menor</option></select></label></div>
            <ProductResults currentPage={catalog.currentPage} onPageChange={catalog.setPage} products={catalog.items} totalPages={catalog.totalPages} />
          </> : <div className="catalog-message catalog-message--empty"><PackageOpen size={38} /><div><h3>Próximamente habrá productos aquí</h3><p>Esta categoría aún no tiene productos disponibles.</p></div></div>}
        </div>
      </div>
    </section>
  )
}
