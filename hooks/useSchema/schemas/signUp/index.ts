import { z } from "zod";

import { useZodValidators } from "@/hooks/useZodValidators";

export const signUpFormSchema = z.object({
  email: z.string().min(1, "Email obrigatório").email("Email inválido"),
  password: useZodValidators.passwordSchema(),
  phone: useZodValidators.phoneSchema(),
  birthDate: z
    .string()
    .min(1, "Data de nascimento obrigatória")
    .min(10, "Data de nascimento inválido"),
  name: useZodValidators.nameSchema(),
  surname: useZodValidators.surnameSchema(),
});
