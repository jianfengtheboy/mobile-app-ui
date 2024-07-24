import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { SystemName } from '@/config/const'
import homeRoute from './modules/homeRoute'
import mineRoute from './modules/mineRoute'

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		redirect: '/home'
	},
	{
		path: '/platform',
		name: 'platform',
		redirect: '/home',
		component: () => import('@/layouts/index.vue'),
		children: [...homeRoute, ...mineRoute]
	},
	{
		path: '/notFound',
		name: 'notFound',
		component: () => import('@/views/common/notFound/index.vue'),
		meta: {
			title: 'Page not found'
		}
	},
	{
		path: '/:pathMatch(.*)*',
		redirect: '/notFound'
	}
]

const initRouter = () => {
	return createRouter({
		history: createWebHistory(),
		routes,
		scrollBehavior: () => ({ left: 0, top: 0 })
	})
}

const router = initRouter()

// 不需要鉴权的外部界面
const outerPaths: string[] = ['']

router.beforeEach(async (to, _from) => {
	if (to.meta.title) {
		document.title = (to.meta.title as string) || SystemName
	}

	// 外部界面，直接访问
	if (outerPaths.includes(to.path)) {
		return true
	}

	return true
})

export default router
