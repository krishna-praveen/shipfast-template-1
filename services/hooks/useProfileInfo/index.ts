import { useQuery, UseQueryOptions } from 'react-query';

import { IProfileInfoResponse } from '@/types/models/profileInfo.model';

import { getProfileInfo } from './getProfileInfo.request';

export function useProfileInfo(options: UseQueryOptions<IProfileInfoResponse, unknown, IProfileInfoResponse, string[]>) {
  const key = JSON.stringify(1);

  return useQuery(['useProfileInfo', key], () => getProfileInfo(), {
    staleTime: 600,
    retry: false,
    ...options,
  });
}
