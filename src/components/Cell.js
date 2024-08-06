export default function (props) {
  return `
    <div class="cell" data-coords=${JSON.stringify(props)}></div>
  `;
}
