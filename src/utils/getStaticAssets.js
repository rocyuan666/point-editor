/**
 * 经过打包处理的文件路径获取，支持"@/"别名 与 assets/...直接写的方式
 * @param {String} filePath 相对于src的文件路径
 * @returns 完整的路径
 */
export function rocRequire(filePath) {
  let url = ''
  if (filePath.indexOf('@/') !== -1) {
    const newFilePath = filePath.replace('@/', '')
    url = new URL(`../${newFilePath}`, import.meta.url)
  } else {
    url = new URL(`../${filePath}`, import.meta.url)
  }
  return url.href
}

/**
 * 文件路径转换
 * @param {String} path 文件名
 * @returns 正确文件全路径
 */
export function handlePath(path) {
  if (import.meta.env.DEV) {
    // 开发模式
    return rocRequire(`@/assets/images/${path}`)
  } else {
    // 生产模式
    return `/static/${path}`
  }
}
