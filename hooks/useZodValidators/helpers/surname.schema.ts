import { z } from "zod";

import { notAllowNumbersRefine } from "./refines/not-allow-numbers.refine";
import { notAllowSpecialCharacters } from "./refines/not-allow-special-characters.refine";

export const surnameSchema = () => {
  return z
    .string()
    .min(1, { message: "Sobrenome é obrigatório!" })
    .refine((value) => notAllowNumbersRefine(value), {
      message: "É necessário o sobrenome",
      path: [],
    })
    .refine((value) => notAllowSpecialCharacters(value), {
      message: "Caracteres especiais /*#?@ não são permitidos",
      path: [],
    });
};
