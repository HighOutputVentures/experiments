const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontWeight: {
        light: 300,
        normal: 400,
        bold: 700,
        black: 900,
      },
      fontFamily: {
        sans: ["'Inter'", ...defaultTheme.fontFamily.sans],
        secondary: ["'Cardo'", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    require("prettier-plugin-tailwindcss"),
  ],
};
