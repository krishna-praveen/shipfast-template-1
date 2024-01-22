import { useQuery, UseQueryOptions } from 'react-query';

import { IListStudentsResponse } from '@/types/models/listStudents.model';

import { listStudentsRequest } from './listaStudents.request';

export function useListStudents(options: UseQueryOptions<IListStudentsResponse, unknown, IListStudentsResponse, string[]>) {
  const key = JSON.stringify(1);

  return useQuery(['useListStudents', key], () => listStudentsRequest(), {
    staleTime: 600,
    retry: false,
    ...options,
  });
}
