import Player from "../Player.js";
import Ship from "../../Ship.js";

test("fireShot function test 1", () => {
  const player = new Player("player");
  const computer = new Player("computer");

  player.gameboard.placeShip(new Ship(5), {
    x: 0,
    y:0,
    axis: true
  });
  player.gameboard.placeShip(new Ship(4), {
    x: 2,
    y:0,
    axis: true
  });
  player.gameboard.placeShip(new Ship(3), {
    x: 6,
    y:5,
    axis: false
  });
  player.gameboard.placeShip(new Ship(3), {
    x: 6,
    y: 2,
    axis: false
  });
  player.gameboard.placeShip(new Ship(2), {
    x: 3,
    y: 6,
    axis: false
  });

  computer.gameboard.placeShip(new Ship(5), {
    x: 0,
    y:0,
    axis: true
  });
  computer.gameboard.placeShip(new Ship(4), {
    x: 2,
    y:0,
    axis: true
  });
  computer.gameboard.placeShip(new Ship(3), {
    x: 6,
    y:5,
    axis: false
  });
  computer.gameboard.placeShip(new Ship(3), {
    x: 6,
    y: 2,
    axis: false
  });
  computer.gameboard.placeShip(new Ship(2), {
    x: 3,
    y: 6,
    axis: false
  });
  
  player.fireShot({x: 0, y: 0}, computer.gameboard);
  player.fireShot({x: 0, y: 1}, computer.gameboard);
  player.fireShot({x: 0, y: 2}, computer.gameboard);
  player.fireShot({x: 0, y: 3}, computer.gameboard);
  player.fireShot({x: 0, y: 4}, computer.gameboard);

  player.fireShot({x: 2, y: 0}, computer.gameboard);
  player.fireShot({x: 2, y: 1}, computer.gameboard);
  player.fireShot({x: 2, y: 2}, computer.gameboard);
  player.fireShot({x: 2, y: 3}, computer.gameboard);

  player.fireShot({x: 6, y: 5}, computer.gameboard);
  player.fireShot({x: 7, y: 5}, computer.gameboard);
  player.fireShot({x: 8, y: 5}, computer.gameboard);

  player.fireShot({x: 6, y: 2}, computer.gameboard);
  player.fireShot({x: 7, y: 2}, computer.gameboard);
  player.fireShot({x: 8, y: 2}, computer.gameboard);

  player.fireShot({x: 3, y: 6}, computer.gameboard);
  const m = player.fireShot({x: 4, y: 6}, computer.gameboard);

  if(m === "what a shoot" && computer.gameboard.allShipsSunk()) {
    console.log("Player won!");
  }

  console.log(computer.gameboard.ships);
  expect(computer.gameboard.allShipsSunk()).toBe(true);
})