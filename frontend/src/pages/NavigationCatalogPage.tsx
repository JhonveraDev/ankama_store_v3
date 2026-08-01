import { ChevronRight, PackageOpen } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link, Navigate, useParams, useSearchParams } from 'react-router-dom'
import { Pagination } from '../features/pagination/components/Pagination'
import { usePagination } from '../features/pagination/hooks/use-pagination'
import { ProductCard } from '../features/products/components/ProductCard'
import { useProducts } from '../features/products/hooks/use-products'
import { CategorySidebar } from '../features/navigation/components/CategorySidebar'
import type { NavigationItem } from '../features/navigation/navigation-items'
import { findNavigationCategory, findNavigationItem, getNavigationGameValue, getNavigationPath } from '../features/navigation/navigation-routes'

type SortOption = 'relevancia' | 'price-asc' | 'price-desc'

export function NavigationCatalogPage() {
  const { category: categorySlug, game: gameSlug } = useParams()
  const navigationItem = gameSlug ? findNavigationItem(gameSlug) : undefined
  const category = navigationItem && categorySlug ? findNavigationCategory(navigationItem, categorySlug) : undefined

  if (!navigationItem || (categorySlug && !category)) return <Navigate replace to="/" />

  return <NavigationCatalogContent category={category} navigationItem={navigationItem} />
}

interface NavigationCatalogContentProps {
  category?: string
  navigationItem: NavigationItem
}

function NavigationCatalogContent({ category, navigationItem }: NavigationCatalogContentProps) {
  const [searchParams, setSearchParams] = useSearchParams()
  const [sort, setSort] = useState<SortOption>('relevancia')
  const { data: allProducts = [] } = useProducts()

  const products = useMemo(() => allProducts.filter((product) => product.game === getNavigationGameValue(navigationItem.label) && (!category || product.category === category)), [allProducts, category, navigationItem.label])
  const sortedProducts = useMemo(() => {
    if (sort === 'relevancia') return products
    return [...products].sort((first, second) => sort === 'price-asc' ? first.price.amount - second.price.amount : second.price.amount - first.price.amount)
  }, [products, sort])
  const pagination = usePagination({ currentPage: Number(searchParams.get('page')) || 1, items: sortedProducts })
  const title = category ?? navigationItem.label
  const setPage = (page: number) => setSearchParams((current) => {
    const next = new URLSearchParams(current)
    next.set('page', String(page))
    return next
  })

  const changeSort = (value: SortOption) => {
    setSort(value)
    setPage(1)
  }

  return (
    <section className="navigation-catalog-page">
      <nav aria-label="Breadcrumb" className="catalog-breadcrumbs"><Link to="/">Inicio</Link><ChevronRight size={14} /><Link to={getNavigationPath(navigationItem)}>{navigationItem.label}</Link>{category && <><ChevronRight size={14} /><span>{category}</span></>}</nav>
      <div className="navigation-catalog-layout">
        <CategorySidebar activeCategory={category} item={navigationItem} productCount={products.length} />
        <div className="navigation-catalog-content">
          <header className="navigation-catalog-heading"><p className="section-kicker">{navigationItem.label}</p><h1>{title}</h1><p>{category ? `Encuentra artículos seleccionados de ${category}.` : `Explora todas las categorías disponibles para ${navigationItem.label}.`}</p></header>
          {products.length ? <>
            <div className="navigation-catalog-meta"><span>{products.length} productos</span><label>Ordenar por <select onChange={(event) => changeSort(event.target.value as SortOption)} value={sort}><option value="relevancia">Relevancia</option><option value="price-asc">Precio: menor a mayor</option><option value="price-desc">Precio: mayor a menor</option></select></label></div>
            <div className="product-grid navigation-product-grid" key={pagination.currentPage}>{pagination.items.map((product) => <ProductCard key={product.id} product={product} />)}</div>
            <Pagination currentPage={pagination.currentPage} onPageChange={setPage} totalPages={pagination.totalPages} />
          </> : <div className="catalog-message catalog-message--empty"><PackageOpen size={38} /><div><h3>Próximamente habrá productos aquí</h3><p>Esta categoría aún no tiene productos disponibles.</p></div></div>}
        </div>
      </div>
    </section>
  )
}
