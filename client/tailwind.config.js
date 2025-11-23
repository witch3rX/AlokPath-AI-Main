module.exports = {

  content: [

    "./src/**/*.{js,jsx,ts,tsx}",

  ],

  // We will force dark mode to be on

  darkMode: 'class', 

  theme: {

    extend: {

      colors: {

        'primary-bg': '#0a092d', // Deep indigo/black

        'secondary-bg': '#1b1a4a', // Lighter indigo for cards

        'glass': 'rgba(255, 255, 255, 0.05)', // For the glass effect

        'accent': '#00f5c3',     // A vibrant neon cyan/green

        'accent-hover': '#00cba3',

        'text-primary': '#ffffff',

        'text-secondary': '#a0aec0', // Lighter gray for descriptions

        'border-color': 'rgba(255, 255, 255, 0.1)',

      },

      backdropBlur: {

        'lg': '20px',

      }

    },

  },

  plugins: [],

}