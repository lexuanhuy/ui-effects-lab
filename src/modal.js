import hljs from 'highlight.js'

export function setupCloseModal(element) {
    const closeModal = () => {
        element.style.display = 'none';
    }

    element.querySelector(".close-btn").addEventListener('click', closeModal)

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
            hljs.highlightElement(codeElement);
        })
    })
}