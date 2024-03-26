import { ForwardRefRenderFunction, forwardRef } from 'react';
import { PatternFormat, PatternFormatProps } from 'react-number-format'

import { Input } from '../Input';

interface MaskedInputProps extends PatternFormatProps { }

const MaskedInputBase: ForwardRefRenderFunction<HTMLInputElement, MaskedInputProps> = ({ placeholder, format, ...props }, ref) => {
  return (
    <PatternFormat
      getInputRef={ref}
      format={format}
      customInput={Input}
      placeholder={placeholder || ''}
      {...props}
    />
  );
}

export const MaskedInput = forwardRef(MaskedInputBase)
