# UI Effects Lab

[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![JavaScript](https://img.shields.io/badge/Vanilla_JS-ES6+-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**UI Effects Lab** là một không gian thử nghiệm cho các hiệu ứng giao diện được xây dựng hoàn toàn bằng **Vanilla HTML, CSS và JavaScript**. 

Dự án này giúp các nhà phát triển web dễ dàng khám phá, xem trước trực tiếp và sao chép nhanh mã nguồn của các hiệu ứng để áp dụng vào dự án thực tế của mình.

---

## Tính năng

- **Live Preview**: Mỗi hiệu ứng chạy trong một môi trường độc lập, không ảnh hưởng đến giao diện chính và ngược lại.
- **Bộ lọc & Tìm kiếm**: Tìm kiếm nhanh các hiệu ứng theo tên hoặc thẻ tag chỉ trong vài mili-giây.
- **Trình xem code (Code Inspector) trực quan**:
  - Hỗ trợ xem riêng biệt các tab: **HTML**, **CSS**, **JS**.
  - Tự động định dạng và tô sáng cú pháp (syntax highlighting) bằng **Highlight.js**.
- **Sao chép nhanh**: Copy nhanh phần mã nguồn đang xem chỉ với một nút bấm.

---

## Cấu trúc thư mục dự án

```text
ui-effects-lab/
├── public/
│   └── components/                # Nơi chứa mã nguồn các hiệu ứng UI
│       ├── buttons/               # Các hiệu ứng liên quan đến Button
│       │   ├── glitch-button/     # Hiệu ứng Glitch Button
│       ├── checkboxes/            # Các hiệu ứng liên quan đến Checkbox
│       │   └── glitch-checkbox/
│       └── search-box/            # Hiệu ứng Search Box
├── src/
│   ├── assets/                    # Ảnh, logo và tài nguyên tĩnh
│   ├── copy.js                    # Logic sao chép code vào Clipboard
│   ├── effects.json               # Cấu hình danh sách các hiệu ứng hiển thị
│   ├── main.js                    # Khởi tạo Dashboard chính của Lab
│   ├── modal.js                   # Xử lý Modal hiển thị và chuyển tab Code
│   ├── search.js                  # Logic tìm kiếm thời gian thực
│   ├── style.css                  # Style hệ thống của Dashboard
│   └── toast.js                   # Hiển thị thông báo (Toast notification)
├── index.html                     # Entrypoint HTML của ứng dụng
├── package.json                   # Cấu hình dự án và dependencies
└── vite.config.js                 # Cấu hình Vite bundler
└── new-effect.js                  # Script tạo mới effect
```

---

## Công nghệ sử dụng

- **Công cụ build**: [Vite](https://vite.dev/) (phiên bản 8+) giúp tải nhanh trang trong quá trình phát triển (HMR) và tối ưu hóa file production.
- **Tô sáng cú pháp**: [Highlight.js](https://highlightjs.org/) để làm nổi bật code HTML/CSS/JS.
- **Giao diện & Logic**: Vanilla HTML, CSS (Custom Properties, Flexbox/Grid, Animations), ES6 JavaScript.

---

## Hướng dẫn cài đặt và khởi chạy

Để cài đặt và chạy dự án này trên máy tính của bạn, vui lòng thực hiện các bước sau:

### 1. Yêu cầu hệ thống
- Đã cài đặt [Node.js](https://nodejs.org/) (Khuyến nghị phiên bản LTS mới nhất).

### 2. Cài đặt dependencies
Clone dự án về máy và chạy lệnh sau trong thư mục gốc để cài đặt các gói phụ thuộc:
```bash
npm install
```

### 3. Chạy môi trường phát triển (Development)
Chạy lệnh bên dưới để khởi động Vite Development Server:
```bash
npm run dev
```
Sau đó, truy cập đường dẫn được hiển thị trên console (thường là `http://localhost:5173`) để trải nghiệm.

### 4. Build sản phẩm (Production)
Tạo bản build tối ưu hóa để triển khai (deploy):
```bash
npm run build
```
Sản phẩm đầu ra sẽ nằm trong thư mục `dist`. Bạn có thể kiểm tra trước bản build bằng lệnh:
```bash
npm run preview
```

---

## Hướng dẫn thêm một hiệu ứng mới

Bạn muốn đóng góp hoặc thêm một hiệu ứng mới vào Lab? Hãy làm theo 3 bước cực kỳ đơn giản sau:

### Bước 1: Tạo thư mục component
Tạo một thư mục con tương ứng trong `public/components/` (ví dụ: tạo hiệu ứng nút mới trong `public/components/buttons/my-new-button/`).

Trong thư mục này, tạo các file cần thiết cho hiệu ứng:
- `index.html` (chứa cấu trúc HTML của component)
- `style.css` (chứa các thiết kế và animation CSS)
- `main.js` *(nếu hiệu ứng cần logic JavaScript để hoạt động)*

### Bước 2: Viết mã nguồn cho component
Đảm bảo mã nguồn của bạn hoạt động độc lập. 
*Ví dụ cấu trúc `index.html` tối giản:*
```html
<link rel="stylesheet" href="style.css" />

<div>
  <button class="my-new-button">Click Me!</button>
</div>
  
<!-- Thêm script main.js nếu có logic -->
<script src="main.js"></script> 

```

### Bước 3: Đăng ký hiệu ứng trong `effects.json`
Mở file `src/effects.json` và thêm cấu hình của hiệu ứng mới vào danh sách:

```json
{
    "id": "my-new-button",
    "name": "My New Button",
    "category": "button",
    "path": "components/buttons/my-new-button",
    "tags": "button, custom, animation"
}
```


## Sử dụng scripts tạo hiệu ứng
```bash
npm run new-script
```
Nhập tên `component` và tên `effect`

Script sẽ tạo mới thư mục tại `public/components/${component}/${name}` và tạo 4 file (`index.html`, `style.css`, `meta.json`, `main.js`) ở trong thư mục `${name}`

*Giải thích các thuộc tính:*
- `id`: Định danh duy nhất cho hiệu ứng.
- `name`: Tên hiển thị trên card ở Dashboard.
- `category`: Phân loại nhóm (dùng cho việc mở rộng filter sau này).
- `path`: Đường dẫn tương đối từ thư mục `public/` đến component của bạn.
- `tags`: Các từ khóa liên quan giúp người dùng tìm kiếm hiệu ứng nhanh hơn.

Sau khi lưu lại, hiệu ứng mới của bạn sẽ tự động xuất hiện trên giao diện Dashboard!

---

## Tác giả

Được xây dựng bởi [lexuanhuy](https://github.com/lexuanhuy)
