# Bài 02: Cấu Trúc Dự Án & Các Tệp Tin Quy Ước Trong App Router

---

## 🎯 Mục tiêu bài học
- Nắm vững cấu trúc thư mục của một dự án Next.js hiện đại.
- Hiểu và sử dụng thành thạo các **Tệp tin quy ước đặc biệt (Special Files)**: `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`.
- Phân biệt giữa `layout.tsx` và `template.tsx`.
- Biết cách tổ chức code với **Route Groups `(group)`** và **Private Folders `_folder`**.
- Thiết lập cấu hình Metadata & SEO cơ bản.

---

## 1. Cấu trúc thư mục tổng quan

Trong Next.js App Router, toàn bộ routing nằm trong thư mục `app/`:

```
my-next-app/
├── app/
│   ├── favicon.ico
│   ├── globals.css          # Style toàn cục (Tailwind / CSS)
│   ├── layout.tsx           # Root Layout (bắt buộc, chứa <html> và <body>)
│   ├── page.tsx             # Trang chủ (URL: /)
│   ├── loading.tsx          # Giao diện loading khi trang chủ tải
│   ├── not-found.tsx        # Giao diện khi truy cập link không tồn tại (404)
│   ├── about/
│   │   └── page.tsx         # URL: /about
│   ├── blog/
│   │   ├── layout.tsx       # Layout lồng nhau chỉ áp dụng cho nhánh /blog
│   │   ├── page.tsx         # URL: /blog
│   │   └── [slug]/
│   │       └── page.tsx     # URL động: /blog/bai-viet-1, /blog/bai-viet-2
│   └── api/
│       └── hello/
│           └── route.ts     # API Endpoint (GET, POST, ...): /api/hello
├── public/                  # Chứa file tĩnh (ảnh, icon, robots.txt)
├── next.config.ts           # Cấu hình Next.js
├── package.json
└── tsconfig.json
```

---

## 2. Các Tệp Tin Quy Ước (Special Files)

Trong App Router, tên tệp tin mang ý nghĩa định hình hành vi giao diện:

| Tệp tin | Vai trò | Ghi chú |
| :--- | :--- | :--- |
| `page.tsx` | Khai báo UI chính của một route | Mỗi folder muốn trở thành một đường dẫn URL thì **bắt buộc phải có `page.tsx`** |
| `layout.tsx` | Khung giao diện dùng chung cho các trang con | Giữ nguyên trạng thái (state) khi chuyển trang, không bị re-render |
| `template.tsx` | Tương tự `layout.tsx` nhưng **re-mount** mỗi khi chuyển trang | Hữu ích cho animation vào/ra hoặc reset state |
| `loading.tsx` | Hiển thị màn hình chờ (Skeleton loader) | Tự động bọc component trong React `<Suspense>` |
| `error.tsx` | Giao diện hiển thị khi trang con gặp lỗi | Bắt buộc phải là Client Component (`'use client'`) |
| `not-found.tsx`| Giao diện hiển thị lỗi 404 | Gọi tự động khi route không tìm thấy hoặc hàm `notFound()` được kích hoạt |
| `route.ts` | Khai báo API Endpoint (Backend Handler) | Nhận các hàm HTTP: `GET`, `POST`, `PUT`, `DELETE` |

---

## 3. Tìm hiểu chuyên sâu `layout.tsx`

`layout.tsx` giúp bạn tạo thanh điều hướng (Navbar), thanh bên (Sidebar), hoặc chân trang (Footer) mà không cần lặp lại code ở từng trang.

### Ví dụ Root Layout (`app/layout.tsx`):
```tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Khóa Học Next.js Toàn Diện",
  description: "Học Next.js App Router từ cơ bản đến nâng cao",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className="bg-slate-50 text-slate-900 min-h-screen flex flex-col">
        {/* Header dùng chung cho mọi trang */}
        <header className="border-b bg-white p-4">
          <nav className="max-w-6xl mx-auto font-bold text-lg">My Next App</nav>
        </header>

        {/* Nội dung trang hiện tại sẽ được render tại đây */}
        <main className="flex-1 max-w-6xl mx-auto p-4 w-full">{children}</main>

        {/* Footer dùng chung */}
        <footer className="border-t bg-white p-4 text-center text-sm text-gray-500">
          © 2026 Next.js Full Course
        </footer>
      </body>
    </html>
  );
}
```

> **Nguyên tắc vàng:** `app/layout.tsx` là tệp bắt buộc duy nhất phải có thẻ `<html>` và `<body>`. Các layout con bên trong các thư mục khác **không được phép** chứa thẻ `<html>` và `<body>`.

---

## 4. `loading.tsx` & React Suspense

Khi một trang đang lấy dữ liệu từ server, Next.js sẽ lập tức hiển thị file `loading.tsx` trong lúc chờ đợi:

```tsx
// app/blog/loading.tsx
export default function Loading() {
  return (
    <div className="flex items-center justify-center p-8 space-x-2 animate-pulse">
      <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
      <span className="text-gray-500">Đang tải dữ liệu bài viết...</span>
    </div>
  );
}
```

---

## 5. `error.tsx` - Xử lý lỗi an toàn

`error.tsx` đóng vai trò là một **React Error Boundary**. Khi component con ném lỗi (`throw new Error`), toàn bộ ứng dụng sẽ không bị sập (trắng màn hình), mà thay vào đó hiển thị giao diện của `error.tsx`.

```tsx
// app/dashboard/error.tsx
"use client"; // Bắt buộc phải là Client Component

import { useEffect } from "react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Lỗi xảy ra:", error);
  }, [error]);

  return (
    <div className="p-6 bg-red-50 border border-red-200 rounded-lg text-red-700">
      <h2 className="text-xl font-bold">Đã có lỗi xảy ra!</h2>
      <p className="mt-2 text-sm">{error.message}</p>
      <button
        onClick={() => reset()}
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm font-medium"
      >
        Thử lại
      </button>
    </div>
  );
}
```

---

## 6. Mẹo tổ chức thư mục: Route Groups & Private Folders

### A. Route Groups: `(groupName)`
Đặt tên thư mục trong dấu ngoặc đơn để **gom nhóm logic** mà **không làm thay đổi URL**.

*Ví dụ:*
- `app/(marketing)/about/page.tsx` ➔ URL vẫn là `/about` (không có `/marketing/about`)
- `app/(auth)/login/page.tsx` ➔ URL là `/login`
- Lợi ích: Cho phép tạo các layout riêng biệt (ví dụ: nhóm `(auth)` có layout không có Navbar, còn nhóm `(dashboard)` có Sidebar).

### B. Private Folders: `_folderName`
Đặt dấu gạch dưới `_` ở đầu để đánh dấu thư mục chứa component, hàm dùng nội bộ, Next.js sẽ **loại bỏ hoàn toàn khỏi hệ thống routing**.
*Ví dụ:* `app/blog/_components/PostCard.tsx` ➔ Không tạo URL `/blog/_components/PostCard`.

---

## 💡 Bài tập tự luyện sau Bài 02
1. Tạo một thư mục `app/contact/` và tạo 2 file `page.tsx`, `loading.tsx`.
2. Phân biệt sự khác nhau giữa `layout.tsx` và `template.tsx`. Trong trường hợp nào bạn bắt buộc phải dùng `template.tsx`?
