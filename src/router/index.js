import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import appConfig from '../config'
import { cacheUtils } from 'sun-web-utils'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

import { homePageRoutes } from './modules/homePageRoutes'

Vue.use(VueRouter)

const createRouter = () => new VueRouter({
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login.vue'),
      meta: {
        title: '登录'
      }
    },
    {
      path: '/layout',
      component: () => import('@/layout/layout.vue'),
      redirect: '/homePage',
      meta: {
        title: '',
        showNavBar: false,
        keepAlive: false
      },
      children: [
        ...homePageRoutes
      ]
    },
    {
      path: '*',
      name: 'error',
      component: () => import('../views/error.vue'),
      meta: {
        title: '出错了！'
      }
    }
  ]
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

router.beforeEach(async (to, from, next) => {
  const { token } = store.state
  const hasLogin = cacheUtils.localStorageGet('HASLOGIN')
  // 无需登录或者已经登录
  if (appConfig.noAuth.includes(to.name) || hasLogin) {
    const newTo = {
      name: to.name,
      path: to.path,
      params: to.params,
      meta: to.meta
    }
    // 设置页面title
    store.commit('setTitle', to.meta.title)
    const keys = Object.keys(to.query)
    if (keys.length) {
      keys.forEach(key => {
        newTo.params[key] = to.query[key]
      })
      return next(newTo)
    }
    return next()
  }
  if (token) {
    const response = await store.dispatch('FetchUserByToken')
    if (!response.success) {
      if (appConfig.tokenErrorCodes.includes(response.data.code)) {
        return next({
          name: 'login'
        })
      }
      return next({
        name: 'error',
        params: {
          code: 500,
          prev: {
            name: to.name,
            params: to.params
          }
        }
      })
    }
    return next(to)
  }
  next({ name: 'login' })
})

router.afterEach((to) => {
  document.title = to.meta.title || 'vue移动端模版'
})

export default router
