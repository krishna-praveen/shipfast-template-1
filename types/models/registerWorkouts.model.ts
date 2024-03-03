
type Exercise = {
  name: string;
  sets: number;
  repetitions: number[];
  videoLink: string;
  observation: string
  type: string
}

export type IRegisterWorkoutsPayload = {
  description: string;
  phase: number;
  goal: string;
  type: string;
  exercises: { [key: string]: Exercise[] };
  assessmentId: string;
}

export type IRegisterWorkoutsResponse = {
  data: string;
}
