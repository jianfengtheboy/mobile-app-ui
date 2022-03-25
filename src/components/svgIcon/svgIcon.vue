<template>
  <svg aria-hidden="true">
    <use :xlink:href="symbolId" :fill="color" />
  </svg>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

interface Props {
  prefix?: String
  name: String
  color?: String
}

const props = withDefaults(defineProps<Props>(), {
  prefix: 'icon',
  name: '',
  color: '#000'
})

const symbolId = computed(() => `#${props.prefix}-${props.name}`)
</script>

<style lang="scss" scoped>
svg {
  width: 18px;
  height: 18px;
  vertical-align: -0.2em;
}
</style>
