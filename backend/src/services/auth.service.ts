import type { AuthResponse, PublicUser } from '../types/auth.js'
import type { UserRepository } from '../repositories/user.repository.js'
import { AppError } from '../utils/app-error.js'
import { createAccessToken } from '../utils/jwt.js'
import { comparePassword, hashPassword } from '../utils/password.js'

export interface RegisterInput {
  name: string
  firstName: string
  lastName: string
  email: string
  username: string
  password: string
  birthDate: Date
  receiveNews: boolean
}

export interface LoginInput {
  login: string
  password: string
}

export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async register(input: RegisterInput): Promise<AuthResponse> {
    const existingUser = await this.userRepository.findByEmail(input.email)

    if (existingUser) {
      throw new AppError('El correo electrónico ya está registrado.', 409)
    }

    const existingUsername = await this.userRepository.findByUsername(input.username)

    if (existingUsername) {
      throw new AppError('El nombre de usuario ya está en uso.', 409)
    }

    const passwordHash = await hashPassword(input.password)
    const user = await this.userRepository.create({
      name: input.name,
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      username: input.username,
      passwordHash,
      birthDate: input.birthDate,
      receiveNews: input.receiveNews,
    })

    return this.createAuthResponse(user)
  }

  async login(input: LoginInput): Promise<AuthResponse> {
    const user = await this.userRepository.findByEmail(input.login)
      ?? await this.userRepository.findByUsername(input.login)

    if (!user || !(await comparePassword(input.password, user.passwordHash))) {
      throw new AppError('Credenciales inválidas.', 401)
    }

    return this.createAuthResponse(user)
  }

  async getProfile(userId: string): Promise<PublicUser> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new AppError('Usuario no encontrado.', 404)
    }

    return user
  }

  private createAuthResponse(user: PublicUser): AuthResponse {
    return { token: createAccessToken(user), user }
  }
}
