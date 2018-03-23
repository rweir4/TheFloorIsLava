class Coord {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  plus(new_coord) {
    this.x += new_coord.x;
    this.y += new_coord.y;
  }

  withinDimensions(player) {
    const dim_x = 800;
    const dim_y = 505;

    return (
      this.x > 0 && (this.x + player.width) < 800 &&
      (this.y + player.height) > 0
    );
  }

  onPlatformWidth(platform) {
    return (
      platform.pos.x < this.x &&
      (platform.pos.x + platform.width > this.x)
    );
  }
}

export default Coord;
