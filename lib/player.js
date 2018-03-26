import Coord from './coord';

class Player {
  constructor(ctx) {
    this.dir = 'R';
    this.pos = new Coord(300, 365);
    this.ctx = ctx;
    this.height = 35;
    this.width = 20;
    this.velocity_x = Math.floor(5 / 0.017);
    this.velocity_y = 0;
    this.distance = 0;
    this.prev_pos = new Coord(300,365);

    this.walking = false;
    this.falling = false;
    this.jumping = false;
    this.second_jump = false;
    this.currentKey = 0;
  }

  walk(key) {

    let dir;
    if (key) {
      dir = Player.MOVES[key];
    } else {
      dir = this.velocity_x > 0 ? 'R' : 'L';
    }

    if (dir === 'L') {
      this.velocity_x = -73;
    } else {
      this.velocity_x = 73;
    }

    const prev_pos = new Coord(this.pos.x, this.pos.y);
    if (prev_pos.plus(Player.COORDS[dir]).withinDimensions(this)) {
      console.log(this.pos);
      return this.pos.plus(Player.COORDS[dir]);
    } else {
      return this.pos.plus(new Coord(0, 0));
    }
  }

  fall() {
    // const d = this.distance;
    // this.pos.plus(new Coord(0, -1 * d));
    this.pos.plus(Player.COORDS.fall);
  }

  jump() {
    const d = this.distance;
    let movement;
    if (this.velocity_y > 0) {
      movement = (this.velocity_x > 0) ? new Coord(2, -1 * d) : new Coord(-2, -1 * d);
    } else {
      movement = (this.velocity_x > 0) ? new Coord(2, -1 * d) : new Coord(-2, -1 * d);
    }

    const prev_pos = new Coord(this.pos.x, this.pos.y);
    if (prev_pos.plus(movement).withinDimensions(this)) {
      return this.pos.plus(movement);
    } else {
      return this.pos.plus(new Coord(0, -1 * d));
    }
  }

  draw() {
    this.ctx.fillStyle="#4253f4";
    this.ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
  }
}

Player.COORDS = {
  "L": new Coord(-2, 0),
  "R": new Coord(2, 0),
  'fall': new Coord(0, 3),
};

Player.MOVES = {
  32: "Space",
  37: "L",
  39: "R",
  40: 'fall'
};

export default Player;
