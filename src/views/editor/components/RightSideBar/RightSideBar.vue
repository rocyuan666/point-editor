<template>
  <div class="right-side-bar">
    <div class="edit-item">
      <p class="title">选中的数据：</p>
      <pre class="code">{{ editorStore.activeElementObj }}</pre>
    </div>
    <div class="edit-item">
      <p class="title">工作区数据：</p>
      <pre class="code">{{ editorStore.allElementJson }}</pre>
    </div>
  </div>
</template>

<script setup name="RightSideBar">
import { useEditorStore } from '@/stores/editor'
const editorStore = useEditorStore()
</script>

<style lang="scss" scoped>
.right-side-bar {
  overflow-y: auto;
  .edit-item {
    padding: 10px;
    .title,
    .code {
      word-wrap: break-word;
      white-space: pre-wrap;
      color: #fff;
    }
  }
}
</style>
