
import { z } from "zod";

export const newExerciseFormSchema = z.object({
  name: z.string({ required_error: "O exercício é obrigatório." }).min(1, "O exercício é obrigatória."),
  sets: z.string({ required_error: "Series é obrigatória." }).min(1, "Series é obrigatória."),
  repetitions: z.string({ required_error: "Repetição é obrigatória." }).min(1, "Repetição é obrigatória."),
  rest: z.string({ required_error: "Descanso é obrigatória." }).min(1, "Descanso é obrigatória."),
  gif: z.string().optional(),
  id: z.number(),
  observation: z.string().optional(),
});
