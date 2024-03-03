import { useQuery, UseQueryOptions } from 'react-query';

import { IListPumpLibExercisesPayload, IListPumpLibExercisesResponse } from '@/types/models/listPumpLibExercises.model';

import { listPumpLibExercisesPayloadRequest } from './listPumpLibExercisesPayload.request';

interface UseListPumpLibExercisesProps {
  payload: IListPumpLibExercisesPayload
  options?: UseQueryOptions<IListPumpLibExercisesResponse, unknown, IListPumpLibExercisesResponse, string[]>
}

export function useListPumpLibExercises({
  payload, options
}: UseListPumpLibExercisesProps) {
  const key = JSON.stringify(payload);

  return useQuery(['useListPumpLibExercises', key], () => listPumpLibExercisesPayloadRequest(payload), {
    staleTime: 600,
    retry: false,
    ...options,
  });
}
