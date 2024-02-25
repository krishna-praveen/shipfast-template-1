
import { z } from "zod";

export const newExerciseFormSchema = z.object({
  exercise: z.string({ required_error: "O exercício é obrigatório." }).min(1, "O exercício é obrigatória."),
  series: z.string({ required_error: "Series é obrigatória." }).min(1, "Series é obrigatória."),
  reps: z.string().optional(),
  rest: z.string().optional(),
  link: z.string().optional(),
  obs: z.string().optional(),
});
