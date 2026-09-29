# Bài 04: Server Components (RSC) vs Client Components

---

## 🎯 Mục tiêu bài học
- Hiểu thấu đáo triết lý cốt lõi của React 19 & Next.js: **Mặc định là Server Component**.
- Hiểu chính xác ý nghĩa của chỉ thị `'use client'`.
- Nắm vững bảng tiêu chí: **Khi nào dùng Server Component? Khi nào dùng Client Component?**
- Nắm vững mô hình kiến trúc: **Ranh giới mạng (Network Boundary)** và kỹ thuật **Component Composition (Truyền `children`)**.
- Tránh các sai lầm phổ biến khiến bundle JavaScript bị phình to hoặc lộ thông tin bảo mật.

---

## 1. Triết lý Server-First: Mặc định là Server Component

Trong thư mục `app/` của Next.js, **mọi file component mặc định 100% đều là React Server Component (RSC)**.

### Cơ chế hoạt động của Server Component:
1. Component được thực thi và tính toán hoàn toàn trên **Máy chủ (Node.js/Edge runtime)**.
2. Trả về cho trình duyệt định dạng HTML và RSC Payload (cấu trúc cây DOM).
3. **0 Byte JavaScript gửi về Client** cho component đó! Nếu bạn dùng một thư viện nặng 5MB trên server để xử lý dữ liệu, máy khách sẽ không phải tải 5MB đó về.

---

## 2. Bảng so sánh toàn diện: Server vs Client Component

| Tiêu chí | Server Component (Mặc định) | Client Component (`'use client'`) |
| :--- | :--- | :--- |
| **Khai báo** | Viết component React thông thường | Thêm dòng `'use client'` ở dòng đầu tiên |
| **Nơi chạy** | **Chỉ chạy trên Server** | Chạy trước trên Server (Pre-render) và Hydrate trên Client |
| **Truy cập CSDL/Backend** | Trực tiếp gọi Prisma, Drizzle, Secret Keys | Không được phép (sẽ lộ key ra trình duyệt) |
| **Bundle Size gửi về máy khách** | **0 KB** JS bundle | Gửi kèm toàn bộ mã JS để trình duyệt chạy |
| **Hooks (`useState`, `useEffect`)**| ❌ Không hỗ trợ | ✅ Hỗ trợ đầy đủ |
| **Sự kiện (`onClick`, `onChange`)** | ❌ Không hỗ trợ | ✅ Hỗ trợ đầy đủ |
| **Browser API (`window`, `localStorage`)** | ❌ Không hỗ trợ | ✅ Hỗ trợ (sau khi mount) |
| **Hỗ trợ `async/await` trực tiếp** | ✅ Hỗ trợ trực tiếp ở Root | ❌ Phải dùng hook hoặc thư viện fetch |

---

## 3. Khi nào BẮT BUỘC dùng Client Component?

Chỉ thêm `'use client'` khi component của bạn rơi vào các trường hợp sau:
1. Có sử dụng **State** hoặc **Lifecycle hooks**: `useState()`, `useEffect()`, `useReducer()`, `useRef()`.
2. Có gắn các **Trình lắng nghe sự kiện (Event Listeners)**: `onClick={...}`, `onChange={...}`, `onSubmit={...}`.
3. Sử dụng các **API của trình duyệt**: `window.innerHeight`, `localStorage.getItem()`, `document.title`.
4. Sử dụng các thư viện bên thứ 3 chỉ hỗ trợ chạy trên trình duyệt (ví dụ: thư viện vẽ biểu đồ, carousel kéo thả).

---

## 4. Mô hình Ranh Giới Mạng (Network Boundary)

Dòng `'use client'` đóng vai trò như một **vạch kẻ biên giới** giữa Server và Client:

```
[Server Component - Page / Layout]
       │
       ▼ (Chỉ thị 'use client')
[Client Component - Header / FilterBar]
       │
       ▼ (Mọi component con được import bên trong cũng tự động thành Client Component!)
[Child Button] -> [Child Dropdown]
```

> **Quy tắc quan trọng:** Bất kỳ file nào được `import` trực tiếp vào một Client Component sẽ tự động bị biến thành Client Component và được đóng gói vào JavaScript bundle gửi về trình duyệt.

Do đó, hãy **đẩy Client Component ra sát ngọn của cây (Leaves of Component Tree)** thay vì đặt `'use client'` ở file layout hoặc page gốc!

---

## 5. Kỹ thuật vàng: Component Composition (Truyền qua `children`)

Một câu hỏi kinh điển: *Làm thế nào để nhúng một Server Component nặng (chứa query database) vào bên trong một Client Component (như Modal hoặc Collapsible Sidebar)?*

❌ **Cách SAI (Import trực tiếp):**
```tsx
// Sidebar.tsx ("use client")
"use client";
import HeavyServerList from "./HeavyServerList"; // ❌ Lỗi hoặc làm HeavyServerList biến thành Client Component!

export default function Sidebar() {
  return <div><HeavyServerList /></div>;
}
```

✅ **Cách ĐÚNG (Kỹ thuật Composition qua `children`):**
Truyền Server Component dưới dạng `children` hoặc `prop`:

```tsx
// 1. Client Component: Sidebar.tsx
"use client";
import { useState } from "react";

export default function Sidebar({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside className={isOpen ? "w-64" : "w-16"}>
      <button onClick={() => setIsOpen(!isOpen)}>Toggle</button>
      {/* children ở đây vẫn được giữ nguyên là Server Component và chạy trên Server! */}
      {children}
    </aside>
  );
}
```

```tsx
// 2. Server Component: app/page.tsx
import Sidebar from "./Sidebar"; // Client Component
import HeavyServerList from "./HeavyServerList"; // Server Component

export default function Page() {
  return (
    <Sidebar>
      <HeavyServerList />
    </Sidebar>
  );
}
```

---

## 💡 Bài tập tự luyện sau Bài 04
1. Viết một component `Counter` có 2 nút Tăng / Giảm và hiển thị số lượng. Xác định xem component này là Server hay Client Component?
2. Giả sử bạn cần tạo một trang đọc tin tức gồm: Header, Nội dung bài viết (lấy từ database), và Nút bấm Like (người dùng click để tăng lượt thích). Hãy vẽ sơ đồ phân chia các phần nào nên là Server Component và phần nào là Client Component để trang tải nhanh nhất.
