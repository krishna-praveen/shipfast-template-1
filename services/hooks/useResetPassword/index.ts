import { AxiosError } from 'axios';
import { useMutation, UseMutationOptions } from 'react-query';

import { IAuthResetPassawordPayload } from '@/types/models/authResetPassword.model';

import { authResetPassawordRequest } from './authResetPassaword.request';

interface UseResetPasswordProps {
  options?: UseMutationOptions<any, AxiosError, IAuthResetPassawordPayload, string[]>;
}

export function useResetPassword({ options }: UseResetPasswordProps) {
  return useMutation(authResetPassawordRequest, {
    retry: false,
    ...options,
  });
}
