/** @type {import('tailwindcss').Config} */
const formKitTailwind = require("@formkit/themes/tailwindcss");
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      outfit: ["OUTFIT", "cursive"],
    },
    extend: {
      backgroundImage: {
        "login-bg": "url('./src/assets/altara_bg.svg')",
      },
      colors: {
        "altara-bg": "#F7F7FF",
        "altara-blue": "#074A74",
        "sidebar-bg": "#F7F7FF",
      },
    },
  },
  plugins: [formKitTailwind],
};
