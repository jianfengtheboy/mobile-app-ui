// 获取url参数
export function getQueryVariable(variable) {
	var query = window.location.search.substring(1)

	var vars = query.split('&')
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split('=')
		if (pair[0] == variable) {
			return pair[1]
		}
	}
	return false
}

export function fetchHashVariable(variable) {
	const query = window.location.hash.substring(1)
	const vars = query.split('&')
	for (let i = 0; i < vars.length; i++) {
		const pair = vars[i].split('=')

		const finalPair =
			pair[0].indexOf('?') !== -1 ? pair[0].substring(pair[0].lastIndexOf('?') + 1, pair[0].length) : pair[0]
		if (finalPair == variable) {
			return pair[1]
		}
	}
	return false
}

export function checkUrlEndsWith(url, suffix) {
	return url.endsWith(suffix)
}

export function isMobile() {
	const browser = {
		versions: (function () {
			const u = navigator.userAgent
			const app = navigator.appVersion
			return {
				trident: u.indexOf('Trident') > -1, //IE内核
				presto: u.indexOf('Presto') > -1, //opera内核
				webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
				gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
				mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
				ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
				android: u.indexOf('Android') > -1, //android终端或者uc浏览器 || u.indexOf('Linux') > -1
				iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
				iPad: u.indexOf('iPad') > -1, //是否iPad
				webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
			}
		})()
	}
	return browser.versions.mobile && (browser.versions.android || browser.versions.ios)
}
