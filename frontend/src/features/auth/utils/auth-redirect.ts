import type { Location } from 'react-router-dom'

interface AuthLocationState {
  from?: Pick<Location, 'pathname' | 'search' | 'hash'>
}

export function getPostAuthDestination(state: unknown): string {
  const from = (state as AuthLocationState | null)?.from
  if (!from?.pathname?.startsWith('/')) return '/'
  return `${from.pathname}${from.search ?? ''}${from.hash ?? ''}`
}
