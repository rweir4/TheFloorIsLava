class Platform {
  constructor(pos, size, ctx) {
    this.ctx = ctx;
    this.x = pos.x;
    this.y = pos.y;
    this.width = size.width;
    this.height = size.height;
  }

  update() {
    
  }

  draw() {
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

export default Platform;
