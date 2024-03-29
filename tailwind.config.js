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
        'custom-color-999': '#999999',
        'custom-primary': '#5448B2',
        'custom-dark-222': '#222222',
        'custom-light': '#fff'
      }
    },
  },
  plugins: [],
}