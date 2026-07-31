import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface AuthButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

export function AuthButton({ children, ...props }: AuthButtonProps) {
  return <button className="auth-button" type="submit" {...props}>{children}</button>
}
