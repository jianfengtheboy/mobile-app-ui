import { RouteRecordRaw } from 'vue-router'

const route: RouteRecordRaw[] = [
	{
		path: '/home',
		name: 'home',
		component: () => import('@/views/main/home/index.vue'),
		meta: {
			title: '首页',
			showTab: true
		}
	}
]

export default route
