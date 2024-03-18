
import { z } from "zod";

export const newExerciseSmartFormSchema = z.object({
  sets: z.string({ required_error: "Series é obrigatória." }).min(1, "Series é obrigatória."),
  repetitions: z.string({ required_error: "Repetição é obrigatória." }).min(1, "Repetição é obrigatória."),
  rest: z.string({ required_error: "Descanso é obrigatória." }).min(1, "Descanso é obrigatória."),
  observation: z.string().optional(),
});
