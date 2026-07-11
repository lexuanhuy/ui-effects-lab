import './style.css'
import javascriptLogo from './assets/javascript.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import { setupSearch } from './search.js'
import hljs from 'highlight.js'
import css from 'highlight.js/lib/languages/css';
import configEffects from './effects.json'
import { setupCloseModal, setupSwitchCode } from './modal.js'
import { setupCopyToClipBoard } from './copy.js'
const baseUrl = import.meta.env.BASE_URL;

hljs.registerLanguage('css', css);


const codeCache = { html: '', css: '', javascript: '' };
async function openModal(effectPath, title) {
  document.getElementById('modal-title').innerText = title;

  document.querySelectorAll("#code-tabs button").forEach((btnEl) => {
    const codeType = btnEl.getAttribute('data-code');
    if(codeType === 'html')
      btnEl.classList.add('active');
    else
      btnEl.classList.remove('active');
  })

  // Fetch code
  codeCache.html = (await fetch(`${effectPath}/index.html?raw`).then(r => r.text())).replace('<script type="module" src="/@vite/client"></script>', '');
  codeCache.css = (await fetch(`${effectPath}/style.css?raw`).then(r => r.text())).replace('export default "', '').replace(/"$/, '').replace(/\\r\\n/g, '\n');

  document.getElementById('code-modal').style.display = 'flex';
  document.getElementById('code-display').textContent = codeCache.html;
  document.getElementById('code-display').className = `language-html`;
  hljs.highlightElement(document.getElementById('code-display'));
}

async function closeModal() {
  document.getElementById('code-modal').style.display = 'none';
}

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('view-code-btn')) {
    const path = e.target.getAttribute('data-path');
    const title = e.target.getAttribute('data-title');
    openModal(path, title);
  }
});

let gridDashboard = '';
configEffects.forEach((conf) => {
  gridDashboard += `
    <div class="effect-card" data-category="${conf.category}" data-tags="${conf.tags}">
      <iframe src="${baseUrl}${conf.path}/index.html" loading="lazy" sandbox="allow-scripts allow-same-origin allow-forms"></iframe>
      <h3>${conf.name}</h3>
      <button class="view-code-btn" data-path="${conf.path}" data-title="${conf.name}">Xem Code</button>
    </div>
  `
})

document.querySelector('#app').innerHTML = `
<header>
    <h1>UI Effects Lab</h1>
    <div class="search-container">
        <div class="search-box">
            <input type="text" placeholder="Tìm kiếm hiệu ứng..." id="live-search" class="search-input">
            <button class="search-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
        </div>
    </div>
</header>
<main class="grid-container">
  ${gridDashboard}
</main>
<footer>
  Created by <a href="https://github.com/lexuanhuy" target="_blank">lexuanhuy</a> with 
  <svg class="heart-icon" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  </svg>
</footer>

<div id="code-modal" class="modal-overlay" style="display: none;">
    <div class="modal-content">
        <div class="modal-header">
            <h2 id="modal-title">Tên hiệu ứng</h2>
            <button class="close-btn">&times;</button>
        </div>
        
        <div class="code-tabs" id="code-tabs">
            <button data-code="html" id="code-tab-html" class="active">HTML</button>
            <button data-code="css" id="code-tab-css">CSS</button>
            <button data-code="javascript" id="code-tab-js">JS</button>
        </div>
        
        <pre><code id="code-display"></code></pre>
        
        <div class="modal-footer">
          <button id="copy-btn">Copy Code</button>
        </div>
    </div>
</div>
`
document.addEventListener('DOMContentLoaded', (event) => {
  document.querySelectorAll('pre code').forEach((el) => {
    hljs.highlightElement(el);
  });
});
// search box
setupSearch(document.querySelector('#live-search'), document.querySelectorAll('.effect-card'));
setupCloseModal(document.querySelector('#code-modal'));
setupSwitchCode(document.querySelector('#code-tabs'), document.querySelector('#code-display'), codeCache);
setupCopyToClipBoard(document.querySelector('#copy-btn'), document.querySelector('#code-display'))

