/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      colors: {
        "white-trans": 'rgba(255, 255, 255, 0.05)',
        "dark-trans": 'rgba(0, 0, 0, 0.5)',
        "red-brown": 'rgba(231, 76, 60, 1)',
        red: `rgba(255, 0, 0, 1)`,
        gray: "rgba(146, 146, 146, 1)",
        "green-light": "rgba(169, 255, 198, 1)",
        "green-dark": "rgba(21, 81, 41, 1)"

      }
    },
  },
  plugins: [],
}

