import { useSession } from '@/services/hooks/useSession';
import apiServer from '@/services/serverApi';

import { IListRiftLibExercisesResponse, IListRiftLibExercisesPayload } from '@/types/models/listRiftLibExercises.model';

export const listRiftLibExercisesPayloadRequest = async (payload: IListRiftLibExercisesPayload): Promise<IListRiftLibExercisesResponse> => {
  const session = await useSession()

  let data = await apiServer.get("exercises/search", {
    params: { ...payload },
    headers: {
      Authorization: `${session.access_token}`,
    },
  })

  const returnData = data as any

  return returnData;
}
