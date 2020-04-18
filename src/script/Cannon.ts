import Spirit from './Spirit'
export default class Connon extends Spirit{
  public type: number
  constructor(type: number){
    let data = window.__g_resource.cannon[`cannon${type}`]
    super({
      img: data.img,
      sx: data.frame.x,
      sy: data.frame.y,
      w: data.frame.w,
      h: data.frame.h,
      x: 100,
      y: 100,
      scale: 0,
      speed: Math.random() * 3 + 1
    })
    this.type = type
  }
  setType (type: number) {
    if (type < 1 || type > 7) {
      throw new Error('type error')
    }
    this.type = type
    let data = window.__g_resource.cannon[`cannon${type}`]
    this.img = data.img,
    this.sx = data.frame.x
    this.sy = data.frame.y
    this.w = data.frame.w
    this.h = data.frame.h
  }
}