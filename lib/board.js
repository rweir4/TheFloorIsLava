import Platform from './platform';
import Player from './player';

class Board {
  constructor(ctx) {
    this.ctx = ctx;
    this.platforms = [new Platform(
      { x: 50, y: 400 },
      { width: 200, height: 20 },
      this.ctx
    )];
    this.velocity = 73;
    this.distance = 0;
    this.falling = false;
    this.player = new Player(this.ctx);

    let pos;
    let size;
    let prev_pos;
    let prev_platform;

    for (let i = 0; i < Board.NUM_PLATFORMS; i++) {
      prev_platform = this.platforms[this.platforms.length - 1];
      prev_pos = prev_platform.x + prev_platform.width + 30;

      const pos = {
        x: Math.floor(Math.random() * ((prev_pos + 100) - prev_pos) + prev_pos),
        y: Math.floor(Math.random() * (450 - 200) + 200)
      };

      const size = {
        width: Math.floor(Math.random() * (200 - 30) + 30),
        height: 20
      };

      this.platforms.push(new Platform(pos, size, this.ctx));
    }
  }

  draw() {
    this.platforms.forEach(platform => {
      platform.draw();
    });

    // if (!this.falling) {
    //   this.velocity = this.velocity - 355;
    //   this.distance = this.velocity + Math.floor(0.5 * -355);
    // } else {
    //
    // }


    // this.player.draw(this.distance);
    this.player.draw();

    // window.requestAnimationFrame(draw);
  }
}

Board.NUM_PLATFORMS = 4;

export default Board;
