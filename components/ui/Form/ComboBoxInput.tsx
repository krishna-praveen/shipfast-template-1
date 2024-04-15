'use client'

import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import React, { FC } from 'react'

import { Controller, useFormContext } from 'react-hook-form'

import { twMerge } from 'tailwind-merge'

import { Button } from "@/components/ui/Button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/Command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover"

import { cn } from "@/libs/utils"
type ComboType = {
  value: string
  label: string
}

interface ComboBoxInputProps {
  data: ComboType[];
  subData?: ComboType[];
  name: string;
  label?: string;
  classNameContainer?: string;
  classNameContent?: string;
  placeholder?: string;
  noResultText?: string;
  disabled?: boolean;
}

export const ComboBoxInput: FC<ComboBoxInputProps> = ({ data, disabled, placeholder = 'select', noResultText = 'Sem resultados', subData = [], name, classNameContainer, classNameContent, label }) => {
  const [open, setOpen] = React.useState(false)
  const allData = [...data, ...subData];

  const { control, formState: { errors } } = useFormContext();
  const existsError = !!errors?.[name];

  return (
    <div className={twMerge("w-full flex flex-col", classNameContainer)}>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <Popover open={disabled ? false : open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <div className={twMerge("w-full flex flex-col", classNameContent, disabled && 'cursor-not-allowed')}  >
                {label && <span>{label}</span>}
                <Button
                  variant="outline"
                  role="combobox"
                  type='button'
                  aria-expanded={open}
                  className={twMerge("justify-between ", existsError && 'border-red-500')}
                  disabled={disabled}
                >
                  {value
                    ? allData.find((item) => item.value === value)?.label
                    : placeholder}
                  <CaretSortIcon className="ml-2 size-4 shrink-0 opacity-50" />
                </Button>
                {existsError && <span className='text-red-500'>{errors?.[name]?.message?.toString()}</span>}
              </div>
            </PopoverTrigger>
            <PopoverContent className="p-0">
              <Command>
                <CommandInput placeholder={placeholder} className="h-9" />
                <CommandEmpty>{noResultText}</CommandEmpty>
                <CommandGroup>
                  {allData.map((framework) => (
                    <CommandItem
                      key={framework.value}
                      value={framework.label}
                      onSelect={(currentValue) => {
                        const valueLabel = allData.find((item) => item.label.toLowerCase().normalize('NFC') === currentValue.normalize('NFC'))
                        const valueToSet = valueLabel.value === value ? "" : valueLabel.value

                        onChange(valueToSet)
                        setOpen(false)
                      }}
                    >
                      {framework.label}
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          value === framework.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover >
        )} />
    </div >
  )
}