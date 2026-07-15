import hljs from 'highlight.js';
import { setupCopyToClipBoard } from './copy';

export const codeCache = { html: '', css: '', javascript: '' };

export async function setUpModal(modalElement, viewCodeButtonsElement) {
    const closeModal = () => {
        modalElement.style.display = 'none';
    }

    const openModal = async (effectPath, title) => {
        document.getElementById('modal-title').innerText = title;

        document.querySelectorAll("#code-tabs button").forEach((btnEl) => {
            const codeType = btnEl.getAttribute('data-code');
            if (codeType === 'html')
                btnEl.classList.add('active');
            else
                btnEl.classList.remove('active');
        })

        // Fetch code
        codeCache.html = (await fetch(`${effectPath}/index.html?raw`).then(r => r.text())).replace('<script type="module" src="/@vite/client"></script>', '');
        codeCache.css = (await fetch(`${effectPath}/style.css?raw`).then(r => r.text())).replace('export default "', '').replace(/"$/, '').replace(/\\r\\n/g, '\n');
        codeCache.javascript = (await fetch(`${effectPath}/main.js?raw`).then(r => r.text()));
        if (codeCache.javascript.includes('<!DOCTYPE html>') || codeCache.javascript.includes('<html')) {
            codeCache.javascript = '';
        }

        // first load is html
        const codeElement = document.getElementById('code-display');
        document.getElementById('code-modal').style.display = 'flex';
        codeElement.textContent = codeCache.html;
        codeElement.className = `language-html`;
        delete codeElement.dataset.highlighted;
        hljs.highlightElement(codeElement);
    }

    modalElement.querySelector(".close-btn").addEventListener('click', closeModal)
    viewCodeButtonsElement.forEach((viewCodeButtonElement) => {
        viewCodeButtonElement.addEventListener('click', (e) => {
            const btnEl = e.target;
            const path = btnEl.getAttribute('data-path');
            const title = btnEl.getAttribute('data-title');

            openModal(path, title);
        })
    });

    setupSwitchCode(document.querySelector('#code-tabs'), document.querySelector('#code-display'), codeCache);
    setupCopyToClipBoard(document.querySelector('#copy-btn'), document.querySelector('#code-display'));
}

export function setupSwitchCode(tabElement, codeElement, codeCache) {
    const btnList = tabElement.querySelectorAll("button");
    btnList.forEach(function (el) {
        el.addEventListener('click', function (e) {
            btnList.forEach((btn) => {
                btn.classList.remove('active');
            })
            const codeType = e.target.getAttribute('data-code');
            e.target.classList.add('active');
            codeElement.textContent = codeCache[codeType];
            codeElement.className = `language-${codeType}`;
            delete codeElement.dataset.highlighted;
            hljs.highlightElement(codeElement);
        })
    })
}