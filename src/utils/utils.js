import { isString, isNumber } from 'roc-utils'
/**
 * 加px单位
 * @param {Number} num 数字
 * @returns 数字px
 */
export function addPx(num) {
  if (isNumber(num)) {
    return `${num}px`
  } else {
    return num
  }
}

/**
 * 取消px单位
 * @param {String} numPx 数字px 字符串
 * @returns 数字
 */
export function clearPx(numPx) {
  if (isString(numPx)) {
    return Number(numPx.replace('px', ''))
  } else {
    return numPx
  }
}
