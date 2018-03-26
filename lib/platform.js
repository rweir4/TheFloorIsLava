import Coord from './coord';

class Platform {
  constructor(pos, size, ctx) {
    this.ctx = ctx;
    this.pos = pos;
    this.width = size.width;
    this.height = size.height;
  }

  transform(key, velocity, jumping, walking) {
    let dir;
    if (key !== 32) {
      dir = Platform.MOVES[key];
    } else {
      if (velocity > 0) {
        dir = jumping && walking ? 'RF' : 'R';
      } else {
        dir = jumping && walking ? 'LF' : 'L';
      }
    }

    this.pos.plus(Platform.COORDS[dir]);
  }

  draw() {
    this.ctx.fillStyle="black";
    this.ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
  }
}

Platform.COORDS = {
  "L": new Coord(3, 0),
  "R": new Coord(-3, 0),
  "LF": new Coord(3,0),
  "RF": new Coord(-3, 0)
};

Platform.MOVES = {
  32: "Space",
  37: "L",
  39: "R"
};

export default Platform;
