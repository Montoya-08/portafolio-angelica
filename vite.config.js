import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// base './' funciona en Vercel y en GitHub Pages (repo de proyecto o usuario).
export default defineConfig({ plugins: [react()], base: './' })
