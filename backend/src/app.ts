import cors from 'cors'
import express from 'express'
import { errorHandler } from './middlewares/error.middleware.js'
import { apiRouter } from './routes/index.js'
import { env } from './utils/env.js'

export const app = express()

app.use(cors({ origin: env.CLIENT_URL }))
app.use(express.json())
app.use('/api', apiRouter)
app.use(errorHandler)
