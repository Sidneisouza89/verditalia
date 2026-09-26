export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          900: '#1E2A17',
          800: '#26331D',
          700: '#2F3F24',
          600: '#3C4F2C',
          500: '#4A6238',
        },
        cream: {
          100: '#FAF8F3',
          200: '#F3F0E7',
        },
        stone: {
          700: '#4A4A42',
        },
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        sans: ['"Work Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
