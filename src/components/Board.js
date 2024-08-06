import Cell from './Cell';

export default function (props) {
  let html = '';
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      html += Cell({ x: i, y: j });
    }
  }
  return `
    <div class="board" id="${props.id}">
      ${html}
    </div>
  `;
}
