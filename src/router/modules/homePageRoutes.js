const homePageRoutes = [
  {
    path: '/homePage',
    name: 'homePage',
    component: () => import('@/views/main/homePage/homePage.vue'),
    meta: {
      title: '首页',
      show: false,
      keepAlive: false
    }
  }
]

export {
  homePageRoutes
}
