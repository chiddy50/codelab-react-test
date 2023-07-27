/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx,html,css}"],
    theme: {
      extend: {
        screens: {
          xxs: '220px',
          xs: '480px',
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          xxl: '1536px',
        },
        colors: {
          'light-yellow': '#FFFBF7',
          'custom-red': '#EF2C5A'
        },
      },
    },
    plugins: [],
}
  