
import { z } from "zod";

export const pollock_3FormSchema = (isMale: boolean) => {
  if (isMale) {
    return z.object({
      weight: z.number({ required_error: "Peso é obrigatório" }),
      height: z.number({ required_error: "Altura é obrigatória" }),
      abdomen: z.number({ required_error: "Medida do abdomen é obrigatória" }),
      chest: z.number({ required_error: "Medida do peito é obrigatória" }),
      thigh: z.number({ required_error: "Medida do coxa é obrigatória" }),
    })
  }

  return z.object({
    weight: z.number({ required_error: "Peso é obrigatório" }),
    height: z.number({ required_error: "Altura é obrigatória" }),
    suprailiac: z.number({ required_error: "Medida do suprailiaco é obrigatória" }),
    triceps: z.number({ required_error: "Medida do triceps é obrigatória" }),
    thigh: z.number({ required_error: "Medida do coxa é obrigatória" }),
  })
};
