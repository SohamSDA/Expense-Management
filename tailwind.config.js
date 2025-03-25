/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        animation: {
          'star-movement-bottom': 'star-move-bottom 5s linear infinite alternate',
          'star-movement-top': 'star-move-top 5s linear infinite alternate',
        },
        keyframes: {
          'star-move-bottom': {
            '0%': { transform: 'translate(0%, 0%)', opacity: '1' },
            '100%': { transform: 'translate(-100%, 0%)', opacity: '0' },
          },
          'star-move-top': {
            '0%': { transform: 'translate(0%, 0%)', opacity: '1' },
            '100%': { transform: 'translate(100%, 0%)', opacity: '0' },
          },
        },
      },
    },
    plugins: [],
  };
  