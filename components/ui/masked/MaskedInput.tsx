import { PatternFormat, PatternFormatProps } from 'react-number-format'

import { InputBase } from './base/InputBase';

interface MaskedInputProps extends PatternFormatProps {
  placeholder?: string;
  mask: string;
}

export const MaskedInput = ({ placeholder, mask, ...props }: MaskedInputProps) => {
  return (
    <PatternFormat
      format={mask}
      customInput={InputBase}
      placeholder={placeholder || ''}
      {...props}
    />
  );
}
