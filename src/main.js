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
const app = document.querySelector('#app');

async function init() {
  // load head HTML
  document.body.insertAdjacentHTML('afterbegin', HeaderHTML);
  // load grid effect container
  app.innerHTML = `<main class="grid-container"></main>`;

  // load meta.json
  const modules = import.meta.glob('/public/components/**/meta.json', { eager: true });
  const effects = Object.entries(modules).map(([path, data]) => {
    // "/public/components/buttons/glitch-button/meta.json" => "components/buttons/glitch-button"
    const folderPath = path.replace('/public/', '').replace('/meta.json', '');
    return { ...data.default, path: folderPath };
  });
  // merge config from meta.json in components with effects.json
  const allEffects = [...configEffects, ...effects];

  // Render effects
  const mainGrid = app.querySelector('.grid-container');
  renderGrid(mainGrid, allEffects, baseUrl);

  // load html
  document.body.insertAdjacentHTML('beforeend', FooterHTML);
  document.body.insertAdjacentHTML('beforeend', ModalHTML);

  // setup js
  setupSearch(document.querySelector('#live-search'), document.querySelectorAll('.effect-card'));
  setUpModal(document.querySelector('#code-modal'), document.querySelectorAll('.view-code-btn'));
}

init();
