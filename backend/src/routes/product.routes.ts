import { Router } from 'express'
import { getProductBySlug, getProducts } from '../controllers/product.controller.js'
import { asyncHandler } from '../middlewares/async-handler.js'

export const productRouter = Router()

productRouter.get('/', asyncHandler(getProducts))
productRouter.get('/:slug', asyncHandler(getProductBySlug))
