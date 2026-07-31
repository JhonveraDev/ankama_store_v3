import type { InputHTMLAttributes } from 'react'

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string
  label: string
  required?: boolean
}

export function TextField({ error, label, required, ...inputProps }: TextFieldProps) {
  const inputId = inputProps.id ?? inputProps.name
  return <label className={`auth-field${error ? ' has-error' : ''}`} htmlFor={inputId}><span>{label}{required && <b> *</b>}</span><input id={inputId} {...inputProps} />{error && <small role="alert">{error}</small>}</label>
}
