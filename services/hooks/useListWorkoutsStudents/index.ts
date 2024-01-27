import { useQuery, UseQueryOptions } from 'react-query';

import { IWorkoutsStudentsResponse } from '@/types/models/listWorkoutsStudents.model';

import { listWorkoutsRequest } from './listWorkouts.request';

export function useListWorkoutsStudents(options: UseQueryOptions<IWorkoutsStudentsResponse, unknown, IWorkoutsStudentsResponse, string[]>) {
  const key = JSON.stringify(1);

  return useQuery(['useListWorkoutsStudents', key], () => listWorkoutsRequest(), {
    staleTime: 600,
    retry: false,
    ...options,
  });
}
