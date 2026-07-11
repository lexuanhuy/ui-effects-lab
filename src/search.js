export function setupSearch(element, cards) {
    const onSearch = (e) => {
        const searchTerm = e.target.value.toLowerCase();

        cards.forEach(card => {
            // Lấy tên từ thẻ h3 hoặc một thuộc tính data-name
            const title = card.querySelector('h3').innerText.toLowerCase();
            const tags = card.getAttribute('data-tags');

            // Nếu tiêu đề khớp với từ khóa thì hiện, ngược lại thì ẩn
            if (title.includes(searchTerm) || tags.includes(searchTerm)) {
                card.style.display = 'block'; // Hoặc 'flex' tùy bạn set
            } else {
                card.style.display = 'none';
            }
        });
    }
    element.addEventListener('input', onSearch);
}
