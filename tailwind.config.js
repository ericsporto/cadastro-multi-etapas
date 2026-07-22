/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#09090b',
          card: '#121217',
          border: '#27272a',
          muted: '#18181b',
        },
        purple: {
          400: '#a855f7',
          500: '#9333ea',
          600: '#7e22ce',
          700: '#6b21a8',
          glow: 'rgba(147, 51, 234, 0.15)',
        },
      },
    },
  },
  plugins: [],
};
