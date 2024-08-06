import Gameboard from '../Gameboard';
import Ship from '../Ship';

test('allShipsSunk function 1', () => {
  const gameboard = new Gameboard();

  const ship1 = new Ship(5);
  const ship2 = new Ship(2);
  const ship3 = new Ship(3);

  gameboard.placeShip(ship1, {
    x: 5,
    y: 0,
    axis: false,
  });
  gameboard.placeShip(ship2, {
    x: 5,
    y: 5,
    axis: true,
  });
  gameboard.placeShip(ship3, {
    x: 6,
    y: 3,
    axis: true,
  });
  
  const actual = gameboard.allShipsSunk();
  expect(actual).toBe(false);
});

test('allShipsSunk function 2', () => {
  const gameboard = new Gameboard();

  const ship1 = new Ship(5);
  const ship2 = new Ship(2);
  const ship3 = new Ship(3);

  gameboard.placeShip(ship1, {
    x: 5,
    y: 0,
    axis: false,
  });
  gameboard.placeShip(ship2, {
    x: 5,
    y: 5,
    axis: true,
  });
  gameboard.placeShip(ship3, {
    x: 6,
    y: 3,
    axis: true,
  });
  ship1.hit();
  ship1.hit();
  ship1.hit();
  ship1.hit();
  ship1.hit();
  ship2.hit();
  ship2.hit();
  ship3.hit();
  ship3.hit();
  ship3.hit();
  const actual = gameboard.allShipsSunk();
  expect(actual).toBe(true);
});

test('allShipsSunk function 3', () => {
  const gameboard = new Gameboard();

  const ship1 = new Ship(5);
  const ship2 = new Ship(2);
  const ship3 = new Ship(3);

  gameboard.placeShip(ship1, {
    x: 5,
    y: 0,
    axis: false,
  });
  gameboard.placeShip(ship2, {
    x: 5,
    y: 5,
    axis: true,
  });
  gameboard.placeShip(ship3, {
    x: 6,
    y: 3,
    axis: true,
  });
  ship1.hit();
  ship1.hit();
  ship1.hit();
  ship1.hit();
  ship1.hit();
  ship2.hit();
  ship2.hit();
  ship3.hit();
  ship3.hit();
  // ship3.hit();
  const actual = gameboard.allShipsSunk();
  expect(actual).toBe(false);
});

test('test receiveAttack function 1', () => {
  const gameboard = new Gameboard();

  const ship = new Ship(5);

  gameboard.placeShip(ship, {
    x: 5,
    y: 0,
    axis: false,
  });

  gameboard.receiveAttack({
    x: 6,
    y: 0,
  });
  gameboard.receiveAttack({
    x: 6,
    y: 0,
  });
  
  expect(gameboard.board[5][0].hits).toBe(1);
  expect(gameboard.board[6][0]).toBeNull();
  expect(gameboard.board[7][0].hits).toBe(1);
  expect(gameboard.board[8][0].hits).toBe(1);
  expect(gameboard.board[9][0].hits).toBe(1);
});

test('test receiveAttack function 2', () => {
  const gameboard = new Gameboard();

  const ship = new Ship(5);

  gameboard.placeShip(ship, {
    x: 5,
    y: 0,
    axis: false,
  });

  const actual = gameboard.receiveAttack({
    x: 6,
    y: 1,
  });

  const actual2 = gameboard.receiveAttack({
    x: 6,
    y: 1,
  });

  expect(actual).toBe('missed');
  expect(actual2).toBe('has been destroyed');
});

test('test placeShip function 1', () => {
  const gameboard = new Gameboard();

  const ship = new Ship(5);

  gameboard.placeShip(ship, {
    x: 5,
    y: 0,
    axis: false,
  });
  gameboard.board[5][0].hit();
  for (let i = 5; i < ship.length + 5; i++) {
    expect(gameboard.board[i][0]).toBe(ship);
  }
});

test('test placeShip function 2', () => {
  const gameboard = new Gameboard();

  const ship = new Ship(5);

  const expected = gameboard.placeShip(ship, {
    x: 6,
    y: 0,
    axis: false,
  });

  expect(expected).toBeNull();
});

test('test placeShip function 3', () => {
  const gameboard = new Gameboard();

  const ship = new Ship(4);

  gameboard.placeShip(ship, {
    x: 6,
    y: 5,
    axis: true,
  });

  for (let i = 5; i < ship.length + 5; i++) {
    expect(gameboard.board[6][i]).toBe(ship);
  }
});

test('test placeShip function 4', () => {
  const gameboard = new Gameboard();

  const ship = new Ship(5);

  const expected = gameboard.placeShip(ship, {
    x: 6,
    y: 6,
    axis: true,
  });

  expect(expected).toBeNull();
});

test('test placeShip function 5', () => {
  const gameboard = new Gameboard();

  const ship1 = new Ship(5);
  const ship2 = new Ship(2);

  gameboard.placeShip(ship1, {
    x: 5,
    y: 0,
    axis: true,
  });

  const expected = gameboard.placeShip(ship2, {
    x: 5,
    y: 1,
    axis: true,
  });
  expect(expected).toBeNull();
});

test('test isAvailableSpace function along y axis 1 ', () => {
  const gameboard = new Gameboard();

  const ship = new Ship(5);

  const flag = gameboard.isAvailableSpace(ship, {
    x: 5,
    y: 0,
    axis: false,
  });

  expect(flag).toBe(true);
});

test('test isAvailableSpace function along y axis 2', () => {
  const gameboard = new Gameboard();

  const ship = new Ship(5);

  const flag = gameboard.isAvailableSpace(ship, {
    x: 6,
    y: 0,
    axis: false,
  });

  expect(flag).toBe(false);
});

test('test isAvailableSpace function along y axis 3', () => {
  const gameboard = new Gameboard();

  const ship = new Ship(5);

  gameboard.board[6][0] = 1;

  const flag = gameboard.isAvailableSpace(ship, {
    x: 5,
    y: 0,
    axis: false,
  });

  expect(flag).toBe(false);
});

test('test isAvailableSpace function along x axis 1', () => {
  const gameboard = new Gameboard();

  const ship = new Ship(5);

  const flag = gameboard.isAvailableSpace(ship, {
    x: 5,
    y: 5,
    axis: true,
  });

  expect(flag).toBe(true);
});

test('test isAvailableSpace function along x axis 2', () => {
  const gameboard = new Gameboard();

  const ship = new Ship(5);

  const flag = gameboard.isAvailableSpace(ship, {
    x: 5,
    y: 6,
    axis: true,
  });

  expect(flag).toBe(false);
});

test('test isAvailableSpace function along x axis 3', () => {
  const gameboard = new Gameboard();

  const ship = new Ship(5);

  gameboard.board[5][6] = 1;

  const flag = gameboard.isAvailableSpace(ship, {
    x: 5,
    y: 5,
    axis: true,
  });

  expect(flag).toBe(false);
});
