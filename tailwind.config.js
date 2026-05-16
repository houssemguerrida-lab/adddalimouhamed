/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        zen: {
          50: '#f0f7f0',
          100: '#dcefdc',
          200: '#bce0bc',
          300: '#8ec98e',
          400: '#5eab5e',
          500: '#3d8e3d',
          600: '#2d722d',
          700: '#255b25',
          800: '#204920',
          900: '#1b3c1b',
          950: '#0d210d',
        },
        beige: {
          50: '#faf8f5',
          100: '#f5efe6',
          200: '#eaddcc',
          300: '#dcc3a5',
          400: '#cba47c',
          500: '#bf8a5c',
          600: '#b17850',
          700: '#936242',
          800: '#78503a',
          900: '#624331',
          950: '#352118',
        },
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}