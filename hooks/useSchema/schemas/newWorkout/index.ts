import { z } from "zod";

//TODO: Add validation to name
export const newWorkoutFormSchema = z.object({
  descriptionWorkout: z.string({ required_error: "A descrição é obrigatória." }).min(1, "A descrição é obrigatória."),
  startDate: z.date({ required_error: "A data de inicio é obrigatória." }),
  endDate: z.date({ required_error: "A data de fim é obrigatória." }),
  revaluation: z.date().optional(),
  daysOfWorkout: z.string().optional(),
  student: z.string({ required_error: "Informe um aluno" }),
  objective: z.string().optional(),
  obs: z.string().optional(),
});
