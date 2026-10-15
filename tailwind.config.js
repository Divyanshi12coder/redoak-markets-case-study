/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        crimson: { DEFAULT: '#9b1c2e', light: '#c2334a', deep: '#6e0f1e' },
        wine: '#4a0e1a',
        burgundy: '#2a0a10',
        forest: { DEFAULT: '#1f5a3d', light: '#3f9468', deep: '#0b1f16' },
        ink: '#0d0b0b',
        charcoal: '#1a1717',
        bone: '#f6f2ec',
      },
      fontFamily: {
        display: ['"Fraunces Variable", "Fraunces"', 'Georgia', 'serif'],
        sans: ['"Inter Variable", "Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 60px -10px rgba(155,28,46,0.55)',
        soft: '0 20px 60px -20px rgba(0,0,0,0.5)',
      },
    },
  },
  plugins: [],
}
