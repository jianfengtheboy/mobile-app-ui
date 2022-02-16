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

<script>
import { Empty, Button } from 'vant'

export default {
  name: 'error',
  components: {
    VanEmpty: Empty,
    VanButton: Button
  },
  methods: {
    backToHome() {
      this.$router.replace({
        name: 'homePage'
      })
    }
  }
}
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
