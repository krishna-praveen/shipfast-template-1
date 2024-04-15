
import { z } from "zod";

export const pollock_3FormSchema = (isMale: boolean) => {
  if (isMale) {
    return z.object({
      weight: z.string({ required_error: "Peso é obrigatório" }),
      height: z.string({ required_error: "Altura é obrigatória" }),
      abdomen: z.string({ required_error: "Medida do abdomen é obrigatória" }),
      chest: z.string({ required_error: "Medida do peito é obrigatória" }),
      thigh: z.string({ required_error: "Medida do coxa é obrigatória" }),
    })
  }

  return z.object({
    weight: z.string({ required_error: "Peso é obrigatório" }),
    height: z.string({ required_error: "Altura é obrigatória" }),
    suprailiac: z.string({ required_error: "Medida do supra-ilíaca é obrigatória" }),
    triceps: z.string({ required_error: "Medida do triceps é obrigatória" }),
    thigh: z.string({ required_error: "Medida do coxa é obrigatória" }),
  })
};
