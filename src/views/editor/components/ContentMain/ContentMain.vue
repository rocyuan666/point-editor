<template>
  <div class="content-main">
    <img
      v-if="editorStore.bgImg"
      ref="bgImg"
      :src="rocRequire(`@/assets/images/${editorStore.bgImg}`)"
      alt="背景"
      @click="editorStore.remoteActive()"
      @load="handleLoad"
    />
    <div
      v-if="editorStore.bgImg"
      class="screen-box"
      :style="{ width: screen.width, height: screen.height }"
      @mousemove="getXY"
    >
      <template v-for="item in editorStore.allElementJson" :key="item.id">
        <p
          v-if="item.tag == 'p'"
          :class="{ active: editorStore.activeElementObj.id == item.id }"
          :style="item.style"
          @click="handleActive(item)"
        >
          {{ item.value }}
        </p>
        <img
          v-else-if="item.tag == 'img'"
          :style="item.style"
          :class="{ active: editorStore.activeElementObj.id == item.id }"
          :src="rocRequire(`@/assets/images/${item.src}`)"
          :alt="item.alt"
          @click="handleActive(item)"
        />
      </template>
    </div>
  </div>
</template>

<script setup name="ContentMain">
import { ref, reactive } from 'vue'
import { useEditorStore } from '@/stores/editor'
import { rocRequire } from '@/utils/getStaticAssets'

const editorStore = useEditorStore()

function handleActive(item) {
  editorStore.activeElementObj = item
}
function getXY(e) {
  editorStore.handleMousemoveXY(e.offsetX, e.offsetY)
}

const bgImg = ref(null)
const screen = reactive({
  width: '100%',
  height: '100%',
})
function handleLoad() {
  screen.width = `${bgImg.value.width}px`
  screen.height = `${bgImg.value.height}px`
}
</script>

<style lang="scss" scoped>
$frame: 20px;

.content-main {
  position: relative;
  overflow: auto;
  padding: $frame;
  .screen-box {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    margin: $frame;
    > * {
      position: absolute;
      cursor: pointer;
      &.active {
        box-shadow: 0 0 20px #f00;
        cursor: move;
      }
    }
  }
}
</style>
