import { CheckCircle2 } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

interface RegisterSuccessState {
  email?: string
}

export function RegisterSuccessPage() {
  const { state } = useLocation()
  const { email } = (state ?? {}) as RegisterSuccessState

  return (
    <section className="auth-card auth-success-card">
      <CheckCircle2 aria-hidden="true" size={54} />
      <h1>¡Cuenta creada!</h1>
      <p>{email ? <>Tu cuenta asociada a <strong>{email}</strong> fue creada correctamente.</> : 'Tu cuenta fue creada correctamente.'}</p>
      <p>Ya puedes continuar explorando la tienda.</p>
      <Link className="auth-button" to="/">Ir a la tienda</Link>
    </section>
  )
}
