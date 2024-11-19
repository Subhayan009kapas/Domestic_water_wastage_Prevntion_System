import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Listen on all addresses, including your IP
    port: 3000 // Or any other port
  },
  base: '/Domestic_Water_Prevention-System/', 
})
