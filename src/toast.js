// Tạo Toast DOM một lần duy nhất
const toast = document.createElement('div');
toast.className = 'toast-notification';
document.body.appendChild(toast);

export function showToast(message, duration = 2000) {
    toast.textContent = message;
    toast.classList.add('show');

    // Tự động ẩn sau 2 giây
    setTimeout(() => {
        toast.classList.remove('show');
    }, duration);
}