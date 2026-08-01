import type { Product, ProductGame } from '../../../types/product'
import { ProductResults } from './ProductResults'
import { useProductCatalog } from '../hooks/use-product-catalog'
import { formatProductCategory, formatProductGame } from '../utils/product-categories'

interface ProductCategoryResultsProps {
  category: string
  game: ProductGame
  onShowProduct: () => void
  products: Product[]
}

export function ProductCategoryResults({ category, game, onShowProduct, products }: ProductCategoryResultsProps) {
  const catalog = useProductCatalog({ products, resetKey: `${game}-${category}` })

  return (
    <section className="product-category-results" aria-labelledby="category-results-title">
      <p className="section-kicker">{formatProductGame(game)}</p>
      <div className="product-category-results-heading">
        <div><h1 id="category-results-title">{formatProductCategory(category)}</h1><p>{catalog.totalItems} {catalog.totalItems === 1 ? 'producto' : 'productos'}</p></div>
        <button onClick={onShowProduct} type="button">Ver detalle actual</button>
      </div>
      {catalog.totalItems > 0 ? <ProductResults className="product-category-results-grid" currentPage={catalog.currentPage} onPageChange={catalog.setPage} products={catalog.items} totalPages={catalog.totalPages} /> : <p className="product-category-results-empty">No hay productos disponibles en esta subcategoría.</p>}
    </section>
  )
}
