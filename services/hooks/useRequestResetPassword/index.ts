import { AxiosError } from 'axios';
import { useMutation, UseMutationOptions } from 'react-query';

import { IAuthRequestResetPasswordPayload } from '@/types/models/authRequestResetPassword.model';

import { authResetPassawordRequest } from './authRequestResetPassword.request';

interface UseRequestResetPasswordProps {
  options?: UseMutationOptions<any, AxiosError, IAuthRequestResetPasswordPayload, string[]>;
}

export function useRequestResetPassword({ options }: UseRequestResetPasswordProps) {
  return useMutation(authResetPassawordRequest, {
    retry: false,
    ...options,
  });
}
