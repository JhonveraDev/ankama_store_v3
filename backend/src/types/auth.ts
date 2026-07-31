export type UserRole = 'USER' | 'ADMIN'

export interface AuthenticatedUser {
  id: string
  role: UserRole
}

export interface PublicUser extends AuthenticatedUser {
  name: string
  firstName: string
  lastName: string
  email: string
  username: string
  birthDate: Date
  receiveNews: boolean
}

export interface AuthResponse {
  token: string
  user: PublicUser
}
