import React, { forwardRef } from 'react';

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  errorName?: string;
}

export const Input = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ errorName, ...props }, ref) => {
    return (
      <div>
        <input
          {...props}
          ref={ref}
          className={`input input-bordered w-full placeholder:opacity-60 ${errorName ? 'input-error' : ''} ${props.className}`}
        />
        {errorName && <p className="text-sm text-red-500">{errorName}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
