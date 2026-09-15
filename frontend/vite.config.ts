import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const BACKEND_URL = process.env.VITE_BACKEND_URL || "http://localhost:3001";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    proxy: {
      "/api": BACKEND_URL,
      "/socket.io": {
        target: BACKEND_URL,
        ws: true
      }
    }
  },
  build: {
    outDir: `./dist`
  }
})
