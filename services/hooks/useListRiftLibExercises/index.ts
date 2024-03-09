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
  const key = JSON.stringify(payload);

  return useQuery(['useListRiftLibExercises', key], () => listRiftLibExercisesPayloadRequest(payload), {
    staleTime: 600,
    retry: false,
    ...options,
  });
}
