import Coord from './coord';

class Platform {
  constructor(pos, size, ctx) {
    this.ctx = ctx;
    this.pos = pos;
    this.width = size.width;
    this.height = size.height;
  }

  transform(key) {
    const dir = Platform.MOVES[key];
    this.pos.plus(Platform.COORDS[dir]);
  }

  draw() {
    this.ctx.fillStyle="black";
    this.ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
  }
}

Platform.COORDS = {
  "L": new Coord(5, 0),
  "R": new Coord(-5, 0)
};

Platform.MOVES = {
  32: "Space",
  37: "L",
  39: "R"
};

export default Platform;
