<script lang="ts" setup>
import { useAppStore } from '@/store'
const appStore = useAppStore()
</script>

<template>
  <van-config-provider :theme="appStore.theme">
    <router-view />
  </van-config-provider>
</template>

<style lang="scss">
#app {
  width: 100vw;
  height: 100vh;
}
</style>