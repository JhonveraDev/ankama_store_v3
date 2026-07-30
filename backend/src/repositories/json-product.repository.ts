import { z } from 'zod'
import productsData from '../data/products.json' with { type: 'json' }
import type { Product } from '../types/product.js'
import type { ProductRepository } from './product.repository.js'

const productSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
  game: z.enum(['DOFUS', 'WAKFU', 'DOFUS_RETRO']),
  category: z.string().min(1),
  price: z.object({
    amount: z.number().int().nonnegative(),
    currency: z.string().length(3),
  }),
  imageUrl: z.string().min(1),
  stock: z.number().int().nonnegative(),
  badge: z.string().min(1).optional(),
  isFeatured: z.boolean(),
  isAvailable: z.boolean(),
})

const products = z.array(productSchema).parse(productsData)

export class JsonProductRepository implements ProductRepository {
  async findAll(): Promise<Product[]> {
    return products
  }

  async findBySlug(slug: string): Promise<Product | null> {
    return products.find((product) => product.slug === slug) ?? null
  }
}
