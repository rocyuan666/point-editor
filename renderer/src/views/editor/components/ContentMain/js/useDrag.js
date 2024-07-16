import { ref } from 'vue'
import { useEditorStore } from '@/stores/editor'
import { addPx, clearPx } from '@/utils/utils'

const editorStore = useEditorStore()

/**
 * 处理拖拽逻辑
 */
export function useDrag() {
  const mouseElX = ref(0)
  const mouseElY = ref(0)
  /**
   * 拖拽结束 更新 xy 值
   * @param {Event} e event对象
   */
  function handleDragend(e) {
    const oldX = editorStore.activeElementObj.style.left
    const oldY = editorStore.activeElementObj.style.top
    if (Object.keys(editorStore.activeElementObj).length) {
      // 拖动后的元素xy = 旧位置 + 移动偏移位置 - 鼠标在元素上的偏移位置
      editorStore.activeElementObj.style.left = addPx(clearPx(oldX) + e.offsetX - mouseElX.value)
      editorStore.activeElementObj.style.top = addPx(clearPx(oldY) + e.offsetY - mouseElY.value)
      editorStore.editElement()
    }
  }

  /**
   * 记录鼠标在当前选中的元素上的偏移位置，拖拽结束后需要计算
   * @param {Event} e event对象
   */
  function handleMousedown(e) {
    mouseElX.value = e.offsetX
    mouseElY.value = e.offsetY
  }

  return {
    handleDragend,
    handleMousedown,
  }
}
