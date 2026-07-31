import axios from 'axios'
import { apiClient } from '../../../services/api-client'
import type { LoginValues, RegisterValues } from '../schemas/auth-schemas'

export interface AuthSubmissionResult { token: string }

interface AuthApiResponse {
  token: string
}

export interface AuthService {
  login: (values: LoginValues) => Promise<AuthSubmissionResult>
  register: (values: RegisterValues) => Promise<AuthSubmissionResult>
}

export const authService: AuthService = {
  async login(values) {
    return submit('/auth/login', { email: values.identifier, password: values.password })
  },
  async register(values) {
    const birthDate = new Date(Date.UTC(Number(values.year), Number(values.month) - 1, Number(values.day))).toISOString()
    return submit('/auth/register', { name: `${values.firstName.trim()} ${values.lastName.trim()}`, firstName: values.firstName.trim(), lastName: values.lastName.trim(), email: values.email.trim(), password: values.password, birthDate, receiveNews: values.receiveNews })
  },
}

async function submit(path: string, payload: unknown): Promise<AuthSubmissionResult> {
  try {
    const { data } = await apiClient.post<AuthApiResponse>(path, payload)
    window.localStorage.setItem('arcadia-store.access-token', data.token)
    return { token: data.token }
  } catch (error) {
    if (axios.isAxiosError<{ message?: string }>(error)) throw new Error(error.response?.data?.message ?? 'No fue posible completar la solicitud. Inténtalo de nuevo.', { cause: error })
    throw new Error('No fue posible completar la solicitud. Inténtalo de nuevo.', { cause: error })
  }
}
