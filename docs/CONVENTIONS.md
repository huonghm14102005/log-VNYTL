# Quy Chuẩn Mã Nguồn & Phát Triển Nhanh — Sàn Giao Dịch Vận Tải Hai Chiều

> **Dự án:** Sàn kết nối hàng hóa và phương tiện vận tải hai chiều (Vietnam Young Logistics Talent 2026 - VYLT 2026)  
> **Nền tảng:** Next.js 14+ (App Router) · TypeScript · Tailwind CSS · shadcn/ui · Prisma ORM · PostgreSQL  
> **Tài liệu tham chiếu:** [SPECS.md](SPECS.md) · [MVP.md](MVP.md) · [ARCHITECTURE.md](ARCHITECTURE.md)

Tài liệu này định nghĩa các quy chuẩn **bắt buộc và có thể kiểm tra tự động** mà lập trình viên và AI Agent phải tuân thủ khi viết mã trong dự án, được thiết kế nhằm tối đa hóa tốc độ phát triển (Rapid Prototyping) phục vụ bản Demo chạy được cho cuộc thi.

---

## 1. Cấu Trúc Mã Nguồn (Next.js Fullstack Monorepo)

Dự án áp dụng mô hình **Fullstack Modular Monolith** trong Next.js App Router:

```text
src/
├── app/
│   ├── layout.tsx                # Root layout (Providers, Toaster, Fonts)
│   ├── page.tsx                  # Landing page giới thiệu sàn
│   ├── (auth)/                   # Module Xác thực & Onboarding
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   └── ekyc/page.tsx         # Xác thực CCCD / Giấy phép lái xe
│   ├── (shipper)/                # Phân hệ Chủ hàng (Shipper Portal)
│   │   ├── layout.tsx            # Shipper sidebar + header + Demo RoleSwitcher
│   │   ├── dashboard/page.tsx    # Tổng quan đơn, mini-map
│   │   ├── orders/
│   │   │   ├── create/page.tsx   # Wizard tạo đơn 4 bước
│   │   │   ├── [id]/page.tsx     # Chi tiết đơn & theo dõi hành trình
│   │   │   └── page.tsx          # Danh sách Đơn hàng của tôi
│   │   └── return-trucks/page.tsx# Chợ xe & Xe về rỗng gần tuyến
│   ├── (driver)/                 # Phân hệ Tài xế (Driver Portal)
│   │   ├── layout.tsx            # Driver mobile-friendly layout
│   │   ├── market/page.tsx       # Sàn tìm hàng, tab Gấp, tab Gợi ý AI
│   │   ├── return-trip/page.tsx  # Đăng lịch chuyến về rỗng
│   │   ├── trips/[id]/page.tsx   # Quản lý chuyến xe, cập nhật GPS, nộp e-POD
│   │   └── wallet/page.tsx       # Quản lý Ví cọc & Ví thu nhập
│   ├── (admin)/                  # Phân hệ Quản trị (Admin Portal)
│   │   ├── layout.tsx
│   │   ├── ekyc-review/page.tsx  # Duyệt hồ sơ CCCD/Xe 1 chạm
│   │   └── escrow/page.tsx       # Giám sát dòng tiền ký quỹ
│   └── api/v1/                   # Toàn bộ RESTful API Route Handlers
│       ├── auth/
│       ├── orders/
│       ├── return-trips/
│       ├── matching/
│       ├── escrow/
│       ├── tracking/
│       ├── pod/
│       └── chat/
├── components/
│   ├── ui/                       # shadcn/ui components (Button, Dialog, Badge, Tabs...)
│   ├── map/                      # Leaflet map wrapper, TruckMarker, RoutePolyline
│   ├── escrow/                   # CountdownTimer (30p), EscrowBadge, DepositModal
│   ├── shared/                   # Header, Sidebar, RoleSwitcher (Nút chuyển role demo)
│   └── chat/                     # InAppChatBox có bộ lọc Anti-Leakage
├── lib/
│   ├── prisma.ts                 # Prisma Client Singleton
│   ├── matching.ts               # Thuật toán Heuristic MatchScore đa tiêu chí
│   ├── anti-leakage.ts           # Hàm lọc và che giấu SĐT/Zalo
│   ├── currency.ts               # Hàm format tiền tệ VNĐ chuẩn
│   └── auth.ts                   # Token & session utilities
├── types/                        # TypeScript types & DTOs
└── styles/
    └── globals.css               # Tailwind CSS variables
```

---

## 2. Quy Ước Đặt Tên (Naming Conventions)

| Đối tượng | Quy ước | Ví dụ |
|---|---|---|
| **Thư mục route / feature** | `kebab-case` | `return-trucks/`, `ekyc-review/` |
| **File Component UI / Page** | `PascalCase` cho Component, `kebab-case` cho file helper | `CountdownTimer.tsx`, `matching.ts` |
| **Class, Interface, Type, Enum** | `PascalCase` | `OrderWithEscrow`, `VehicleType`, `OrderStatus` |
| **Hàm, Methods, Biến** | `camelCase` | `calculateMatchScore()`, `requiredDeposit` |
| **Hằng số hệ thống** | `SCREAMING_SNAKE_CASE` | `DEFAULT_ESCROW_TIMEOUT_MINS = 30` |
| **Prisma Model** | `PascalCase` | `Order`, `ReturnTrip`, `EscrowAccount` |
| **Cột CSDL (PostgreSQL)** | `snake_case` (thông qua `@map`) | `order_code`, `freight_price` |
| **API Endpoints** | `kebab-case`, số nhiều | `/api/v1/return-trips`, `/api/v1/orders` |
| **JSON Payload (Request/Response)**| `camelCase` | `{ "declaredValue": 200000000 }` |

---

## 3. Quy Chuẩn TypeScript & Dữ Liệu

1. **Bật chế độ nghiêm ngặt**: `strict: true` trong `tsconfig.json`.
2. **Cấm dùng `any`**: Sử dụng `unknown` kết hợp Type Guard hoặc Schema Validator (Zod) cho dữ liệu đầu vào.
3. **Validate Request Body**: Mọi API nhận dữ liệu từ người dùng đều phải được validate bằng thư viện **Zod**:
   ```typescript
   import { z } from 'zod';

   export const CreateOrderSchema = z.object({
     originAddress: z.string().min(5, "Địa chỉ lấy hàng quá ngắn"),
     destAddress: z.string().min(5, "Địa chỉ giao hàng quá ngắn"),
     cargoWeightKg: z.number().positive("Khối lượng phải lớn hơn 0"),
     declaredValue: z.number().positive("Giá trị khai báo phải lớn hơn 0"),
     freightPrice: z.number().positive("Cước vận chuyển phải lớn hơn 0"),
     servicePackage: z.enum(["STANDARD", "SUPERVISED", "INSURED"]),
   });
   ```
4. **Xử lý số tiền lớn (Decimal)**:
   - Khi lưu trong PostgreSQL: Dùng kiểu `DECIMAL(15, 2)`.
   - Khi truyền qua JSON API: Ép kiểu `number` để tính toán trên UI. Luôn làm tròn số nguyên đối với VNĐ.

---

## 4. Chuẩn Hóa Phản Hồi API & Xử Lý Lỗi

Mọi API route handler phải trả về phản hồi theo cấu trúc chuẩn:

### 4.1. Phản hồi thành công:
```json
{
  "success": true,
  "data": {
    "orderCode": "ORD-2026-8942",
    "status": "SEARCHING",
    "requiredDeposit": 5000000
  },
  "message": "Tạo đơn hàng thành công"
}
```

### 4.2. Phản hồi thất bại:
```json
{
  "success": false,
  "errorCode": "ERR_INSUFFICIENT_DEPOSIT",
  "message": "Số dư ví cọc không đủ (yêu cầu 5.000.000đ). Vui lòng nạp thêm.",
  "timestamp": "2026-09-19T19:00:00.000Z"
}
```

---

## 5. Quy Chuẩn Nghiệp Vụ Logistics Đặc Thù

### 5.1. Định dạng tiền tệ VNĐ
Mọi hiển thị tiền trên giao diện bắt buộc dùng hàm tiện ích chuẩn tại `src/lib/currency.ts`:
```typescript
export function formatVND(amount: number | string): string {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(num);
}
// Ví dụ: formatVND(3500000) -> "3.500.000 ₫"
```

### 5.2. Che giấu thông tin liên hệ (Anti-Leakage)
Chỉ hiển thị Số điện thoại và mở phòng Chat khi đơn hàng đạt trạng thái `MATCHED_ESCROWED`. Khi chưa hoàn tất, áp dụng hàm che giấu:
```typescript
export function maskPhoneNumber(phone: string): string {
  if (!phone || phone.length < 10) return '09********';
  return phone.slice(0, 4) + '***' + phone.slice(-3); // Ví dụ: 0901***567
}

export function sanitizeChatMessage(message: string): { cleanText: string; isLeaked: boolean } {
  // Regex phát hiện số điện thoại (10-11 số), có thể viết cách nhau hoặc viết bằng chữ
  const phoneRegex = /(0[3|5|7|8|9])[0-9.\s]{8,11}/g;
  const keywordRegex = /(zalo|sdt|số đt|gọi riêng|đi ngoài|ck riêng|chuyển khoản riêng)/gi;

  if (phoneRegex.test(message) || keywordRegex.test(message)) {
    return {
      cleanText: "[THÔNG TIN ĐÃ ĐƯỢC ẨN ĐỂ BẢO VỆ GIAO DỊCH]",
      isLeaked: true,
    };
  }
  return { cleanText: message, isLeaked: false };
}
```

### 5.3. Trình chuyển đổi vai trò Demo (Demo Role Switcher)
Để phục vụ thuyết trình trơn tru trước Ban Giám khảo trong 5 phút mà không cần đăng xuất/đăng nhập lại nhiều lần, thanh Header luôn có component **`RoleSwitcher`**:
- Nút bấm 1 chạm: **[Góc nhìn Chủ Hàng]** $\leftrightarrow$ **[Góc nhìn Tài Xế]** $\leftrightarrow$ **[Quản Trị Viên]**.
- Khi chuyển đổi, trạng thái được lưu vào Cookie/Session và tự động tải lại trang với đúng phân quyền tương ứng.

---

## 6. Quy Chuẩn Thiết Kế Giao Diện (UI/UX)

1. **Bảng màu chủ đạo (Logistics Theme)**:
   - **Màu thương hiệu chính (Primary):** Xanh hải quân đậm (`#0F172A` - `slate-900`) đại diện cho sự tin cậy, an toàn, ổn định của dịch vụ vận tải.
   - **Màu hành động & Điểm nhấn (Accent):** Vàng cam Hổ phách (`#F59E0B` - `amber-500`) đại diện cho cảnh báo, đèn xe tải, điểm nhấn nút bấm quan trọng.
   - **Màu ký quỹ thành công (Success):** Xanh lục bảo ngọc (`#10B981` - `emerald-500`) đại diện cho dòng tiền Escrow đã an toàn.
   - **Màu đơn gấp & Cảnh báo (Urgent/Danger):** Đỏ tươi (`#EF4444` - `red-500`) gắn nhãn cờ cho đơn cần bốc hàng gấp trong 3h.
2. **Nguyên tắc thiết kế form tạo đơn**:
   - Sử dụng mô hình **Wizard Stepper 4 bước** rõ ràng (Lộ trình $\to$ Hàng hóa $\to$ Chọn gói $\to$ Xem phí & Xác nhận).
   - Tích hợp ô **Nhập nhanh bằng ngôn ngữ tự nhiên (AI Quick Input)** ở đầu trang để tự điền form trong buổi demo.
3. **Bản đồ trực quan**:
   - Luôn hiển thị bản đồ nhỏ (Mini-map) với 2 điểm ghim: Điểm lấy (Xanh) và Điểm giao (Đỏ).
   - Khi xe đang chạy: Vẽ đường Polyline lộ trình và hiển thị Marker hình xe tải quay đầu theo hướng di chuyển.

---

## 7. Quy Chuẩn Git & Tài Liệu Hóa

1. **Quy tắc Commit Message**:
   - `feat:` Thêm tính năng mới (Ví dụ: `feat: implement escrow countdown timer`).
   - `fix:` Sửa lỗi nghiệp vụ (Ví dụ: `fix: correct deposit calculation for high value cargo`).
   - `docs:` Cập nhật tài liệu (Ví dụ: `docs: update SPECS with heuristic matching formula`).
   - `seed:` Bổ sung dữ liệu mẫu phục vụ demo (Ví dụ: `seed: add demo truck route Hai Phong - Ha Noi`).
2. **Bảo mật môi trường**:
   - Tuyệt đối không commit file `.env` chứa chuỗi kết nối CSDL hoặc khóa bí mật vào Git.
   - Luôn cung cấp file `.env.example` với đầy đủ các biến mẫu cần thiết.
