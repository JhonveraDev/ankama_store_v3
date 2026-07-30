import type { Product, ProductGame } from '../../../types/product'

export function getGameCategories(products: Product[], game: ProductGame): string[] {
  return [...new Set(products.filter((product) => product.game === game).map((product) => product.category))]
}

export function getProductsByGameAndCategory(products: Product[], game: ProductGame, category: string): Product[] {
  return products.filter((product) => product.game === game && product.category === category)
}

export function formatProductCategory(category: string): string {
  return category.replaceAll(/[-_]/g, ' ').replace(/\b\w/g, (character) => character.toUpperCase())
}

export function formatProductGame(game: ProductGame): string {
  return game === 'DOFUS_RETRO' ? 'DOFUS Retro' : game
}
