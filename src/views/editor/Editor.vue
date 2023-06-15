<template>
  <div class="editor">
    <TopBar :height="40" />
    <div class="main-box">
      <LeftSidebar />
      <ContentMain />
      <RightSideBar />
    </div>
  </div>
</template>

<script setup name="Editor">
import LeftSidebar from './components/LeftSideBar/LeftSidebar.vue'
import RightSideBar from './components/RightSideBar/RightSideBar.vue'
import ContentMain from './components/ContentMain/ContentMain.vue'
import TopBar from './components/TopBar/TopBar.vue'
</script>

<style lang="scss" scoped>
.main-box {
  display: flex;
  .left-side-bar,
  .right-side-bar,
  .content-main {
    width: 260px;
    height: calc(100vh - 40px);
    background: #000;
  }
  .content-main {
    flex: 1;
    background: #eee;
    overflow-x: auto;
  }
}
</style>
