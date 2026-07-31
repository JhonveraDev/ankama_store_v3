import { z } from 'zod'

export const loginSchema = z.object({
  identifier: z.string().trim().min(1, 'Ingresa tu usuario o correo electrónico.'),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres.'),
})

export const registerSchema = z.object({
  email: z.string().trim().email('Ingresa un correo electrónico válido.'),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres.'),
  lastName: z.string().trim().min(1, 'Ingresa tu apellido.'),
  firstName: z.string().trim().min(1, 'Ingresa tu nombre.'),
  day: z.string().min(1, 'Selecciona tu fecha de nacimiento.'),
  month: z.string().min(1, 'Selecciona tu fecha de nacimiento.'),
  year: z.string().min(1, 'Selecciona tu fecha de nacimiento.'),
  receiveNews: z.boolean(),
}).superRefine(({ day, month, year }, context) => {
  if (!day || !month || !year) return
  const birthDate = new Date(Number(year), Number(month) - 1, Number(day))
  if (birthDate.getFullYear() !== Number(year) || birthDate.getMonth() !== Number(month) - 1 || birthDate.getDate() !== Number(day)) {
    context.addIssue({ code: 'custom', message: 'Ingresa una fecha de nacimiento válida.', path: ['day'] })
  }
})

export type LoginValues = z.infer<typeof loginSchema>
export type RegisterValues = z.infer<typeof registerSchema>
