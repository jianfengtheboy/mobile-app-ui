<!--
 * @Author: Sun
 * @LastEditors: Sun
 * @Email: jianfengtheboy@163.com
 * @Date: 2024-01-29 10:16:20
 * @LastEditTime: 2024-07-24 23:19:52
 * @Description: loading组件
-->
<script lang="ts" setup>
interface IProps {
	isShow: boolean
	size?: string
	color?: string
	type?: 'circular' | 'spinner'
	title?: string
}

withDefaults(defineProps<IProps>(), {
	isShow: false,
	size: '36px',
	color: '#0094ff',
	type: 'spinner',
})
</script>

<template>
	<van-overlay
		:show="isShow"
		:custom-style="{
			background: 'rgb(0, 0, 0, 0.2)',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
		}"
	>
		<van-loading :size="size" :color="color" :type="type" vertical>
			<span
				style="
					{
						color: color;
					}
				"
			>
				{{ title || '加载中···' }}
			</span>
		</van-loading>
	</van-overlay>
</template>
