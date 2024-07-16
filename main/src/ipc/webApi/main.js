const fs = require('node:fs')
const { shell, dialog } = require('electron')
/**
 * 主进程处理业务 暴漏给渲染进程的方法
 */

/**
 * 主进程渲染进程通信demo
 * @param {import("electron").IpcMainInvokeEvent} event - IpcRendererEvent对象继承Event
 * @param {any} param - 参数
 * @returns {Promise}
 */
function demo(event, param) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('[web]:', param)
      resolve(`[${new Date().toLocaleString()}]:${param}`)
    }, 1000)
  })
}

/**
 * 文件资源管理器打开目录
 * @param event
 * @param path
 */
function openExplorer(event, path) {
  shell.openPath(path)
}

/**
 * 选择Ejs文件路径
 */
function getImagePath(event, title = '请选择文件') {
  return new Promise((resolve, reject) => {
    dialog
      .showOpenDialog({
        title: title,
        filters: [
          { name: 'Images', extensions: ['jpg', 'png', 'gif'] },
          { name: 'All Files', extensions: ['*'] },
        ],
        properties: ['openFile'],
      })
      .then((result) => {
        if (result.canceled) {
          reject('取消选择')
        } else {
          const imageBase64List = []
          for (const filePath of result.filePaths) {
            const imageBuffer = fs.readFileSync(filePath)
            const imageData = `data:image/jpeg;base64,${imageBuffer.toString('base64')}`
            imageBase64List.push(imageData)
          }
          resolve(imageBase64List)
        }
      })
      .catch((err) => {
        reject('失败' + err)
      })
  })
}

module.exports = {
  demo,
  openExplorer,
  getImagePath,
}
