<template>
  <div id="app">
    <RouterView #default="{ Component, route }">
      <!-- KeepAlive 看自己情况使用 -->
      <KeepAlive>
        <component :is="Component" :key="route.path"></component>
      </KeepAlive>
    </RouterView>
  </div>
</template>

<script setup>
import { KeepAlive } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
</script>

<style lang="scss">
@import '@/assets/css/base.css';
* {
  box-sizing: border-box;
}
html,
body {
  overflow: hidden;
}
img {
  display: block;
}
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}
/* 样式滚动条的轨道部分 */
::-webkit-scrollbar-track {
  background-color: #fff;
}
/* 样式滚动条的滑块部分 */
::-webkit-scrollbar-thumb {
  background-color: #000;
}
</style>
