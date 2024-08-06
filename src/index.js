// Components
import App from './App';

// Styles
import './styles/style.css';

// Handle events
import handleDOM from './scripts/handleDOM';

document.getElementById('app').innerHTML = App();

const handle = new handleDOM();
handle.addEvent();
