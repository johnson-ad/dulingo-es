import { clsx } from 'clsx';

interface ProgressProps {
  value: number;
  max: number;
  className?: string;
  showLabel?: boolean;
  color?: 'primary' | 'secondary' | 'success' | 'gradient' | 'purple' | 'blue';
  animated?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function Progress({
  value,
  max,
  className,
  showLabel = true,
  color = 'primary',
  animated = true,
  size = 'md',
}: ProgressProps) {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className={clsx('w-full', className)}>
      <div className={clsx(
        'relative bg-gray-200/60 rounded-full overflow-hidden shadow-inner-soft',
        {
          'h-2': size === 'sm',
          'h-3': size === 'md',
          'h-4': size === 'lg',
          'h-6': size === 'xl',
        }
      )}>
        <div
          className={clsx(
            'h-full rounded-full transition-all duration-700 ease-out relative overflow-hidden',
            {
              'bg-gradient-to-r from-primary via-primary-400 to-primary-500': color === 'primary',
              'bg-gradient-to-r from-secondary via-secondary-400 to-secondary-500': color === 'secondary',
              'bg-gradient-to-r from-success via-success-400 to-success-500': color === 'success',
              'bg-gradient-to-r from-blue via-blue-400 to-blue-500': color === 'blue',
              'bg-gradient-to-r from-purple via-purple-400 to-purple-500': color === 'purple',
              'bg-gradient-to-r from-primary via-blue to-purple': color === 'gradient',
            }
          )}
          style={{ width: `${percentage}%` }}
        >
          {animated && percentage > 0 && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
          )}
        </div>
      </div>
      {showLabel && (
        <div className="mt-2.5 flex justify-between items-center">
          <span className="text-sm font-semibold text-text-light">
            {Math.round(percentage)}% complété
          </span>
          <span className="text-sm font-bold text-text">
            {value} / {max}
          </span>
        </div>
      )}
    </div>
  );
}
