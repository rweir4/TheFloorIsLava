import Platform from './platform';
import Player from './player';
import Coord from './coord';

class Board {
  constructor(ctx) {
    this.ctx = ctx;
    const coord = new Coord(50, 400);
    this.platforms = [new Platform(
      coord,
      { width: 200, height: 20 },
      this.ctx
    )];
    this.player = new Player(this.ctx);

    this.setupPieces();

    this.playerOnPlatform = this.playerOnPlatform.bind(this);
    this.draw = this.draw.bind(this);
    // this.createPlatforms = this.createPlatforms.bind(this);
  }

  setupPieces() {
    window.addEventListener("keydown", (key) => {
      const keyCode = key.keyCode;

      if ([37, 39].includes(keyCode)) {
        this.player.walk(keyCode);
        this.platforms.forEach(platform => {
          platform.transform(keyCode);
        });
      } else if (keyCode === 32) {
        this.player.jump();
      }
    });

    this.createPlatforms();
  }

  deletePlatforms() {
    //if platform[3] is at x = 0, delete this.platforms.slice(0,3)
  }


  createPlatforms() {
    let pos;
    let size;
    let prev_pos;
    let prev_platform;

    for (let i = 0; i < Board.NUM_PLATFORMS; i++) {
      prev_platform = this.platforms[this.platforms.length - 1];
      prev_pos = prev_platform.pos.x + prev_platform.width + 30;

      const pos = new Coord(
        Math.floor(Math.random() * ((prev_pos + 100) - prev_pos) + prev_pos),
        Math.floor(Math.random() * (450 - 200) + 200)
      );

      const size = {
        width: Math.floor(Math.random() * (200 - 30) + 30),
        height: 20
      };
      this.platforms.push(new Platform(pos, size, this.ctx));
    }
  }

  playerOnPlatform() {
    const player = this.player;
    for (let i = 0; i < this.platforms.length; i++) {
      if ((player.pos.y + player.height) === this.platforms[i].pos.y &&
        player.pos.onPlatformWidth(this.platforms[i])) {
        return true;
      }
    }
    return false;
  }

  toggleFalling() {
    if (this.velocity === 0 && this.player.jumping) {
      this.player.falling = true;
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, 800, 505);
    this.platforms.forEach(platform => {
      platform.draw();
    });

    // if (!this.falling) {
    //   this.velocity = this.velocity - 355;
    //   this.distance = this.velocity + Math.floor(0.5 * -355);
    // } else {
    //   this.velocity = this.velocity + 355;
    //   this.distance = this.velocity + Math.floor(0.5 * 355);
    // }

    // this.player.draw(this.distance);
    this.player.draw();

    if (this.playerOnPlatform()) {
      console.log('on land!!!');
    } else {

      if (!this.jumping) {
        this.player.fall();
      }
    }

    if (this.player.pos.y >= 505) {
      console.log('game over');
    }

    const last_platform_x = this.platforms[this.platforms.length - 1].pos.x;
    if (last_platform_x === 800) {
      this.createPlatforms();
    }

    window.requestAnimationFrame(this.draw);
  }
}

Board.NUM_PLATFORMS = 4;

export default Board;
