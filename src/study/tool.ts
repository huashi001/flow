/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-12 23:54:17
 * @LastEditTime: 2019-10-13 00:23:11
 * @LastEditors: Please set LastEditors
 */
/**
 * @description: 
 * @param {string} like a:b
 * @return: [a,b] 去掉首尾空格
 */
export function getKeyValueArray (str: string) {
  let firstIndex = str.indexOf(':')
  if (firstIndex === -1) {
    return []
  } else {
    // 以第一个：分割
    let left = str.substr(0, firstIndex).trim()
    let right = str.substr(firstIndex + 1, str.length).trim()
    console.log(left, right)
    return [left, right]
  }
}