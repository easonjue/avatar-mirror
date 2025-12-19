/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    extend: {
      animation: {
        float: 'float 10s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%': { transform: 'translate(0,0)' },
          '50%': { transform: 'translate(10px,-12px)' },
          '100%': { transform: 'translate(0,0)' },
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
