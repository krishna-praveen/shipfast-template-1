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
  useSubData?: boolean;
  placeholder?: string;
  noResultText?: string;
}

export const ComboBoxInput: FC<ComboBoxInputProps> = ({ data, placeholder = 'select', noResultText = 'Sem resultados', subData = [], name, useSubData, classNameContainer, classNameContent, label }) => {
  const [open, setOpen] = React.useState(false)
  const allData = [...data, ...subData];

  const { control } = useFormContext();

  return (
    <div className={twMerge("w-full flex flex-col", classNameContainer)}>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <div className={twMerge("w-full flex flex-col", classNameContent)}  >
                {label && <span>{label}</span>}
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="justify-between"
                >
                  {value
                    ? allData.find((item) => item.value === value)?.label
                    : placeholder}
                  <CaretSortIcon className="ml-2 size-4 shrink-0 opacity-50" />
                </Button>
              </div>
            </PopoverTrigger>
            <PopoverContent className="p-0">
              <Command>
                <CommandInput placeholder={placeholder} className="h-9" />
                <CommandEmpty>{noResultText}</CommandEmpty>
                <CommandGroup>

                  {useSubData && subData.map((item) => (
                    <CommandItem
                      key={item.value}
                      value={item.value}
                      onSelect={(currentValue) => {
                        const valueToSet = (currentValue === value ? "" : currentValue);
                        onChange(valueToSet)
                        setOpen(false)
                      }}
                    >
                      {item.label}
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          value === item.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}

                  {useSubData && <div className='my-2 border-b' />}

                  {data.map((item) => (
                    <CommandItem
                      key={item.value}
                      value={item.value}
                      onSelect={(currentValue) => {
                        const valueToSet = (currentValue === value ? "" : currentValue);
                        onChange(valueToSet)
                        setOpen(false)
                      }}
                    >
                      {item.label}
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          value === item.value ? "opacity-100" : "opacity-0"
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
