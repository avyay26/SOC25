/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
// tailwind.config.js
// module.exports = {
//   theme: {
//     extend: {
//       animation: {
//         'fade-in': 'fadeIn 0.6s ease-out forwards',
//       },
//       keyframes: {
//         fadeIn: {
//           '0%': { opacity: 0, transform: 'scale(0.95)' },
//           '100%': { opacity: 1, transform: 'scale(1)' },
//         },
//       },
//     },
//   },
// };
