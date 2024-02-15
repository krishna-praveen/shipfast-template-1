import React, { FC } from 'react'

import { Controller, useFormContext } from 'react-hook-form';




import { Input } from '@/components/ui/Input';

interface CalendarInputProps {
  name: string;
  placeholder?: string;
  label?: string
  classNameContainer?: string
}

export const TextInput: FC<CalendarInputProps> = ({ name, placeholder, label, classNameContainer }) => {
  const { control, formState: { errors } } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { ...ControllerProps } }) => (
        <Input defaultValue='' placeholder={placeholder} label={label} errorName={errors?.[name]?.message?.toString() || ''} classNameContainer={classNameContainer}  {...ControllerProps} />
      )} />
  )
}
