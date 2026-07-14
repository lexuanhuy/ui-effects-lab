import './style.css';
import { setupSearch } from './search.js';
import configEffects from './effects.json';
import { setUpModal, codeCache, setupSwitchCode } from './modal.js';
import { setupCopyToClipBoard } from './copy.js';
import { renderGrid } from './render.js';
import { HeaderHTML } from './components/Header.js';
import { FooterHTML } from './components/Footer.js';
import { ModalHTML } from './components/ModalComponent.js';

const baseUrl = import.meta.env.BASE_URL;
const App = document.querySelector('#app');

async function init() {
  // load head HTML
  document.body.insertAdjacentHTML('afterbegin', HeaderHTML);
  App.innerHTML = `<main class="grid-container"></main>`;

  const modules = import.meta.glob('/public/components/**/meta.json', { eager: true });
  const effects = Object.entries(modules).map(([path, data]) => {
    // Trích xuất path folder từ đường dẫn file meta.json
    // "/public/components/buttons/glitch-button/meta.json" => "components/buttons/glitch-button"
    const folderPath = path.replace('/public/', '').replace('/meta.json', '');

    return {
      ...data.default,
      path: folderPath
    };
  });
  const allEffects = [...configEffects, ...effects];

  // Render effects
  const mainGrid = App.querySelector('.grid-container');
  renderGrid(mainGrid, allEffects, baseUrl);

  // load html
  document.body.insertAdjacentHTML('beforeend', FooterHTML);
  document.body.insertAdjacentHTML('beforeend', ModalHTML);

  // setup js
  setupSearch(document.querySelector('#live-search'), document.querySelectorAll('.effect-card'));
  setUpModal(document.querySelector('#code-modal'), document.querySelectorAll('.view-code-btn'));
}

init();
