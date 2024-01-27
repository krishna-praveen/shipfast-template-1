import apiClient from '@/services/api';

import { useSession } from '@/services/hooks/useSession';

import { IWorkoutByIdPayload, IWorkoutByIdResponse } from '@/types/models/listWorkoutsById.model';

export const listWorkoutsByIdRequest = async ({ workoutId }: IWorkoutByIdPayload): Promise<IWorkoutByIdResponse> => {
  const session = await useSession()

  const { data: workouts } = await apiClient.get<IWorkoutByIdResponse>(`/workouts/${workoutId}`, { params: { userId: session.user.id } })

  return workouts;
}
