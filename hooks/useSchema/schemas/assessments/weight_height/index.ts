
import { z } from "zod";

export const weightHeightFormSchema = z.object({
  weight: z.number({ required_error: "Peso é obrigatório" }),
  height: z.number({ required_error: "Altura é obrigatória" }),
});
