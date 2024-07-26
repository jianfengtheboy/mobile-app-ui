<script lang="ts" setup>
import BaseEmpty from '@/components/base/BaseEmpty.vue'

const router = useRouter()

const onBackToHome = () => {
	router.replace('/home')
}
</script>

<template>
	<div class="notFound">
		<BaseEmpty type="search" description="页面走丢了~">
			<van-button icon="arrow-left" round color="linear-gradient(to right, #ff6034, #ee0a24)" @click="onBackToHome">
				返回首页
			</van-button>
		</BaseEmpty>
	</div>
</template>

<style lang="scss" scoped>
.notFound {
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
</style>
