import { z } from 'zod'

export const signInFormSchema = z.object({
  email: z
    .string({ required_error: "O email é obrigatório." })
    .email({ message: "E-mail inválido." }),
  password: z
    .string({ required_error: "A senha é obrigatória." })
});
