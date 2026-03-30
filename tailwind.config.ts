import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        teal: 'rgb(var(--color-primary-rgb) / <alpha-value>)',
        'teal-light': 'rgb(var(--color-primary-light-rgb) / <alpha-value>)',
        coral: 'rgb(var(--color-accent-rgb) / <alpha-value>)',
        'coral-dark': 'rgb(var(--color-accent-dark-rgb) / <alpha-value>)',
        'coral-light': 'rgb(var(--color-accent-light-rgb) / <alpha-value>)',
        sand: 'rgb(var(--color-bg-rgb) / <alpha-value>)',
        'sand-dark': 'rgb(var(--color-bg-dark-rgb) / <alpha-value>)',
      },
      fontFamily: {
        heading: ['var(--font-syne)', 'system-ui', 'sans-serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-syne-mono)', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};

export default config;
