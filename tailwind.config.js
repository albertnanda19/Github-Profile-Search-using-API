/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4070F4",
        secondary: "#5f55f4",
        darker: "#181e53",
      },
      fontFamily: {
        Poppins: "Poppins"
      }
    },
  },
  plugins: [],
}

