'use client'

import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { FC } from 'react'
import { twMerge } from 'tailwind-merge'

interface TitleTopBarProps extends React.HTMLAttributes<HTMLElement> {
  ignoreKeyBack?: boolean
}

export const TitleTopBar: FC<TitleTopBarProps> = ({ className, ignoreKeyBack, children, ...props }) => {
  const router = useRouter();

  return (
    <h1 className={twMerge('text-4xl font-bold flex items-center', className)} {...props}>
      {!ignoreKeyBack && <ChevronLeft className="mr-2 cursor-pointer" onClick={() => router.back()} />}
      {children}
    </h1>
  )
}
