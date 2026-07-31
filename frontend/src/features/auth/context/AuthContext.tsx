import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { authService, type AuthUser } from '../services/auth-service'
import { AuthContext } from './auth-context'

const accessTokenKey = 'arcadia-store.access-token'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(() => Boolean(window.localStorage.getItem(accessTokenKey)))

  useEffect(() => {
    if (!window.localStorage.getItem(accessTokenKey)) {
      return
    }

    void authService.getCurrentUser()
      .then(setUser)
      .catch(() => window.localStorage.removeItem(accessTokenKey))
      .finally(() => setIsLoading(false))
  }, [])

  const value = useMemo(() => ({
    isLoading,
    user,
    setAuthenticatedUser: setUser,
    logout: () => {
      window.localStorage.removeItem(accessTokenKey)
      setUser(null)
    },
  }), [isLoading, user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
