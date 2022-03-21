<template>
  <div class="app-container" v-cloak>
    <router-view v-slot="{ Component }">
      <component v-if="!$route.meta.keepAlive" :is="Component" />
      <keep-alive>
        <component v-if="$route.meta.keepAlive" :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script lang="ts" setup>
name: 'Layout'
</script>

<style lang='scss' scoped>

</style>
