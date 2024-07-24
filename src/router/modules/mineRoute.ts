import { RouteRecordRaw } from 'vue-router'

const route: RouteRecordRaw[] = [
	{
		path: '/mine',
		name: 'mine',
		component: () => import('@/views/main/mine/index.vue'),
		meta: {
			title: '我的',
			showTab: true
		}
	}
]

export default route
