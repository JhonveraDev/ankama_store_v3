import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { loginSchema, type LoginValues } from '../schemas/auth-schemas'
import { authService } from '../services/auth-service'
import { AuthButton } from './AuthButton'
import { AuthLogo } from './AuthLogo'
import { PasswordField } from './PasswordField'
import { TextField } from './TextField'

export function LoginForm() {
  const [submissionMessage, setSubmissionMessage] = useState('')
  const { formState: { errors, isSubmitting }, handleSubmit, register } = useForm<LoginValues>({ resolver: zodResolver(loginSchema), mode: 'onBlur' })
  const onSubmit = async (values: LoginValues) => setSubmissionMessage((await authService.login(values)).message)

  return <section className="auth-card"><AuthLogo /><h1>Log in</h1><form noValidate onSubmit={handleSubmit(onSubmit)}><TextField autoComplete="username" error={errors.identifier?.message} label="Login ID" placeholder="Usuario o correo electrónico" required {...register('identifier')} /><PasswordField autoComplete="current-password" error={errors.password?.message} label="Password" placeholder="Contraseña" required {...register('password')} /><AuthButton disabled={isSubmitting}>{isSubmitting ? 'Validando…' : 'Log in'}</AuthButton>{submissionMessage && <p className="auth-submission-message" role="status">{submissionMessage}</p>}</form><a className="auth-help-link" href="#recuperar">¿No puedes iniciar sesión?</a><p className="auth-switch">¿No tienes una cuenta de Arcadia?<Link to="/register">Crear una cuenta</Link></p></section>
}
