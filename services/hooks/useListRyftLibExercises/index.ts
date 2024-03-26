import { useEffect, useState } from 'react';
import { useQuery, UseQueryOptions } from 'react-query';

import { IListRyftLibExercisesResponse, IListRyftLibExercisesPayload } from '@/types/models/listRyftLibExercises.model';

import { listRyftLibExercisesPayloadRequest } from './listLibRyftExercisesPayload.request';


interface UseListRyftLibExercisesProps {
  payload: IListRyftLibExercisesPayload
  options?: UseQueryOptions<IListRyftLibExercisesResponse, unknown, IListRyftLibExercisesResponse, string[]>
}

export function useListRyftLibExercises({
  payload, options
}: UseListRyftLibExercisesProps) {
  const [newParams, setNewParams] = useState<IListRyftLibExercisesPayload>();
  const stringify = (obj: IListRyftLibExercisesPayload) => JSON.stringify(obj);

  useEffect(() => {
    if (stringify(payload) !== stringify(newParams)) {
      const timerId = setTimeout(
        () => setNewParams(payload),
        300
      );
      return () => clearTimeout(timerId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payload]);

  return useQuery(['useListRyftLibExercises', stringify(newParams)], () => listRyftLibExercisesPayloadRequest(newParams), {
    staleTime: 600,
    retry: false,
    ...options,
  });
}
