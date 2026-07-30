import type { ProductRepository } from '../repositories/product.repository.js'
import type { Product } from '../types/product.js'
import { AppError } from '../utils/app-error.js'

export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  findAll(): Promise<Product[]> {
    return this.productRepository.findAll()
  }

  async findBySlug(slug: string): Promise<Product> {
    const product = await this.productRepository.findBySlug(slug)

    if (!product) {
      throw new AppError('Producto no encontrado.', 404)
    }

    return product
  }
}
