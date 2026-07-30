import type { Request, Response } from 'express'
import { z } from 'zod'
import { JsonProductRepository } from '../repositories/json-product.repository.js'
import { ProductService } from '../services/product.service.js'

const productService = new ProductService(new JsonProductRepository())

export async function getProducts(_request: Request, response: Response): Promise<void> {
  const products = await productService.findAll()
  response.status(200).json({ products })
}

export async function getProductBySlug(request: Request, response: Response): Promise<void> {
  const { slug } = z.object({ slug: z.string().min(1) }).parse(request.params)
  const product = await productService.findBySlug(slug)
  response.status(200).json({ product })
}
