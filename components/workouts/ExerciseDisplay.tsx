import { Pencil, Trash2 } from 'lucide-react';
import React, { FC } from 'react'

import { Button } from '@/components/ui/Button';

interface ExerciseDisplayProps {
  name: string;
  sets: number;
  repetitions: Array<number>;
  observation: string;
  rest: string;
}

export const ExerciseDisplay: FC<ExerciseDisplayProps> = ({ name, sets, observation, repetitions, rest }) => {
  return (
    <div className='mb-4 grid grid-cols-9 items-center rounded-md border border-gray-500 bg-zinc-900 p-5'>
      <b className='col-span-2'>{name}</b>
      <div className='flex flex-col'>
        <b>Séries</b>
        <span className='text-gray-400'>{sets}</span>
      </div>
      <div className='flex flex-col'>
        <b>Repetições</b>
        <span className='text-gray-400'>{repetitions.join(', ')}</span>
      </div>
      <div className='flex h-full flex-col'>
        <b>Descanso</b>
        <span className='h-full text-gray-400'>{rest}</span>
      </div>
      <div className='col-span-2 flex h-full flex-col'>
        <b>Observação</b>
        <span className='h-full text-gray-400'>{observation}</span>
      </div>
      <div className='col-span-2 flex justify-end'>
        <Button variant='ghost' className='mr-1 md:mr-2'><Pencil /></Button>
        <Button variant='ghost'><Trash2 className=' stroke-red-600' /></Button>
      </div>
    </div>
  )
}
