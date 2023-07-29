/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "primary-dark": "#081920",
        "neuclide-green": "#3CDF86",
        "neuclide-red": "#DF3C3C",
        "neuclide-present": "#00FF00",
        "neuclide-absent": "#FF0000",
      },
      height: {
        "25": "6.25rem",
        "30": "7.5rem",
      },
      width: {
        "30": "7.5rem",
      },
    },
  },
  plugins: [],
};
