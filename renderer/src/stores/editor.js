import { defineStore } from 'pinia'
import { createUUID } from 'roc-utils'
import _ from 'lodash'
import componentsJson from '@/config/componentsData'
import FileSaver from 'file-saver'

export const useEditorStore = defineStore('editor', {
  state: () => ({
    mouse: {
      x: 0,
      y: 0,
    },
    bgImg: localStorage.getItem('bgImg') || '',
    activeElementObj: {},
    allElementJson: localStorage.getItem('allElementJson')
      ? JSON.parse(localStorage.getItem('allElementJson'))
      : [],
    componentsJson,
    scale:
      localStorage.getItem('scale') == 'null'
        ? true
        : localStorage.getItem('scale') == 'false'
        ? false
        : true,
  }),
  getters: {},
  actions: {
    // 导出数据
    exportJson() {
      const dataList = JSON.parse(JSON.stringify(this.allElementJson))
      // dataList.forEach((item) => {
      //   delete item.src
      // })
      const blob = new Blob([JSON.stringify(dataList)], {
        type: 'text/json;charset=utf-8',
      })
      FileSaver.saveAs(blob, 'data.json')
    },
    // 复制元素
    copyElement() {
      const copyElementObj = _.cloneDeep(this.activeElementObj)
      const addElementObj = this.addElement(copyElementObj, true)
      this.handleActive(addElementObj)
    },
    // 启用关闭自适应
    openCloseScale() {
      this.scale = !this.scale
      localStorage.setItem('scale', this.scale)
    },
    // 修改工作区中所有数据
    modifyAllElement(allData) {
      this.allElementJson = allData
      localStorage.setItem('allElementJson', JSON.stringify(this.allElementJson))
    },
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
    async addElement(elObj, isCopy = false) {
      const elementObj = JSON.parse(JSON.stringify(elObj))
      elementObj['id'] = createUUID().substring(createUUID().length - 10)
      if (!isCopy && elObj.tag === 'img') {
        const pathList = await window.rocApi.getImagePath('请选择背景图片')
        if (pathList.length) {
          elementObj['src'] = pathList[0]
        } else {
          elementObj['src'] = '@/assets/images/icon-cam.png'
        }
      }
      this.allElementJson.push(elementObj)
      localStorage.setItem('allElementJson', JSON.stringify(this.allElementJson))
      return elementObj
    },
    // 工作区中删除元素
    removeElement() {
      this.allElementJson = this.allElementJson.filter((item) => {
        return item.id != this.activeElementObj.id
      })
      localStorage.setItem('allElementJson', JSON.stringify(this.allElementJson))
      this.remoteActive()
    },
    // 处理选中的元素
    handleActive(item) {
      this.activeElementObj = item
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
