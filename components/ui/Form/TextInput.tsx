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
  disabled?: boolean;
  autoFocus?: boolean;
}

export const TextInput: FC<CalendarInputProps> = ({ name, placeholder, className, classNameLabel, type = 'text', autoFocus, label, classNameContainer, disabled }) => {
  const { control, formState: { errors } } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { ...ControllerProps } }) => (
        <Input autoFocus={autoFocus} className={className} classNameLabel={classNameLabel} readOnly={disabled} disabled={disabled} type={type} placeholder={placeholder} label={label} errorName={errors?.[name]?.message?.toString() || ''} classNameContainer={classNameContainer}  {...ControllerProps} />
      )} />
  )
}
