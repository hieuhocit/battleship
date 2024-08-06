import Gameboard from "./Gameboard";

class Player {
  constructor(name) {
    this.name = name;
    this.gameboard = new Gameboard();
  }

  fireShot(coordinates, board) {
    return board.receiveAttack(coordinates);
  }
}

export default Player;