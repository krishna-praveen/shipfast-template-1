import React, { FC } from 'react'

import { Controller, useFormContext } from 'react-hook-form';




import { Input } from '@/components/ui/Input';

interface CalendarInputProps {
  name: string;
  placeholder?: string;
  label?: string
  classNameContainer?: string
  error?: string
}

export const TextInput: FC<CalendarInputProps> = ({ name, placeholder, label, classNameContainer, error }) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { ...ControllerProps } }) => (
        <Input placeholder={placeholder} label={label} errorName={error} classNameContainer={classNameContainer}  {...ControllerProps} />
      )} />
  )
}
