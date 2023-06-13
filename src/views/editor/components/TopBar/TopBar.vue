<template>
  <div class="top-bar" :style="{ height: `${props.height}px` }"></div>
</template>

<script setup name="TopBar">
const props = defineProps({
  height: {
    type: Number,
    required: true,
  },
})
</script>

<style lang="scss" scoped>
.top-bar {
  width: 100%;
  background-color: #ccc;
}
</style>
