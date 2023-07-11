<template>
  <div class="right-side-bar">
    <div class="edit-item">
      <p class="title">选中的数据：</p>
      <Codemirror
        :value="JSON.stringify(editorStore.activeElementObj, null, 2)"
        :options="cmOptions"
        border
        ref="cmRef"
        height="300"
        @input="onInput"
      >
      </Codemirror>
      <!-- <pre class="code">{{ editorStore.activeElementObj }}</pre> -->
    </div>
    <div class="edit-item">
      <p class="title">工作区数据：</p>
      <pre class="code">{{ editorStore.allElementJson }}</pre>
    </div>
  </div>
</template>

<script setup name="RightSideBar">
import { ref } from 'vue'
import 'codemirror/mode/javascript/javascript.js'
import Codemirror from 'codemirror-editor-vue3'
import 'codemirror/theme/darcula.css'
import { useEditorStore } from '@/stores/editor'

const editorStore = useEditorStore()

const cmRef = ref()
const cmOptions = {
  mode: 'text/javascript',
  theme: 'darcula',
}
const onInput = (val) => {
  editorStore.activeElementObj = JSON.parse(val)
  editorStore.editElement()
}
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
    .title {
      margin-bottom: 6px;
    }
    .code {
      padding: 2px;
      height: calc(100vh - 480px);
      overflow-x: auto;
      background-color: #2b2b2b;
      border-radius: 2px;
      border: 1px solid #fff;
      margin-top: 0;
    }
  }
}
</style>
