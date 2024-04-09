
import { z } from "zod";

export const imagesFormSchema = (isRequired: boolean) => {
  if (isRequired) {
    return z.object({
      front: z.string({ required_error: "A imagem frontal é obrigatória." }).min(1, "A imagem é obrigatória."),
      back: z.string({ required_error: "A imagem traseira é obrigatória." }).min(1, "A imagem é obrigatória."),
      left: z.string({ required_error: "A imagem lateral esquerda é obrigatória." }).min(1, "A imagem é obrigatória."),
      right: z.string({ required_error: "A imagem lateral direta é obrigatória." }).min(1, "A imagem é obrigatória."),
    })
  }

  return z.object({
    front: z.string().optional(),
    back: z.string().optional(),
    left: z.string().optional(),
    right: z.string().optional(),
  })
};
