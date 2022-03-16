<template>
  <div class="error-page">
    <van-empty image="error" :description="`出错了，${$route.params.code || '404'}!`"></van-empty>
    <van-button
      color="linear-gradient(to right, #ff6034, #ee0a24)"
      size="small"
      icon="arrow-left"
      @click="backToHome"
    >
      返回首页
    </van-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Empty, Button } from 'vant'

export default defineComponent({
  name: 'error',
  components: {
    VanEmpty: Empty,
    VanButton: Button
  },
  setup() {
    function backToHome() {

    }

    return {
      backToHome
    }
  }
})
</script>

<style lang='scss' scoped>
.error-page {
  height: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
}
</style>
