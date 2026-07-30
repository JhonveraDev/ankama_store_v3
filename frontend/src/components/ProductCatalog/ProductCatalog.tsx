import { AlertCircle, LoaderCircle, PackageOpen, SlidersHorizontal } from 'lucide-react'
import { useState } from 'react'
import { ProductCard } from '../../features/products/components/ProductCard'
import type { Product } from '../../types/product'

interface ProductCatalogProps {
  products: Product[]
  isLoading: boolean
  isError: boolean
  searchTerm: string
  onRetry: () => void
}

function formatGameName(game: string): string {
  return game.replaceAll('_', ' ').replace(/\b\w/g, (character) => character.toUpperCase())
}

export function ProductCatalog({ products, isLoading, isError, searchTerm, onRetry }: ProductCatalogProps) {
  const [activeGame, setActiveGame] = useState<string>('ALL')
  const games = [...new Set(products.map((product) => product.game))]
  const normalizedSearchTerm = searchTerm.toLowerCase()
  const filteredProducts = products.filter((product) =>
    (activeGame === 'ALL' || product.game === activeGame)
    && `${product.name} ${product.description} ${product.category}`.toLowerCase().includes(normalizedSearchTerm),
  )

  return (
    <section className="catalog-section" id="catalogo">
      <aside className="catalog-sidebar">
        <p className="section-kicker">Explorar</p>
        <h2>Catálogo</h2>
        <span className="catalog-count">{filteredProducts.length} artículos</span>
        <div className="category-list">
          <button type="button" className={activeGame === 'ALL' ? 'is-active' : ''} aria-pressed={activeGame === 'ALL'} onClick={() => setActiveGame('ALL')}>Todos</button>
          {games.map((game) => (
            <button type="button" key={game} className={activeGame === game ? 'is-active' : ''} aria-pressed={activeGame === game} onClick={() => setActiveGame(game)}>
              {formatGameName(game)}
            </button>
          ))}
        </div>
      </aside>

      <div className="catalog-content">
        <div className="catalog-heading">
          <div>
            <p className="section-kicker">Selección actual</p>
            <h2>Productos destacados</h2>
          </div>
          <button type="button" className="filter-button"><SlidersHorizontal size={18} /> Filtrar</button>
        </div>

        {isLoading && <div className="catalog-message"><LoaderCircle className="spin" /> Cargando catálogo…</div>}
        {isError && (
          <div className="catalog-message catalog-message--error">
            <AlertCircle />
            <div><p>No fue posible cargar el catálogo.</p><button className="catalog-retry-button" type="button" onClick={onRetry}>Reintentar</button></div>
          </div>
        )}
        {!isLoading && !isError && filteredProducts.length === 0 && (
          <div className="catalog-message catalog-message--empty">
            <PackageOpen size={38} />
            <div><h3>{searchTerm ? 'No encontramos resultados' : 'El catálogo estará disponible pronto'}</h3><p>{searchTerm ? 'Prueba con otra búsqueda.' : 'Añade productos al archivo JSON para mostrarlos aquí.'}</p></div>
          </div>
        )}
        {filteredProducts.length > 0 && <div className="product-grid" key={activeGame}>{filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)}</div>}
      </div>
    </section>
  )
}
