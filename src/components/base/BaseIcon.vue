<!--
 * @Author: Sun
 * @LastEditors: Sun
 * @Email: jianfengtheboy@163.com
 * @Date: 2024-01-29 10:15:28
 * @LastEditTime: 2024-07-24 23:20:22
 * @Description: icon组件
-->
<script lang="ts" setup>
import type { CSSProperties } from 'vue'

interface IProps {
	// 图标大小
	size?: string | number
	//  图标颜色
	color?: string
	// 是否旋转
	spin?: boolean
	// 线条的粗细(1.先去掉svg图标代码中自身固定的strokeWidth，2.设置之后需要重启项目才有效果)
	strokeWidth?: string | number
	// 描边颜色
	stroke?: string
	// 旋转角度
	rotate?: number
}

const props = withDefaults(defineProps<IProps>(), {
	size: 14,
	strokeWidth: 4,
	stroke: 'none'
})

const iconStyle = computed<CSSProperties>(() => ({
	fontSize: typeof props.size === 'string' ? props.size : `${props.size}px`,
	color: props.color,
	strokeWidth: props.strokeWidth,
	stroke: props.stroke,
	transform: `rotateZ(${props.rotate}deg)`,
}))
</script>

<template>
	<i class="base-icon" :class="{ spin }" :style="iconStyle">
		<slot></slot>
	</i>
</template>

<style lang="scss">
.base-icon {
	display: inline-flex;
	justify-content: center;
	align-items: center;
	height: 1em;
	width: 1em;
	fill: currentColor;
	stroke: currentColor;

	&.spin {
		animation: spinning 2s cubic-bezier(0, 0, 1, 1) infinite;
	}

	svg {
		height: 1em;
		width: 1em;
	}
}

@keyframes spinning {
	0% {
		transform: rotateZ(0deg);
	}

	100% {
		transform: rotateZ(360deg);
	}
}
</style>
