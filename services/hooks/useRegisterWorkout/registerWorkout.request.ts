import apiClient from '@/services/api'

import { IRegisterWorkoutsPayload, IRegisterWorkoutsResponse } from '@/types/models/registerWorkouts.model'

import { useSession } from '../useSession'

export const registerWorkoutsRequest = async (data: IRegisterWorkoutsPayload): Promise<IRegisterWorkoutsResponse> => {
  const session = await useSession();
  const userId = session.user.id

  const result = await apiClient.post("/workouts", data, { params: { userId } });
  return result.data
}
