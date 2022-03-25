import { Toast } from 'vant'
import { cacheUtils } from 'sun-web-utils'
import Router from '../../../router'

export default {
  // 登录
  Login: {
    url: '/xxxx',
    method: 'post',
    token: false,
    base: 'baseMobile',
    params: {},
    resHook: async (store, response) => {
      if (response && response.success) {
        if (response.data.code === 200) {
          const useUserStore = store.useUserStore()
          // 保存token
          await useUserStore.saveToken(`Bearer ${response.data.data.access_token}`)
          // 保存refresh_token
          await useUserStore.saveRefreshToken(response.data.data.refresh_token)
          // token即将过期(30分钟)，进行token续签
          if (response.data.data.expires_in <= 1800) {
            await useUserStore.RefreshToken()
          }
          // 根据token获取用户信息
          await useUserStore.FetchUserByToken()
        } else {
          return Toast.fail(`${response.data.msg}`)
        }
      }
      return response
    }
  },
  // 根据token获取用户信息
  FetchUserByToken: {
    url: '/xxxx',
    method: 'get',
    token: true,
    base: 'baseMobile',
    params: {},
    resHook: async (store, response) => {
      if (response && response.success) {
        const useUserStore = store.useUserStore()
        await useUserStore.loginSuccess(response.data.data)
      }
      return response
    }
  },
  // token续签
  RefreshToken: {
    url: '/xxxx/web/refresh/token',
    method: 'post',
    base: 'baseMobile',
    token: false,
    params: {},
    reqHook: async store => {
      const useUserStore = store.useUserStore()
      return {
        refreshToken: useUserStore.refreshToken || cacheUtils.localStorageGet('REFRESH_TOKEN')
      }
    },
    resHook: async (store, response) => {
      const useUserStore = store.useUserStore()
      if (response && response.success) {
        // 保存token
        await useUserStore.saveToken(`Bearer ${response.data.data.access_token}`)
        // 保存refresh_token
        await useUserStore.saveRefreshToken(response.data.data.refresh_token)
      } else {
        await useUserStore.logout()
        Router.replace({
          path: '/login'
        })
      }
    }
  }
}
