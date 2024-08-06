// Components
import Board from './components/Board';
import Setting from './components/Setting';
import Win from './components/Win';

export default function () {
  return `
  <h1 class="title">Battleship</h1>
  <main class="main">
    <div class="message">Awaiting orders, Admiral</div>
    <div class="board-container">
      ${Board({ id: 'playerBoard' })}
      ${Board({ id: 'computerBoard' })}
    </div>
  </main>
  ${Setting()}
  ${Win()}
  `;
}
