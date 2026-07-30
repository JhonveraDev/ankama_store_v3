import { AlertCircle, LoaderCircle, PackageOpen, SlidersHorizontal } from 'lucide-react'
import type { Product } from '../../types/product'
import { ProductCard } from '../../features/products/components/ProductCard'

interface ProductCatalogProps {
  products: Product[]
  isLoading: boolean
  isError: boolean
  searchTerm: string
  onRetry: () => void
}

export function ProductCatalog({ products, isLoading, isError, searchTerm, onRetry }: ProductCatalogProps) {
  const categories = [...new Set(products.map((product) => product.category))]
  const filteredProducts = products.filter((product) =>
    `${product.name} ${product.description} ${product.category}`.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <section className="catalog-section" id="catalogo">
      <aside className="catalog-sidebar">
        <p className="section-kicker">Explorar</p>
        <h2>Catálogo</h2>
        <span className="catalog-count">{products.length} artículos</span>
        <div className="category-list">
          {categories.map((category) => <button type="button" key={category}>{category}</button>)}
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
            <div>
              <p>No fue posible cargar el catálogo.</p>
              <button className="catalog-retry-button" type="button" onClick={onRetry}>Reintentar</button>
            </div>
          </div>
        )}
        {!isLoading && !isError && filteredProducts.length === 0 && (
          <div className="catalog-message catalog-message--empty"><PackageOpen size={38} />
            <div><h3>{searchTerm ? 'No encontramos resultados' : 'El catálogo estará disponible pronto'}</h3><p>{searchTerm ? 'Prueba con otra búsqueda.' : 'Añade productos al archivo JSON para mostrarlos aquí.'}</p></div>
          </div>
        )}
        {filteredProducts.length > 0 && <div className="product-grid">{filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)}</div>}
      </div>
    </section>
  )
}
