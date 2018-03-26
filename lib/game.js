import Board from './board';

class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.board = new Board(this.ctx);
  }

  start() {

    this.board.draw();
  }
}

export default Game;
