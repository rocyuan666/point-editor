import { defineStore } from 'pinia'
import { createUUID } from 'roc-utils'
import componentsJson from '@/config/componentsData'

export const useEditorStore = defineStore('editor', {
  state: () => ({
    mouse: {
      x: 0,
      y: 0,
    },
    bgImg: localStorage.getItem('bgImg') || '',
    activeElementObj: {},
    allElementJson: JSON.parse(localStorage.getItem('allElementJson')) || [],
    componentsJson,
  }),
  getters: {},
  actions: {
    // 修改工作区中的元素
    editElement() {
      for (let i = 0; i < this.allElementJson.length; i++) {
        if (this.allElementJson[i].id === this.activeElementObj.id) {
          this.allElementJson.splice(i, 1, this.activeElementObj)
          break
        }
      }
      localStorage.setItem('allElementJson', JSON.stringify(this.allElementJson))
    },
    // 工作区中添加元素
    addElement(elObj) {
      const elementObj = JSON.parse(JSON.stringify(elObj))
      elementObj['id'] = createUUID().substring(createUUID().length - 10)
      this.allElementJson.push(elementObj)
      localStorage.setItem('allElementJson', JSON.stringify(this.allElementJson))
    },
    // 工作区中删除元素
    removeElement() {
      this.allElementJson = this.allElementJson.filter((item) => {
        return item.id != this.activeElementObj.id
      })
      localStorage.setItem('allElementJson', JSON.stringify(this.allElementJson))
      this.remoteActive()
    },
    // 取消选中的元素
    remoteActive() {
      this.activeElementObj = {}
    },
    // 清空工作区
    clear() {
      this.remoteActive()
      this.allElementJson = []
      localStorage.setItem('allElementJson', JSON.stringify(this.allElementJson))
    },
    // 处理鼠标xy轴
    handleMousemoveXY(x, y) {
      this.mouse.x = x
      this.mouse.y = y
    },
    // 清空背景图
    clearBgImg() {
      this.bgImg = ''
      localStorage.setItem('bgImg', this.bgImg)
      this.clear()
    },
    // 添加背景图
    addBgImg(fileName) {
      this.bgImg = fileName
      localStorage.setItem('bgImg', this.bgImg)
    },
  },
})
