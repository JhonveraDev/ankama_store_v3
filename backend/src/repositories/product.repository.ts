import type { Product } from '../types/product.js'

export interface ProductRepository {
  findAll(): Promise<Product[]>
  findBySlug(slug: string): Promise<Product | null>
}
