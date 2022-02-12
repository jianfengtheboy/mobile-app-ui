import request from '../request'
const { http } = request

class ServierTransfer {
  /**
   * @name: 把服务配置转化为actions
   * @param {Object} services 服务配置
   * @return action数组
   */
  transToActions(services) {
    const actions = {}
    Object.keys(services).filter(key => services[key].url).forEach(key => {
      const service = services[key]
      actions[key] = this.transHook(service, service.reqHook, service.resHook)
    })
    return actions
  }

  /**
   * @name: 服务处理
   * @param {Object} service 服务配置对象
   * @param {Function} hook 返回处理函数
   * @return: vuex action 对象
   */
  transHook(service, reqHook, resHook) {
    return async (action, payload = {}) => {
      const { state } = action
      let { params = {}, config = {} } = payload

      if (reqHook && typeof reqHook === 'function') {
        const reqHookResult = await reqHook(action, payload, service)
        if ((reqHookResult === null || reqHookResult === undefined) || (typeof reqHookResult === 'boolean' && reqHookResult === false)) return
        if (typeof reqHookResult === 'object') {
          params = reqHookResult
        }
      }

      // token处理
      if (service.token) {
        if (!config.headers) {
          config.headers = {}
        }
        config.headers.Authorization = state.token
      }

      const response = await http(service, params, config)
      let result = response
      if (resHook && typeof resHook === 'function') {
        result = await resHook(action, response)
      }

      return result
    }
  }
}

export default new ServierTransfer()
