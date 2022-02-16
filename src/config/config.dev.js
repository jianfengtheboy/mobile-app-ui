import env from './env'
const { ws } = env

export default {
  api: {
    // api
    baseMobile: '/api',
    // websocket地址
    baseMobileWs: `${ws.protocol}/ws/xxx`
  },
  noAuth: ['login', 'error'],
  tokenErrorCodes: [600, 601, 602, 603, 604, 605, 606, 607, 608, 609, 610, 611, 612, 613, 614, 615]
}
