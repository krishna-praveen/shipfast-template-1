import { z } from 'zod';

export const requestResetPasswordFormSchema = z.object({
  email: z
    .string({ required_error: "O email é obrigatório." })
    .email({ message: "E-mail inválido." }),
});
