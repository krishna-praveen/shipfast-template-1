import Image from 'next/image'
import React, { FC } from 'react'

import NoResultsImage from '@/components/public/no-results.png';

interface NoResultsProps {
  children?: string;
}

export const NoResults: FC<NoResultsProps> = ({ children }) => {
  return (
    <div className='flex min-h-[320px] flex-col items-center justify-center'>
      <Image src={NoResultsImage} width={60} height={61} alt="No results" className='mb-4' />
      <span className='text-md font-semibold lg:text-lg'>
        {children}
      </span>
    </div>
  )
}
