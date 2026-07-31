import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { loginSchema, type LoginValues } from '../schemas/auth-schemas'
import { authService } from '../services/auth-service'
import { AuthButton } from './AuthButton'
import { AuthLogo } from './AuthLogo'
import { PasswordField } from './PasswordField'
import { TextField } from './TextField'
import { useAuth } from '../hooks/use-auth'

export function LoginForm() {
  const [submissionError, setSubmissionError] = useState('')
  const navigate = useNavigate()
  const { setAuthenticatedUser } = useAuth()
  const { formState: { errors, isSubmitting }, handleSubmit, register } = useForm<LoginValues>({ resolver: zodResolver(loginSchema), mode: 'onBlur' })
  const onSubmit = async (values: LoginValues) => {
    setSubmissionError('')
    try {
      const result = await authService.login(values)
      setAuthenticatedUser(result.user)
      navigate('/')
    } catch (error) {
      setSubmissionError(error instanceof Error ? error.message : 'No fue posible iniciar sesión.')
    }
  }

  return <section className="auth-card"><AuthLogo /><h1>Log in</h1><form noValidate onSubmit={handleSubmit(onSubmit)}><TextField autoComplete="username" error={errors.identifier?.message} label="Email or Username" placeholder="Email or username" required {...register('identifier')} /><PasswordField autoComplete="current-password" error={errors.password?.message} label="Password" placeholder="Contraseña" required {...register('password')} /><AuthButton disabled={isSubmitting}>{isSubmitting ? 'Validando…' : 'Log in'}</AuthButton>{submissionError && <p className="auth-submission-message auth-submission-message--error" role="alert">{submissionError}</p>}</form><a className="auth-help-link" href="#recuperar">¿No puedes iniciar sesión?</a><p className="auth-switch">¿No tienes una cuenta de Arcadia?<Link to="/register">Crear una cuenta</Link></p></section>
}
