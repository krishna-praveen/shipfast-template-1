import React, { FC } from 'react'

import { Controller, useFormContext } from 'react-hook-form';




import { Input } from '@/components/ui/Input';

interface CalendarInputProps {
  name: string;
  placeholder?: string;
  label?: string;
  classNameContainer?: string;
  classNameLabel?: string;
  className?: string;
  type?: string;
  defaultValue?: string;
}

export const TextInput: FC<CalendarInputProps> = ({ name, placeholder, defaultValue = '', className, classNameLabel, type = 'text', label, classNameContainer }) => {
  const { control, formState: { errors } } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { ...ControllerProps } }) => (
        <Input defaultValue={defaultValue} className={className} classNameLabel={classNameLabel} type={type} placeholder={placeholder} label={label} errorName={errors?.[name]?.message?.toString() || ''} classNameContainer={classNameContainer}  {...ControllerProps} />
      )} />
  )
}
