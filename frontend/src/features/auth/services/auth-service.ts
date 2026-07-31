import axios from 'axios'
import { apiClient } from '../../../services/api-client'
import type { LoginValues, RegisterValues } from '../schemas/auth-schemas'

export interface AuthUser {
  id: string
  username: string
  name: string
  firstName: string
  lastName: string
  email: string
}

export interface AuthSubmissionResult {
  token: string
  user: AuthUser
}

interface AuthApiResponse {
  token: string
  user: AuthUser
}

export interface AuthService {
  login: (values: LoginValues) => Promise<AuthSubmissionResult>
  register: (values: RegisterValues) => Promise<AuthSubmissionResult>
  getCurrentUser: () => Promise<AuthUser>
}

export const authService: AuthService = {
  async login(values) {
    return submit('/auth/login', { login: values.identifier.trim(), password: values.password })
  },
  async register(values) {
    const birthDate = new Date(Date.UTC(Number(values.year), Number(values.month) - 1, Number(values.day))).toISOString()
    return submit('/auth/register', { name: `${values.firstName.trim()} ${values.lastName.trim()}`, firstName: values.firstName.trim(), lastName: values.lastName.trim(), email: values.email.trim(), username: values.username.trim(), password: values.password, birthDate, receiveNews: values.receiveNews })
  },
  async getCurrentUser() {
    const token = window.localStorage.getItem('arcadia-store.access-token')
    if (!token) throw new Error('No hay una sesión activa.')

    const { data } = await apiClient.get<{ user: AuthUser }>('/auth/me', { headers: { Authorization: `Bearer ${token}` } })
    return data.user
  },
}

async function submit(path: string, payload: unknown): Promise<AuthSubmissionResult> {
  try {
    const { data } = await apiClient.post<AuthApiResponse>(path, payload)
    window.localStorage.setItem('arcadia-store.access-token', data.token)
    return { token: data.token, user: data.user }
  } catch (error) {
    if (axios.isAxiosError<{ message?: string }>(error)) throw new Error(error.response?.data?.message ?? 'No fue posible completar la solicitud. Inténtalo de nuevo.', { cause: error })
    throw new Error('No fue posible completar la solicitud. Inténtalo de nuevo.', { cause: error })
  }
}
