import { useQuery, UseQueryOptions } from 'react-query';

import { IAssessmentsResponse } from '@/types/models/listAssessments.model';

import { listAssessmentsRequest } from './listAssessmentsRequest.request';

export function useListAssessments(options: UseQueryOptions<IAssessmentsResponse, unknown, IAssessmentsResponse, string[]>) {
  const key = JSON.stringify(1);

  return useQuery(['useAssessments', key], () => listAssessmentsRequest(), {
    staleTime: 600,
    retry: false,
    ...options,
  });
}
