<template>
  <div class="top-bar" :style="{ height: `${props.height}px` }">
    <div class="left">
      <p class="logo">编辑器</p>
      <button @click="editorStore.clearBgImg()">清空背景图</button>
      <button @click="editorStore.remoteActive()">取消选中</button>
      <button @click="editorStore.clear()">清空元素</button>
      <button @click="editorStore.removeElement()">删除元素</button>
      <button @click="editorStore.openCloseScale()">
        {{ editorStore.scale ? '关闭' : '启用' }}自适应
      </button>
    </div>
    <div class="right">
      <p>鼠标位置: x:{{ editorStore.mouse.x }} y:{{ editorStore.mouse.y }}</p>
    </div>
  </div>
</template>

<script setup name="TopBar">
import { useEditorStore } from '@/stores/editor'

const editorStore = useEditorStore()
const props = defineProps({
  height: {
    type: Number,
    required: true,
  },
})
</script>

<style lang="scss" scoped>
.top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background-color: #ccc;
  padding: 0 10px;
  .left {
    display: flex;
    .logo {
      padding: 0 6px;
    }
    button {
      margin: 0 5px;
    }
  }
  right: {
  }
}
</style>
