import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Fresh Green - Main brand color
        primary: {
          DEFAULT: '#10B981', // Fresh, modern green
          dark: '#059669',
          light: '#34D399',
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
          800: '#065F46',
          900: '#064E3B',
        },
        // Soft Blue - Supporting color
        blue: {
          DEFAULT: '#3B82F6',
          dark: '#2563EB',
          light: '#60A5FA',
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
        },
        // Warm Yellow - Accent color
        secondary: {
          DEFAULT: '#FBBF24',
          dark: '#F59E0B',
          light: '#FCD34D',
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
        // Purple - Additional accent
        purple: {
          DEFAULT: '#8B5CF6',
          dark: '#7C3AED',
          light: '#A78BFA',
          50: '#FAF5FF',
          100: '#F3E8FF',
          200: '#E9D5FF',
          300: '#D8B4FE',
          400: '#C084FC',
          500: '#A855F7',
          600: '#9333EA',
          700: '#7E22CE',
          800: '#6B21A8',
          900: '#581C87',
        },
        // Coral - Warm accent
        coral: {
          DEFAULT: '#FF6B6B',
          dark: '#EE5A52',
          light: '#FF8787',
          50: '#FFF5F5',
          100: '#FFE3E3',
          200: '#FFC9C9',
          300: '#FFA8A8',
          400: '#FF8787',
          500: '#FF6B6B',
          600: '#FA5252',
          700: '#F03E3E',
          800: '#E03131',
          900: '#C92A2A',
        },
        // Light Orange
        orange: {
          DEFAULT: '#FB923C',
          dark: '#F97316',
          light: '#FDBA74',
          50: '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#F97316',
          600: '#EA580C',
          700: '#C2410C',
          800: '#9A3412',
          900: '#7C2D12',
        },
        // Background colors
        background: {
          DEFAULT: '#FAFBFC',
          dark: '#F3F4F6',
          light: '#FFFFFF',
          cream: '#FFFEF9',
        },
        // Text colors
        text: {
          DEFAULT: '#1F2937',
          light: '#6B7280',
          lighter: '#9CA3AF',
          dark: '#111827',
        },
        // Success
        success: {
          DEFAULT: '#10B981',
          dark: '#059669',
          light: '#34D399',
          50: '#ECFDF5',
          100: '#D1FAE5',
        },
        // Error
        error: {
          DEFAULT: '#EF4444',
          dark: '#DC2626',
          light: '#F87171',
          50: '#FEF2F2',
          100: '#FEE2E2',
        },
        // Info
        info: {
          DEFAULT: '#3B82F6',
          dark: '#2563EB',
          light: '#60A5FA',
          50: '#EFF6FF',
          100: '#DBEAFE',
        },
      },
      fontFamily: {
        sans: ['DM Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['DM Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      animation: {
        'bounce-in': 'bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'bounce-gentle': 'bounceGentle 2s ease-in-out infinite',
        'fade-in': 'fadeIn 0.4s ease-out',
        'fade-in-up': 'fadeInUp 0.5s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-down': 'slideDown 0.4s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'wiggle': 'wiggle 0.5s ease-in-out',
        'confetti': 'confetti 1.5s ease-out forwards',
        'shimmer': 'shimmer 2s linear infinite',
        'float': 'float 3s ease-in-out infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-gentle': 'pulseGentle 2s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'spin-slow': 'spin 3s linear infinite',
        'gradient-shift': 'gradientShift 3s ease infinite',
      },
      keyframes: {
        bounceIn: {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-10deg)' },
          '75%': { transform: 'rotate(10deg)' },
        },
        confetti: {
          '0%': { transform: 'translateY(0) rotate(0deg) scale(1)', opacity: '1' },
          '100%': { transform: 'translateY(-100vh) rotate(720deg) scale(0)', opacity: '0' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGentle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(0.98)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(16, 185, 129, 0.4)' },
          '100%': { boxShadow: '0 0 30px rgba(16, 185, 129, 0.8), 0 0 40px rgba(251, 191, 36, 0.6)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'soft': '0 2px 8px 0 rgba(0, 0, 0, 0.08)',
        'soft-lg': '0 4px 16px 0 rgba(0, 0, 0, 0.1)',
        'soft-xl': '0 8px 24px 0 rgba(0, 0, 0, 0.12)',
        'soft-2xl': '0 16px 48px 0 rgba(0, 0, 0, 0.15)',
        'inner-soft': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        'glow-sm': '0 0 10px rgba(16, 185, 129, 0.5)',
        'glow-md': '0 0 20px rgba(16, 185, 129, 0.6)',
        'glow-lg': '0 0 30px rgba(16, 185, 129, 0.7)',
        'glow-yellow': '0 0 20px rgba(251, 191, 36, 0.6)',
        'glow-blue': '0 0 20px rgba(59, 130, 246, 0.6)',
        'glow-purple': '0 0 20px rgba(139, 92, 246, 0.6)',
        'premium': '0 2px 4px rgba(0, 0, 0, 0.04), 0 8px 16px rgba(0, 0, 0, 0.08)',
        'premium-lg': '0 4px 8px rgba(0, 0, 0, 0.04), 0 12px 24px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.02)',
      },
    },
  },
  plugins: [],
}
export default config
