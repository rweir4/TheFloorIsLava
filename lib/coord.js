class Coord {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  plus(new_coord) {
    this.x += new_coord.x;
    this.y += new_coord.y;
    // debugger
    return new Coord(this.x, this.y);
  }

  withinDimensions(player) {
    const dim_x = 800;
    const dim_y = 505;

    return (
      this.x > 0 && (this.x + player.width) < 800 &&
      (this.y + player.height) > 0
    );
  }

  inPlatformHeight(platform) {
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
