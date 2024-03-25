import { AxiosError } from 'axios';
import { useMutation, UseMutationOptions } from 'react-query';

import { IAuthSignInResponse, IAuthSignInPayload } from '@/types/models/authSignIn.model';

import { authSignInRequest } from './authSignIn.request';

interface UseSignInProps {
  options?: UseMutationOptions<IAuthSignInResponse, AxiosError, IAuthSignInPayload, string[]>;
}

export function useSignIn({ options }: UseSignInProps) {
  return useMutation(authSignInRequest, {
    retry: false,
    ...options,
  });
}
