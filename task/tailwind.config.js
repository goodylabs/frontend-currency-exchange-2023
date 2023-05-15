/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors:{
        'back' : '#1c2b55',
        'yellow': '#ffdd85'
      },
      maxHeight: {
        '128': '34rem',
      }
      
    },
  },
  plugins: [],
}