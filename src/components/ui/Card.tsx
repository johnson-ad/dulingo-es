import { ReactNode } from 'react';
import { clsx } from 'clsx';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
  variant?: 'default' | 'glass' | 'gradient' | 'elevated' | 'colorful' | 'bordered';
}

export function Card({ 
  children, 
  className, 
  onClick, 
  hover = true,
  variant = 'default' 
}: CardProps) {
  return (
    <div
      className={clsx(
        'rounded-3xl p-6 transition-all duration-300',
        {
          'bg-white shadow-soft': variant === 'default',
          'bg-white/70 backdrop-blur-xl shadow-soft-lg border border-white/40': variant === 'glass',
          'bg-gradient-to-br from-white via-primary-50/20 to-blue-50/20 shadow-soft-lg': variant === 'gradient',
          'bg-white shadow-premium': variant === 'elevated',
          'bg-gradient-to-br from-primary-50 via-purple-50 to-blue-50 shadow-soft-lg border border-primary-100/50': variant === 'colorful',
          'bg-white border-2 border-gray-200 shadow-soft': variant === 'bordered',
        },
        hover && 'hover:shadow-premium-lg hover:-translate-y-1.5 hover:scale-[1.02]',
        onClick && 'cursor-pointer active:scale-[0.98]',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
