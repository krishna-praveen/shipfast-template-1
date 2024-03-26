import apiServer from '@/services/serverApi';

import { IRegisterWorkoutsPayload, IRegisterWorkoutsResponse } from '@/types/models/registerWorkouts.model'

import { useSession } from '../useSession'

export const registerWorkoutsRequest = async ({ assessmentId, description, goal, observation, exercises }: IRegisterWorkoutsPayload): Promise<IRegisterWorkoutsResponse> => {
  const session = await useSession();
  const userId = session.user.id

  const result = await apiServer.post("/workouts", {
    description: description,
    goal: goal,
    observation: observation,
  }, {
    params: { userId },
    headers: {
      Authorization: `${session.access_token}`,
    }
  });

  await apiServer.post(`/workouts/${assessmentId}/exercises`, exercises, {
    headers: {
      Authorization: `${session.access_token}`,
    }
  });

  return result.data
}
