import { ReactNode } from 'react';
import { clsx } from 'clsx';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'gradient' | 'purple' | 'coral';
  className?: string;
  glow?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function Badge({ 
  children, 
  variant = 'default', 
  className,
  glow = false,
  size = 'md'
}: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full font-bold transition-all duration-300 hover:scale-105',
        {
          'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 shadow-soft': variant === 'default',
          'bg-gradient-to-r from-success-100 to-success-200 text-success-dark shadow-soft': variant === 'success',
          'bg-gradient-to-r from-secondary-100 to-secondary-200 text-secondary-900 shadow-soft': variant === 'warning',
          'bg-gradient-to-r from-error-100 to-error-200 text-error-dark shadow-soft': variant === 'error',
          'bg-gradient-to-r from-info-100 to-info-200 text-info-dark shadow-soft': variant === 'info',
          'bg-gradient-to-r from-purple-100 to-purple-200 text-purple-dark shadow-soft': variant === 'purple',
          'bg-gradient-to-r from-coral-100 to-coral-200 text-coral-dark shadow-soft': variant === 'coral',
          'bg-gradient-to-r from-primary via-blue to-purple text-white shadow-soft-lg': variant === 'gradient',
          'px-2 py-1 text-xs': size === 'sm',
          'px-3 py-1.5 text-sm': size === 'md',
          'px-4 py-2 text-base': size === 'lg',
        },
        glow && 'shadow-glow-sm animate-pulse-gentle',
        className
      )}
    >
      {children}
    </span>
  );
}
