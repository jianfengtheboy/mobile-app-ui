module.exports = {
  plugins: {
    // 兼容浏览器，添加前缀
    autoprefixer: {
      overrideBrowserslist: [
        'Android 4.1',
        'iOS 7.1',
        'Chrome > 31',
        'ff > 31',
        'ie >= 8'
      ],
      grid: true
    },
    "postcss-import" : {},
    "postcss-url": {},
    "postcss-aspect-ratio-mini" : {},
    "postcss-write-svg" : {
      utf8 : false
    },
    "postcss-cssnext" : {
      warnForDuplicates: false
    },
    "postcss-px-to-viewport" : {
      // 视窗的宽度，对应的是我们设计稿的宽度，一般是750
      viewportWidth: 750,
      // 视窗的高度，根据750设备的宽度来指定，一般指定1334，也可以不配置
      viewportHeight: 1334,
      // // 指定`px`转换为视窗单位值的小数位数
      unitPrecision: 5,
      viewportUnit: 'vw',
      // 是一个对css选择器进行过滤的数组，比如你设置为['fs']，那例如fs-xl类名，里面有关px的样式将不被转换，这里也支持正则写法
      selectorBlackList: [],
      // 小于或等于`1px`不转换为视窗单位
      minPixelValue: 1,
      // 允许在媒体查询中转换`px`
      mediaQuery: false
    },
    "cssnano": {
      "cssnano-preset-advanced": {
        zindex: false,
        autoprefixer: false
      }
    },
    "postcss-viewport-units" : {
      filterRule: rule => rule.selector.indexOf('::after') === -1 && 
      rule.selector.indexOf('::before') === -1 && 
      rule.selector.indexOf(':after') === -1 && 
      rule.selector.indexOf(':before') === -1
    },
    "postcss-flexbugs-fixes" : {}
  }
}
