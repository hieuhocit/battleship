import Ship from './Ship.js';

class Gameboard {
  // 0 represents that there is no ship in that space.
  // Ship represents that there is a ship in that space.
  // null represents that the space has been hit.
  constructor() {
    this.board = Array.from({ length: 10 }, () => Array(10).fill(0));
    this.ships = [];
  }

  /**
   * Check the space at the coordinates is available or not
   * @param {Ship} ship
   * @param {object} coordinates
   * @returns {boolean}
   */
  isAvailableSpace(ship, coordinates) {
    const { x, y, axis } = coordinates;

    // If there is a ship in that coordinates return false
    if (this.board[x][y] instanceof Ship) return false;

    if (!axis) {
      // False if it is the y axis

      // Check if the length of the ship is greater than the length of the y axis of the board
      if (ship.length + x > this.board.length) return false;

      // If there is a ship in that space return false
      for (let i = x; i < x + ship.length; i++) {
        if (this.board[i][y] !== 0) return false;
      }
      return true;
    }

    // Check if the length of the ship is greater than the length of the x axis of the board
    if (ship.length + y > this.board[x].length) return false;

    // If there is a ship in that space return false, otherwise return true
    return this.board[x].slice(y, ship.length + y).every((cell) => cell === 0);
  }

  /**
   * Implementation to place ship at specific coordinates
   * @param {Ship} ship
   * @param {object} coordinates
   */
  placeShip(ship, coordinates) {
    if (!this.isAvailableSpace(ship, coordinates)) return null;

    const { x, y, axis } = coordinates;

    if (!axis) {
      for (let i = x; i < ship.length + x; i++) {
        this.board[i][y] = ship;
      }
    } else {
      for (let i = y; i < ship.length + y; i++) {
        this.board[x][i] = ship;
      }
    }
    this.ships.push(ship);
    return true;
  }

  /**
   * @param {object} coordinates
   */
  receiveAttack(coordinates) {
    const { x, y } = coordinates;
    if (this.board[x][y] === null) return 'Destroyed';
    if (this.board[x][y] === 0) {
      this.board[x][y] = null;
      return 'Missed';
    }

    if (this.board[x][y] instanceof Ship) {
      this.board[x][y].hit();
      this.board[x][y] = null;
      return 'Hit';
    }
  }

  /**
   * @returns {boolean}
   */
  allShipsSunk() {
    return this.ships.every((ship) => ship.isSunk() === true);
  }
}

export default Gameboard;
