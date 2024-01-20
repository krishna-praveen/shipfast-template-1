import apiClient from '@/services/api'

import { IBillingPayload } from '@/types/models/billing.model'

export const billingRequest = async ({ url: urlParam }: IBillingPayload): Promise<any> => {
  const data = await apiClient.post(
    "/stripe/create-portal",
    {
      returnUrl: urlParam,
    }
  );

  return { ...data };
}
