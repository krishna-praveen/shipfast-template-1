import { AxiosError } from 'axios';
import { useMutation, UseMutationOptions } from 'react-query';

import { IRegisterWorkoutsResponse, IRegisterWorkoutsPayload } from '@/types/models/registerWorkouts.model';

import { registerWorkoutsRequest } from './registerWorkout.request';

interface UseRegisterWorkoutProps {
  options?: UseMutationOptions<IRegisterWorkoutsResponse, AxiosError, IRegisterWorkoutsPayload, string[]>;
}

export function useRegisterWorkout({ options }: UseRegisterWorkoutProps) {
  return useMutation(registerWorkoutsRequest, {
    retry: false,
    ...options,
  });
}
