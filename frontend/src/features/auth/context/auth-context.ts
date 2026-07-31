import { createContext } from 'react'
import type { AuthUser } from '../services/auth-service'

export interface AuthContextValue {
  isLoading: boolean
  user: AuthUser | null
  setAuthenticatedUser: (user: AuthUser) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)
