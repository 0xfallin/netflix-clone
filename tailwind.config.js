/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        'netflix-black': '#000000',
        'netflix-dark': '#221f1f',
        'netflix-red': '#e50914',
      },
    },
  },
  plugins: [],
}