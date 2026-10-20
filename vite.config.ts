import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react()],
    // Root-relative by default (Vercel, Netlify, custom domain). Set VITE_BASE=/repo-name/ for GitHub Pages.
    base: env.VITE_BASE || '/',
  }
})
