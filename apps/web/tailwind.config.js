/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f4ff',
          100: '#e0e9ff',
          200: '#c7d9fe',
          300: '#a3c2fd',
          400: '#7aa5fb',
          500: '#5b8af7',
          600: '#3d6ef2',
          700: '#2955e8',
          800: '#2345c9',
          900: '#213da6',
          950: '#162b66',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
