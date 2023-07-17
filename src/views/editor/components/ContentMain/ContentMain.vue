<template>
  <div class="content-main" ref="refContentMain" :style="scaleStyle.style">
    <img
      v-if="editorStore.bgImg"
      ref="bgImg"
      :src="rocRequire(`@/assets/images/${editorStore.bgImg}`)"
      alt="背景"
      @load="handleLoad"
    />
    <div
      v-if="editorStore.bgImg"
      class="screen-box"
      :style="{ width: state.screen.width, height: state.screen.height }"
      @mousemove="getXY"
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
          :src="rocRequire(`@/assets/images/${item.src}`)"
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
import { ref, reactive, nextTick, watch, onMounted } from 'vue'
import { useEditorStore } from '@/stores/editor'
import { rocRequire } from '@/utils/getStaticAssets'
import { addPx, clearPx } from '@/utils/utils'
import { handleKeys } from '@/utils/handleKeys'

// 快捷键
handleKeys()

const editorStore = useEditorStore()
const state = reactive({
  screen: {
    width: '100%',
    height: '100%',
    widthNum: 0,
    heightNum: 0,
  },
  mouseElXY: {
    x: 0,
    y: 0,
  },
})

/**
 * 拖拽结束 更新 xy 值
 */
function handleDragend(e) {
  const oldX = editorStore.activeElementObj.style.left
  const oldY = editorStore.activeElementObj.style.top
  if (Object.keys(editorStore.activeElementObj).length) {
    // 拖动后的元素xy = 旧位置 + 偏移位置 - 鼠标在元素上的偏移位置
    editorStore.activeElementObj.style.left = addPx(clearPx(oldX) + e.offsetX - state.mouseElXY.x)
    editorStore.activeElementObj.style.top = addPx(clearPx(oldY) + e.offsetY - state.mouseElXY.y)
    // 修改工作区数据
    editorStore.editElement()
  }
}

/**
 * 鼠标在当前选中的元素上的偏移位置
 * @param {Event} e event对象
 */
function handleMousedown(e) {
  state.mouseElXY.x = e.offsetX
  state.mouseElXY.y = e.offsetY
}

/**
 * 获取鼠标位置
 * @param {Object} e event对象
 */
function getXY(e) {
  editorStore.handleMousemoveXY(e.offsetX, e.offsetY)
}

// 设置自适应窗口设置
const scaleStyle = reactive({
  style: {},
})
const refContentMain = ref(null)
const scale = ref(1)
function getScale() {
  const ww = refContentMain.value.clientWidth / state.screen.widthNum
  const hh = refContentMain.value.clientHeight / state.screen.heightNum
  const resScale = ww < hh ? ww : hh
  // const resScale = ww
  refContentMain.value.style.setProperty('--scale', resScale)
  return resScale
}

watch(
  () => editorStore.scale,
  () => {
    handleLoad()
  }
)

const bgImg = ref(null)
/**
 * 背景图加载完成
 */
function handleLoad() {
  if (editorStore.scale) {
    scaleStyle.style = {
      transform: 'scale(var(--scale))',
    }
  } else {
    scaleStyle.style = {
      overflow: 'auto',
    }
  }
  state.screen.width = `${bgImg.value.width}px`
  state.screen.height = `${bgImg.value.height}px`
  state.screen.widthNum = bgImg.value.width
  state.screen.heightNum = bgImg.value.height
  nextTick(() => {
    scale.value = getScale()
  })
}
</script>

<style lang="scss" scoped>
.content-main {
  -webkit-user-select: none;
  user-select: none;
  position: relative;
  transform-origin: left top;
  .screen-box {
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
