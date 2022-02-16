import { Toast } from 'vant'

export default {
  // 登录
  Login: {
    url: '',
    method: 'post',
    token: false,
    base: 'baseMobile',
    params: {},
    resHook: async ({ commit, dispatch }, response) => {
      if (response && response.success) {
        if (response.data.code === 200) {
          // 保存token
          await commit('saveToken', `Bearer ${response.data.data.access_token}`)
          // 根据token获取用户信息
          await dispatch('FetchUserByToken')
        } else {
          return Toast.fail(`${response.data.msg}`)
        }
      }
      return response
    }
  },
  // 根据token获取用户信息
  FetchUserByToken: {
    url: '/xxxxx',
    method: 'get',
    token: true,
    base: 'baseMobile',
    params: {},
    resHook: async ({ commit }, response) => {
      if (response && response.success) {
        await commit('loginSuccess', response.data.data)
      }
      return response
    }
  }
}
