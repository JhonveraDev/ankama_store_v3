import { AlertCircle, LoaderCircle, PackageOpen, SlidersHorizontal } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { ProductResults } from '../../features/products/components/ProductResults'
import { type ProductSort, useProductCatalog } from '../../features/products/hooks/use-product-catalog'
import { useProducts } from '../../features/products/hooks/use-products'
import { scrollToProductListing } from '../../features/products/utils/scroll-to-product-listing'

function formatGameName(game: string): string {
  return game.replaceAll('_', ' ').replace(/\b\w/g, (character) => character.toUpperCase())
}

const sortOptions: Array<{ label: string; value: ProductSort }> = [
  { value: 'price-asc', label: 'COP: menor a mayor' },
  { value: 'price-desc', label: 'COP: mayor a menor' },
  { value: 'ogrines-asc', label: 'Ogrinas: menor a mayor' },
  { value: 'ogrines-desc', label: 'Ogrinas: mayor a menor' },
]

/** Home shell for the shared catalog system. */
export function ProductCatalog() {
  const [activeGame, setActiveGame] = useState<string>('ALL')
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [sort, setSort] = useState<ProductSort>('relevancia')
  const productsSectionRef = useRef<HTMLElement>(null)
  const shouldScrollToProductsRef = useRef(false)
  const { data: products = [], isError, isLoading, refetch } = useProducts()
  const catalog = useProductCatalog({ game: activeGame === 'ALL' ? undefined : activeGame, products, resetKey: `${activeGame}-${sort}`, sort })
  const games = [...new Set(products.map((product) => product.game))]

  const selectGame = (game: string) => {
    if (game === activeGame) return
    shouldScrollToProductsRef.current = true
    setActiveGame(game)
  }

  useEffect(() => {
    if (!shouldScrollToProductsRef.current) return
    shouldScrollToProductsRef.current = false
    const animationFrame = requestAnimationFrame(() => scrollToProductListing(productsSectionRef.current))
    return () => cancelAnimationFrame(animationFrame)
  }, [activeGame])

  return (
    <section className="catalog-section" data-product-listing id="catalogo" ref={productsSectionRef}>
      <aside className="catalog-sidebar"><p className="section-kicker">Explorar</p><h2>Catálogo</h2><span className="catalog-count">{catalog.totalItems} artículos</span><div className="category-list"><button aria-pressed={activeGame === 'ALL'} className={activeGame === 'ALL' ? 'is-active' : ''} onClick={() => selectGame('ALL')} type="button">Todos</button>{games.map((game) => <button aria-pressed={activeGame === game} className={activeGame === game ? 'is-active' : ''} key={game} onClick={() => selectGame(game)} type="button">{formatGameName(game)}</button>)}</div></aside>
      <div className="catalog-content"><div className="catalog-heading"><div><p className="section-kicker">Selección actual</p><h2>Productos destacados</h2></div><div className="catalog-filter"><button aria-controls="catalog-price-filters" aria-expanded={isFilterOpen} className="filter-button" onClick={() => setIsFilterOpen((isOpen) => !isOpen)} type="button"><SlidersHorizontal size={18} /> Filtrar</button>{isFilterOpen && <div aria-label="Ordenar productos por precio" className="catalog-filter-menu" id="catalog-price-filters" role="menu">{sortOptions.map((option) => <button aria-pressed={sort === option.value} className={sort === option.value ? 'is-active' : ''} key={option.value} onClick={() => { setSort(option.value); setIsFilterOpen(false) }} role="menuitemradio" type="button">{option.label}</button>)}</div>}</div></div>
        {isLoading && <div className="catalog-message"><LoaderCircle className="spin" /> Cargando catálogo…</div>}
        {isError && <div className="catalog-message catalog-message--error"><AlertCircle /><div><p>No fue posible cargar el catálogo.</p><button className="catalog-retry-button" onClick={() => void refetch()} type="button">Reintentar</button></div></div>}
        {!isLoading && !isError && catalog.totalItems === 0 && <div className="catalog-message catalog-message--empty"><PackageOpen size={38} /><div><h3>El catálogo estará disponible pronto</h3><p>Añade productos al archivo JSON para mostrarlos aquí.</p></div></div>}
        {!isLoading && !isError && catalog.totalItems > 0 && <ProductResults currentPage={catalog.currentPage} onPageChange={catalog.setPage} products={catalog.items} totalPages={catalog.totalPages} />}
      </div>
    </section>
  )
}
