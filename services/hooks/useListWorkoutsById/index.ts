import { useQuery, UseQueryOptions } from 'react-query';

import { IWorkoutByIdResponse } from '@/types/models/listWorkoutsById.model';

import { listWorkoutsByIdRequest } from './listWorkoutsById.request';

interface UseListWorkoutsByIdProps {
  options: UseQueryOptions<IWorkoutByIdResponse, unknown, IWorkoutByIdResponse, string[]>;
  workoutId: string;
}

export function useListWorkoutsById({ workoutId, options }: UseListWorkoutsByIdProps) {
  const key = JSON.stringify({ workoutId });

  return useQuery(['useListWorkoutsById', key], () => listWorkoutsByIdRequest({ workoutId }), {
    staleTime: 600,
    retry: false,
    ...options,
  });
}
