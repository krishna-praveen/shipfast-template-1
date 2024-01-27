import apiClient from '@/services/api';

import { useSession } from '@/services/hooks/useSession';

import { IWorkoutsStudentsResponse } from '@/types/models/listWorkoutsStudents.model';

export const listWorkoutsRequest = async (): Promise<IWorkoutsStudentsResponse> => {
  const session = await useSession()

  const { data: workouts } = await apiClient.get<IWorkoutsStudentsResponse>("/workouts/students", { params: { userId: session.user.id } })

  return workouts;
}
