import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/use-auth'

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const location = useLocation()
  const { isLoading, user } = useAuth()

  if (isLoading) return null
  if (!user) return <Navigate replace state={{ from: location }} to="/login" />

  return <>{children}</>
}
