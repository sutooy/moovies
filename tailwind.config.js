/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      colors: {
        "white-trans": 'rgba(255, 255, 255, 0.05)',
        "dark-trans": 'rgba(0, 0, 0, 0.5)',
        "red-brown": 'rgba(231, 76, 60, 1)',

      }
    },
  },
  plugins: [],
}

