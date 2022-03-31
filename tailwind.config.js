const colors = require('tailwindcss/colors');

module.exports = {
  theme: {
    extend: {
      colors: {
        primary: colors.indigo,
      },

      maxWidth: {
        '1/3': '33%',
      },
    },
  },
  plugins: [],
  purge: {
    content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  },
};
