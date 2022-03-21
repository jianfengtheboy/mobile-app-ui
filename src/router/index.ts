import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { cacheUtils } from 'sun-web-utils'

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
    children: [

    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'errorPage',
    component: () => import('@/views/error.vue'),
    meta: {
      title: '出错了！'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    return new Promise((resolve, _reject) => {
      if (savedPosition) {
        return savedPosition
      } else {
        const top = document.documentElement.scrollTop || document.body.scrollTop
        resolve({ left: 0, top })
      }
    })
  }
})

router.beforeEach(() => {

})

router.afterEach((to) => {
  (document.title as any) = to.meta.title || 'vue移动端模版'
})

export default router
