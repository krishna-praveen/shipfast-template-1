/* eslint-disable no-unused-vars */
import { z } from "zod";

import { validateDate } from "./date";
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

export const SignInSchema = z.object({
  email: z
    .string({ required_error: "O email é obrigatório." })
    .email({ message: "E-mail inválido." }),
  password: z
    .string({ required_error: "A senha é obrigatória." })
    .min(6, { message: "O tamanho da senha deve ser no mínimo 6 caracteres." }),
});

export const ResetPasswordSchema = z.object({
  password: z
    .string({ required_error: "A senha é obrigatória." })
    .min(6, { message: "O tamanho da senha deve ser no mínimo 6 caracteres." }), // Adjust the validation as needed
});

export const RequestResetPasswordSchema = z.object({
  email: z
    .string({ required_error: "O email é obrigatório." })
    .email({ message: "E-mail inválido." }),
});

export const SignupSchema = z.object({
  name: z
    .string({ required_error: "O nome é obrigatório." })
    .min(6, "O nome deve ter pelo menos 6 caracteres."),
  email: z
    .string({ required_error: "O email é obrigatório." })
    .email("E-mail inválido."),
  password: z
    .string({ required_error: "A senha é obrigatória." })
    .min(6, "A senha deve ter pelo menos 6 caracteres."),
  birthDate: z
    .string({ required_error: "A data de nascimento é obrigatório." })
    .refine((data) => validateDate(data), {
      message: "Formato de data inválido. Use DD/MM/YYYY.",
    }),
  phone: z
    .string()
    .min(10, "O telefone deve ter pelo menos 11 caracteres.")
    .optional(),
});

export const ExerciseSchema = z.object({
  name: z.string().min(1),
  sets: z.number().min(1),
  repetitions: z.array(z.number()).min(1),
  videoLink: z.string().url(),
  observation: z.string(),
  type: z.string(),
});
export type ExerciseType = z.infer<typeof ExerciseSchema>;

const workoutTypeSchema = z.enum(["ABC", "ABCD", "ABCDE"]);
const exercisesSchema = z.record(z.string(), z.array(ExerciseSchema));

export const WorkoutSchema = z.object({
  description: z
    .string({ required_error: "A descrição é obrigatória." })
    .min(1, "A descrição é obrigatória."),
  phase: z.number().positive().min(1, "A fase é obrigatória."),
  goal: z
    .string({ required_error: "O objetivo é obrigatório." })
    .min(1, "O objetivo é obrigatório"),
  type: workoutTypeSchema,
  exercises: exercisesSchema,
  assessmentId: z.string({ required_error: "O aluno é obrigatório." }).uuid(),
});
export type WorkoutType = z.infer<typeof WorkoutSchema>;
