import axios, { AxiosRequestConfig, AxiosInstance } from 'axios'
import { AppStoreName } from '@/config/const'
import { showToast, showConfirmDialog } from 'vant'
import { useAppStore } from '@/store'

class Request {
	private baseConfig: AxiosRequestConfig = {
		baseURL: import.meta.env.VITE_BASE_API,
		headers: {},
		timeout: 60000
	}

	private instance: AxiosInstance = axios.create(this.baseConfig)

	public constructor() {
		const token = JSON.parse(localStorage.getItem(AppStoreName) as string)?.token
		if (token) {
			this.setHeader({
				Authorization: 'Bearer ' + token
			})
		} else {
			this.initInstance()
		}
	}

	private initInstance() {
		this.instance = axios.create(this.baseConfig)
		this.setReqInterceptors()
		this.setResInterceptors()
	}

	// 请求拦截器
	private setReqInterceptors = () => {
		this.instance.interceptors.request.use(
			(config: any) => {
				config.cancelToken = new axios.CancelToken(function executor() {})
				config.headers = {
					...config.headers,
					'Accept-Language': 'zh-CN,zh'
				}
				return config
			},
			err => {
				showToast('请求失败')
				return Promise.reject(err)
			}
		)
	}

	// 响应拦截器
	private setResInterceptors = () => {
		this.instance.interceptors.response.use(
			res => {
				const { code = 200, msg } = res.data
				switch (code) {
					case 200:
						return Promise.resolve(res.data)
					case 401:
						const appStore = useAppStore()
						showConfirmDialog({
							title: '系统提示',
							message: '登录状态已过期，您可以继续留在该页面，或者重新登录',
							confirmButtonText: '重新登录',
							cancelButtonText: '取消'
						})
							.then(() => {
								appStore.logout()
							})
							.catch(() => {})
						return Promise.reject(res.data)
					default:
						if (msg)
							showToast({
								message: msg || '响应失败',
								wordBreak: 'break-word'
							})
						return Promise.reject(res.data)
				}
			},
			err => {
				showToast({
					message: `${err}` || '响应失败',
					wordBreak: 'break-word'
				})
				return Promise.reject(err)
			}
		)
	}

	// 设置请求头
	public setHeader = (headers: any) => {
		this.baseConfig.headers = { ...this.baseConfig.headers, ...headers }
		this.initInstance()
	}

	// get请求
	public get = (url: string, data = {}, config: AxiosRequestConfig<any> = {}): Promise<any> =>
		this.instance({ url, method: 'get', params: data, ...config })

	// post请求
	public post = (url: string, data = {}, config: AxiosRequestConfig<any> = {}): Promise<any> =>
		this.instance({ url, method: 'post', data, ...config })

	// put请求
	public put = (url: string, data = {}, config: AxiosRequestConfig<any> = {}): Promise<any> =>
		this.instance({ url, method: 'put', data, ...config })

	// delete请求
	public delete = (url: string, data = {}, config: AxiosRequestConfig<any> = {}): Promise<any> =>
		this.instance({ url, method: 'delete', params: data, ...config })

	// 不经过统一的axios实例的get请求
	public postOnly = (url: string, data = {}, config: AxiosRequestConfig<any> = {}): Promise<any> =>
		axios({
			...this.baseConfig,
			url,
			method: 'post',
			data,
			...config
		})

	public postParams = (url: string, data = {}, config: AxiosRequestConfig<any> = {}): Promise<any> =>
		this.instance({ url, method: 'post', params: data, ...config })

	// 不经过统一的axios实例的post请求
	public getOnly = (url: string, data = {}, config: AxiosRequestConfig<any> = {}): Promise<any> =>
		axios({
			...this.baseConfig,
			url,
			method: 'get',
			params: data,
			...config
		})

	// delete请求
	public deleteBody = (url: string, data = {}, config: AxiosRequestConfig<any> = {}): Promise<any> =>
		this.instance({ url, method: 'delete', data, ...config })

	public deleteParam = (url: string, data = {}, config: AxiosRequestConfig<any> = {}): Promise<any> =>
		this.instance({ url, method: 'delete', params: data, ...config })
}

export default new Request()
