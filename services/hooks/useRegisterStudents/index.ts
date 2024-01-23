import { AxiosError } from 'axios';
import { useMutation, UseMutationOptions } from 'react-query';

import { IRegisterStudentsPayload } from '@/types/models/registerStudents.model';

import { registerStudentsRequest } from './registerStudents.request';

interface UseResgisterStudentsProps {
  options?: UseMutationOptions<any, AxiosError, IRegisterStudentsPayload, string[]>;
}

export function useRegisterStudents({ options }: UseResgisterStudentsProps) {
  return useMutation(registerStudentsRequest, {
    retry: false,
    ...options,
  });
}
