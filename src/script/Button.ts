import Spirit from './Spirit'
export default class Button extends Spirit {
  data: any
  data_down: any
  constructor (data: any, data_down: any) {
    super({
      img: data.img,
      sx: data.frame.x,
      sy: data.frame.y,
      w: data.frame.w,
      h: data.frame.h,
      x: 0,
      y: 0
    })
    this.data = data
    this.data_down = data_down
  }
  private check (x: number, y: number) {
    if(x >= this.x - this.w/2 && x < this.x + this.w/2 &&
      y >= this.y - this.h/2  && y < this.y + this.h/2 
    ) {
      return true
    } else {
      return false
    }
  }

  checkDown (x: number, y: number) {
    if (this.check(x, y)) {
      this.img = this.data_down.img
      this.sx = this.data_down.frame.x
      this.sy = this.data_down.frame.y
      this.w = this.data_down.frame.w
      this.h = this.data_down.frame.h
      return true
    } else {
      return false
    }
  }

  checkUp (x: number, y: number) {
    if (this.check(x, y)) {
      this.img = this.data.img
      this.sx = this.data.frame.x
      this.sy = this.data.frame.y
      this.w = this.data.frame.w
      this.h = this.data.frame.h
      return true
    } else {
      return false
    }
  }
}