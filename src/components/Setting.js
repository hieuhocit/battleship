import Board from './Board';

export default function () {
  return `
    <div class="settings-container">
      <div class="settings">
        <h2>Welcome to battleship game</h2>
        <p>Place your ship</p>
        <button class="btn" id="rotate" data-axis="true">Rotate</button>
        ${Board({id : 'playerSettings'})}
      </div>
      
    </div>
  `;
}
