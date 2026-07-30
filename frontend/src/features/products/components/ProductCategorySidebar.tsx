import type { Product, ProductGame } from '../../../types/product'
import { formatProductCategory, formatProductGame, getGameCategories } from '../utils/product-categories'

interface ProductCategorySidebarProps {
  activeCategory: string
  game: ProductGame
  onSelectCategory: (category: string) => void
  products: Product[]
}

export function ProductCategorySidebar({ activeCategory, game, onSelectCategory, products }: ProductCategorySidebarProps) {
  const categories = getGameCategories(products, game)

  return (
    <aside className="product-category-sidebar">
      <p className="section-kicker">Explorar</p>
      <h2>{formatProductGame(game)}</h2>
      <nav aria-label={`Categorías de ${formatProductGame(game)}`}>
        {categories.map((category) => (
          <button aria-current={activeCategory === category ? 'page' : undefined} className={activeCategory === category ? 'is-active' : ''} key={category} onClick={() => onSelectCategory(category)} type="button">
            {formatProductCategory(category)}
          </button>
        ))}
      </nav>
    </aside>
  )
}
