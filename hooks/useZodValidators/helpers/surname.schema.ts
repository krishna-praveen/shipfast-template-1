import { z } from "zod";

import { notAllowNumbersRefine } from "./refines/not-allow-numbers.refine";
import { notAllowSpecialCharactersRefine } from "./refines/not-allow-special-characters.refine";

export const surnameSchema = () => {
  return z
    .string()
    .min(1, { message: "Sobrenome é obrigatório!" })
    .refine((value) => notAllowNumbersRefine(value), {
      message: "Sobrenomes com números não são permitidos",
      path: [],
    })
    .refine((value) => notAllowSpecialCharactersRefine(value), {
      message: "Caracteres especiais /*#?@ não são permitidos",
      path: [],
    });
};
