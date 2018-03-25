import Coord from './coord';

class Player {
  constructor(ctx) {
    this.dir = 'R';
    this.pos = new Coord(55, 365);
    this.ctx = ctx;
    this.height = 35;
    this.width = 20;
    this.velocity_x = Math.floor(5 / 0.017);
    this.velocity_y = 0;
    this.distance = 0;
    this.prev_pos = new Coord(55,365);

    this.walking = false;
    this.falling = false;
    this.jumping = false;
    this.second_jump = false;
  }

  walk(key) {
    if (this.pos.withinDimensions(this) || this.velocityDiffers(key)) {

      let dir;
      if (key) {
        dir = Player.MOVES[key];
      } else {
        if (this.velocity_x > 0) {
          dir = 'R';
        } else {
          dir = 'L';
        }
      }

      if (dir === 'L') {
        this.velocity_x = -73;
      } else {
        this.velocity_x = 73;
      }

      this.prev_pos = this.pos;
      this.pos.plus(Player.COORDS[dir]);
    }
  }

  fall() {
    // const d = this.distance;
    // this.pos.plus(new Coord(0, -1 * d));
    this.pos.plus(new Coord(0, 5));
  }

  velocityDiffers(key) {
    return (
      (this.pos.x === 0 && Player.MOVES[key] === 'R') ||
      (this.pos.x + this.width === 800 && Player.MOVES[key] === 'L')
   );
  }

  jump() {
    const d = this.distance;
    if (this.velocity_y > 0) {
      let up;
      if (this.velocity_x > 0) {
        up = new Coord(3, -1 * d);
        this.pos.plus(up);
      } else {
        up = new Coord(-3, -1 * d);
        this.pos.plus(up);
      }
    } else {
      let down;
      if (this.velocity_x > 0) {
        down = new Coord(3, -1 * d);
        return this.pos.plus(down);
      } else {
        down = new Coord(-3, -1 * d);
        return this.pos.plus(down);
      }
    }
  }

  draw() {
    this.ctx.fillStyle="#4253f4";
    this.ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
  }
}

Player.COORDS = {
  "L": new Coord(-3, 0),
  "R": new Coord(3, 0),
  'fall': new Coord(0, 3),
};

Player.MOVES = {
  32: "Space",
  37: "L",
  39: "R",
  40: 'fall'
};

export default Player;
