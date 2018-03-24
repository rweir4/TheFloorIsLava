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

    this.falling = false;
    this.jumping = false;
  }

  walk(key) {
    if (this.pos.withinDimensions(this) || this.velocityDiffers(key)) {
      const dir = Player.MOVES[key];
      if (dir === 'L') {
        this.velocity_x = -73;
      } else {
        this.velocity_x = 73;
      }
      this.pos.plus(Player.COORDS[dir]);
    }
  }

  fall() {
    this.pos.plus(Player.COORDS.fall);
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
        up = new Coord(5, -1 * d);
        this.pos.plus(up);
      } else {
        up = new Coord(-5, -1 * d);
        this.pos.plus(up);
      }
    } else {
      let down;
      if (this.velocity_x > 0) {
        down = new Coord(5, -1 * d);
        return this.pos.plus(down);
      } else {
        down = new Coord(-5, d);
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
  "L": new Coord(-5, 0),
  "R": new Coord(5, 0),
  'fall': new Coord(0, 5),
  'JR': new Coord(0, -5),
  'JL': new Coord(-5, -5),
  'FR': new Coord(5, 5),
  'FL': new Coord(-5, 5)
};

Player.MOVES = {
  32: "Space",
  37: "L",
  39: "R"
};

export default Player;
