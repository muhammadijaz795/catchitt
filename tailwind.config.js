/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-gray-100': '#EEEDF7',
        'custom-gray-200': '#BABABA',
        'custom-gray-300': '#f2f1fa',
        'custom-gray-400': '#EAEAEA',
        'custom-color-999': '#999999',
        'custom-primary': '#5448B2',
        'custom-dark-222': '#222222',
        'custom-color-000': '#000000',
        'custom-light': '#fff'
      }
    },
  },
  plugins: [],
}