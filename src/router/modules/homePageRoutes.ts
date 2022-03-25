/**
 * @name: 子路由配置
 * @param {string} path 路由
 * @param {string} name 路由名称
 * @param component 路由匹配页面
 * @param {object} meta { 路由meta信息
 *    @param {string} title: 页面title
 *    @param {boolean} showNavBar：是否显示navbar
 *    @param {boolean} keepAlive: 是否开启keep-alive模式
 *    @param {boolean} navLeftArea: 是否显示navbar左侧区域，默认显示
 *    @param {boolean} navRightArea: 是否显示navbar又侧区域，默认不显示
 *    @param {string} navLeftIcon: navbar左侧区域图标名称，例如：navLeftIcon：'arrow-left'
 *    @param {string} navRightIcon: navbar右侧区域图标名称，例如：navRightIcon：'search'
 *    @param {string} navLeftText: navbar左侧区域文案，默认为“返回”
 *    @param {string} navRightText: navbar右侧区域文案，默认为空
 *    @param {string} transition: 当前页面过渡name
 * }
 */
const homePageRoutes = [
  {
    path: '/homePage',
    name: 'homePage',
    component: () => import('@/views/main/homePage/homePage.vue'),
    meta: {
      title: '首页',
      showNavBar: false,
      keepAlive: false
    }
  }
]

export { homePageRoutes }
