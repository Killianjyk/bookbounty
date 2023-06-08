/** @type {import('tailwindcss').Config} */

module.exports = {
  daisyui: {
    themes: ["pastel", "cyberpunk", "dark", "cupcake", "retro"],
  },
  darkMode: 'class',
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", "./public/index.html"
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}
