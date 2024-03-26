import { useQuery, UseQueryOptions } from 'react-query';

import { IListAssessmentsByUserIdPayload, IListAssessmentsByUserIdResponse } from '@/types/models/listAssessmentsByUserId.model';

import { listAssessmentsRequestByUserId } from './listAssessmentsRequestByUserId.request';

interface UseListAssessmentsByIdProps {
  payload: IListAssessmentsByUserIdPayload
  options: UseQueryOptions<IListAssessmentsByUserIdResponse, unknown, IListAssessmentsByUserIdResponse, string[]>;
}

export function useListAssessmentsByUserId({ options, payload }: UseListAssessmentsByIdProps) {
  const key = JSON.stringify(payload);

  return useQuery(['useListAssessmentsByUserId', key], () => listAssessmentsRequestByUserId(payload), {
    staleTime: 600,
    retry: false,
    ...options,
  });
}
