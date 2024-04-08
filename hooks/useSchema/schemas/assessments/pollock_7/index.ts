
import { z } from "zod";

export const pollock_7FormSchema = (isMale: boolean) => {
  if (isMale) {
    return z.object({
      weight: z.number({ required_error: "Peso é obrigatório" }),
      height: z.number({ required_error: "Altura é obrigatória" }),
      triceps: z.number({ required_error: "Medida do triceps é obrigatória" }),
      thigh: z.number({ required_error: "Medida do coxa é obrigatória" }),
      subscapular: z.number({ required_error: "Medida do subscapular é obrigatória" }),
      axilla: z.number({ required_error: "Medida da axila é obrigatória" }),
      calf: z.number({ required_error: "Medida da panturrilha é obrigatória" }),
      waist: z.number({ required_error: "Medida da cintura é obrigatória" }),
      chest: z.number({ required_error: "Medida do peito é obrigatória" }),
    })
  }

  return z.object({
    weight: z.number({ required_error: "Peso é obrigatório" }),
    height: z.number({ required_error: "Altura é obrigatória" }),
    suprailiac: z.number({ required_error: "Medida do suprailiaco é obrigatória" }),
    triceps: z.number({ required_error: "Medida do triceps é obrigatória" }),
    thigh: z.number({ required_error: "Medida do coxa é obrigatória" }),
    subscapular: z.number({ required_error: "Medida do subscapular é obrigatória" }),
    axilla: z.number({ required_error: "Medida da axila é obrigatória" }),
    calf: z.number({ required_error: "Medida da panturrilha é obrigatória" }),
    waist: z.number({ required_error: "Medida da cintura é obrigatória" }),
  })
};
