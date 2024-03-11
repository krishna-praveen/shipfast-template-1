import { useEffect, useState } from 'react';
import { useQuery, UseQueryOptions } from 'react-query';

import { IListRiftLibExercisesResponse, IListRiftLibExercisesPayload } from '@/types/models/listRiftLibExercises.model';

import { listRiftLibExercisesPayloadRequest } from './listLibRiftExercisesPayload.request';

interface UseListRiftLibExercisesProps {
  payload: IListRiftLibExercisesPayload
  options?: UseQueryOptions<IListRiftLibExercisesResponse, unknown, IListRiftLibExercisesResponse, string[]>
}

export function useListRiftLibExercises({
  payload, options
}: UseListRiftLibExercisesProps) {
  const [newParams, setNewParams] = useState<IListRiftLibExercisesPayload>();
  const stringify = (obj: IListRiftLibExercisesPayload) => JSON.stringify(obj);

  useEffect(() => {
    if (stringify(payload) !== stringify(newParams)) {
      const timerId = setTimeout(
        () => setNewParams(payload),
        20
      );
      return () => clearTimeout(timerId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payload]);

  return useQuery(['useListRiftLibExercises', stringify(newParams)], () => listRiftLibExercisesPayloadRequest(newParams), {
    staleTime: 600,
    retry: false,
    ...options,
  });
}
