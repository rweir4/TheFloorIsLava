import Coord from './coord';

class Player {
  constructor(ctx) {
    this.dir = 'R';
    this.pos = new Coord(55, 365);
    this.ctx = ctx;
    this.height = 35;
    this.width = 20;
    this.velocity = 73;
    this.distance = 0;

    this.falling = false;
    this.jumping = false;
  }

  walk(key) {
    if (this.pos.withinDimensions(this) || this.velocityDiffers(key)) {
      const dir = Player.MOVES[key];
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
    console.log('i\'m jumping');
  }

  draw() {
    this.ctx.fillStyle="#4253f4";
    this.ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
  }
}

Player.COORDS = {
  "L": new Coord(-5, 0),
  "R": new Coord(5, 0),
  'fall': new Coord(0, 5)
};

Player.MOVES = {
  32: "Space",
  37: "L",
  39: "R"
};

export default Player;
