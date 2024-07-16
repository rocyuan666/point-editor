/**
 * ipcMain.handle 定义 与 ipcRenderer.invoke 配合使用
 */
const { ipcMain } = require('electron')
const { demo, openExplorer, getImagePath } = require('./webApi/main')

function defineIpcMain() {
  // 主进程渲染进程通信
  ipcMain.handle('demoName', demo)
  ipcMain.handle('openExplorer', openExplorer)
  ipcMain.handle('getImagePath', getImagePath)
}

module.exports = {
  defineIpcMain,
}
