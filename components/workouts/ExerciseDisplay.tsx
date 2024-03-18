import { Pencil, Trash2 } from 'lucide-react';
import React, { FC } from 'react'

import { twMerge } from 'tailwind-merge';

import { Button } from '@/components/ui/Button';

interface ExerciseDisplayProps {
  name: string;
  sets: number;
  repetitions: Array<number>;
  observation: string;
  rest: string;
  className?: string;
  onDeleteExercise: () => void;
  onEditExercise: () => void;
}

export const ExerciseDisplay: FC<ExerciseDisplayProps> = ({ name, sets, observation, repetitions, rest, className, onDeleteExercise, onEditExercise }) => {
  return (
    <div className={twMerge('mb-4 grid grid-cols-4 items-center gap-4 rounded-md border border-gray-500 bg-zinc-900 p-5 lg:grid-cols-9', className)}>
      <b className='col-span-4 text-center lg:col-span-2 lg:text-start'>{name}</b>
      <div className='col-span-2 flex flex-col lg:col-span-1'>
        <b>Séries</b>
        <span className='text-gray-400'>{sets}</span>
      </div>
      <div className='col-span-2 flex h-full flex-col lg:col-span-1'>
        <b>Repetições</b>
        <span className='h-full text-gray-400'>{repetitions.join(', ')}</span>
      </div>
      <div className='col-span-2 flex h-full flex-col lg:col-span-1'>
        <b>Descanso</b>
        <span className='h-full text-gray-400'>{rest}</span>
      </div>
      <div className='col-span-2 flex h-full flex-col'>
        <b>Observação</b>
        <span className='h-full text-gray-400'>{observation}</span>
      </div>
      <div className='col-span-4 flex justify-center lg:col-span-2 lg:justify-end'>
        <Button variant='ghost' type='button' className='mr-1 md:mr-2' onClick={onEditExercise}><Pencil /></Button>
        <Button variant='ghost' type='button' onClick={onDeleteExercise}><Trash2 className=' stroke-red-600' /></Button>
      </div>
    </div>
  )
}
