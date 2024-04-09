
import { z } from "zod";

export const measurementsGeneralFormSchema = z.object({
  hip: z.number({ required_error: "Medida do quadril é obrigatória" }),
  neck: z.number({ required_error: "Medida do pescoço é obrigatória" }),
  shoulder: z.number({ required_error: "Medida do ombro é obrigatória" }),
  waist: z.number({ required_error: "Medida da cintura é obrigatória" }),
  chest: z.number({ required_error: "Medida da torax é obrigatória" }),
  abdomen: z.number({ required_error: "Medida da abdomen é obrigatória" }),
});
