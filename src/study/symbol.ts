let a = Symbol('a')
let b = Symbol('a')
console.log(a, b, a==b, a===b)

let prop = Symbol('name')
let p2 = Symbol('name')
let obj = {
  [prop]: 'haha',
  [p2]: 'ff',
  a: 23
}
// 下面四种均获取不到
for(let i in obj) {
  console.log(i)
}
console.log(Object.keys(obj))
console.log(Object.getOwnPropertyNames(obj))
console.log(JSON.stringify(obj))
// 获取
console.log(Object.getOwnPropertySymbols(obj))
console.log(Reflect.ownKeys(obj))
