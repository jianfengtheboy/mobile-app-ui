import { AppStoreName } from '@/config/const'
import router from '@/router'
import request from '@/request'

interface IState {
	token: string
	theme: 'light' | 'dark'
}

export const useAppStore = defineStore('app', {
	state: (): IState => ({
		token: '',
		theme: 'light'
	}),
	persist: {
		key: AppStoreName,
		storage: localStorage,
		paths: ['token', 'theme']
	},
	actions: {
		// 设置主题
		setTheme(theme: 'light' | 'dark') {
			this.theme = theme
		},
		// 设置token
		setStore(token: string) {
			this.token = token
		},
		// 注销
		async logout(isRequest = true, from = '') {
			if (isRequest) {
				await window.$apis.app.logout()
			}
			if (from) {
				router.replace({
					path: '/login',
					query: {
						from: from
					}
				})
			} else {
				router.replace('/login')
			}
			sessionStorage.clear()
			request.setHeader({
				Authorization: ''
			})
			if (!from) {
				this.$reset()
			}
		}
	}
})
