/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  // purge: ["./src/pages/**/*.{js,jsx,ts,tsx}", './src/styles/**/*.css'],
  theme: {
    screens: {

      'sm': '400px',

      'md': '700px',
      // => @media (min-width: 960px) { ... }

      'lg': '1240px',
      // => @media (min-width: 1440px) { ... }
    },
    colors: {
      'salmon': '#ffa58f',
      'grey': '#212121',
      'grey-light': '#787777',
      'white': '#ffffff',
      'accent': '#8bdafc',
    },
    fontFamily: {
      'sans': ['Graphik', 'sans-serif'],
      'serif': ['Merriweather', 'serif'],
    },
    extend: {},
  },
  plugins: [],
};
