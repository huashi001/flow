import Spirit from './Spirit'
export default class Bullet extends Spirit {
  constructor (type: number) {
    let data = window.__g_resource.bullet[`bullet${type}`]
    super({
      img: data.img,
      sx: data.frame.x,
      sy: data.frame.y,
      w: data.frame.w,
      h: data.frame.h,
      x: 100,
      y: 100,
      scale: 0,
      speed: 10
    })
  }
}