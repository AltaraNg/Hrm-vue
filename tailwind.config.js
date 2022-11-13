/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    colors: {
      "altara-bg": "#F7F7FF",
      white: "#FFFFFF",
      "altara-blue": "#074A74",
      red: "#FF0000",
    },

    fontFamily: {
      outfit: ["OUTFIT", "cursive"]
    },
    extend: {
      backgroundImage: {
        "login-bg": "url('./src/assets/altara_bg.svg')",
      },
    },
  },
  plugins: [],
};
