import { AlertCircle, LoaderCircle, PackageOpen } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ProductResults } from '../features/products/components/ProductResults'
import { useProductCatalog } from '../features/products/hooks/use-product-catalog'
import { useProducts } from '../features/products/hooks/use-products'
import { filterProductsByName } from '../features/products/utils/filter-products'
import type { ProductGame } from '../types/product'

type GameFilter = 'ALL' | ProductGame

function formatGameName(game: ProductGame): string {
  return game === 'DOFUS_RETRO' ? 'DOFUS Retro' : game
}

export function SearchResultsPage() {
  const [searchParams] = useSearchParams()
  const [activeGame, setActiveGame] = useState<GameFilter>('ALL')
  const query = searchParams.get('q') ?? ''
  const { data: products = [], isError, isLoading, refetch } = useProducts()
  const matchingProducts = useMemo(() => filterProductsByName(products, query), [products, query])
  const games = [...new Set(matchingProducts.map((product) => product.game))]
  const catalog = useProductCatalog({ game: activeGame === 'ALL' ? undefined : activeGame, products: matchingProducts, resetKey: `${query}-${activeGame}` })
  const selectGame = (game: GameFilter) => {
    setActiveGame(game)
  }

  return (
    <section className="search-results" aria-labelledby="search-results-title">
      <header className="search-results-heading">
        <div className="search-results-title-mark" aria-hidden="true" />
        <h1 id="search-results-title">Mostrando resultados para “{query}”</h1>
      </header>
      <aside className="search-results-sidebar">
        <p className="search-results-count"><strong>{matchingProducts.length}</strong> {matchingProducts.length === 1 ? 'elemento' : 'elementos'}</p>

        <fieldset className="search-game-filters">
          <legend>Filtrar por juego</legend>
          <label><input checked={activeGame === 'ALL'} name="game" onChange={() => selectGame('ALL')} type="radio" /> Todos</label>
          {games.map((game) => (
            <label key={game}><input checked={activeGame === game} name="game" onChange={() => selectGame(game)} type="radio" /> {formatGameName(game)}</label>
          ))}
        </fieldset>
      </aside>

      <div className="search-results-content">
        {isLoading && <div className="catalog-message"><LoaderCircle className="spin" /> Buscando productos…</div>}
        {isError && <div className="catalog-message catalog-message--error"><AlertCircle /><div><p>No fue posible realizar la búsqueda.</p><button className="catalog-retry-button" onClick={() => void refetch()} type="button">Reintentar</button></div></div>}
        {!isLoading && !isError && catalog.totalItems === 0 && (
          <div className="catalog-message catalog-message--empty"><PackageOpen size={38} /><div><h2>No encontramos productos</h2><p>Prueba con otro nombre o una búsqueda más corta.</p></div></div>
        )}
        {catalog.totalItems > 0 && <ProductResults className="search-results-grid" currentPage={catalog.currentPage} onPageChange={catalog.setPage} products={catalog.items} totalPages={catalog.totalPages} />}
      </div>
    </section>
  )
}
