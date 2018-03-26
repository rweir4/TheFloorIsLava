class Timer {
  constructor(ctx) {
    this.ctx = ctx;
    this.time = 31;
    this.pause = false;
  }

  draw() {
    this.ctx.font = '48px sans-serif';
    this.ctx.fillStyle = 'white';
    this.ctx.fillText(Math.floor(this.time), 10, 50);
  }
}

export default Timer;
