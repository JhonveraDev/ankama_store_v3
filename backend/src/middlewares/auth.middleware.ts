import type { NextFunction, Request, Response } from 'express'
import type { UserRole } from '../types/auth.js'
import { AppError } from '../utils/app-error.js'
import { verifyAccessToken } from '../utils/jwt.js'

export function authenticate(request: Request, _response: Response, next: NextFunction): void {
  const authorization = request.header('authorization')

  if (!authorization?.startsWith('Bearer ')) {
    next(new AppError('Se requiere autenticación.', 401))
    return
  }

  try {
    request.user = verifyAccessToken(authorization.slice(7))
    next()
  } catch {
    next(new AppError('Token inválido o expirado.', 401))
  }
}

export function authorize(...roles: UserRole[]) {
  return (request: Request, _response: Response, next: NextFunction): void => {
    if (!request.user || !roles.includes(request.user.role)) {
      next(new AppError('No tienes permisos para realizar esta acción.', 403))
      return
    }

    next()
  }
}
