import Platform from './platform';
import Player from './player';
import Coord from './coord';
import Timer from './timer';

class Board {
  constructor(ctx) {
    this.ctx = ctx;
    const coord = new Coord(300, 400);
    this.platforms = [new Platform(
      coord,
      { width: 200, height: 13 },
      this.ctx
    )];
    this.timer = new Timer(this.ctx);
    this.player = new Player(this.ctx);

    this.setupPieces();

    this.playerOnPlatform = this.playerOnPlatform.bind(this);
    this.draw = this.draw.bind(this);

    window.addEventListener("keydown", key => {
      if (key.keyCode === 77) {
        menu.classList.toggle("hide");
        canvas.classList.toggle("hide");
        this.timer.pause = this.timer.pause ? false : true;
      }
    });
  }

  setupPieces() {
    window.addEventListener("keydown", (key) => {
      const keyCode = key.keyCode;
      this.player.currentKey = keyCode;

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
      this.currentKey = keyCode;

      if (keyCode === 32) {
        if (!this.player.second_jump) {
          // if (this.player.jumping) {

            this.player.second_jump = true;
          // }
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

    //

    for (let i = 0; i < Board.NUM_PLATFORMS; i++) {
      prev_platform = this.platforms[this.platforms.length - 1];
      prev_pos = prev_platform.pos.x + prev_platform.width + 30;

      const pos = new Coord(
        Math.floor(Math.random() * ((prev_pos + 200) - prev_pos) + prev_pos),
        Math.floor(Math.random() * (450 - 200) + 200)
      );

      const size = {
        width: Math.floor(Math.random() * (200 - 30) + 30),
        height: 13
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

  createOffscreenPlatforms() {
    const last_platform_x = this.platforms[this.platforms.length - 1].pos.x;
    // const second_last_platform_x = this.platforms[this.platforms.length - 2].pos.x;
    if (last_platform_x <= 800 && last_platform_x > 795) {
      return this.createPlatforms();
    }
  }

  gameUI() {
    const canvas = document.querySelector('canvas');
    const menu = document.getElementById('menu');
    if (this.player.pos.y >= 505 || this.timer.time < 0) {

      canvas.classList.toggle("hide");
      menu.classList.toggle("hide");
      return alert(message);

    } else if (this.platforms.length === 30) {
      menu.classList.toggle("hide");
      canvas.classList.toggle("hide");
      return alert('YOU WON!');
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, 800, 505);
    this.timer.draw();
    if (!this.timer.pause) {
      this.timer.time -= 0.017;
    }

    this.platforms.forEach(platform => {
      platform.draw();
    });

    if (this.player.jumping) {
      this.player.velocity_y -= (9.81 * 0.017);
      this.player.distance = this.player.velocity_y - Math.floor(0.5 * 9.81 * Math.pow(0.017, 2));
      this.platforms.forEach(platform => {
        platform.transform(32, this.player.velocity_x, this.player.jumping, this.player.walking);
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
      // this.player.velocity_y -= (9.81 - 0.1);
      // this.player.distance = this.player.velocity_y - Math.floor(0.5 * 9.81 * Math.pow(0.017, 2));
      this.player.fall();
    }

    this.isPlayerFalling();
    this.player.draw();

    if (this.player.pos.y >= 505 || this.timer.time < 0) {
      this.gameUI('GAME OVER');
    } else if (this.platforms.length === 30) {
      this.gameUI('YOU WON!');
    }

    this.createOffscreenPlatforms();
    window.requestAnimationFrame(this.draw);
  }
}

Board.NUM_PLATFORMS = 10;

export default Board;
