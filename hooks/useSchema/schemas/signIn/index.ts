import { z } from "zod";

export const signInFormSchema = z.object({
  email: z
    .string()
    .min(1, "O email é obrigatório.")
    .email({ message: "E-mail inválido." }),
  password: z.string().min(1, "A senha é obrigatória."),
});
