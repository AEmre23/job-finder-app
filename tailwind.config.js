/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ["'League Spartan'", "sans-serif"],
    },
    screens: {
      'sm': {'max':'968px'},
      'xl': {'max':'1680px'},
    },
    extend: {
      colors: {
      'primary': 'hsl(180, 29%, 50%)',
      'secondary': 'hsl(180, 8%, 52%)',
      'darkSecondary': 'hsl(180, 14%, 20%)',
      'background': 'hsl(180, 52%, 96%)',
      'tablet': 'hsl(180, 31%, 95%)',
      'extra': '#5BA4A4',
      'headerbg':'#84BBBB'
      },
      backgroundImage: {
        'desktop': "url('/src/images/bg-header-desktop.svg')",
        'mobile':"url('/src/images/bg-header-mobile.svg')",
      }
    },
  },
  plugins: [],
};
