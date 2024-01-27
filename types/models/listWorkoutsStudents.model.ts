type Workout = {
  id: string;
  description: string;
}

export type StudentWorkouts = {
  studentFullName: string;
  workouts: Workout[];
}

export type IWorkoutsStudentsResponse = StudentWorkouts[]
