
import Options from './options'
export default class Spirit {
  public img: string
  public sx: number
  public sy: number
  public x: number
  public y: number
  public w: number
  public h: number
  public rotation: number
  public scale: number
  public speed: number
  public tick: number
  public max_tick: number
  public frame: number
  public max_frame: number
  constructor (options: Options) {
    this.img = options.img
    this.sx = options.sx
    this.sy = options.sy
    this.x= options.x
    this.y = options.y
    this.w = options.w
    this.h = options.h
    this.rotation = options.rotation || 0
    this.scale = options.scale || 0
    this.speed = options.speed || 0
    this.tick = 0
    this.max_tick = 0
    this.frame = 0
    this.max_frame = 0
  }
  draw (gd: any) {
    gd.save()
    gd.translate(this.x, this.y)
    gd.rotate(this.rotation * Math.PI / 180)
    gd.drawImage(
      this.img,
      this.sx, this.sy, this.w, this.h,
      - this.w / 2, -this.h / 2, this.w, this.h
    )
    gd.restore()
  }
  move () {
    let speed_x = this.speed * Math.sin(this.rotation * Math.PI/180)
    let speed_y = this.speed * Math.cos(this.rotation * Math.PI/180)
    this.x += speed_x
    this.y -= speed_y
  }
  setFrame (frame: number) {
    this.sy = frame * this.h
  }
  nextFrame () {
    this.tick++
    if(this.tick === this.max_tick) {
      this.tick = 0
      this.frame++
      if (this.frame === this.max_frame) {
        this.frame = 0
      }
      this.setFrame(this.frame)
    }
  }
  outOfScreen (W: number, H: number) {
    if (
      this.x < 0 - this.w - 50 ||
      this.x > W + this.w + 50 ||
      this.y < 0 - this.y - 50 ||
      this.y > H + this.y + 50
    ) {
      return true
    } else {
      return false
    }
  }
}