import React, { FC } from 'react'
import { twMerge } from 'tailwind-merge'

//import { Container } from './styles'

interface ActionRootProps extends React.HTMLAttributes<HTMLElement> {

}

export const ActionRoot: FC<ActionRootProps> = ({ className, children, ...props }) => {
  return (
    <div className={twMerge('flex justify-between', className)} {...props}>
      {children}
    </div>
  )
}
