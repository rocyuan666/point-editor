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
/* 全局样式 开发时清空 */
#app {
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-active {
  color: #ff9999;
}
</style>
