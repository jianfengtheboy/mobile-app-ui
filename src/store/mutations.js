import { cacheUtils } from 'sun-web-utils'

export default {
  save(state, payload) {
    Object.keys(payload).forEach(key => (state[key] = payload[key]))
  },
  // 保存token
  saveToken(state, token) {
    state.token = token
    cacheUtils.localStorageSet('TOKEN', token)
  },
  // 设置页面title
  setTitle(state, data) {
    state.headerTitle = data
  },
  // 登录成功
  loginSuccess(state, data) {
    state.userInfo = data
    state.hasLogin = true
    cacheUtils.sessionStorageSet('USERINFO', data)
  },
  // 注销登录
  logout(state) {
    state.hasLogin = false
    state.token = undefined
    state.userInfo = {}
    cacheUtils.localStorageRemove('TOKEN')
    cacheUtils.sessionStorageRemove('USERINFO')
    location.reload()
  }
}
