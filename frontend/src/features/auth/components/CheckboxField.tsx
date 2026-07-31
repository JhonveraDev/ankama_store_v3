import type { InputHTMLAttributes, ReactNode } from 'react'

interface CheckboxFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  children: ReactNode
}

export function CheckboxField({ children, ...inputProps }: CheckboxFieldProps) {
  return <label className="auth-checkbox"><input type="checkbox" {...inputProps} /><span>{children}</span></label>
}
