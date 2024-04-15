import { imagesFormSchema } from './schemas/assessments/images';
import { measurementsGeneralFormSchema } from './schemas/assessments/measurements_general';
import { measurementsSplitedFormSchema } from './schemas/assessments/measurements_splited';
import { newAssessmentsFormSchema } from './schemas/assessments/newAssessments';
import { pollock_3FormSchema } from './schemas/assessments/pollock_3';
import { pollock_7FormSchema } from './schemas/assessments/pollock_7';
import { weightHeightFormSchema } from './schemas/assessments/weight_height';

import { newExerciseFormSchema } from './schemas/newExercise';
import { newExerciseSmartFormSchema } from './schemas/newExerciseSmart';
import { newWorkoutFormSchema } from './schemas/newWorkout';
import { registerStudentsFormSchema } from './schemas/registerStudents';
import { requestResetPasswordFormSchema } from './schemas/requestResetPassword';
import { resetPasswordFormSchema } from './schemas/resetPassword';
import { signInFormSchema } from './schemas/signIn';
import { signUpFormSchema } from './schemas/signUp';
import { smartExerciseSearchFormSchema } from './schemas/smartExerciseSearch';

export const useSchema = {
  signUp: signUpFormSchema,
  singIn: signInFormSchema,
  resetPassword: resetPasswordFormSchema,
  requestResetPassword: requestResetPasswordFormSchema,
  registerStudents: registerStudentsFormSchema,
  newWorkout: newWorkoutFormSchema,
  newExercise: newExerciseFormSchema,
  smartExerciseSearch: smartExerciseSearchFormSchema,
  newExerciseSmart: newExerciseSmartFormSchema,
  assessments: {
    newAssessments: newAssessmentsFormSchema,
    pollock_3: pollock_3FormSchema,
    pollock_7: pollock_7FormSchema,
    images: imagesFormSchema,
    weightHeight: weightHeightFormSchema,
    measurementsSplited: measurementsSplitedFormSchema,
    measurementsGeneral: measurementsGeneralFormSchema
  }
}
