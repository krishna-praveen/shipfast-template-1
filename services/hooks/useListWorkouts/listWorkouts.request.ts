import apiClient from '@/services/api';

import { useSession } from '@/services/hooks/useSession';

import { IWorkoutsResponse } from '@/types/models/listWorkouts.model';

export const listWorkoutsRequest = async (): Promise<IWorkoutsResponse> => {
  const session = await useSession()

  const { data: workouts } = await apiClient.get<IWorkoutsResponse>("/workouts", { params: { userId: session.user.id } })

  const sortedWorkouts = workouts
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())

  return sortedWorkouts;
}
