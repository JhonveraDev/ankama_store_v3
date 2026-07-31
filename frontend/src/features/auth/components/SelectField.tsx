import type { ReactNode, SelectHTMLAttributes } from 'react'

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  children: ReactNode
  error?: string
  label?: string
  required?: boolean
}

export function SelectField({ children, error, label, required, ...selectProps }: SelectFieldProps) {
  const selectId = selectProps.id ?? selectProps.name
  if (!label) return <div className={`auth-field auth-select-field${error ? ' has-error' : ''}`}><select id={selectId} {...selectProps}>{children}</select>{error && <small role="alert">{error}</small>}</div>

  return <label className={`auth-field auth-select-field${error ? ' has-error' : ''}`} htmlFor={selectId}><span>{label}{required && <b> *</b>}</span><select id={selectId} {...selectProps}>{children}</select>{error && <small role="alert">{error}</small>}</label>
}
