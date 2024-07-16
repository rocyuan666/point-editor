/**
 * 渲染进程 ipcRenderer.invoke 处理 与 ipcMain.handle 配合使用
 */
const { contextBridge, ipcRenderer } = require('electron')

/**
 * 暴露给 window 的 api
 * 访问：window.rocApi.xxx
 * 使用 preload 需要开启 webPreferences.contextIsolation
 */
contextBridge.exposeInMainWorld('rocApi', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  demo: (param) => ipcRenderer.invoke('demoName', param),
  openExplorer: (param) => ipcRenderer.invoke('openExplorer', param),
  getImagePath: (param) => ipcRenderer.invoke('getImagePath', param),
})
