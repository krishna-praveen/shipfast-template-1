'use client';

import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { FC } from 'react'
import { twMerge } from 'tailwind-merge'

interface NavigationHandlerTopBarProps extends React.HTMLAttributes<HTMLElement> {
  ignoreKeyBack?: boolean

}

export const NavigationHandlerTopBar: FC<NavigationHandlerTopBarProps> = ({ className, ignoreKeyBack, children, ...props }) => {

  const router = useRouter();
  return (
    <div className={twMerge('flex flex-row items-center', className)} {...props}>
      {!ignoreKeyBack && <ChevronLeft className="mr-2 cursor-pointer" onClick={() => router.back()} />}
      {children}
    </div>
  )
}
