import { AlertCircle, LoaderCircle, PackageOpen } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ProductCard } from '../features/products/components/ProductCard'
import { Pagination } from '../features/pagination/components/Pagination'
import { usePagination } from '../features/pagination/hooks/use-pagination'
import { useProducts } from '../features/products/hooks/use-products'
import { filterProductsByName } from '../features/products/utils/filter-products'
import type { ProductGame } from '../types/product'

type GameFilter = 'ALL' | ProductGame

function formatGameName(game: ProductGame): string {
  return game === 'DOFUS_RETRO' ? 'DOFUS Retro' : game
}

export function SearchResultsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeGame, setActiveGame] = useState<GameFilter>('ALL')
  const query = searchParams.get('q') ?? ''
  const { data: products = [], isError, isLoading, refetch } = useProducts()
  const matchingProducts = useMemo(() => filterProductsByName(products, query), [products, query])
  const games = [...new Set(matchingProducts.map((product) => product.game))]
  const visibleProducts = useMemo(() => matchingProducts.filter((product) => activeGame === 'ALL' || product.game === activeGame), [activeGame, matchingProducts])
  const pagination = usePagination({ currentPage: Number(searchParams.get('page')) || 1, items: visibleProducts })
  const setPage = (page: number) => setSearchParams((current) => {
    const next = new URLSearchParams(current)
    next.set('page', String(page))
    return next
  })
  const selectGame = (game: GameFilter) => {
    setActiveGame(game)
    setPage(1)
  }

  return (
    <section className="search-results" aria-labelledby="search-results-title">
      <aside className="search-results-sidebar">
        <div className="search-results-title-mark" aria-hidden="true" />
        <h1 id="search-results-title">Resultados para “{query}”</h1>
        <p className="search-results-count">{matchingProducts.length} {matchingProducts.length === 1 ? 'artículo' : 'artículos'}</p>

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
        {!isLoading && !isError && visibleProducts.length === 0 && (
          <div className="catalog-message catalog-message--empty"><PackageOpen size={38} /><div><h2>No encontramos productos</h2><p>Prueba con otro nombre o una búsqueda más corta.</p></div></div>
        )}
        {visibleProducts.length > 0 && <><div className="search-results-grid" key={pagination.currentPage}>{pagination.items.map((product) => <ProductCard key={product.id} product={product} />)}</div><Pagination currentPage={pagination.currentPage} onPageChange={setPage} totalPages={pagination.totalPages} /></>}
      </div>
    </section>
  )
}
