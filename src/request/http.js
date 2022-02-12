import Axios from 'axios'
import Qs from 'qs'
import appConfig from '../config'
import { Toast } from 'vant'
import { cacheUtils } from 'sun-web-utils'
import store from '../store'
import Router from '../router'

const instance = Axios.create({
  timeout: 300000,
  headers: {
    'Content-Type': 'application/json'
  },
  responseType: 'json',
  withCredentials: false
})

/**
 * @name: 返回数据集中处理
 */
instance.interceptors.response.use(function (res) {
  const { notip } = instance.prevParams.enterParams.service
  let result = {}
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
    if (appConfig.tokenErrorCodes.includes(parseInt(res.data.code))) {
      if (!notip) {
        Toast.fail(`${res.data.msg}`)
      }
      cacheUtils.localStorageRemove('TOKEN')
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
    let notShowErrorTip = [401].includes(res.data.code) || (res.data.code === 503 && res.data.msg === '操作失败，请求超时') ? true : notip
    if (!notShowErrorTip) {
      Toast.fail(`${result.msg}`)
    }
  }
  return result
}, function (error) {
  const { notip } = instance.prevParams.enterParams.service
  if (error.response) {
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
})

function request (service, params, config = {}) {
  if (!appConfig.api[service.base]) {
    return console.error('Base Url', service.base, ' not define!')
  }
  if (!config.Authorization && service.token) {
    if (!cacheUtils.localStorageGet('TOKEN')) {
      Toast.fail('登录状态异常，请重新登录')
      store.commit('logout')
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
      url: `${appConfig.api[service.base]}${service.url}`,
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
      url: `${appConfig.api[service.base]}${service.url}`,
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
