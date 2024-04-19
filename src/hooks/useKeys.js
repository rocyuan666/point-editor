import { useEditorStore } from '@/stores/editor'
const editorStore = useEditorStore()

/**
 * 快捷键管理
 */
export function useKeys() {
  window.addEventListener('keydown', function (e) {
    if (e.ctrlKey && e.altKey && e.key === 'c') {
      // 清空元素
      e.preventDefault()
      editorStore.clear()
    } else if (e.ctrlKey && e.key === 'd') {
      // 复制
      e.preventDefault()
      editorStore.copyElement()
    } else if (e.key === 'Delete') {
      // 删除
      e.preventDefault()
      editorStore.removeElement()
    } else if (e.ctrlKey && e.key === 's') {
      // 保存json
      e.preventDefault()
      editorStore.exportJson()
    }
  })
}
