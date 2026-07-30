import { Router } from 'express'
import { authRouter } from './auth.routes.js'
import { productRouter } from './product.routes.js'
import { healthController } from '../controllers/health.controller.js'

export const apiRouter = Router()

apiRouter.get('/health', healthController)
apiRouter.use('/auth', authRouter)
apiRouter.use('/products', productRouter)
