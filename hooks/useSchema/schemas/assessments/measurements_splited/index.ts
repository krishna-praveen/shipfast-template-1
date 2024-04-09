
import { z } from "zod";

export const measurementsSplitedFormSchema = z.object({
  left: z.object({
    arm: z.number({ required_error: "Medida do braço é obrigatório" }),
    calf: z.number({ required_error: "Medida do panturrilha é obrigatória" }),
    thigh: z.number({ required_error: "Medida do coxa é obrigatória" }),
    forearm: z.number({ required_error: "Medida do antebraço é obrigatório" }),
  }),
  right: z.object({
    arm: z.number({ required_error: "Medida do braço é obrigatório" }),
    calf: z.number({ required_error: "Medida do panturrilha é obrigatória" }),
    thigh: z.number({ required_error: "Medida do coxa é obrigatória" }),
    forearm: z.number({ required_error: "Medida do antebraço é obrigatório" }),
  }),
});
