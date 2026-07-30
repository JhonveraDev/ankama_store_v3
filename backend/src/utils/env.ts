import 'dotenv/config'
import { z } from 'zod'

const environmentSchema = z.object({
  CLIENT_URL: z
    .string()
    .default('http://localhost:5173,http://localhost:5174')
    .transform((value) => value.split(',').map((url) => z.url().parse(url.trim()))),
  BCRYPT_SALT_ROUNDS: z.coerce.number().int().min(10).max(15).default(12),
  DATABASE_URL: z.string().min(1),
  JWT_EXPIRES_IN: z.string().min(1).default('7d'),
  JWT_SECRET: z.string().min(32),
  PORT: z.coerce.number().int().positive().default(3000),
})

export const env = environmentSchema.parse(process.env)
