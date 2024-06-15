/** @type {import('tailwindcss').Config} */
const spacingValues = Array.from({ length: 150 }, (_, i) => `${i + 1}px`).reduce((acc, val) => {
  acc[val] = val;
  return acc;
}, {});
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {...spacingValues,
        "316px": "316px",
        "218px": "218px",
      }
    },
  },
  plugins: [require('tailwindcss-primeui')]
}

