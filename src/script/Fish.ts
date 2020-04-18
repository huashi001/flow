import Spirit from './Spirit'

export default class Fish extends Spirit {
  constructor(type: number) {
    let data = window.__g_resource.fish[`fish${type}`]
    super({
      img: data.img,
      sx: data.frame.x,
      sy: data.frame.y,
      x: 0,
      y: 0,
      w: data.frame.w,
      h: data.frame.h,
      rotation: 90,
      scale: 0,
      speed: Math.random() * 0.5 + 1.5
    })
    this.max_tick = 10
    this.max_frame = 4
  }
  draw (gd: any) {
    this.rotation -= 90
    super.draw(gd)
    this.rotation += 90
  }
}