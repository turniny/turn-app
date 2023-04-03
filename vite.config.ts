import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import eslintPlugin from 'vite-plugin-eslint'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 根据当前工作目录中的 `mode` 加载 .env 文件
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      vue(),
      vueJsx(),
      // 增加下面的配置项,这样在运行时就能检查eslint规范
      eslintPlugin({
        include: ['src/**/*.js', 'src/**/*.vue', 'src/*.js', 'src/*.vue']
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    // 静态资源服务文件夹
    // publicDir: env.NODE_ENV === 'production' ? '/' : '../',
    // 配置：开发服务器选项
    server: {
      // 端口
      port: 5176,
      open: true,
      // 代理
      proxy: {
        '/api': {
          target: env.VITE_APP_BASE_API,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
        // 代理 websockets 或 socket.io 写法：ws://localhost:5173/socket.io -> ws://localhost:5174/socket.io
        '/socket.io': {
          target: 'ws://localhost:5174',
          ws: true,
        },
      },
    },
    build: {
      // 构建生成文件时的目录名称
      outDir: 'dist',
      // 放置生成的静态资源的目录名称,默认assets
      assetsDir: 'static',
      // 为 CSS 的压缩设置一个不同的浏览器 target
      // cssTarget: 'chrome61',
      // 使用esbuild压缩最小化css
      cssMinify: true,
      // 构建是否生成sourcemap文件 boolean | 'inline' | 'hidden'
      sourcemap: false,
    }
  }
})
