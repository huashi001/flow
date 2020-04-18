// 布尔值
let bool: boolean = true

// 数字
let num: number = 33
num = 0xaaa // 支持二进制、八进制、十六进制

// 字符串
let str: string = '123'

// 数组
let arr: number[]
let arr2: Array<number>
let arr3: (string | number)[]

// 元组
let tuple: [string, number, boolean]
tuple = ['', 4, true]

// 枚举
enum Colors {
  RED,
  GREEN = 5,
  BLUE
}
console.log(Colors['GREEN'], Colors[0])

// any

// void

// null以及undefined

// never

// object

// 断言类型（类型保护）