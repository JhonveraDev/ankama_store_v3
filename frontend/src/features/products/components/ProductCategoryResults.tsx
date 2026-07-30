import type { Product, ProductGame } from '../../../types/product'
import { formatProductCategory, formatProductGame } from '../utils/product-categories'
import { ProductCard } from './ProductCard'

interface ProductCategoryResultsProps {
  category: string
  game: ProductGame
  onShowProduct: () => void
  products: Product[]
}

export function ProductCategoryResults({ category, game, onShowProduct, products }: ProductCategoryResultsProps) {
  return (
    <section className="product-category-results" aria-labelledby="category-results-title">
      <p className="section-kicker">{formatProductGame(game)}</p>
      <div className="product-category-results-heading">
        <div><h1 id="category-results-title">{formatProductCategory(category)}</h1><p>{products.length} {products.length === 1 ? 'producto' : 'productos'}</p></div>
        <button onClick={onShowProduct} type="button">Ver detalle actual</button>
      </div>
      {products.length > 0 ? <div className="product-category-results-grid">{products.map((item) => <ProductCard key={item.id} product={item} />)}</div> : <p className="product-category-results-empty">No hay productos disponibles en esta subcategoría.</p>}
    </section>
  )
}
