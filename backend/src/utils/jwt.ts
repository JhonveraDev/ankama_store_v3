import jwt, { type SignOptions } from 'jsonwebtoken'
import { z } from 'zod'
import type { AuthenticatedUser } from '../types/auth.js'
import { env } from './env.js'

const tokenPayloadSchema = z.object({
  sub: z.string().min(1),
  role: z.enum(['USER', 'ADMIN']),
})

export function createAccessToken(user: AuthenticatedUser): string {
  return jwt.sign(
    { role: user.role },
    env.JWT_SECRET,
    { subject: user.id, expiresIn: env.JWT_EXPIRES_IN as SignOptions['expiresIn'] },
  )
}

export function verifyAccessToken(token: string): AuthenticatedUser {
  const payload = tokenPayloadSchema.parse(jwt.verify(token, env.JWT_SECRET))

  return { id: payload.sub, role: payload.role }
}
