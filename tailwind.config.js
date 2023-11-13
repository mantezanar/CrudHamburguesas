/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,ejs}"],
    theme: {
      extend: {
        colors: {
          'dark_from_bootstrap': '#772953',
          'dark_from_bootstrap_resaltado': '#b44581',
        },
      },
    },
    plugins: [
      require('@tailwindcss/forms'),
    ],
  }
  