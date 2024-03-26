import { ptBR } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import React, { FC } from 'react'

import { Controller, useFormContext } from 'react-hook-form';

import { twMerge } from 'tailwind-merge';

import { Button } from '@/components/ui/Button';
import { Calendar } from '@/components/ui/Calendar';


import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/Popover';

interface CalendarInputProps {
  name: string;
  placeholder?: string;
  label?: string
  classNameContainer?: string
  error?: string;
  // eslint-disable-next-line no-unused-vars
  disableDaysFn?: (date: Date) => boolean
}

/**
 * This component renders a calendar input and needs to be wrapped in a form and form provider
 */
export const CalendarInput: FC<CalendarInputProps> = ({ name, placeholder, label, classNameContainer, disableDaysFn }) => {
  const { control, formState: { errors } } = useFormContext();
  const existsError = !!errors[name];

  return (
    <div>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <Popover>
            <PopoverTrigger asChild>
              <div className={twMerge("w-full flex flex-col", classNameContainer)}>
                {label && <span>{label}</span>}
                <Button
                  type='button'
                  variant={"outline"}
                  className={twMerge("flex w-full justify-between", existsError && 'border-red-500')}
                >
                  <CalendarIcon className="mr-4 size-4 opacity-50" />
                  {placeholder && !value && <span>{placeholder}</span>}
                  {value && <span>{value.toLocaleDateString()}</span>}
                </Button>
                {existsError && <span className='text-red-500'>{errors?.[name]?.message?.toString()}</span>}
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                disabled={disableDaysFn}
                locale={ptBR}
                onSelect={onChange}
                selected={value}
                initialFocus
              />

            </PopoverContent>
          </Popover>
        )} />
    </div>
  )
}
