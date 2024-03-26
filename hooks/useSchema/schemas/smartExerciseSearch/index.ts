
import { z } from "zod";


export const smartExerciseSearchFormSchema = z.object({
  term: z.string().optional(),
  bodyPart: z.string().optional(),
  equipment: z.string().optional(),
  target: z.string().optional(),
});
