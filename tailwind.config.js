/* eslint-disable no-undef */
const formKitTailwind = require("@formkit/themes/tailwindcss");
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      outfit: ["OUTFIT", "cursive"],
    },
    extend: {
      backgroundImage: {
        "login-bg": "url('/img/altara_bg.svg')",
      },
      colors: {
        "altara-bg": "#F7F7FF",
        "altara-blue": "#074A74",
        "sidebar-bg": "#F7F7FF",
        "table-text": "#0D172A",
        "smoke-darkest": "rgba(0, 0, 0, 0.9)",
        "altara-blue-solar": "rgba(7, 74, 116, 0.1)",
        "altara-blue-solar-border": "rgba(7, 74, 116, 0.19)",
        "smoke-darker": "rgba(0, 0, 0, 0.75)",
        "smoke-dark": "rgba(0, 0, 0, 0.6)",
        smoke: "rgba(0, 0, 0, 0.5)",
        "smoke-light": "rgba(0, 0, 0, 0.4)",
        "smoke-lighter": "rgba(0, 0, 0, 0.25)",
        "smoke-lightest": "rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [formKitTailwind],
};
