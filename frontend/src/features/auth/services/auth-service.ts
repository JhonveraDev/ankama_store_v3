import type { LoginValues, RegisterValues } from '../schemas/auth-schemas'

export interface AuthSubmissionResult {
  message: string
}

export interface AuthService {
  login: (values: LoginValues) => Promise<AuthSubmissionResult>
  register: (values: RegisterValues) => Promise<AuthSubmissionResult>
}

// Sustituir esta implementación por llamadas Axios al backend sin cambiar los formularios.
export const authService: AuthService = {
  async login() {
    return { message: 'Datos validados. La conexión con el servicio de inicio de sesión se habilitará próximamente.' }
  },
  async register() {
    return { message: 'Datos validados. La conexión con el servicio de registro se habilitará próximamente.' }
  },
}
