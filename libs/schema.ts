/* eslint-disable no-unused-vars */
import { z } from "zod";
import { AssessmentTypeEnum } from "./enums/assessment-type-enum";

export const FormDataSchema = z.object({
  studentId: z.string().min(1, "Aluno é obrigatório"),
  assessmentType: z.nativeEnum(AssessmentTypeEnum, {
    required_error: "O tipo de avaliação é obrigatório",
  }),
  assessmentMeasures: z.object({
    chest: z
      .number({ invalid_type_error: "Insira umn valor numérico" })
      .optional(),
    triceps: z
      .number({ invalid_type_error: "Insira umn valor numérico" })
      .optional(),
    suprailiac: z
      .number({ invalid_type_error: "Insira umn valor numérico" })
      .optional(),
    thigh: z
      .number({ invalid_type_error: "Insira umn valor numérico" })
      .optional(),
    abdomen: z
      .number({ invalid_type_error: "Insira umn valor numérico" })
      .optional(),
    calf: z
      .number({ invalid_type_error: "Insira umn valor numérico" })
      .optional(),
    axilla: z
      .number({ invalid_type_error: "Insira umn valor numérico" })
      .optional(),
    subscapular: z
      .number({ invalid_type_error: "Insira umn valor numérico" })
      .optional(),
    weight: z.number({
      invalid_type_error: "Insira umn valor numérico",
      required_error: "O peso é obrigatório",
    }),
    height: z.number({
      invalid_type_error: "Insira umn valor numérico",
      required_error: "O peso é obrigatório",
    }),
  }),
  bodyMeasurement: z.object({
    neck: z
      .number({ invalid_type_error: "Insira umn valor numérico" })
      .optional(),
    shoulder: z
      .number({ invalid_type_error: "Insira umn valor numérico" })
      .optional(),
    chest: z
      .number({ invalid_type_error: "Insira umn valor numérico" })
      .optional(),
    waist: z
      .number({ invalid_type_error: "Insira umn valor numérico" })
      .optional(),
    abdomen: z
      .number({ invalid_type_error: "Insira umn valor numérico" })
      .optional(),
    hip: z
      .number({ invalid_type_error: "Insira umn valor numérico" })
      .optional(),
    right: z.object({
      arm: z
        .number({ invalid_type_error: "Insira umn valor numérico" })
        .optional(),
      forearm: z
        .number({ invalid_type_error: "Insira umn valor numérico" })
        .optional(),
      thigh: z
        .number({ invalid_type_error: "Insira umn valor numérico" })
        .optional(),
      calf: z
        .number({ invalid_type_error: "Insira umn valor numérico" })
        .optional(),
    }),
    left: z.object({
      arm: z
        .number({ invalid_type_error: "Insira umn valor numérico" })
        .optional(),
      forearm: z
        .number({ invalid_type_error: "Insira umn valor numérico" })
        .optional(),
      thigh: z
        .number({ invalid_type_error: "Insira umn valor numérico" })
        .optional(),
      calf: z
        .number({ invalid_type_error: "Insira umn valor numérico" })
        .optional(),
    }),
  }),
  startDate: z
    .string({ required_error: "A data de início é obrigatória" })
    .regex(
      /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
      "Por favor, utilize o formato: DD/MM/AAAA"
    ),
  endDate: z
    .string({ required_error: "A data de início é obrigatória" })
    .regex(
      /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
      "Por favor, utilize o formato: DD/MM/AAAA"
    ),
});
