import * as React from 'react';
import MaskedInput, { type Mask } from 'react-text-mask';

import { cn } from 'utils/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, value, error, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          error && '!border-red-500',
          'flex h-12 w-full border border-gold bg-transparent px-4 py-1 transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gold/60 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/20 disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        ref={ref}
        defaultValue=""
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';

const InputMask = React.forwardRef<HTMLInputElement, InputProps & { mask: Mask }>(
  ({ mask, error, ...props }, ref) => {
    return (
      <MaskedInput
        mask={mask}
        ref={ref as (instance: MaskedInput | null) => void}
        {...props}
        render={(innerRef, inputProps) => (
          <Input
            ref={innerRef as (instance: HTMLInputElement | null) => void}
            error={error}
            {...inputProps}
          />
        )}
      />
    );
  },
);
InputMask.displayName = 'InputMask';

export { Input, InputMask };
