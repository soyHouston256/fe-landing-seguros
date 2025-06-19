/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'pacifico-blue': '#4A90E2',
        'pacifico-light-blue': '#6BB6FF',
        'pacifico-dark-blue': '#2C5282',
        'pacifico-pink': '#E53E8C',
        'pacifico-gray': '#F7FAFC',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
