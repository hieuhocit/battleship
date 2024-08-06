import Player from '../factories/Player';
import Ship from '../factories/Ship';
import randomNumber from '../utils/randomNumber';

export default class {
  constructor() {
    this.player = new Player('You');
    this.computer = new Player('The enemy');
    this.axis = true;
    this.lengthShips = [5, 4, 3, 3, 2];
    this.curPlayerShipIndex = 0;
    this.stateGame = document.querySelector('.message');
    this.curPlayer = this.player;
    this.curEnemy = this.computer;
  }

  changeAxis = (e) => {
    const axis = JSON.parse(e.target.dataset.axis);
    e.target.dataset.axis = !axis;
    this.axis = !axis;
  };

  showShipPreviewOnHover = (e) => {
    if (this.curPlayerShipIndex >= this.lengthShips.length) return;
    const board = e.target.parentElement;

    const { x, y } = JSON.parse(e.target.dataset.coords);
    const canPlaced = this.player.gameboard.isAvailableSpace(
      { length: this.lengthShips[this.curPlayerShipIndex] },
      { x, y, axis: this.axis }
    );

    if (canPlaced) {
      let curIndexInDOM = x * 10 + y;
      let i = 0;
      while (i < this.lengthShips[this.curPlayerShipIndex]) {
        board.children[curIndexInDOM]?.classList.toggle('pointer');
        curIndexInDOM = this.axis ? (curIndexInDOM += 1) : (curIndexInDOM += 10);
        i++;
      }
    } else {
      if (!e.target.classList.contains('placed')) e.target.classList.toggle('warn');
    }
  };

  placeShip = (e) => {
    if (this.curPlayerShipIndex >= this.lengthShips.length) return;
    const settingsBoard = e.target.parentElement;

    const { x, y } = JSON.parse(e.target.dataset.coords);
    const canPlaced = this.player.gameboard.isAvailableSpace(
      { length: this.lengthShips[this.curPlayerShipIndex] },
      { x, y, axis: this.axis }
    );

    if (canPlaced) {
      const playerBoard = document.querySelector('#playerBoard');
      let curIndexInDOM = x * 10 + y;
      let i = 0;
      while (i < this.lengthShips[this.curPlayerShipIndex]) {
        settingsBoard.children[curIndexInDOM]?.classList.add('placed');
        settingsBoard.children[curIndexInDOM]?.classList.remove('pointer');
        playerBoard.children[curIndexInDOM]?.classList.add('placed');
        curIndexInDOM = this.axis ? (curIndexInDOM += 1) : (curIndexInDOM += 10);
        i++;
      }
      const ship = new Ship(this.lengthShips[this.curPlayerShipIndex]);
      this.player.gameboard.placeShip(ship, { x, y, axis: this.axis });
      this.curPlayerShipIndex++;
      if (this.curPlayerShipIndex >= this.lengthShips.length) {
        this.startGame();
      }
    }
  };

  placeShipRandom = (player) => {
    for (let i = 0; i < this.lengthShips.length; i++) {
      let x = randomNumber(0, 10);
      let y = randomNumber(0, 10);
      let axis = randomNumber(0, 2);

      const ship = new Ship(this.lengthShips[i]);
      while (true) {
        if (player.gameboard.placeShip(ship, { x, y, axis }) !== null) break;
        x = randomNumber(0, 10);
        y = randomNumber(0, 10);
        axis = randomNumber(0, 2);
      }
    }
  };

  startGame = () => {
    document.querySelector('.settings-container').style.display = 'none';

    // Place the ship in the computer's game board
    this.placeShipRandom(this.computer);
  };

  receivePlayerAttack = async (e) => {
    const coords = JSON.parse(e.target.dataset.coords);
    const canShoot = this.player.fireShot(coords, this.computer.gameboard);
    if (canShoot === 'Destroyed') return;
    const computerBoard = document.querySelector('#computerBoard');
    computerBoard.classList.add('aiming');
    if ((await this.takeAShoot(canShoot, e.target)) !== true) {
      this.receiveComputerAttack();
    }
  };

  receiveComputerAttack = async () => {
    const playerBoard = document.querySelector('#playerBoard');
    await this.renderMessage('Your opponent is aiming...');
    let x = randomNumber(0, 10);
    let y = randomNumber(0, 10);

    while (true) {
      const canShoot = this.player.fireShot({ x, y }, this.player.gameboard);
      if (canShoot !== 'Destroyed') {
        await this.takeAShoot(canShoot, playerBoard.children[x * 10 + y]);
        break;
      }

      x = randomNumber(0, 10);
      y = randomNumber(0, 10);
    }
    document.querySelector('#computerBoard').classList.remove('aiming');
  };

  takeAShoot = async (canShoot, received) => {
    switch (canShoot) {
    case 'Missed':
      received.classList.add('destroyed');
      await this.renderMessage(
        `${this.curPlayer.name} fires a shot into ${this.curEnemy.name} waters ...... and misses.`
      );
      break;
    case 'Hit':
      received.classList.add('hit');
      if (this.curEnemy.gameboard.allShipsSunk()) {
        const winContainer = document.querySelector('.win-container');
        winContainer.style.display = 'flex';
        winContainer.querySelector('h2').textContent = `${this.curPlayer.name} won`;
        return true;
      }
      await this.renderMessage(
        `${this.curPlayer.name} fire a shot into ${this.curEnemy.name} waters ...... it's a hit!`
      );
      break;
    }
    this.curPlayer = this.curPlayer === this.player ? this.computer : this.player;
    this.curEnemy = this.curEnemy === this.player ? this.computer : this.player;
  };

  renderMessage = (message) => {
    return new Promise((resolve) => {
      this.stateGame.textContent = '';
      let index = 0;

      const typeNextChar = () => {
        if (index < message.length) {
          this.stateGame.textContent += message[index];
          index++;
          setTimeout(typeNextChar, 15);
        } else {
          setTimeout(resolve, 300);
        }
      };

      typeNextChar();
    });
  };

  newGame = () => {
    this.player = new Player('You');
    this.computer = new Player('The enemy');
    this.axis = true;
    this.curPlayerShipIndex = 0;
    this.curPlayer = this.player;
    this.curEnemy = this.computer;

    this.startGame.textContent = 'Awaiting orders, Admiral';
    document.querySelector('.win-container').style.display = 'none';
    document.querySelector('.settings-container').style.display = 'flex';
    document.querySelectorAll('.board > .cell').forEach((cell) => (cell.className = 'cell'));
    document.querySelector('#computerBoard').classList.remove('aiming');
    document.querySelector('.settings > #rotate').dataset.coords = true;
  };

  addEvent() {
    // Settings player
    const btnRotate = document.querySelector('.settings > #rotate');
    const settingsBoard = document.querySelector('.settings > .board');
    const cells = settingsBoard.querySelectorAll('.cell');

    btnRotate.addEventListener('click', this.changeAxis);

    cells.forEach((cell) => cell.addEventListener('mouseover', this.showShipPreviewOnHover));
    cells.forEach((cell) => cell.addEventListener('mouseout', this.showShipPreviewOnHover));
    cells.forEach((cell) => cell.addEventListener('click', this.placeShip));

    // Fire 🔥
    const islandsOfComputer = document.querySelectorAll('#computerBoard > .cell');
    islandsOfComputer.forEach((island) => island.addEventListener('click', this.receivePlayerAttack));

    // Win
    const btnNewgame = document.querySelector('#newGame');
    btnNewgame.addEventListener('click', this.newGame);
  }
}
