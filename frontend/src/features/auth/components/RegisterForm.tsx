import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { registerSchema, type RegisterValues } from '../schemas/auth-schemas'
import { authService } from '../services/auth-service'
import { AuthButton } from './AuthButton'
import { AuthLogo } from './AuthLogo'
import { CheckboxField } from './CheckboxField'
import { PasswordField } from './PasswordField'
import { SelectField } from './SelectField'
import { TextField } from './TextField'
import { useAuth } from '../hooks/use-auth'

const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
const currentYear = new Date().getFullYear()

export function RegisterForm() {
  const [submissionError, setSubmissionError] = useState('')
  const navigate = useNavigate()
  const { setAuthenticatedUser } = useAuth()
  const { formState: { errors, isSubmitting }, handleSubmit, register } = useForm<RegisterValues>({ defaultValues: { receiveNews: false }, resolver: zodResolver(registerSchema), mode: 'onBlur' })
  const onSubmit = async (values: RegisterValues) => {
    setSubmissionError('')
    try {
      const result = await authService.register(values)
      setAuthenticatedUser(result.user)
      navigate('/register/success', { state: { email: values.email } })
    } catch (error) {
      setSubmissionError(error instanceof Error ? error.message : 'No fue posible crear la cuenta.')
    }
  }
  const birthDateError = errors.day?.message ?? errors.month?.message ?? errors.year?.message

  return <section className="auth-card auth-card--register">
    <AuthLogo />
    <h1>Crear cuenta</h1>
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <TextField autoComplete="email" error={errors.email?.message} label="Email Address" placeholder="Correo electrónico" required type="email" {...register('email')} />
      <TextField autoComplete="username" error={errors.username?.message} label="Username" placeholder="Nombre de usuario" required {...register('username')} />
      <PasswordField autoComplete="new-password" error={errors.password?.message} label="Password" placeholder="Contraseña" required {...register('password')} />
      <TextField autoComplete="family-name" error={errors.lastName?.message} label="Last Name" placeholder="Apellido" required {...register('lastName')} />
      <TextField autoComplete="given-name" error={errors.firstName?.message} label="First Name" placeholder="Nombre" required {...register('firstName')} />
      <fieldset className="auth-birth-date">
        <legend>Date of Birth <b>*</b></legend>
        <div>
          <SelectField aria-label="Día de nacimiento" {...register('day')}><option value="">Día</option>{Array.from({ length: 31 }, (_, index) => <option key={index + 1} value={index + 1}>{index + 1}</option>)}</SelectField>
          <SelectField aria-label="Mes de nacimiento" {...register('month')}><option value="">Mes</option>{months.map((month, index) => <option key={month} value={index + 1}>{month}</option>)}</SelectField>
          <SelectField aria-label="Año de nacimiento" {...register('year')}><option value="">Año</option>{Array.from({ length: 100 }, (_, index) => currentYear - index - 13).map((year) => <option key={year} value={year}>{year}</option>)}</SelectField>
        </div>
        {birthDateError && <small role="alert">{birthDateError}</small>}
      </fieldset>
      <CheckboxField {...register('receiveNews')}>Deseo recibir noticias, encuestas y ofertas especiales de Arcadia.</CheckboxField>
      <p className="auth-terms">Al crear la cuenta confirmas que has leído, comprendido y aceptado los <a href="#terminos">Términos y condiciones de uso</a> y la <a href="#privacidad">Política de privacidad</a>.</p>
      <AuthButton disabled={isSubmitting}>{isSubmitting ? 'Creando…' : 'Crear cuenta'}</AuthButton>
      {submissionError && <p className="auth-submission-message auth-submission-message--error" role="alert">{submissionError}</p>}
    </form>
    <p className="auth-switch">¿Ya tienes una cuenta?<Link to="/login">Iniciar sesión</Link></p>
  </section>
}
