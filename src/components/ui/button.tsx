import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from 'utils/cn';

const buttonVariants = cva(
  'inline-flex items-center text-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        light:
          'border border-white text-white bg-transparent shadow-sm hover:bg-white hover:text-gold',
        fill: 'text-white bg-gold hover:bg-gold/80',
        default:
          'border border-blue text-blue bg-transparent shadow-sm hover:bg-blue hover:text-gold',
        gold: 'border border-gold text-gold bg-transparent shadow-sm hover:bg-gold hover:text-white',
        link: 'text-blue underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-auto px-4 py-2',
        sm: 'h-auto px-3 text-xs',
        lg: 'h-auto px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
