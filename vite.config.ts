import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // 部署到 GitHub Pages 时需设置仓库名作为 base，避免资源 404
  base: '/a2ui-t/',
})

