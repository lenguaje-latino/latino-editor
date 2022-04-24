const colors = require('tailwindcss/colors');

module.exports = {
  darkMode: 'class',

  theme: {
    extend: {
      colors: {
        primary: colors.indigo,
        app: {
          800: '#1c2333',
          900: '#0e1525',
        },
      },

      maxWidth: {
        '1/3': '33%',
      },
    },
  },

  plugins: [],

  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
};
