# Bài 03: Hệ Thống Routing & Điều Hướng (Navigation)

---

## 🎯 Mục tiêu bài học
- Nắm vững cách xây dựng đường dẫn tĩnh (Static Routes) và lồng nhau (Nested Routes).
- Làm chủ **Dynamic Routes `[id]`**, **Catch-all Routes `[...slug]`**, và **Optional Catch-all `[[...slug]]`**.
- Hiểu cú pháp lấy **`params` bất đồng bộ (`Promise`)** trong phiên bản Next.js hiện đại (Next.js 15+).
- Sử dụng thẻ `<Link>` tối ưu hiệu năng và hook `useRouter`, `usePathname`, `useSearchParams`.
- Xử lý chuyển hướng trang phía Server với hàm `redirect()`.

---

## 1. Định Tuyến Tĩnh & Lồng Nhau (Static & Nested Routes)

Next.js sử dụng kiến trúc **File-system Based Routing**: đường dẫn trên thanh địa chỉ trình duyệt khớp chính xác với cấu trúc cây thư mục.

| Đường dẫn tệp tin | URL tương ứng |
| :--- | :--- |
| `app/page.tsx` | `/` |
| `app/about/page.tsx` | `/about` |
| `app/contact/page.tsx` | `/contact` |
| `app/dashboard/settings/page.tsx` | `/dashboard/settings` |

---

## 2. Đường Dẫn Động (Dynamic Routes: `[slug]`)

Khi bạn cần tạo trang chi tiết bài viết, sản phẩm, hoặc người dùng với ID thay đổi linh hoạt:

Tạo thư mục có tên đặt trong ngoặc vuông: `app/products/[id]/page.tsx`.

### Cú pháp trong Next.js 15 & 16:
> ⚠️ **Lưu ý quan trọng từ Next.js 15+**: `params` và `searchParams` được truyền vào Page component dưới dạng **`Promise`**. Bạn bắt buộc phải dùng `await` hoặc `React.use()` để giải nén dữ liệu.

```tsx
// app/products/[id]/page.tsx
interface ProductPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ProductDetailPage({
  params,
  searchParams,
}: ProductPageProps) {
  // Giải nén Promise
  const { id } = await params;
  const query = await searchParams;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Chi tiết sản phẩm #{id}</h1>
      <p className="text-gray-600 mt-2">Mã định danh sản phẩm nhận được từ URL: {id}</p>
      {query.coupon && (
        <div className="mt-4 p-3 bg-green-50 text-green-700 rounded border border-green-200">
          Mã giảm giá đang áp dụng: <strong>{query.coupon}</strong>
        </div>
      )}
    </div>
  );
}
```

---

## 3. Catch-all Routes (`[...slug]`) & Optional Catch-all

Khi bạn muốn một route hứng toàn bộ các tầng URL phía sau (thường dùng cho tài liệu docs hoặc danh mục nhiều cấp độ):

### 1. Catch-all: `app/docs/[...slug]/page.tsx`
- Khớp với:
  - `/docs/a` ➔ `params: { slug: ['a'] }`
  - `/docs/a/b` ➔ `params: { slug: ['a', 'b'] }`
  - `/docs/a/b/c` ➔ `params: { slug: ['a', 'b', 'c'] }`
- ❌ Không khớp với `/docs` (sẽ ra lỗi 404 nếu không có file `app/docs/page.tsx`).

### 2. Optional Catch-all: `app/docs/[[...slug]]/page.tsx`
- Đặt trong 2 cặp ngoặc vuông `[[...slug]]`.
- Khớp với **cả `/docs`** lẫn `/docs/a`, `/docs/a/b`.

---

## 4. Điều Hướng Tối Ưu Với Thẻ `<Link>`

Trong Next.js, **tuyệt đối không dùng thẻ `<a href="...">` thuần** cho điều hướng nội bộ, vì nó sẽ tải lại toàn bộ trang web (Full page reload).

Thay vào đó, hãy dùng component `<Link>` từ `next/link`:

```tsx
import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="flex gap-4">
      {/* Cơ bản */}
      <Link href="/" className="hover:underline">Trang chủ</Link>
      
      {/* Dynamic Link */}
      <Link href={`/products/${productId}`} className="text-blue-600">
        Xem chi tiết
      </Link>

      {/* Truyền query param */}
      <Link href="/products?sort=price_asc">Lọc giá</Link>

      {/* Tắt chế độ prefetch tự động nếu muốn tiết kiệm băng thông */}
      <Link href="/heavy-page" prefetch={false}>
        Trang nặng
      </Link>
    </nav>
  );
}
```

### Tại sao `<Link>` lại vượt trội?
- **Prefetching**: Khi link xuất hiện trong tầm nhìn (viewport) của người dùng, Next.js tự động tải trước mã nguồn của trang đó ở chế độ nền. Khi người dùng click chuột, trang mở ra **ngay lập tức (Instant)**.
- **Client-Side Navigation**: Chỉ cập nhật phần giao diện thay đổi, không mất state toàn cục.

---

## 5. Các Hook Điều Hướng Trong Client Component

Khi bạn cần xử lý điều hướng thông qua logic JavaScript (ví dụ: submit form thành công thì chuyển trang, highlight tab đang active):

```tsx
"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function ActiveNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleLoginSuccess = () => {
    // Chuyển trang bằng code
    router.push("/dashboard");
    // hoặc router.replace("/dashboard"); (không lưu lại lịch sử Back)
  };

  return (
    <div>
      <p>Đường dẫn hiện tại: {pathname}</p>
      <p>Query tham số: {searchParams.get("tab")}</p>

      {/* Kiểm tra active link */}
      <a
        className={`px-3 py-1 rounded ${
          pathname === "/about" ? "bg-blue-600 text-white" : "text-gray-700"
        }`}
      >
        Về chúng tôi
      </a>

      <button
        onClick={handleLoginSuccess}
        className="ml-4 px-4 py-2 bg-green-600 text-white rounded"
      >
        Đăng nhập ngay
      </button>
    </div>
  );
}
```

---

## 6. Chuyển Hướng Phía Server: `redirect()`

Trong Server Components hoặc Server Actions, bạn có thể chuyển hướng người dùng ngay lập tức từ phía máy chủ:

```tsx
// app/profile/page.tsx
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const isAuthenticated = false; // Giả sử kiểm tra session

  if (!isAuthenticated) {
    redirect("/login?message=auth_required");
  }

  return <div>Thông tin cá nhân bảo mật...</div>;
}
```

---

## 💡 Bài tập tự luyện sau Bài 03
1. Tạo một trang chi tiết tin tức: `app/news/[category]/[articleId]/page.tsx` và đọc cả 2 tham số `category` và `articleId`.
2. Tạo một thanh Navigation gồm 3 link: Trang chủ, Sản phẩm, Liên hệ. Hãy dùng `usePathname()` để tô màu nền xanh cho link đang được chọn (Active).
