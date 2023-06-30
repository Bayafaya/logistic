/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'primary':'#304FFE',
        'secondary':'#99A2AD',
       
      }
    },
  },
  plugins: [],
}

