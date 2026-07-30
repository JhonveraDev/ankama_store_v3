import type { PublicUser, UserRole } from '../types/auth.js'

export interface UserWithPassword extends PublicUser {
  passwordHash: string
}

export interface CreateUserData {
  name: string
  email: string
  passwordHash: string
  role?: UserRole
}

export interface UserRepository {
  create(data: CreateUserData): Promise<PublicUser>
  findByEmail(email: string): Promise<UserWithPassword | null>
  findById(id: string): Promise<PublicUser | null>
}
