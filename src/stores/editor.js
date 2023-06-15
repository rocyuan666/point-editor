import { defineStore } from 'pinia'
import { createUUID } from 'roc-utils'

export const useEditorStore = defineStore('editor', {
  state: () => ({
    mouse: {
      x: 0,
      y: 0,
    },
    bgImg: localStorage.getItem('bgImg') || '',
    activeElementObj: {},
    allElementJson: JSON.parse(localStorage.getItem('allElementJson')) || [],
    componentsJson: [
      {
        tag: 'p',
        name: '文本',
        value: '文本文本',
        style: {
          fontSize: '14px',
          color: '#fff',
          left: 0,
          top: 0,
        },
      },
      {
        tag: 'img',
        name: '图片',
        src: 'kuang.jpg',
        alt: '框',
        style: {
          width: '',
          height: '',
          left: 0,
          top: 0,
        },
      },
    ],
  }),
  getters: {},
  actions: {
    // 工作区中添加元素
    addElement(elementObj) {
      elementObj['id'] = createUUID()
      this.allElementJson.push(elementObj)
      localStorage.setItem('allElementJson', JSON.stringify(this.allElementJson))
    },
    // 工作区中删除元素
    removeElement() {
      // this.activeElementObj
      this.allElementJson.forEach((item, index) => {
        console.log(item)
      })
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
    },
    // 添加背景图
    addBgImg(fileName) {
      this.bgImg = fileName
      localStorage.setItem('bgImg', this.bgImg)
    },
  },
})
