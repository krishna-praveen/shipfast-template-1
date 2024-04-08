
import { z } from "zod";

export const newAssessmentsFormSchema = z.object({
  student: z.string({ required_error: "Informe um aluno" }),
  assessmentType: z.string({ required_error: "Escolha um tipo de avaliação" }),
  date: z.object({
    to: z.date({ required_error: "A data final é obrigatória" }),
    from: z.date({ required_error: "A data inicial é obrigatória" }),
  }, { required_error: "Intervalo de datas é obrigatória" }),
});
