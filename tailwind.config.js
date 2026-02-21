/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#09090B',
        card: '#18181B',
        primary: '#CBFB5E', // Volt Green
      },
    },
  },
  plugins: [],
}
