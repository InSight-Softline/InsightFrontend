/** @type {import('tailwindcss').Config} */
// tailwind.config.js

module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {'softline-rot': '#c4171f'}
        },
    },
    plugins: [],

}