# Bài 05: Data Fetching, Caching & Server Actions

---

## 🎯 Mục tiêu bài học
- Học cách lấy dữ liệu (Fetch Data) trực tiếp và tự nhiên bằng `async/await` trong Server Components.
- Làm chủ cơ chế Caching và Revalidation của Next.js: `force-cache`, `no-store`, `next: { revalidate: 60 }`.
- Sử dụng **React Suspense & Streaming** để hiển thị giao diện tức thì trong khi dữ liệu vẫn đang tải ngầm.
- Làm quen với **Server Actions (`'use server'`)** – tính năng cách mạng giúp cập nhật cơ sở dữ liệu trực tiếp mà không cần viết REST API rườm rà.

---

## 1. Lấy Dữ Liệu Trực Tiếp Trong Server Component

Trong React thuần, bạn phải viết: `useState`, `useEffect`, `fetch`, kiểm tra `loading`, kiểm tra `error`.
Trong Next.js App Router, bạn chỉ cần biến component thành hàm `async` và dùng `await`:

```tsx
// app/users/page.tsx
interface User {
  id: number;
  name: string;
  email: string;
}

export default async function UsersPage() {
  // Lấy dữ liệu trực tiếp trên Server trước khi trả HTML về Client
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const users: User[] = await res.json();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Danh Sách Người Dùng</h1>
      <ul className="space-y-2">
        {users.map((user) => (
          <li key={user.id} className="p-3 bg-white shadow rounded border">
            <span className="font-semibold">{user.name}</span> -{" "}
            <span className="text-gray-500">{user.email}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

---

## 2. Các Chiến Lược Caching Với `fetch()`

Next.js mở rộng hàm `fetch` gốc của Web API để bạn kiểm soát chính xác cơ chế lưu trữ đệm (Cache):

### A. Static Data (Mặc định - Tương đương SSG)
Lưu kết quả vĩnh viễn vào cache lúc build, phản hồi siêu tốc:
```tsx
const res = await fetch("https://api.example.com/posts", {
  cache: "force-cache", // Lưu cache lâu dài
});
```

### B. Dynamic Data (Tương đương SSR)
Mỗi lần người dùng tải trang, server lại gọi API lấy dữ liệu mới tinh:
```tsx
const res = await fetch("https://api.example.com/realtime-stocks", {
  cache: "no-store", // Không lưu cache, luôn lấy mới
});
```

### C. Time-based Revalidation (Tương đương ISR)
Lưu cache tạm thời, và tự động làm mới sau chu kỳ N giây:
```tsx
const res = await fetch("https://api.example.com/weather", {
  next: { revalidate: 60 }, // Cache lại trong 60 giây
});
```

---

## 3. Streaming UI Với React `<Suspense>`

Nếu trang của bạn có một phần dữ liệu tải rất chậm (mất 3 giây), bạn không muốn người dùng phải nhìn màn hình trắng suốt 3 giây đó!

Hãy dùng `<Suspense>` để hiển thị khung xương (Skeleton) cho phần chậm, trong khi toàn bộ phần còn lại của trang xuất hiện ngay lập tức:

```tsx
// app/dashboard/page.tsx
import { Suspense } from "react";

// Component tải chậm
async function SlowRevenueChart() {
  // Giả lập API chậm 3 giây
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return <div className="p-4 bg-green-100 rounded">Biểu đồ doanh thu: $120,000</div>;
}

export default function DashboardPage() {
  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold">Bảng Điều Khiển</h1>
      <p>Phần này xuất hiện ngay tức thì mà không cần chờ!</p>

      {/* Bao bọc phần chậm bằng Suspense */}
      <Suspense fallback={<div className="p-4 bg-gray-200 animate-pulse rounded">Đang tính toán doanh thu...</div>}>
        <SlowRevenueChart />
      </Suspense>
    </div>
  );
}
```

---

## 4. Server Actions (`'use server'`)

**Server Actions** là các hàm bất đồng bộ được thực thi trên Server, có thể được gọi trực tiếp từ Form hoặc Event Handler trên Client mà không cần viết file API (`/api/...`).

### Ví dụ tạo Server Action trong file riêng:
```ts
// app/actions/todo.ts
"use server";

import { revalidatePath } from "next/cache";

export async function createTodo(formData: FormData) {
  const title = formData.get("title") as string;

  // Xử lý lưu vào cơ sở dữ liệu (Database)
  console.log("Đã lưu việc cần làm vào Database:", title);

  // Làm mới lại dữ liệu trang mà không cần tải lại trang
  revalidatePath("/todos");
}
```

### Gọi trực tiếp từ Thẻ `<form>`:
```tsx
// app/todos/page.tsx
import { createTodo } from "@/actions/todo";

export default function TodosPage() {
  return (
    <div className="p-8">
      <form action={createTodo} className="flex gap-2">
        <input
          name="title"
          type="text"
          placeholder="Nhập việc cần làm..."
          className="border p-2 rounded"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Thêm việc
        </button>
      </form>
    </div>
  );
}
```

> **Điểm ưu việt:** Form này có thể hoạt động ngay cả khi người dùng **tắt JavaScript trên trình duyệt** (Progressive Enhancement)!

---

## 💡 Bài tập tự luyện sau Bài 05
1. Thực hành gọi API công khai `https://jsonplaceholder.typicode.com/posts` với tùy chọn `{ next: { revalidate: 30 } }`.
2. Tạo một component Skeleton mô phỏng danh sách đang tải và bọc một component bất đồng bộ bên trong thẻ `<Suspense>`.
