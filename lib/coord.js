class Coord {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  plus(new_coord) {
    this.x += new_coord.x;
    this.y += new_coord.y;
    //
    return new Coord(this.x, this.y);
  }

  withinDimensions(player) {
    return (
      this.x >= 300 && (this.x + player.width) <= 500
    );
  }

  inPlatformHeight(prev_pos, platform) {
    if (prev_pos < platform) {
      return false;
    }
    const range = [platform.pos.y - 5, platform.pos.y + 5];
    const platform_y = this.y + 35;
    return platform_y > range[0] && platform_y < range[1];
  }

  onPlatformWidth(platform) {
    return (
      platform.pos.x < (this.x + 20) &&
      (platform.pos.x + platform.width > this.x)
    );
  }
}

export default Coord;
