'use client';

import { FC, ReactNode } from 'react';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { queryClient } from '@/services/queryClient';

interface GlobalProvidersProps {
  children: ReactNode
}
export const GlobalProviders: FC<GlobalProvidersProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools position='bottom-right' />
    </QueryClientProvider>
  )
}
