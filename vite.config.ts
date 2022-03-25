import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import styleImport from 'vite-plugin-style-import'
import viteCompression from 'vite-plugin-compression'
import { createHtmlPlugin } from 'vite-plugin-html'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { viteVConsole } from 'vite-plugin-vconsole'
import path from 'path'

const proxyDns = {
  testIp: '',
  developIp: 'http://xx.xx.xx.xx'
}
const currProxy = proxyDns.developIp

export default defineConfig({
  plugins: [
    vue(),
    // jsx支持
    vueJsx(),
    // vant组件按需引入配置
    styleImport({
      libs: [
        {
          libraryName: 'vant',
          esModule: true,
          resolveStyle: name => `vant/es/${name}/style`
        }
      ]
    }),
    // gzip打包压缩配置
    viteCompression({
      verbose: true,
      disable: false,
      deleteOriginFile: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz'
    }),
    // 处理html
    createHtmlPlugin({
      template: 'public/index.html',
      inject: {
        data: {
          title: 'vue移动端模版'
        }
      }
    }),
    // 处理svg
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/icons')],
      symbolId: 'icon-[dir]-[name]',
      customDomId: 'svg-icon'
    }),
    // vconsole配置
    viteVConsole({
      entry: path.resolve('src/main.ts'),
      localEnabled: process.env.NODE_ENV !== 'production',
      enabled: process.env.NODE_ENV !== 'production',
      config: {
        maxLogNumber: 1000,
        theme: 'light'
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/styles/index.scss";'
      }
    },
    postcss: {
      plugins: [
        require('autoprefixer')({
          overrideBrowserslist: ['Android 4.1', 'iOS 7.1', 'Chrome > 31', 'ff > 31', 'ie >= 8'],
          grid: true
        }),
        require('postcss-import')({}),
        require('postcss-url')({}),
        require('postcss-aspect-ratio-mini')({}),
        require('postcss-write-svg')({
          utf8: false
        }),
        require('postcss-px-to-viewport')({
          // 需要转换的单位，默认为"px"
          unitToConvert: 'px',
          // 视窗的宽度，对应的是我们设计稿的宽度，一般是750，
          viewportWidth: 375,
          // 指定`px`转换为视窗单位值的小数位数
          unitPrecision: 5,
          viewportUnit: 'vw',
          // 是一个对css选择器进行过滤的数组，比如你设置为['fs']，那例如fs-xl类名，里面有关px的样式将不被转换，这里也支持正则写法
          selectorBlackList: [],
          // 小于或等于`1px`不转换为视窗单位
          minPixelValue: 1,
          // 允许在媒体查询中转换`px`
          mediaQuery: false,
          // 是否直接更换属性值，而不添加备用属性
          replace: true,
          // 忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
          exclude: [],
          // 是否添加根据 landscapeWidth 生成的媒体查询条件 @media (orientation: landscape)
          landscape: false,
          // 横屏时使用的单位
          landscapeUnit: 'vw',
          // 横屏时使用的视口宽度
          landscapeWidth: 667
        }),
        require('cssnano')({
          'cssnano-preset-advanced': {
            zindex: false,
            autoprefixer: false
          }
        }),
        require('postcss-viewport-units')({
          filterRule: rule =>
            rule.selector.indexOf('::after') === -1 &&
            rule.selector.indexOf('::before') === -1 &&
            rule.selector.indexOf(':after') === -1 &&
            rule.selector.indexOf(':before') === -1
        }),
        require('postcss-flexbugs-fixes')({})
      ]
    }
  },
  base: './',
  server: {
    host: '0.0.0.0',
    port: 9192,
    https: false,
    open: false,
    proxy: {
      '/api': {
        target: `${currProxy}:8080`, // 端口应与开发环境一致
        ws: true,
        changeOrigin: true,
        rewrite: path => path.replace(/^\//, '/')
      },
      // ws代理
      '/ws': {
        target: `${currProxy}:8080`, // 端口应与开发环境一致
        ws: true
      }
    }
  },
  build: {
    outDir: 'dist/app',
    assetsDir: 'static',
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  }
})
