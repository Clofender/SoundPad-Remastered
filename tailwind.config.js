/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--bg-color)',
        card: 'var(--card-bg)',
        primary: 'var(--primary)',
      }
    },
  },
  plugins: [],
}