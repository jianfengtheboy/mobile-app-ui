import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import styleImport from 'vite-plugin-style-import'
import viteCompression from 'vite-plugin-compression'
import path from 'path'

const resolve = (dir: string) => path.join(__dirname, dir)

const proxyDns = {
  testIp: '',
  developIp: 'http://xxx.xxx.xxx.xxx'
}

const currProxy = proxyDns.developIp

export default defineConfig({
  plugins: [
    vue(),
    styleImport({
      libs: [{
        libraryName: 'vant',
        esModule: true,
        resolveStyle: (name) => `vant/es/${name}/style`
      }]
    }),
    viteCompression({
      verbose: true,
      disable: false,
      deleteOriginFile: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz'
    })
  ],
  resolve: {
    alias: {
      '@': resolve('src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/styles/index.scss";'
      }
    }
  },
  base: '/app/',
  server: {
    host: '0.0.0.0',
    port: 9192,
    https: false,
    open: false,
    proxy: {
      '/api': {
        target: `${currProxy}:8087`, // 端口应与开发环境一致
        ws: true,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      // ws代理
      '/ws': {
        target: `${currProxy}:8087`,
        ws: true
      }
    }
  },
  build: {
    outDir: 'dist/app',
    assetsDir: 'static',
    sourcemap: false,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  }
})
