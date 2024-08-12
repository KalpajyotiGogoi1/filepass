/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'ballo-tamma': ["Ballo Tamma 2","cursive" ],
      },
      colors: {
        "filepass-blue": "#4C5CEB",
      },
    },
  },

  plugins: [],
};
