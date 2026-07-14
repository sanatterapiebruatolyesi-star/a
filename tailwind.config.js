/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          50: '#f6f5f1',
          100: '#e9e7df',
          200: '#d3cfc1',
          300: '#b5ad97',
          400: '#94886a',
          500: '#7a6f54',
          600: '#625841',
          700: '#4f4736',
          800: '#403a2d',
          900: '#342f25',
          950: '#1c1913',
        },
        water: {
          50: '#eff9f7',
          100: '#d6efea',
          200: '#b0e0d6',
          300: '#7fcabd',
          400: '#4fab9f',
          500: '#368e86',
          600: '#2a726d',
          700: '#245b58',
          800: '#214a48',
          900: '#1d3e3d',
          950: '#0e2423',
        },
        gold: {
          50: '#fbf7ed',
          100: '#f6ecd0',
          200: '#ecd79c',
          300: '#e1bb63',
          400: '#d9a23c',
          500: '#c8852a',
          600: '#a96622',
          700: '#864a1f',
          800: '#6f3c20',
          900: '#5e3320',
          950: '#351a0e',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'widest-2': '0.25em',
      },
    },
  },
  plugins: [],
}
