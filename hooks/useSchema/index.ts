import { newExerciseFormSchema } from './schemas/newExercise';
import { newWorkoutFormSchema } from './schemas/newWorkout';
import { registerStudentsFormSchema } from './schemas/registerStudents';
import { requestResetPasswordFormSchema } from './schemas/requestResetPassword';
import { resetPasswordFormSchema } from './schemas/resetPassword';
import { signInFormSchema } from './schemas/signIn';
import { signUpFormSchema } from './schemas/signUp';

export const useSchema = {
  signUp: signUpFormSchema,
  singIn: signInFormSchema,
  resetPassword: resetPasswordFormSchema,
  requestResetPassword: requestResetPasswordFormSchema,
  registerStudents: registerStudentsFormSchema,
  newWorkout: newWorkoutFormSchema,
  newExercise: newExerciseFormSchema
}
