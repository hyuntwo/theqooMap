import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  define: {
    // 환경변수를 클라이언트에서 사용할 수 있도록 설정
    'process.env': {}
  }
}) 