import { useSession } from '@/services/hooks/useSession';
import apiServer from '@/services/serverApi';

import { IListPumpLibExercisesPayload, IListPumpLibExercisesResponse } from '@/types/models/listPumpLibExercises.model';

export const listPumpLibExercisesPayloadRequest = async (payload: IListPumpLibExercisesPayload): Promise<IListPumpLibExercisesResponse> => {
  const session = await useSession()

  let data = await apiServer.get("/exercises/search", {
    params: { ...payload },
    headers: {
      Authorization: `${session.access_token}`,
    },
  })

  const returnData = data as any

  return returnData;
}
