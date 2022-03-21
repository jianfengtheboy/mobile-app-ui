<template>
  <div v-cloak class="app-container">
    <router-view v-slot="{ Component }">
      <component :is="Component" v-if="!$route.meta.keepAlive" />
      <keep-alive>
        <component :is="Component" v-if="$route.meta.keepAlive" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped></style>
