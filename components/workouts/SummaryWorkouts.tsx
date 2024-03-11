import { ChevronsUp } from 'lucide-react'
import React, { FC, HtmlHTMLAttributes, useRef } from 'react'
import { twMerge } from 'tailwind-merge';

interface SummaryWorkoutsProps extends HtmlHTMLAttributes<HTMLDivElement> {
  workouts: number;
  isOpen?: boolean;
}

export const SummaryWorkouts: FC<SummaryWorkoutsProps> = ({ workouts, isOpen, children, className, ...props }) => {
  const contentElement = useRef<HTMLDivElement>(null)
  const height = isOpen ? `${contentElement ? contentElement?.current?.scrollHeight && contentElement?.current?.scrollHeight || '0' : '0'}px` : "0px"

  return (
    <div className={twMerge(' w-full cursor-pointer justify-between rounded-md bg-zinc-700 px-4 py-2', className)} {...props}>
      <div className='flex justify-between'>
        <div className='flex flex-col'>
          <span>
            <b>{workouts}</b> {workouts > 1 ? 'treinos adicionados' : 'treino adicionado'}
          </span>
          <span className='text-sm font-light text-zinc-400'>Clique para verificar os detalhes</span>
        </div>
        <div className={twMerge('flex rotate-0 items-center justify-center transition-transform duration-500', isOpen && 'rotate-180')}>
          <ChevronsUp />
        </div>
      </div>

      <div
        ref={contentElement}
        style={{ height: height }}
        className={twMerge("overflow-hidden transition-all duration-200")}
      >
        {children}
      </div>

    </div>
  )
}
