interface Test {
  a: 111,
  b: 222,
  [prop: string]: any
}
let test: Test = {
  a: 111,
  b: 222
}
Reflect.deleteProperty(test, 'a')
//console.log(test)
Reflect.defineProperty(test, 'c', {
  value: 444,
  enumerable: false,
  configurable: false
})
//test.c = 333333
//console.log(test.a, test.b, test.c)
// 绕过多余属性检测
interface Car {
  readonly color: string
}
let car = {color: 'red',size: 11} as Car
let car2: Car = {color: 'red'}
console.log(car2)

type AddFun = (num:number) => number
