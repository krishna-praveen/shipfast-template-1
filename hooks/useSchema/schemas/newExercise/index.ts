
import { z } from "zod";

export const newExerciseFormSchema = z.object({
  name: z.string({ required_error: "O exercício é obrigatório." }).min(1, "O exercício é obrigatória."),
  sets: z.string({ required_error: "Series é obrigatória." }).min(1, "Series é obrigatória."),
  repetitions: z.string().optional(),
  rest: z.string().optional(),
  videoLink: z.string().optional(),
  observation: z.string().optional(),
});
