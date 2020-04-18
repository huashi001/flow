/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-05 00:25:01
 * @LastEditTime: 2019-10-13 00:23:28
 * @LastEditors: Please set LastEditors
 */
import './style/index.css'
import Spirit from './script/Spirit'
import Bullet from './script/Bullet'
import Fish from './script/Fish'
import Cannon from './script/Cannon'
import Button from './script/Button'
import { getKeyValueArray } from './study/tool'
console.log(1111, getKeyValueArray('a:bgggg '))
console.log(1111, getKeyValueArray(':bgggg '))
console.log(1111, getKeyValueArray('a:'))
console.log(1111, getKeyValueArray(' a : bgggg '))
console.log(1111, getKeyValueArray(':'))

function loadImage (path: string) {
  return new Promise((resolve, reject) => {
    var oImg = new Image()
    oImg.src = path
    oImg.onload = function () {
      resolve(oImg)
    }
    oImg.onerror = function (err) {
      reject(err)
    }
  })
}
interface ImgData {
  [props: string]: any
}
let res: ImgData = {}
async function loadResource() {
  interface srcInfo {
    [props: string]: string
  }
  let src: srcInfo={
    bottom: 'bottom.json',
    bullet: 'bullet.json',
    cannon: 'cannon.json',
    coin: 'coin.json',
    fish: 'fish.json',
    number: 'number.json',
    web: 'web.json'
  }
  let imgs: ImgData = {}
  for (const key in src) {
    // 加载json
    let json = require(`./assets/${src[key]}`)
    let _temp: ImgData = {}
    for (let name in json) {
      let oImg = await loadImage(require('./assets/' + json[name]['src']))
      _temp[name] = {
        img: oImg,
        frame: json[name]['frame']
      }
    }
    res[key] = _temp;
    window.__g_resource = res
  }
  console.log(res, 'res')
}

async function init() {
  await loadResource()
  let myCanvas = <HTMLCanvasElement>document.getElementById('c1')
  let ctx = myCanvas.getContext('2d')
  const W: number = myCanvas.width
  const H: number = myCanvas.height
  // fish
  let fishs: Fish[] = []
  setInterval(() => {
    if (Math.random() < 0.1) {
      let fish = new Fish(Math.floor(Math.random() * (6 - 1) + 1))
      if (Math.random() < 0.5) {
        fish.x = -100
        fish.y = Math.floor(Math.random() * (600))
        fish.rotation = 90
      } else {
        fish.y = Math.floor(Math.random() * 600)
        fish.x = 900
        fish.rotation = -90
      }
      fishs.push(fish)
    }
  }, 50)
  // bottom_bar
  let data_bar = window.__g_resource['bottom'].bottom_bar
  let bottom_bar = new Spirit({
    img: data_bar.img,
    w: data_bar.frame.w,
    h: data_bar.frame.h,
    sx: data_bar.frame.x,
    sy: data_bar.frame.y,
    x: 400,
    y: 566
  })
  // connon
  let connon = new Cannon(5)
  connon.x = 442
  connon.y = 562
  // connon跟着鼠标转
  myCanvas.onmousemove = function (ev) {
    let a = ev.offsetX - connon.x
    let b = ev.offsetY - connon.y
    if (ev.offsetY < 550) {
      connon.rotation = Math.atan2(b, a) / Math.PI * 180 + 90
    }
  }
  // 按钮
  let buttonMinus = new  Button(window.__g_resource['bottom'].cannon_minus, window.__g_resource['bottom'].cannon_minus_down)
  let buttonPlus =  new  Button(window.__g_resource['bottom'].cannon_plus, window.__g_resource['bottom'].cannon_plus_down)
  buttonMinus.x = 442 - 60
  buttonMinus.y = 580
  buttonPlus.x = 442 + 60
  buttonPlus.y = 580
  myCanvas.onmousedown = function (ev) {
    let minus: boolean = false
    let plus: boolean = false
    if (buttonMinus.checkDown(ev.offsetX, ev.offsetY)) {
      minus = true
    }
    if (buttonPlus.checkDown(ev.offsetX, ev.offsetY)) {
      plus = true
    }
    // 换炮
    if (minus && connon.type > 1) {
      connon.setType(connon.type - 1)
    }
    if (plus && connon.type < 7) {
      connon.setType(connon.type + 1)
    }
  }
  myCanvas.onmouseup = function (ev) {
    buttonMinus.checkUp(ev.offsetX, ev.offsetY)
    buttonPlus.checkUp(ev.offsetX, ev.offsetY)
  }
  // 开炮
  let bullets: Bullet[] = []
  myCanvas.onclick = function () {
    let bullet = new Bullet(connon.type)
    bullet.x = connon.x
    bullet.y = connon.y
    bullet.rotation = connon.rotation
    bullets.push(bullet)
  }

  requestAnimationFrame(next)
  function next () {
    // clear
    (ctx as any).clearRect(0, 0, myCanvas.width, myCanvas.height)
    // move
    fishs.forEach((fish: Fish) => {
      fish.move()
      fish.nextFrame()
    })
    bullets.forEach((bullet: Bullet) => {
      bullet.move()
    })
    fishs = fishs.filter((fish: Fish) => !fish.outOfScreen(W, H))
    bullets = bullets.filter((bullet: Bullet) => !bullet.outOfScreen(W, H))
    console.log(fishs.length, bullets.length)
    // draw
    bottom_bar.draw(ctx)
    fishs.forEach((fish: Fish) => {
      fish.draw(ctx)
    })
    bullets.forEach((bullet: Bullet) => {
      bullet.draw(ctx)
    })
    connon.draw(ctx)
    buttonMinus.draw(ctx)
    buttonPlus.draw(ctx)

    requestAnimationFrame(next)
  }
}
// init()
