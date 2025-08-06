/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'login-bg': "url('/src/assets/images/bg.jpg')",
      },
      colors: {
        primary: "#191343",
        highlight: "#03254c",
        highlightHover: "#011f4b",
        accent: "#317879",
        karayeGreen: "#2a9df4",
        newHighlight:"#9ECAE1",
      },
    },
  },
  plugins: [],
};

//#089D6E8