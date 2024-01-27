import React, { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
}

export const InputBase = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ ...props }, ref) => {
    return (
      <input
        {...props}
        ref={ref}
        className={twMerge(`input input-bordered w-full placeholder:opacity-60`, props.className)}
      />
    );
  }
);

InputBase.displayName = 'Input';
