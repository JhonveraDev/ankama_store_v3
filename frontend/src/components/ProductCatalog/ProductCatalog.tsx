import { AlertCircle, LoaderCircle, PackageOpen, SlidersHorizontal } from 'lucide-react'
import { useState } from 'react'
import { ProductResults } from '../../features/products/components/ProductResults'
import { useProductCatalog } from '../../features/products/hooks/use-product-catalog'
import { useProducts } from '../../features/products/hooks/use-products'

function formatGameName(game: string): string {
  return game.replaceAll('_', ' ').replace(/\b\w/g, (character) => character.toUpperCase())
}

/** Home shell for the shared catalog system. */
export function ProductCatalog() {
  const [activeGame, setActiveGame] = useState<string>('ALL')
  const { data: products = [], isError, isLoading, refetch } = useProducts()
  const catalog = useProductCatalog({ game: activeGame === 'ALL' ? undefined : activeGame, products, resetKey: activeGame })
  const games = [...new Set(products.map((product) => product.game))]

  return (
    <section className="catalog-section" id="catalogo">
      <aside className="catalog-sidebar"><p className="section-kicker">Explorar</p><h2>Catálogo</h2><span className="catalog-count">{catalog.totalItems} artículos</span><div className="category-list"><button aria-pressed={activeGame === 'ALL'} className={activeGame === 'ALL' ? 'is-active' : ''} onClick={() => setActiveGame('ALL')} type="button">Todos</button>{games.map((game) => <button aria-pressed={activeGame === game} className={activeGame === game ? 'is-active' : ''} key={game} onClick={() => setActiveGame(game)} type="button">{formatGameName(game)}</button>)}</div></aside>
      <div className="catalog-content"><div className="catalog-heading"><div><p className="section-kicker">Selección actual</p><h2>Productos destacados</h2></div><button className="filter-button" type="button"><SlidersHorizontal size={18} /> Filtrar</button></div>
        {isLoading && <div className="catalog-message"><LoaderCircle className="spin" /> Cargando catálogo…</div>}
        {isError && <div className="catalog-message catalog-message--error"><AlertCircle /><div><p>No fue posible cargar el catálogo.</p><button className="catalog-retry-button" onClick={() => void refetch()} type="button">Reintentar</button></div></div>}
        {!isLoading && !isError && catalog.totalItems === 0 && <div className="catalog-message catalog-message--empty"><PackageOpen size={38} /><div><h3>El catálogo estará disponible pronto</h3><p>Añade productos al archivo JSON para mostrarlos aquí.</p></div></div>}
        {!isLoading && !isError && catalog.totalItems > 0 && <ProductResults currentPage={catalog.currentPage} onPageChange={catalog.setPage} products={catalog.items} totalPages={catalog.totalPages} />}
      </div>
    </section>
  )
}
