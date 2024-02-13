import * as React from "react"

import { cn } from "@/libs/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  errorName?: string;
  name: string;
  label?: string;
  classNameLabel?: string;
  classNameContainer?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ errorName, className, type, name, label, classNameLabel, classNameContainer, ...props }, ref) => {
    return (
      <div className={classNameContainer}>
        {label &&
          <label htmlFor={name} className={classNameLabel}>
            {label}
          </label>
        }
        <input
          type={type}
          id={name}
          className={cn(
            `flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 ${errorName ? 'input-error' : ''}`,
            className
          )}
          ref={ref}
          {...props}
        />
        {errorName && <p className="text-sm text-red-500">{errorName}</p>}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
