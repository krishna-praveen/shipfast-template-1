import { Info } from 'lucide-react'
import React, { FC } from 'react'

import { twMerge } from 'tailwind-merge';

import { Tooltip as TooltipUI, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/Tooltip'

interface TooltipProps {
  children: string;
  classNameContent?: string;
  classNameChildren?: string;
}

export const Tooltip: FC<TooltipProps> = ({ children, classNameContent, classNameChildren }) => {
  return (
    <TooltipProvider>
      <TooltipUI>
        <TooltipTrigger><Info size={26} className='text-blue-400' /></TooltipTrigger>
        <TooltipContent className={twMerge('flex max-w-lg items-start bg-slate-700', classNameContent)}>
          <div >
            <Info size={26} className='text-blue-400' />
          </div>
          <p className={twMerge('text-md px-2', classNameChildren)}>{children}</p>
        </TooltipContent>
      </TooltipUI>
    </TooltipProvider>
  )
}
