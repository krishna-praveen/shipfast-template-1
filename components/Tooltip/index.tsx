import { Info } from 'lucide-react'
import React, { FC } from 'react'

import { twMerge } from 'tailwind-merge';

import { Tooltip as TooltipUI, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/Tooltip'

interface TooltipProps {
  children: string;
  classNameContent?: string;
  classNameChildren?: string;
  classNameLabel?: string;
  showIcon?: boolean;
  label?: string;
}

export const Tooltip: FC<TooltipProps> = ({ children, classNameContent, classNameChildren, showIcon = true, label, classNameLabel }) => {
  return (
    <TooltipProvider>
      <TooltipUI>
        <TooltipTrigger type='button'>
          {showIcon && <Info size={26} className='text-blue-400' />}
          {
            label && <p className={twMerge('', classNameLabel)}>{label}</p>
          }
        </TooltipTrigger>
        <TooltipContent className={twMerge('flex max-w-lg items-start bg-slate-700', classNameContent)}>
          {showIcon && <div className='py-2' >
            <Info size={26} className='text-blue-400' />
          </div>}
          <p className={twMerge('text-md px-2 py-2', classNameChildren)}>{children}</p>
        </TooltipContent>
      </TooltipUI>
    </TooltipProvider>
  )
}
