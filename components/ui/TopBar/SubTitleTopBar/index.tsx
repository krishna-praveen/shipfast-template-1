'use client'

import React, { FC } from 'react'
import { twMerge } from 'tailwind-merge'

interface SubTitleTopBarProps extends React.HTMLAttributes<HTMLElement> {
}

export const SubTitleTopBar: FC<SubTitleTopBarProps> = ({ className, children, ...props }) => {
  return (
    <h2 className={twMerge('text-md flex font-light items-center', className)} {...props}>
      {children}
    </h2>
  )
}
