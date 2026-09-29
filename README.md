# 🚀 Khóa Học Next.js Toàn Diện (Next.js Full Course)

Chào mừng bạn đến với lộ trình học tập **Next.js Hiện Đại (App Router & React 19)**! 
Kho tài liệu này được thiết kế bài bản từ nền tảng đến thực chiến, kèm dự án mẫu `nextjs-demo` để bạn có thể vừa học lý thuyết vừa chạy thử nghiệm trực quan.

---

## 📚 Mục Lục Các Bài Học Nền Tảng

| Bài học | Chủ đề chính | Tệp hướng dẫn chi tiết |
| :--- | :--- | :--- |
| **Bài 01** | **Tổng quan & Kiến trúc Server-First**<br>• Next.js là gì? Vì sao cần Next.js?<br>• CSR vs SSR vs SSG vs ISR<br>• Khởi tạo dự án chuẩn | [Xem Bài 01](./lessons/bai-01-tong-quan-va-kien-truc.md) |
| **Bài 02** | **Cấu trúc dự án & Special Files trong App Router**<br>• File conventions: `page`, `layout`, `loading`, `error`, `not-found`<br>• Route Groups `(group)` & Private folders `_lib`<br>• Metadata & SEO | [Xem Bài 02](./lessons/bai-02-cau-truc-du-an-app-router.md) |
| **Bài 03** | **Hệ thống Routing & Điều Hướng (Navigation)**<br>• Static, Nested & Dynamic Routes `[id]`<br>• Catch-all `[...slug]`<br>• Async `params` trong Next.js 15+<br>• `<Link>`, `useRouter`, `usePathname` | [Xem Bài 03](./lessons/bai-03-routing-va-navigation.md) |
| **Bài 04** | **Server Components (RSC) vs Client Components**<br>• Triết lý Server-First (Mặc định Server Component)<br>• Khi nào dùng `'use client'`?<br>• Ranh giới mạng & Kỹ thuật Composition (`children`) | [Xem Bài 04](./lessons/bai-04-server-va-client-components.md) |
| **Bài 05** | **Data Fetching, Caching & Server Actions**<br>• Fetch trực tiếp bằng `async/await` trên server<br>• Caching & Revalidation (ISR)<br>• Streaming UI với React Suspense<br>• Đột biến dữ liệu với Server Actions | [Xem Bài 05](./lessons/bai-05-data-fetching-va-server-actions.md) |

---

## 💻 Dự Án Mẫu Thực Hành (`nextjs-demo`)

Dự án mẫu đi kèm đã được cấu hình sẵn với:
- **Next.js 16 (Turbopack)**
- **React 19**
- **Tailwind CSS v4**
- **TypeScript**

### Hướng dẫn chạy thử dự án:
```bash
# 1. Di chuyển vào thư mục dự án
cd nextjs-demo

# 2. Cài đặt các gói phụ thuộc (nếu chưa cài)
npm install

# 3. Khởi động server phát triển
npm run dev
```

Mở trình duyệt tại: [http://localhost:3000](http://localhost:3000) để trải nghiệm giao diện học tập tương tác và các trang demo trực tiếp.
