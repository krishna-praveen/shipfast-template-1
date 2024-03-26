import * as React from "react"

import { cn } from "@/libs/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  classNameLabel?: string;
  classNameContainer?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, name, label, classNameLabel, classNameContainer, ...props }, ref) => {
    return (
      <div className={classNameContainer}>
        {label && <label htmlFor={name} className={classNameLabel}>{label}</label>}
        <textarea
          id={name}
          name={name}
          className={cn(
            "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
