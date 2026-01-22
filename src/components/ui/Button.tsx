import { ButtonHTMLAttributes, ReactNode } from 'react';
import { clsx } from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gradient' | 'success' | 'purple';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  rounded?: 'normal' | 'full';
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  rounded = 'normal',
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        'font-bold transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group shadow-soft hover:shadow-soft-lg',
        {
          // Primary - Fresh Green
          'bg-gradient-to-br from-primary via-primary-500 to-primary-600 text-white hover:shadow-glow-md hover:scale-[1.02] hover:-translate-y-0.5':
            variant === 'primary',
          // Secondary - Warm Yellow
          'bg-gradient-to-br from-secondary via-secondary-400 to-secondary-500 text-gray-900 hover:shadow-glow-yellow hover:scale-[1.02] hover:-translate-y-0.5':
            variant === 'secondary',
          // Success - Green emphasis
          'bg-gradient-to-br from-success via-success-500 to-success-600 text-white hover:shadow-glow-md hover:scale-[1.02] hover:-translate-y-0.5':
            variant === 'success',
          // Purple - Fun accent
          'bg-gradient-to-br from-purple via-purple-500 to-purple-600 text-white hover:shadow-glow-purple hover:scale-[1.02] hover:-translate-y-0.5':
            variant === 'purple',
          // Outline
          'border-2 border-primary text-primary hover:bg-primary hover:text-white bg-white hover:scale-[1.02]':
            variant === 'outline',
          // Ghost
          'text-primary hover:bg-primary/10 rounded-2xl': 
            variant === 'ghost',
          // Gradient - Playful multicolor
          'bg-gradient-to-r from-primary via-purple to-blue text-white hover:shadow-soft-xl hover:scale-[1.02] hover:-translate-y-0.5 bg-[length:200%_100%] hover:bg-right':
            variant === 'gradient',
          'px-3 py-2 text-sm': size === 'sm',
          'px-6 py-3 text-base': size === 'md',
          'px-8 py-4 text-lg': size === 'lg',
          'px-10 py-5 text-xl': size === 'xl',
          'rounded-2xl': rounded === 'normal',
          'rounded-full': rounded === 'full',
        },
        className
      )}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
      {(variant === 'primary' || variant === 'gradient') && (
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
      )}
    </button>
  );
}
