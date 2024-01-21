export type Exercise = {
  name: string;
  sets: number;
  type: string;
  videoLink: string;
  observation: string;
  repetitions: number[];
}

export type Exercises = {
  [key: string]: Array<Exercise>;
}

export type WorkoutType = 'AB' | 'ABC' | 'ABCD' | 'ABCDE';

export type Workout = {
  id: string;
  description: string;
  phase: number;
  assessmentId: string;
  goal: string;
  type: WorkoutType;
  exercises: Exercises;
  studentId: string;
  userId: string;
  createdAt: string
  updatedAt: string | null;
}

export type IWorkoutsResponse = Workout[]
