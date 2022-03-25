<template>
  <div v-cloak class="app-container">
    <nav-bar
      v-if="$route.meta.showNavBar"
      fixed
      safe-area-inset-top
      class="app-head"
      @click-left="onClickLeftAction"
      @click-right="onClickRightAction"
    >
      <template v-if="$route.meta.navLeftArea || true" #left>
        <icon v-if="$route.meta.navLeftIcon" :name="$route.meta.navLeftIcon"></icon
        >{{ $route.meta.navLeftText || '返回' }}
      </template>
      <template #title>{{ useUserStore.headerTitle }}</template>
      <template v-if="$route.meta.navRightArea || false" #right>
        <icon v-if="$route.meta.navRightIcon" :name="$route.meta.navRightIcon"></icon
        >{{ $route.meta.navRightText || '' }}
      </template>
    </nav-bar>
    <div :class="['app-wrapper', $route.meta.showNavBar ? 'app-main' : 'app-main-noHead']">
      <router-view v-slot="{ Component, route }">
        <transition :name="route.meta.transition || 'van-slide-left'">
          <keep-alive v-if="route.meta.keepAlive">
            <component :is="Component" />
          </keep-alive>
          <component :is="Component" v-else />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { NavBar, Icon } from 'vant'
import store from '@/stores'

const useUserStore = store.useUserStore()

// 导航栏左侧区域点击事件
const onClickLeftAction = () => {}
// 导航栏右侧区域点击事件
const onClickRightAction = () => {}
</script>

<style lang="scss" scoped>
.app-container {
  position: relative;
  width: 100%;
  height: 100%;

  :deep(.van-nav-bar__left) {
    color: var(--van-nav-bar-text-color);
    .van-icon-arrow-left {
      margin-right: var(--van-padding-base);
      font-size: var(--van-nav-bar-arrow-size);
    }
  }

  .app-main {
    position: absolute;
    top: 46px;
    width: 100%;
    height: calc(100% - 46px);
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
  }

  .app-main-noHead {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
  }
}
</style>
