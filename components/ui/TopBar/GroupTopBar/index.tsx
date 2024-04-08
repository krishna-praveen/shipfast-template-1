import React, { FC } from 'react'
import { twMerge } from 'tailwind-merge'

interface GroupTopBarProps extends React.HTMLAttributes<HTMLElement> {

}

export const GroupTopBar: FC<GroupTopBarProps> = ({ className, children, ...props }) => {
  return (
    <div className={twMerge('flex flex-col', className)} {...props}>
      {children}
    </div>
  )
}
