# Bài 01: Tổng Quan Về Next.js & Tư Duy Kiến Trúc Server-First

---

## 🎯 Mục tiêu bài học
- Hiểu rõ **Next.js** là gì và tại sao Next.js trở thành framework hàng đầu cho React.
- Phân biệt sự khác nhau giữa **React thuần (CSR - Client-Side Rendering)** và **Next.js (SSR, SSG, ISR)**.
- Nắm bắt tư duy **Server-First** và kiến trúc **App Router** trong các phiên bản Next.js hiện đại (Next.js 14 / 15 / 16).
- Cài đặt và cấu hình môi trường phát triển ban đầu.

---

## 1. Next.js là gì?

**Next.js** là một React Framework mạnh mẽ được phát triển bởi Vercel, cung cấp đầy đủ các khối xây dựng (building blocks) để phát triển một ứng dụng web nhanh chóng, chuẩn SEO và có hiệu năng tối ưu:

- **Fullstack React Framework**: Viết cả Frontend (giao diện) và Backend (API, Server Actions) trong cùng một dự án.
- **Render linh hoạt**: Hỗ trợ Server-Side Rendering (SSR), Static Site Generation (SSG), Incremental Static Regeneration (ISR) và Client-Side Rendering (CSR).
- **Tối ưu hóa sẵn có (Zero Config)**: Tự động tối ưu hình ảnh (`next/image`), font chữ (`next/font`), script (`next/script`), và bundling mã nguồn thông qua Turbopack.
- **Routing dựa trên hệ thống tệp tin (File-system Routing)**: Không cần cài đặt `react-router-dom`, tạo thư mục là tạo đường dẫn URL.

---

## 2. Vì sao cần Next.js? (Hạn chế của React SPA thuần)

Khi bạn tạo dự án React thông thường (ví dụ bằng Create React App hoặc Vite):
1. **Trình duyệt nhận được file HTML rỗng:**
   ```html
   <div id="root"></div>
   <script src="/bundle.js"></script>
   ```
2. Trình duyệt phải tải toàn bộ file Javascript (`bundle.js`) về máy người dùng, sau đó chạy JS rồi mới vẽ (render) giao diện ra màn hình.

### Các vấn đề gặp phải:
- ❌ **SEO (Search Engine Optimization) kém**: Googlebot hoặc các công cụ tìm kiếm có thể gặp khó khăn khi lập chỉ mục (index) nội dung vì ban đầu HTML rỗng.
- ❌ **Màn hình trắng khi tải (FCP - First Contentful Paint chậm)**: Nếu mạng yếu hoặc thiết bị cấu hình thấp, người dùng phải chờ tải file JS nặng hàng MB mới thấy được nội dung.
- ❌ **Lộ mã nguồn / API Keys bí mật**: Toàn bộ logic và dữ liệu phải tải xuống máy khách, không thể giấu mã nguồn nhạy cảm hay truy vấn cơ sở dữ liệu trực tiếp.

---

## 3. Các mô hình Render trong Next.js

```
┌────────────────────────────────────────────────────────────────────────┐
│                        CÁC CƠ CHẾ RENDER                               │
├──────────────────┬──────────────────┬──────────────────┬───────────────┤
│ CSR (Client)     │ SSR (Server)     │ SSG (Static)     │ ISR (Hybrid)  │
├──────────────────┼──────────────────┼──────────────────┼───────────────┤
│ Render tại trình │ Render HTML tại  │ Render HTML 1 lần│ Render Static │
│ duyệt người dùng │ Server mỗi khi có│ lúc Build-time   │ + Tự động tái │
│                  │ request gửi đến  │                  │ tạo theo chu kỳ│
└──────────────────┴──────────────────┴──────────────────┴───────────────┘
```

### 1. CSR (Client-Side Rendering)
- Giao diện được dựng hoàn toàn trên máy khách (trình duyệt).
- Thích hợp: Dashboard nội bộ có đăng nhập, trang quản trị không cần SEO.

### 2. SSR (Server-Side Rendering)
- Máy chủ biên dịch HTML tươi mới cho **mỗi lượt request** rồi gửi trả về client.
- Thích hợp: Trang dữ liệu thay đổi liên tục theo thời gian thực (giá cổ phiếu, giỏ hàng cá nhân hóa, feed mạng xã hội).

### 3. SSG (Static Site Generation)
- Toàn bộ trang HTML được biên dịch sẵn một lần tại thời điểm build (`next build`).
- Cực kỳ nhanh vì chỉ việc phục vụ file tĩnh qua CDN.
- Thích hợp: Blog, tài liệu kỹ thuật, trang landing page ít khi thay đổi.

### 4. ISR (Incremental Static Regeneration)
- Điểm đột phá độc quyền của Next.js: Vừa có tốc độ cực nhanh của SSG, vừa có khả năng tự làm mới nội dung ngầm sau mỗi khoảng thời gian định trước (ví dụ 60 giây) mà **không cần build lại toàn bộ website**.

---

## 4. Tư duy Server-First & App Router

Từ Next.js 13 trở đi và chuẩn hóa trong Next.js 14/15/16:
- Next.js chuyển từ **Pages Router** (thư mục `pages/`) sang **App Router** (thư mục `app/`).
- Mọi component bên trong thư mục `app/` **mặc định là React Server Components (RSC)**.
- Giao diện được render trên máy chủ trước, truyền về trình duyệt dưới dạng HTML siêu nhẹ, không gửi kèm bundle JS thừa. Chỉ khi nào cần tương tác người dùng (`useState`, `useEffect`, `onClick`) ta mới đánh dấu `'use client'`.

---

## 5. Khởi tạo dự án Next.js chuẩn

Để tạo một dự án Next.js mới với các công nghệ chuẩn công nghiệp:

```bash
npx create-next-app@latest my-next-app
```

Khi xuất hiện bảng câu hỏi tương tác, lựa chọn đề xuất:
- `Would you like to use TypeScript?` -> **Yes** (Khuyên dùng để an toàn kiểu dữ liệu)
- `Would you like to use ESLint?` -> **Yes**
- `Would you like to use Tailwind CSS?` -> **Yes**
- `Would you like your code inside a 'src/' directory?` -> **No** (hoặc Yes tùy sở thích)
- `Would you like to use App Router? (recommended)` -> **Yes** (Bắt buộc)
- `Would you like to use Turbopack for next dev?` -> **Yes** (Trình biên dịch tốc độ cao viết bằng Rust)

---

## 💡 Bài tập tự luyện sau Bài 01
1. Kể tên 3 điểm khác biệt quan trọng nhất giữa Next.js và React thuần.
2. Trang chi tiết sản phẩm của một trang thương mại điện tử (có hàng nghìn sản phẩm, cập nhật giá vài tiếng một lần) nên dùng cơ chế render nào (CSR, SSR, SSG hay ISR)? Tại sao?
