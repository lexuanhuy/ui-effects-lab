import { showToast } from './toast';

export function setupCopyToClipBoard(btnElement, codeElement) {
    btnElement.addEventListener('click', () => {
        const text = codeElement.innerText;
        console.log("copy.js ~ text:", text);
        navigator.clipboard.writeText(text)
            .then(() => {
                console.log('Text successfully copied!');
                showToast('Đã sao chép vào clipboard!');
            })
            .catch(err => {
                console.error('Failed to copy text: ', err);
                showToast('Lỗi khi sao chép!');
            });
    })
}