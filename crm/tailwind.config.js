/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      boxShadow: {
        custom: '1px 1px 5px',
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
};
