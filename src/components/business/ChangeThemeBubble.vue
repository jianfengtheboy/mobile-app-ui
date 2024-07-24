<!--
 * @Author: Sun
 * @LastEditors: Sun
 * @Email: jianfengtheboy@163.com
 * @Date: 2023-08-03 15:47:12
 * @LastEditTime: 2024-07-24 23:18:44
 * @Description: 切换主题组件
-->
<script lang="ts" setup>
import { useAppStore } from '@/store'
const appStore = useAppStore()

const offset = ref({
  x: 327,
  y: 200
})

// 切换主题
const onToggleTheme = () => {
  appStore.theme = appStore.theme == 'light' ? 'dark' : 'light'
}
</script>

<template>
  <van-floating-bubble v-model:offset="offset" axis="xy" magnetic="x" :gap="0">
    <BaseIcon size="32px" @click="onToggleTheme">
      <IconCustomLightTheme v-if="appStore.theme == 'dark'" />
      <IconCustomDarkTheme v-if="appStore.theme == 'light'" />
    </BaseIcon>
  </van-floating-bubble>
</template>
