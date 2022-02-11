import env from './env'
const { ws } = env

export default {
  api: {
    // api
    baseMobile: '/api',
    // websocket
    baseMobileWs: `${ws.protocol}/ws/xxx`
  }
}
