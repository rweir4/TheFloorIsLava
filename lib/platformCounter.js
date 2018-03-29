class PlatformCounter {
  constructor(ctx) {
    this.ctx = ctx;
    this.count = 0;
  }

  draw() {
    this.ctx.font = '20px sans-serif';
    this.ctx.fillStyle = 'white';
    this.ctx.fillText('SCORE', 720, 50);
    this.ctx.font = '48px sans-serif';
    this.ctx.fillStyle = 'white';
    this.ctx.fillText(Math.floor(this.count), 740, 110);
  }
}

export default PlatformCounter;
