import { AlertCircle, LoaderCircle, PackageOpen } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ProductCard } from '../features/products/components/ProductCard'
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
  const visibleProducts = matchingProducts.filter((product) => activeGame === 'ALL' || product.game === activeGame)

  return (
    <section className="search-results" aria-labelledby="search-results-title">
      <aside className="search-results-sidebar">
        <div className="search-results-title-mark" aria-hidden="true" />
        <h1 id="search-results-title">Resultados para “{query}”</h1>
        <p className="search-results-count">{matchingProducts.length} {matchingProducts.length === 1 ? 'artículo' : 'artículos'}</p>

        <fieldset className="search-game-filters">
          <legend>Filtrar por juego</legend>
          <label><input checked={activeGame === 'ALL'} name="game" onChange={() => setActiveGame('ALL')} type="radio" /> Todos</label>
          {games.map((game) => (
            <label key={game}><input checked={activeGame === game} name="game" onChange={() => setActiveGame(game)} type="radio" /> {formatGameName(game)}</label>
          ))}
        </fieldset>
      </aside>

      <div className="search-results-content">
        {isLoading && <div className="catalog-message"><LoaderCircle className="spin" /> Buscando productos…</div>}
        {isError && <div className="catalog-message catalog-message--error"><AlertCircle /><div><p>No fue posible realizar la búsqueda.</p><button className="catalog-retry-button" onClick={() => void refetch()} type="button">Reintentar</button></div></div>}
        {!isLoading && !isError && visibleProducts.length === 0 && (
          <div className="catalog-message catalog-message--empty"><PackageOpen size={38} /><div><h2>No encontramos productos</h2><p>Prueba con otro nombre o una búsqueda más corta.</p></div></div>
        )}
        {visibleProducts.length > 0 && <div className="search-results-grid">{visibleProducts.map((product) => <ProductCard key={product.id} product={product} />)}</div>}
      </div>
    </section>
  )
}
