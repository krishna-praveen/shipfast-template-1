type ExerciseType = {
  id: number,
  sets: string,
  repetitions: Array<number>;
  observation: string;
}


type Exercise = {
  type: string,
  data: ExerciseType[]
}

export type IRegisterWorkoutsPayload = {
  description: string;
  goal: string;
  observation: string;
  exercises: Exercise[];
  assessmentId: string;
}

export type IRegisterWorkoutsResponse = {
  data: string;
}
