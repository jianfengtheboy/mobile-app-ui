import Axios from 'axios'
import Qs from 'qs'
import appConfig from '../config'
import { Toast } from 'vant'
import { cacheUtils } from 'sun-web-utils'
import store from '../stores'
import Router from '../router'

const instance: any = Axios.create({
  timeout: 300000,
  headers: {
    'Content-Type': 'application/json'
  },
  responseType: 'json',
  withCredentials: false
})

// 是否正在刷新 token
let isRefreshing = false
// 存储待重发请求的数组
let requests = <any>[]
// 刷新token
const refreshToken = () => {
  return instance.post(
    '/api/xxxx/web/refresh/token',
    {
      fromSource: 'tenant',
      refreshToken: cacheUtils.localStorageGet('REFRESH_TOKEN')
    },
    true
  )
}

/**
 * @name: 返回数据集中处理
 */
instance.interceptors.response.use(
  function (res) {
    const { notip } = instance.prevParams.enterParams.service
    let result: any = {}
    if (res.status !== 200) {
      result = {
        success: false,
        msg: res.statusText
      }
    } else if (!res.data) {
      result = {
        success: true,
        data: res.data
      }
    } else if (parseInt(res.data.code) !== 200) {
      if ((appConfig as any).tokenErrorCodes.includes(parseInt(res.data.code))) {
        if (!notip) {
          Toast.fail(`${res.data.msg}`)
        }
        cacheUtils.localStorageRemove('TOKEN')
        cacheUtils.localStorageRemove('REFRESH_TOKEN')
        return {
          success: false,
          data: res.data
        }
      } else {
        result = {
          success: false,
          data: res.data,
          msg: res.data.msg
        }
      }
    } else {
      result = {
        success: true,
        data: res.data,
        msg: res.data.msg
      }
    }
    if (!result.success) {
      const notShowErrorTip =
        [401].includes(res.data.code) || (res.data.code === 503 && res.data.msg === '操作失败，请求超时') ? true : notip
      if (!notShowErrorTip) {
        Toast.fail(`${result.msg}`)
      }
    }
    return result
  },
  function (error) {
    const { notip } = instance.prevParams.enterParams.service
    if (error.response) {
      if (error.response.status === 403 && !error.config.url.includes('/web/refresh/token')) {
        const { config } = error
        if (!isRefreshing) {
          isRefreshing = true
          const useUserStore = store.useUserStore()
          return refreshToken()
            .then(res => {
              // 保存token
              useUserStore.saveToken(`Bearer ${res.data.data.access_token}`)
              // 保存refresh_token
              useUserStore.saveRefreshToken(res.data.data.refresh_token)
              config.headers.Authorization = `Bearer ${res.data.data.access_token}`
              requests.forEach(cb => cb(res.data.data.access_token))
              requests = []
              return instance(config)
            })
            .catch(err => {
              useUserStore.logout()
              Router.replace({
                path: '/login'
              })
              return Promise.reject(err)
            })
            .finally(() => {
              isRefreshing = false
            })
        } else {
          return new Promise(resolve => {
            requests.push((token: string) => {
              config.headers.Authorization = `Bearer ${token}`
              resolve(instance(config))
            })
          })
        }
      }
      if (error.response.status !== 200) {
        if (!notip) {
          Toast.fail(`${error.response.statusText}`)
        }
      }
      return {
        success: false,
        data: error.response.data
      }
    } else {
      if (!notip) {
        Toast.fail(`${error.message}`)
      }
      return {
        success: false,
        data: error.message
      }
    }
  }
)

function request(service, params, config: any = {}) {
  if (!(appConfig as any).api[service.base]) {
    return console.error('Base Url', service.base, ' not define!')
  }
  if (!config.Authorization && service.token) {
    if (!cacheUtils.localStorageGet('TOKEN')) {
      Toast.fail('登录状态异常，请重新登录')
      const useUserStore = store.useUserStore()
      useUserStore.logout()
      Router.replace({
        path: '/login'
      })
      return
    }
    if (!config.headers) {
      config.headers = {}
    }
    config.headers.Authorization = cacheUtils.localStorageGet('TOKEN')
  }

  let requestParams = {}
  if (service.paramsType === 'list') {
    requestParams = {
      url: `${(appConfig as any).api[service.base]}${service.url}`,
      method: service.method,
      data: params,
      responseType: service.download,
      ...config
    }
  } else {
    let postParams = false
    if (['post', 'put', 'patch'].includes(service.method.toLowerCase()) && service.postParams) {
      postParams = true
    } else if (!['post', 'put', 'patch'].includes(service.method.toLowerCase())) {
      postParams = true
    } else {
      postParams = false
    }
    requestParams = {
      url: `${(appConfig as any).api[service.base]}${service.url}`,
      method: service.method,
      params: postParams ? { ...(service.params || {}), ...params } : {},
      data: !postParams ? { ...(service.params || {}), ...params } : {},
      paramsSerializer: function (params) {
        return Qs.stringify(params, {
          arrayFormat: 'brackets'
        })
      },
      ...config
    }
  }

  instance.prevParams = {
    enterParams: {
      service,
      params,
      config
    },
    requestParams
  }
  return instance.request(requestParams)
}

export default request
