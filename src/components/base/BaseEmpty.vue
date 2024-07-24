<!--
 * @Author: Sun
 * @LastEditors: Sun
 * @Email: jianfengtheboy@163.com
 * @Date: 2024-01-29 10:15:14
 * @LastEditTime: 2024-07-24 23:20:47
 * @Description: 缺省页面组件
-->
<script lang="ts" setup>
interface IProps {
	type?: 'default' | 'error' | 'network' | 'search' | string
	imageSize?: number | string
	description?: string
}

withDefaults(defineProps<IProps>(), {
	type: 'default'
})
</script>

<template>
	<van-empty :image="type" :image-size="imageSize" :description="description">
		<template #default>
			<slot></slot>
		</template>
	</van-empty>
</template>
