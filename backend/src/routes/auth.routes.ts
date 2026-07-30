import { Router } from 'express'
import { getCurrentUser, login, register } from '../controllers/auth.controller.js'
import { asyncHandler } from '../middlewares/async-handler.js'
import { authenticate } from '../middlewares/auth.middleware.js'

export const authRouter = Router()

authRouter.post('/register', asyncHandler(register))
authRouter.post('/login', asyncHandler(login))
authRouter.get('/me', authenticate, asyncHandler(getCurrentUser))
