import { useQuery, UseQueryOptions } from 'react-query';

import { IWorkoutsResponse } from '@/types/models/listWorkouts.model';

import { listWorkoutsRequest } from './listWorkouts.request';

export function useListWorkouts(options: UseQueryOptions<IWorkoutsResponse, unknown, IWorkoutsResponse, string[]>) {
  const key = JSON.stringify(1);

  return useQuery(['useListWorkouts', key], () => listWorkoutsRequest(), {
    staleTime: 600,
    retry: false,
    ...options,
  });
}
