/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      screens: {
        '550px': '550px',
        xs: '480px',
      },
      colors: {
        blue: '#011F2F',
        gold: '#A69D83',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
