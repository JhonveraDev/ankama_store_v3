export type UserRole = 'USER' | 'ADMIN'

export interface AuthenticatedUser {
  id: string
  role: UserRole
}

export interface PublicUser extends AuthenticatedUser {
  name: string
  email: string
}

export interface AuthResponse {
  token: string
  user: PublicUser
}
