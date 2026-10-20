/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        midnight: '#101827',
        charcoal: '#171C26',
        offwhite: '#F7F7F2',
        emerald: { DEFAULT: '#62B69A', deep: '#3f8c73', soft: '#dcefe8' },
        grey: { cool: '#A8B0BC' },
      },
      fontFamily: {
        sans: ['"Manrope Variable"', 'Manrope', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(16,24,39,0.04), 0 12px 32px -16px rgba(16,24,39,0.18)',
        lift: '0 2px 4px rgba(16,24,39,0.05), 0 28px 56px -24px rgba(16,24,39,0.30)',
        dark: '0 30px 80px -30px rgba(0,0,0,0.65)',
      },
      maxWidth: { page: '76rem' },
    },
  },
  plugins: [],
}
