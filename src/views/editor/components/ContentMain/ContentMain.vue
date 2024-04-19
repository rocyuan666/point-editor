<template>
  <div class="content-main" ref="contentMainRef" :style="contentMainStyle">
    <img
      v-if="editorStore.bgImg"
      ref="bgImg"
      :src="handlePath(editorStore.bgImg)"
      alt="背景"
      @load="handleLoad"
    />
    <div
      v-if="editorStore.bgImg"
      class="scene-box"
      :style="{ width: scene.width, height: scene.height }"
      @mousemove="(e) => editorStore.handleMousemoveXY(e.offsetX, e.offsetY)"
      @click="editorStore.remoteActive"
    >
      <template v-for="item in editorStore.allElementJson" :key="item.id">
        <p
          :draggable="item.id == editorStore.activeElementObj.id"
          v-if="item.tag == 'p'"
          :class="{ active: editorStore.activeElementObj.id == item.id }"
          :style="item.style"
          @click.stop="editorStore.handleActive(item)"
          @dragend="handleDragend"
          @mousedown="handleMousedown"
        >
          {{ item.value }}
        </p>
        <img
          :draggable="item.id == editorStore.activeElementObj.id"
          v-else-if="item.tag == 'img'"
          :style="item.style"
          :class="{ active: editorStore.activeElementObj.id == item.id }"
          :src="handlePath(item.src)"
          :alt="item.alt"
          @click.stop="editorStore.handleActive(item)"
          @dragend="handleDragend"
          @mousedown="handleMousedown"
        />
      </template>
    </div>
  </div>
</template>

<script setup name="ContentMain">
import { ref, reactive, nextTick, watch } from 'vue'
import { useEditorStore } from '@/stores/editor'
import { handlePath } from '@/utils/getStaticAssets'
import { useDrag } from './js/useDrag'

const { handleDragend, handleMousedown } = useDrag()
const editorStore = useEditorStore()
const scene = reactive({
  width: '100%',
  height: '100%',
  widthNum: 0,
  heightNum: 0,
})

const bgImg = ref(null)
const contentMainStyle = ref({})
/**
 * 背景图加载完成
 */
function handleLoad() {
  if (editorStore.scale) {
    contentMainStyle.value = { transform: 'scaleX(var(--scaleX)) scaleY(var(--scaleY))' }
  } else {
    contentMainStyle.value = { overflow: 'auto' }
  }
  scene.width = `${bgImg.value.width}px`
  scene.height = `${bgImg.value.height}px`
  scene.widthNum = bgImg.value.width
  scene.heightNum = bgImg.value.height
  nextTick(() => (scale.value = getScale()))
}

const contentMainRef = ref(null)
const scale = ref(1)
/**
 * 内容区自适应设置
 */
function getScale() {
  const ww = contentMainRef.value.clientWidth / scene.widthNum
  const hh = contentMainRef.value.clientHeight / scene.heightNum
  contentMainRef.value.style.setProperty('--scaleX', ww)
  contentMainRef.value.style.setProperty('--scaleY', hh)
}

watch(() => editorStore.scale, handleLoad)
window.addEventListener('resize', () => handleLoad())
</script>

<style lang="scss" scoped>
.content-main {
  -webkit-user-select: none;
  user-select: none;
  position: relative;
  transform-origin: left top;
  .scene-box {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    overflow-y: auto;
    > * {
      cursor: pointer;
      &.active {
        box-shadow: 0 0 20px #f00;
        cursor: move;
      }
    }
  }
}
</style>
