<template>
  <div class="app-container" v-cloak>

    <div :class="['app-wrapper', showHead ? 'app-main' : 'app-main-noHead']">
      <translation name="van-fade">
        <keep-alive v-if="$route.meta.keepAlive">
          <router-view></router-view>
        </keep-alive>
        <router-view v-else></router-view>
      </translation>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'AppLayout',
  computed: {
    ...mapState(['headerTitle'])
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
