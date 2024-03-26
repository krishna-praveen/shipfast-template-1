import { useSession } from '@/services/hooks/useSession';
import apiServer from '@/services/serverApi';

import { IListRyftLibExercisesResponse, IListRyftLibExercisesPayload } from '@/types/models/listRyftLibExercises.model';

export const listRyftLibExercisesPayloadRequest = async (payload: IListRyftLibExercisesPayload): Promise<IListRyftLibExercisesResponse> => {
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
