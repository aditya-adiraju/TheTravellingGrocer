/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./client/**/*.{html,js,." +
  "ts}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}

