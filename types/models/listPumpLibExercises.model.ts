
export type IListPumpLibExercisesPayload = {
  bodyPart?: string;
  equipment?: string;
  target?: string;
  term?: string;
}

type PumpExercises = {
  bodyPart: string;
  equipment: string;
  gif: string;
  id: string;
  name: string;
  target: string;
  instructions: string | null;
  secundaryMuscles: string[] | null;
}

export type IListPumpLibExercisesResponse = PumpExercises[]
