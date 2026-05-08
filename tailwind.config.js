/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'news-red': '#c8102e',
        'news-dark': '#080c10',
        'news-panel': '#0d1117',
        'news-border': '#1c2330',
      },
    },
  },
  plugins: [],
}