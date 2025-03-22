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
        highlight: "#efc55f",
        highlightHover: "#f5c145",
        accent: "#317879",
      },
    },
  },
  plugins: [],
};

