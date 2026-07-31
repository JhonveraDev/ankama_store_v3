import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import type { InputHTMLAttributes } from 'react'

interface PasswordFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string
  label: string
  required?: boolean
}

export function PasswordField({ error, label, required, ...inputProps }: PasswordFieldProps) {
  const [isVisible, setIsVisible] = useState(false)
  const inputId = inputProps.id ?? inputProps.name
  return <label className={`auth-field${error ? ' has-error' : ''}`} htmlFor={inputId}><span>{label}{required && <b> *</b>}</span><div className="auth-password-input"><input id={inputId} type={isVisible ? 'text' : 'password'} {...inputProps} /><button aria-label={isVisible ? 'Ocultar contraseña' : 'Mostrar contraseña'} onClick={() => setIsVisible(!isVisible)} type="button">{isVisible ? <EyeOff size={19} /> : <Eye size={19} />}</button></div>{error && <small role="alert">{error}</small>}</label>
}
