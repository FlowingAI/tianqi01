/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Weather theme gradients
        sunny: {
          from: '#FFB347',
          to: '#FFCC33',
        },
        rainy: {
          from: '#4A90E2',
          to: '#7B68EE',
        },
        snowy: {
          from: '#E8E8E8',
          to: '#B0C4DE',
        },
        windy: {
          from: '#87CEEB',
          to: '#98D8C8',
        },
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"SF Pro Text"', '"Helvetica Neue"', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 8px 32px rgba(0, 0, 0, 0.1)',
        'card': '0 2px 8px rgba(0, 0, 0, 0.08)',
      },
      borderRadius: {
        'card': '20px',
        'element': '12px',
        'pill': '9999px',
      },
      backdropBlur: {
        'glass': '20px',
      },
    },
  },
  plugins: [],
}
