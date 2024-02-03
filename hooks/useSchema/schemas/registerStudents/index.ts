import { z } from "zod";

import { useZodValidators } from "@/hooks/useZodValidators";

//TODO: Add validation to name
export const registerStudentsFormSchema = z.object({
  email: z
    .string({ required_error: "O email é obrigatório." })
    .email({ message: "E-mail inválido." }),
  name: useZodValidators.nameSchema(),
  surname: useZodValidators.surnameSchema(),
  birthDate: z
    .string()
    .min(1, "Data de nascimento obrigatória")
    .min(10, "Data de nascimento inválido"),
  gender: z
    .string({ required_error: "Sexo obrigatório" })
    .min(1, "Sexo obrigatório"),
  city: z.string(),
  state: z.string(),
  phone: useZodValidators.phoneSchema(),
});
