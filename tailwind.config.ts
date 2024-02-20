import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';

const pxToRem = (px: number, base = 16) => `${px / base}rem`;
const range = (start: number, end: number) => {
  return Array.from({ length: end - start + 1 }, (_, index) => index + start);
};

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--pretendard)', ...fontFamily.sans],
      },
      spacing: {
        ...range(1, 600).reduce(
          (accumulate, px) => {
            accumulate[`${px}pxr`] = pxToRem(px);
            return accumulate;
          },
          {} as Record<string, string>,
        ),
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        'layer-1': 'hsl(var(--layer1))',
        'layer-2': 'hsl(var(--layer2))',
        'layer-3': 'hsl(var(--layer3))',
        'layer-4': 'hsl(var(--layer4))',
        'layer-5': 'hsl(var(--layer5))',
        'layer-6': 'hsl(var(--layer6))',
        'layer-7': 'hsl(var(--layer7))',
        'layer-8': 'hsl(var(--layer8))',
        'layer-9': 'hsl(var(--layer9))',
        'layer-10': 'hsl(var(--layer10))',

        'main-1': '#58C694',
        'main-2': '#85D5B1',
        'main-3': '#A4E0C5',
        'main-4': '#C2EAD8',
        'main-5': '#F0FAF5',
        hover: '#39A776',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          'scrollbar-width': 'none',
          '-ms-overflow-style': 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
      });
    }),
  ],
} satisfies Config;

export default config;
