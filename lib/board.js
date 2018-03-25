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
  }

  setupPieces() {
    window.addEventListener("keydown", (key) => {
      const keyCode = key.keyCode;

      if ([37, 39].includes(keyCode)) {
        this.player.walking = true;
        this.player.walk(keyCode);
        this.platforms.forEach(platform => {
          platform.transform(keyCode);
        });
      } else if (keyCode === 40 && this.player.jumping) {
        this.player.falling = true;
        this.player.fall();
      }
    });

    window.addEventListener("keyup", (key) => {
      if ([37, 39].includes(key.keyCode)) {
        this.player.walking = false;
      }
    });

    this.addJumpListener();
    this.createPlatforms();
  }

  addJumpListener() {
    window.addEventListener("keydown", (key) => {
      const keyCode = key.keyCode;

      if (keyCode === 32) {
        if (!this.player.second_jump) {
          if (this.player.jumping) {

            this.player.second_jump = true;
          }
          this.player.falling = false;
          this.player.jumping = true;
          this.player.velocity_y = 8;
        }
      }
    });
  }

  deletePlatforms() {
    //if platform[3] is at x = 0, delete this.platforms.slice(0,3)
  }


  createPlatforms() {
    let pos;
    let size;
    let prev_pos;
    let prev_platform;

    // debugger

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
      if (player.pos.inPlatformHeight(player.prev_pos, this.platforms[i]) &&
        player.pos.onPlatformWidth(this.platforms[i])) {
        this.player.pos.y = this.platforms[i].pos.y - 35;
        this.player.jumping = false;
        this.player.second_jump = false;
        this.player.falling = false;
        return true;
      }
    }
    return false;
  }

  isPlayerFalling() {
    if (this.playerOnPlatform()) {
      this.player.jumping = false;
    } else if (this.player.falling || !this.player.jumping) {
      this.player.fall();
      this.player.jumping = false;
    }
  }

  isGameOver() {
    if (this.player.pos.y >= 505) {
      return true;
    }
  }

  createOffscreenPlatforms() {
    const last_platform_x = this.platforms[this.platforms.length - 1].pos.x;
    if (last_platform_x === 800) {
      return this.createPlatforms();
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, 800, 505);
    this.platforms.forEach(platform => {
      platform.draw();
    });

    if (this.player.jumping) {
      this.player.velocity_y -= (9.81 * 0.017);
      this.player.distance = this.player.velocity_y - Math.floor(0.5 * 9.81 * Math.pow(0.017, 2));
      this.platforms.forEach(platform => {
        platform.transform(32, this.player.velocity_x);
      });
      this.player.jump();
    }

    if (this.player.walking) {
      this.player.walk();
      this.platforms.forEach(platform => {
        platform.transform(32, this.player.velocity_x);
      });
    }

    if (this.player.falling) {
      this.player.velocity_y -= (9.81 - 0.1);
      this.player.distance = this.player.velocity_y - Math.floor(0.5 * 9.81 * Math.pow(0.017, 2));
      this.player.fall();
    }

    this.isPlayerFalling();
    this.player.draw();

    this.createOffscreenPlatforms();

    this.isGameOver();

    window.requestAnimationFrame(this.draw);
  }
}

Board.NUM_PLATFORMS = 4;

export default Board;
