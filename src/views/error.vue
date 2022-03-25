<template>
  <div class="error-page">
    <Empty image="error" :description="`出错了，${$route.params.code || '404'}!`">
      <Button color="linear-gradient(to right, #ff6034, #ee0a24)" size="small" icon="arrow-left" @click="backToHome">
        返回首页
      </Button>
    </Empty>
  </div>
</template>

<script lang="ts" setup>
import { Empty, Button } from 'vant'
import { useRouter } from 'vue-router'

const router = useRouter()

const backToHome = () => {
  router.replace({
    name: 'homePage'
  })
}
</script>

<style lang="scss" scoped>
.error-page {
  height: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
}
</style>
