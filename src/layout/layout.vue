<template>
  <div class="app-container" v-cloak>
    <nav-bar
      v-if="$route.meta.showNavBar"
      fixed
      safe-area-inset-top
      @click-left="onClickLeftAction"
      @click-right="onClickRightAction"
      class="app-head"
    >
      <template #left v-if="$route.meta.navLeftArea || true">
        <Icon v-if="$route.meta.navLeftIcon" :name="$route.meta.navLeftIcon"></Icon>{{$route.meta.navLeftText || '返回'}}
      </template>
      <template #title>{{headerTitle}}</template>
      <template #right v-if="$route.meta.navRightArea || false">
        <Icon v-if="$route.meta.navRightIcon" :name="$route.meta.navRightIcon"></Icon>{{$route.meta.navRightText || ''}}
      </template>
    </nav-bar>
    <div :class="['app-wrapper', $route.meta.showNavBar ? 'app-main' : 'app-main-noHead']">
      <transition name="van-fade">
        <keep-alive v-if="$route.meta.keepAlive">
          <router-view></router-view>
        </keep-alive>
        <router-view v-else></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import { NavBar } from 'vant'
import { mapState } from 'vuex'

export default {
  name: 'AppLayout',
  components: {
    NavBar
  },
  computed: {
    ...mapState(['headerTitle'])
  },
  methods: {
    // 导航栏左侧区域点击事件
    onClickLeftAction() {

    },
    // 导航栏右侧区域点击事件
    onClickRightAction() {

    }
  }
}
</script>

<style lang='scss' scoped>
.app-container {
  position: relative;
  width: 100%;
  height: 100%;

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
