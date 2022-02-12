import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import appConfig from '../config'

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
        title: '',
        show: false,
        keepAlive: false
      }
    },
    {
      path: '/layout',
      component: () => import('@/layout/layout.vue'),
      redirect: '/homePage',
      meta: {
        title: '',
        show: false,
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
        title: '出错了！',
        keepAlive: false
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
  const { hasLogin } = store.state
  // 无需登录或者已经登录
  if (appConfig.noAuth.includes(to.name) || hasLogin) {
    const newTo = {
      name: to.name,
      path: to.path,
      params: to.params,
      meta: to.meta
    }

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
  next({ name: 'login' })
})

router.afterEach((to) => {
  document.title = to.meta.title || 'vue移动端模版'
})

export default router
