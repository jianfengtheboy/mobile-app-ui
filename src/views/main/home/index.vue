<script lang="ts" setup>
import { useToggle } from '@vant/use'
import { showToast } from 'vant'
import { BarrageInstance } from 'vant/es/barrage/types'
import ChangeThemeBubble from '@/components/business/ChangeThemeBubble.vue'

const defaultList = [
	{ id: 100, text: '轻量' },
	{ id: 101, text: '可定制的' },
	{ id: 102, text: '移动端' },
	{ id: 103, text: 'Vue' },
	{ id: 104, text: '组件库' },
	{ id: 105, text: 'VantUI' },
]

const list = ref([...defaultList])
const barrageValue = ref('')
const barrage = ref<BarrageInstance>()
const add = () => {
	if (!barrageValue.value) {
		showToast('弹幕内容不能为空')
	}
	list.value.push({
		id: Math.random(),
		text: barrageValue.value,
	})
	barrageValue.value = ''
}

const [isPlay, toggle] = useToggle(false)

watch(isPlay, () => {
	if (isPlay.value) barrage.value?.play()
	else barrage.value?.pause()
})
</script>

<template>
	<div class="index">
		<div>
			<van-button type="primary">主要按钮</van-button>
			<van-button type="success">成功按钮</van-button>
			<van-button type="warning">警告按钮</van-button>
			<van-button type="danger">危险按钮</van-button>
		</div>
		<ChangeThemeBubble />
		<van-watermark :width="200" z-index="-1" content="jianfengtheboy" />

		<div class="barrage">
			<van-barrage v-model="list" ref="barrage" :auto-play="false">
				<div class="video" style="width: 100%; height: 150px"></div>
			</van-barrage>
			<van-cell-group inset style="margin-top: 10px">
				<van-field v-model="barrageValue" label="" placeholder="请输入弹幕" />
			</van-cell-group>
			<van-space style="margin-top: 10px">
				<van-button @click="add" type="primary" size="small" :disabled="!isPlay"> 弹幕 </van-button>
				<van-button @click="toggle()" size="small">
					{{ isPlay ? '暂停' : '开始' }}
				</van-button>
			</van-space>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.index {
	height: 100vh;
}

.barrage {
	margin-top: 2vh;

	.video {
		background-color: var(--van-gray-2);
	}
}
</style>
