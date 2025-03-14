/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/templates/**/*.php",
    "./public/**/*.php",
    "./assets/js/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        secondary: '#475569',
      },
    },
  },
  plugins: [],
} 