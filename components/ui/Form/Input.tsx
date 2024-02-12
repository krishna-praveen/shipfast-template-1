import { forwardRef, InputHTMLAttributes, ChangeEvent, useEffect, ReactNode } from 'react';
import { FieldError } from 'react-hook-form'
import { twMerge } from 'tailwind-merge';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  errors?: FieldError;
  onlyMessage?: boolean;
  labelBottom?: boolean;
  label?: string;
  name: string;
  classNameLabel?: string;
  classNameIcon?: string;
  classNameContainer?: string;
  onClickContainer?: () => void;
  icon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, classNameContainer, radioGroup, name, classNameLabel, classNameIcon, className, onlyMessage, disabled, labelBottom, errors, onClickContainer, readOnly, icon, ...rest }: InputProps, ref) => {



    return (
      <div className={twMerge('flex flex-col', classNameContainer)} onClick={onClickContainer}>
        {
          icon && <div className={twMerge('', classNameIcon)}>{icon}</div>
        }
        {!labelBottom &&
          <label htmlFor={name} className={twMerge('text-shadesOfGray-950 text-sm', classNameLabel)}>
            {label}
          </label>
        }
        <input
          name={radioGroup ? radioGroup : name}
          id={name}
          ref={ref}
          disabled={disabled}
          className={twMerge('border p-2 rounded-md focus:outline-none', className, readOnly || disabled ? 'text-shadesOfGray-900 cursor-pointer select-none' : 'text-black')}
          {...rest}
        />
        {labelBottom &&
          <label htmlFor={name} className={twMerge('text-shadesOfGray-950 text-sm', classNameLabel)}>
            {label}
          </label>
        }
        {!!errors && (<span className={`${!onlyMessage ? 'text-red-500 ' : 'text-highlight-green-1000'} text-xs`}>{errors.message}</span>)}
      </div>
    );
  }
);

Input.displayName = "Input"
