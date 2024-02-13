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
  error?: string
}

/**
 * This component renders a calendar input and needs to be wrapped in a form and form provider
 */
export const CalendarInput: FC<CalendarInputProps> = ({ name, placeholder, label, classNameContainer, error }) => {
  const { control } = useFormContext();

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
                  variant={"outline"}
                  className='flex w-full justify-between'
                >
                  <CalendarIcon className="mr-4 size-4 opacity-50" />
                  {placeholder && !value && <span>{placeholder}</span>}
                  {value && <span>{value.toLocaleDateString()}</span>}
                </Button>
                {error && <span>{error}</span>}
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                disabled={(date) =>
                  date > new Date() || date < new Date("1900-01-01")
                }
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
