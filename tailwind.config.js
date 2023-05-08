/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#488484',
        secondary: '#F1F4F8',
        buttonColor: '#023047',
        errorColor: '#7F0303'
      }
    }
  },
  plugins: []
}
