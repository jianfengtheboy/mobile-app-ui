const path = require('path')
const fs = require('fs')

module.exports = () => {
	const vantDir = path.join('./node_modules', 'vant')
	const designWidth = fs.existsSync(vantDir) ? 375 : 750
	const designHeight = fs.existsSync(vantDir) ? 667 : 1334

	return {
		plugins: {
			'postcss-px-to-viewport-8-plugin': {
				unitToConvert: 'px',
				// 视窗的宽度,对应设计稿的宽度
				viewportWidth: designWidth,
				// 视窗的高度
				viewportHeigth: designHeight,
				// 指定'px'转换为视窗单位值的小数位数
				unitPrecision: 5,
				// 指定需要转换成的视窗单位,建议使用vw
				viewportUnit: 'vw',
				// 指定不需要转换的类
				selectorBlackList: [],
				// 最小转换值
				minPixelValue: 1,
				// 允许在媒体查询中转换为‘px’,使用媒体查询，再对一些东西进行配置
				mediaQuery: false,
				// 不需要转化的组件文件名正则，必须是正则表达式
				exclude: [],
			},
		},
	}
}
