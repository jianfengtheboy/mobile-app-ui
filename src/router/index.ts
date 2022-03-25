import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import store from '../stores/index'
import appConfig from '../config/index'
import { cacheUtils } from 'sun-web-utils'

import { homePageRoutes } from './modules/homePageRoutes'

const routes: Array<RouteRecordRaw> = [
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
    children: [...homePageRoutes]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'error',
    component: () => import('@/views/error.vue'),
    meta: {
      title: '出错了！'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    return new Promise(resolve => {
      if (savedPosition) {
        return savedPosition
      } else {
        let top = 0
        if (to.meta.keepAlive) {
          top = document.documentElement.scrollTop || document.body.scrollTop
        }
        resolve({ left: 0, top })
      }
    })
  }
})

router.beforeEach(async (to, _from, next) => {
  const useUserStore: any = store.useUserStore()
  const hasLogin = cacheUtils.localStorageGet('HASLOGIN')
  // 无需登录或者已经登录
  if ((appConfig as any).noAuth.includes(to.name) || hasLogin) {
    const newTo: any = {
      name: to.name,
      path: to.path,
      params: to.params,
      meta: to.meta
    }
    // 设置页面title
    useUserStore.setTitle(to.meta.title)
    const keys = Object.keys(to.query)
    if (keys.length) {
      keys.forEach(key => {
        newTo.params[key] = to.query[key]
      })
      return next(newTo)
    }
    return next()
  }
  if (useUserStore.token) {
    const response = await useUserStore.FetchUserByToken()
    if (!response.success) {
      if ((appConfig as any).tokenErrorCodes.includes(response.data.code)) {
        return next({
          name: 'login'
        })
      }
      return next({
        name: 'error',
        params: {
          code: response.data.code,
          prev: {
            name: to.name,
            params: to.params
          }
        } as any
      })
    }
    return next(to)
  }
  next({ name: 'login' })
})

router.afterEach(to => {
  ;(document.title as any) = to.meta.title || 'vue移动端模版'
})

export default router
