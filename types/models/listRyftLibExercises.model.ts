
export type IListRyftLibExercisesPayload = {
  bodyPart?: string;
  equipment?: string;
  target?: string;
  term?: string;
}

export type RyftExercise = {
  bodyPart: string;
  equipment: string;
  gif: string;
  id: number;
  name: string;
  target: string;
  instructions: string | null;
  secundaryMuscles: string[] | null;
}

export type IListRyftLibExercisesResponse = RyftExercise[]
