import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 开发环境用根路径，生产（gh-pages）用仓库子路径
export default defineConfig(({ mode }) => {
  const isProd = mode === 'production'
  return {
    plugins: [react()],
    base: isProd ? '/a2ui-t/' : '/',
  }
})

