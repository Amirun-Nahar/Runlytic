/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'playfair': ['"Playfair Display"', 'serif'],
      },
      colors: {
        'marathon': {
          'primary': '#AF3E3E',    // Deep red
          'secondary': '#CD5656',   // Medium red
          'accent': '#DA6C6C',      // Light red
          'light': '#EAEBD0',       // Light cream
          'dark': {
            'primary': '#8B3232',    // Darker red for dark mode
            'secondary': '#A64444',   // Darker medium red for dark mode
            'accent': '#B35757',      // Darker light red for dark mode
            'bg': '#1F1F1F',         // Dark background
            'surface': '#2D2D2D',     // Dark surface color
          }
        }
      },
    },
  },
  plugins: [require('flowbite/plugin')],
  darkMode: 'class',
} 