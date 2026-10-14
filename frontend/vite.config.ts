import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // CSS küçültücü --no: 2416501019 sayısını 2416500000'e yuvarlıyor,
    // mod(--no, 360) yanlış renk veriyor. Bu yüzden CSS küçültülmüyor.
    cssMinify: false,
  },
})
