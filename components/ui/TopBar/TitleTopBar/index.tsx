'use client'

import React, { FC } from 'react'
import { twMerge } from 'tailwind-merge'

interface TitleTopBarProps extends React.HTMLAttributes<HTMLElement> {
}

export const TitleTopBar: FC<TitleTopBarProps> = ({ className, children, ...props }) => {

  return (
    <h1 className={twMerge('text-4xl font-bold flex items-center', className)} {...props}>
      {children}
    </h1>
  )
}
