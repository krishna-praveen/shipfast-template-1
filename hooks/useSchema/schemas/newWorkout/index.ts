import { z } from "zod";

//TODO: Add validation to name
export const newWorkoutFormSchema = z.object({
  descriptionWorkout: z.string({ required_error: "A descrição é obrigatória." }).min(1, "A descrição é obrigatória."),
  student: z.string({ required_error: "Informe um aluno" }),
  goal: z.string().optional(),
  obs: z.string().optional(),
  assessmentId: z.string({ required_error: "A avaliação é obrigatória." }).min(1, "A descrição é obrigatória."),
});
