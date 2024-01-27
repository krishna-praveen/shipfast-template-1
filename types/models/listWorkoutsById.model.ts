export type ExerciseDetail = {
  name: string;
  sets: number;
  type: string;
  repetitions: Array<number>;
  videoLink: string;
  observation: string;
}

export type Exercises = {
  [key: string]: Array<ExerciseDetail>;
}

export type ExerciseInterface = {
  name: string;
  sets: number;
  type: string
  repetitions: Array<number>;
  videoLink: string;
  observation: string;
}

export type IWorkoutByIdResponse = {
  id: string;
  studentId: string;
  userId: string;
  assessmentId: string;
  description: string;
  phase: number;
  goal: string;
  type: string;
  exercises: Exercises;
}

export type WorkoutInterface = IWorkoutByIdResponse;


export type IWorkoutByIdPayload = {
  workoutId: string;
}
