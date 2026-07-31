import type { Request, Response } from 'express'
import { z } from 'zod'
import { PrismaUserRepository } from '../repositories/prisma-user.repository.js'
import { AuthService } from '../services/auth.service.js'
import { AppError } from '../utils/app-error.js'

const authService = new AuthService(new PrismaUserRepository())

const registerSchema = z.object({
  name: z.string().trim().min(2).max(80),
  firstName: z.string().trim().min(1).max(80),
  lastName: z.string().trim().min(1).max(80),
  email: z.string().trim().email().transform((email) => email.toLowerCase()),
  username: z.string().trim().min(4, 'El nombre de usuario debe tener al menos 4 caracteres.').max(20, 'El nombre de usuario no puede superar los 20 caracteres.').regex(/^[A-Za-z0-9_]+$/, 'El nombre de usuario solo puede contener letras, números y guion bajo.'),
  password: z.string().min(8).max(72),
  birthDate: z.coerce.date().refine((date) => date <= new Date(), 'La fecha de nacimiento no puede estar en el futuro.'),
  receiveNews: z.boolean(),
})

const loginSchema = z.object({
  login: z.string().trim().min(1, 'Ingresa tu correo electrónico o nombre de usuario.'),
  password: z.string().min(1).max(72),
})

export async function register(request: Request, response: Response): Promise<void> {
  const input = registerSchema.parse(request.body)
  const authResponse = await authService.register(input)

  response.status(201).json(authResponse)
}

export async function login(request: Request, response: Response): Promise<void> {
  const input = loginSchema.parse(request.body)
  const authResponse = await authService.login(input)

  response.status(200).json(authResponse)
}

export async function getCurrentUser(request: Request, response: Response): Promise<void> {
  if (!request.user) {
    throw new AppError('Se requiere autenticación.', 401)
  }

  const user = await authService.getProfile(request.user.id)
  response.status(200).json({ user })
}
