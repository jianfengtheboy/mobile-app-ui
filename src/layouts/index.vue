<script lang="ts" setup>
const route = useRoute()
const activeTab = ref(0)
const state = reactive({
	isShowTab: true,
})

watch(
	() => route.meta,
	(val: any) => {
		state.isShowTab = val.showTab
	},
	{
		immediate: true,
	}
)
</script>

<template>
	<div class="layout-container">
		<router-view />

		<van-tabbar class="layout-tabbar" route fixed v-model="activeTab" v-if="state.isShowTab" active-color="#0446C8">
			<van-tabbar-item replace icon="home-o" to="/home">首页</van-tabbar-item>
			<van-tabbar-item replace icon="user-o" to="/mine">我的</van-tabbar-item>
		</van-tabbar>
	</div>
</template>

<style lang="scss" scoped>
.layout-container {
	width: 100vw;

	.layout-tabbar {
		position: fixed !important;
	}
}
</style>
