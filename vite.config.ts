import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// BASE_PATH lets the same build run at a domain root (Vercel, Netlify, Cloudflare Pages)
// or under a sub-path such as https://<user>.github.io/<repo>/ (GitHub Pages).
export default defineConfig({
  base: process.env.BASE_PATH ?? '/',
  plugins: [react()],
})
