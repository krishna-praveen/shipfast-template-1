import { AxiosError } from 'axios';
import { useMutation, UseMutationOptions } from 'react-query';

import { IBillingPayload, IBillingResponse } from '@/types/models/billing.model';

import { billingRequest } from './billing.request';

interface UseBillingProps {
  options?: UseMutationOptions<IBillingResponse, AxiosError, IBillingPayload, string[]>;
}

export function useBilling({ options }: UseBillingProps) {
  return useMutation(billingRequest, {
    retry: false,
    ...options,
  });
}
