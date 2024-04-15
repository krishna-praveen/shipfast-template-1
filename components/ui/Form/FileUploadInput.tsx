/* eslint-disable no-unused-vars */
import { ImagePlus, XCircle } from 'lucide-react';
import Image from 'next/image';
import React, { forwardRef, useState } from 'react'

import { Controller, useFormContext } from 'react-hook-form';

import { twMerge } from 'tailwind-merge';

import { Input } from '@/components/ui/Input';

interface FileUploadInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  classNameContainer?: string;
  classNameLabel?: string;
  className?: string;
}


const FileUploadInputBase = React.forwardRef<HTMLInputElement, FileUploadInputProps>(
  ({ className, name, placeholder, label, classNameLabel, classNameContainer }, ref) => {
    const [previewImage, setPreviewImage] = useState('');

    const { control, formState: { errors }, setError, clearErrors, resetField } = useFormContext();
    const hasError = !!errors?.[name]?.message?.toString() || '';


    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      clearErrors(name);
      const file = event.target.files?.[0];
      const allowedTypes = ['image/png', 'image/jpeg', 'image/webp'];
      if (!allowedTypes.includes(file?.type) || !file?.type) return setError(name, { type: 'custom', message: 'Apenas PNG, JPEG e WEBP são formatos permitidos' });

      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setPreviewImage(imageUrl);
      }
    }

    const handleRemoveImage = () => {
      resetField(name);
      clearErrors(name);
      setPreviewImage('');
    }

    return (
      <Controller
        control={control}
        name={name}
        render={({ field: { ref: refInput, onChange, ...ControllerProps } }) => (
          <div className={twMerge('flex flex-col items-center justify-center', className)}>
            <div className={twMerge('cursor-pointer rounded-lg border-2 border-dashed border-zinc-500 bg-zinc-700 transition-all delay-150 hover:bg-zinc-600 hover:border-solid', classNameContainer, hasError && 'border-red-500 border-solid')}>
              {!previewImage &&
                <label htmlFor={name} className='flex flex-col items-center justify-center px-6 py-7'>
                  <ImagePlus />
                  <span className={twMerge('mt-1', classNameLabel)}>{placeholder}</span>
                </label>
              }
              {previewImage &&
                <div className='flex flex-col justify-end '>
                  <div className='z-10 flex w-full justify-end  text-red-500 hover:text-red-400'>
                    <div className='m-0.5 rounded-full bg-zinc-800' onClick={() => handleRemoveImage()}>
                      <XCircle />
                    </div>
                  </div>

                  <div className='-mt-7 p-2'>
                    <Image src={previewImage} width={100} height={150} alt={label} className='rounded-lg' />
                  </div>
                </div>
              }
            </div>
            <span className='py-2 font-semibold'>{label}</span>
            <input
              id={name}
              ref={ref}
              type="file"
              className='hidden'
              accept='image/png, image/jpeg, image/webp'
              onChange={(e) => {
                handleImageChange(e);
                return onChange(e);
              }}
              {...ControllerProps} />
          </div>
        )} />
    )
  }
)

FileUploadInputBase.displayName = 'FileUploadInput'

export const FileUploadInput = FileUploadInputBase
