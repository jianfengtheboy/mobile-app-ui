import { defineStore } from 'pinia'
import { cacheUtils } from 'sun-web-utils'
import transfer from '../../transfer'
import services from './services'

const useUserStore = defineStore('user', {
  state: () => ({
    // 是否已登陆
    hasLogin: false,
    // token
    token: undefined,
    // refresh token
    refreshToken: undefined,
    // 页面标题
    headerTitle: '',
    // 用户信息
    userInfo: {}
  }),
  getters: {},
  actions: {
    ...transfer.transToActions(services),
    // 保存token
    saveToken(token) {
      this.token = token
      cacheUtils.localStorageSet('TOKEN', token)
    },
    // 保存refresh_token
    saveRefreshToken(token) {
      this.refreshToken = token
      cacheUtils.localStorageSet('REFRESH_TOKEN', token)
    },
    // 设置页面title
    setTitle(data) {
      this.headerTitle = data
    },
    // 登录成功
    loginSuccess(data) {
      this.userInfo = data
      this.hasLogin = true
      cacheUtils.localStorageSet('HASLOGIN', true)
      cacheUtils.sessionStorageSet('USERINFO', data)
    },
    // 注销登录
    logout() {
      this.hasLogin = false
      this.token = undefined
      this.refreshToken = undefined
      this.userInfo = {}
      cacheUtils.localStorageRemove('HASLOGIN')
      cacheUtils.localStorageRemove('TOKEN')
      cacheUtils.localStorageRemove('REFRESH_TOKEN')
      cacheUtils.sessionStorageRemove('USERINFO')
      location.reload()
    }
  }
})

export default {
  useUserStore
}
