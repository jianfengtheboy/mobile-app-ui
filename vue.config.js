const path = require('path')
const resolve = dir => path.join(__dirname, dir)
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']
// 生产环境、测试和正式
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)

const proxyDns = {
  testIp: '',
  developIp: 'http://xxx.xxx.xxx.xxx'
}

const currProxy = proxyDns.developIp

module.exports = {
  publicPath: '/app/',
  outputDir: 'dist/app',
  indexPath: 'index.html',
  filenameHashing: true,
  lintOnSave: !IS_PROD,
  runtimeCompiler: true,
  productionSourceMap: false,
  devServer: {
    port: 9192,
    host: '0.0.0.0',
    open: false,
    overlay: {
      warnings: true,
      errors: true
    },
    proxy: {
      '/api': {
        target: `${currProxy}:8087`, // 端口应与开发环境一致
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/': '/'
        }
      },
      // ws代理
      '/ws': {
        target: `${currProxy}:8087`,
        ws: true
      }
    }
  },
  configureWebpack: config => {
    if (IS_PROD) {
      config.plugins.push(
        new CompressionWebpackPlugin({
          algorithm: 'gzip',
          test: new RegExp(`\\.(${productionGzipExtensions.join('|')})$`),
          threshold: 10240,
          minRatio: 0.8
        })
      )
    }
    return {
      resolve: {
        alias: {
          '@': resolve('src')
        }
      }
    }
  },
  chainWebpack: config => {
    // svg loader设置
    const svgRule = config.module.rule('svg')
    // 清除已有的所有 loader。
    // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
    svgRule.uses.clear()
    svgRule
      .test(/\.svg$/)
      .include.add(path.resolve(__dirname, './src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
    const fileRule = config.module.rule('file')
    fileRule.uses.clear()
    fileRule
      .test(/\.svg$/)
      .exclude.add(path.resolve(__dirname, './src/icons'))
      .end()
      .use('file-loader')
      .loader('file-loader')
    
    config.plugin('html').tap((args) => {
      args[0].title = 'vue移动端模版'
      return args
    })

    // 打包分析
    if (IS_PROD) {
      if (process.env.npm_config_report) {
        config
          .plugin('webpack-bundle-analyzer')
          .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
          .end()
      }
    }
  }
}
