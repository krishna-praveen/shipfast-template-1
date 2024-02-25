import React, { FC } from 'react'

import { Controller, useFormContext } from 'react-hook-form';

import { Textarea } from '@/components/ui/Textarea';

interface CalendarInputProps {
  name: string;
  label?: string;
  className?: string;
  classNameLabel?: string;
  classNameContainer?: string;
  placeholder?: string;
}

export const TextAreaInput: FC<CalendarInputProps> = ({ name, className, classNameContainer, placeholder, classNameLabel, label }) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { ...ControllerProps } }) => (
        <Textarea className={className} classNameContainer={classNameContainer} placeholder={placeholder} label={label} classNameLabel={classNameLabel} {...ControllerProps} />
      )} />
  )
}
