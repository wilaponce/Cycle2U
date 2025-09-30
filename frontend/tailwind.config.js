/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        cycleGreen: '#16a34a',
        cycleGray: '#f3f4f6',
      }
    },
  },
  plugins: [],
}
