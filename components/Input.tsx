"use client"

import React from 'react';

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  errorName?: string;
}

export const Input: React.FC<CustomInputProps> = ({ errorName, ...props }) => {
  return (
    <div>
      <input
        {...props}
        className={`input input-bordered w-full placeholder:opacity-60 ${errorName ? 'input-error' : ''} ${props.className}`}
      />
      {errorName && <p className="text-red-500 text-sm">{errorName}</p>}
    </div>
  );
};
