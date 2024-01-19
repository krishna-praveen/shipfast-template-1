import { z } from 'zod'

export const passwordSchema = () => {
  return z
    .string()
    .min(1, 'Senha obrigatória')
    .min(6, 'Senha deve ter pelo menos 6 caracteres')
}
