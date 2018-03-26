# The Floor is Lava

<a href="https://github.com/rweir4/TheFloorIsLava">Live Version</a>

## Background
There is a player (which has the ability to jump) and a board (which has "random" width and height platforms). If the player falls off the platforms, they die.
 - controls: arrow keys to move, space to jump, m for menu

## MVP
1.) Board

2.) Player

3.) Start, pause, and reset of the game

4.) Menu with rules of the game

5.) Production ReadME

## Technologies, Libraries, APIs
The game runs using javascript for logic, vanilla for functionality, and canvas, HTML, and CSS for rendering and sprites.

## Wireframes
<img src="assets/images/wireframe.png">

## Code Snippets

Adding physics to the jumps and accordingly to the platforms was a problem I solved using basic projectile motion:

    this.player.velocity_y -= (9.81 * 0.017);
    this.player.distance = this.player.velocity_y - Math.floor(0.5 * 9.81 * Math.pow(0.017, 2));
    this.platforms.forEach(platform => {
      platform.transform(32, this.player.velocity_x, this.player.jumping, this.player.walking);
    });

...and in the Player Class:
  ex)

    if (this.velocity_y > 0) {
      movement = (this.velocity_x > 0) ? new Coord(2, -1 * d) : new Coord(-2, -1 * d);
    } else {
      movement = (this.velocity_x > 0) ? new Coord(2, -1 * d) : new Coord(-2, -1 * d);
    }

Random platforms are created when needed using the following code:

    for (let i = 0; i < Board.NUM_PLATFORMS; i++) {
      prev_platform = this.platforms[this.platforms.length - 1];
      prev_pos = prev_platform.pos.x + prev_platform.width + 30;

      const pos = new Coord(
        Math.floor(Math.random() * ((prev_pos + 200) - prev_pos) + prev_pos),
        Math.floor(Math.random() * (450 - 200) + 200)
      );

      const size = {
        width: Math.floor(Math.random() * (200 - 30) + 30),
        height: 13
      };
      this.platforms.push(new Platform(pos, size, this.ctx));
    }

## Implementation Timeline:

Day 1) Board
  - sprite for platform
  - random size and placement of platforms
  - scrolling background

Day 2) Player
 - sprite for character
 - jumping
   - parabola based on arrow keys

Day 3) Start, pause, reset of game, production readme
 - add and remove css classes to show/hide divs

 ## Future Features

 - Add gravity to fall
 - Add real image for player that will change upon walk
 - Add second level with more sparse platforms and double jump
