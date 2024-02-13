import React, { FC } from 'react'
import { twMerge } from 'tailwind-merge'

interface RootTopBarProps extends React.HTMLAttributes<HTMLElement> {

}

export const RootTopBar: FC<RootTopBarProps> = ({ className, children, ...props }) => {
  return (
    <section className={twMerge('flex justify-between w-full', className)} {...props}>
      {children}
    </section>
  )
}
