/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  corePlugins: {
    // Desactivamos preflight para respetar la estética y tipografía Apple existente
    preflight: false,
  },
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        aikata: {
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#10b981',
          600: '#0e6b4f',
          700: '#0a4433',
          accent: '#3fcf8e',
        }
      },
      fontFamily: {
        manrope: ['Manrope', 'Inter', 'sans-serif'],
        inter: ['Inter', '-apple-system', 'sans-serif'],
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.16, 1, 0.3, 1)',
      }
    },
  },
  plugins: [],
}