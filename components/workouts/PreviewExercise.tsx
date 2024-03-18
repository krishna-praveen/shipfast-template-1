import { CheckCircle } from 'lucide-react';
import Image from 'next/image'
import React, { FC, HtmlHTMLAttributes } from 'react'

import { twMerge } from 'tailwind-merge';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/Tooltip';

interface PreviewExerciseProps extends HtmlHTMLAttributes<HTMLDivElement> {
  imageUrl: string;
  name: string;
  selected: boolean;
}

export const PreviewExercise: FC<PreviewExerciseProps> = ({ imageUrl, name, selected, ...props }) => {
  return (
    <div className={twMerge('flex cursor-pointer flex-col items-center justify-center')} {...props}>
      <TooltipProvider data-side='bottom'>
        <Tooltip data-side='bottom'>
          <TooltipTrigger asChild data-side='bottom'>
            <div className={twMerge('flex flex-col items-center justify-center ', selected ? 'border-2 border-secondary-500 rounded-md' : 'hover:scale-105')}>
              {selected &&
                <div className='z-10 flex w-full items-center justify-end'>
                  <div className='rounded-bl-md bg-secondary p-1.5'>
                    <CheckCircle size={20} />
                  </div>
                </div>
              }
              <Image
                src={imageUrl}
                width={200}
                height={200}
                className={twMerge('rounded-lg', selected ? 'mx-3 my-2 -mt-5' : 'mx-4 my-3')}
                alt={`pic: ${name}`}
              />
              <span className='w-[8rem] overflow-hidden truncate pb-2 text-white hover:overflow-visible hover:truncate md:w-[8.5rem] lg:w-[10rem] xl:w-[13rem]'>
                {name}
              </span>
            </div>
          </TooltipTrigger>
          <TooltipContent className='bg-secondary'
          >
            <span>
              {name}
            </span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}
