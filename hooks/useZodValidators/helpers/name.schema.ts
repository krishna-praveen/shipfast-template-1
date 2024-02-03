import { z } from "zod";

import { notAllowNumbersRefine } from "./refines/not-allow-numbers.refine";
import { notAllowSpecialCharactersRefine } from "./refines/not-allow-special-characters.refine";

export const nameSchema = () => {
  return z
    .string()
    .min(1, { message: "Nome é obrigatório!" })
    .max(40, { message: "Nome muito grande, máximo de 40 caracteres" })
    .refine((value) => notAllowNumbersRefine(value), {
      message: "Nomes com números não são permitidos",
      path: [],
    })
    .refine((value) => notAllowSpecialCharactersRefine(value), {
      message: "Caracteres especiais /*#?@ não são permitidos",
      path: [],
    });
};
