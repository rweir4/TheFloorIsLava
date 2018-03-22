import Coord from './coord';

class Player {
  constructor(ctx) {
    this.dir = 'R';
    this.x = 55;
    this.y = 365;
    this.ctx = ctx;

    this.jumping = false;
  }

  onPlatform() {
    if (this.pos.equals(platform.pos)) {
      return true;
    }
    return false;
  }

  // walk(dir) {
  //   if (this.withinDimensions(this.change(Player.COORDS[dir])) {
  //
  //   }
  // }

  // jump() {
  //   const parabola = x**2
  // }

  draw() {
    this.ctx.fillStyle="#4253f4";
    this.ctx.fillRect(this.x, this.y, 20, 35);
  }
}

Player.COORDS = {
  "L": new Coord(-1, 0),
  "R": new Coord(1, 0)
};

Player.MOVES = {
  32: "Space",
  37: "L",
  39: "R"
};

export default Player;
