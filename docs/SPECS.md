# Đặc tả kỹ thuật (Technical Specifications) — Sàn Giao Dịch Vận Tải Hai Chiều

> **Dự án:** Sàn kết nối hàng hóa và phương tiện vận tải hai chiều (Vietnam Young Logistics Talent 2026 - VYLT 2026)  
> **Phiên bản:** 2.0 (Chuẩn hóa Logistics MVP & Demo-Ready)  
> **Trạng thái:** **Approved / Implementing**  
> **Tài liệu tham chiếu:** [MVP.md](MVP.md) · [ARCHITECTURE.md](ARCHITECTURE.md) · [CONVENTIONS.md](CONVENTIONS.md) · [mo-ta-ben-co-hang.md](mo-ta-ben-co-hang.md)

Tài liệu này là **Single Source of Truth** về đặc tả kỹ thuật cho toàn bộ dự án: Mô hình dữ liệu Prisma (ORM), Danh mục RESTful API Endpoints v1, Sự kiện thời gian thực (WebSockets/Realtime), Công thức thuật toán ghép nối Heuristic Matching, Quy tắc Ký quỹ Escrow và Kịch bản dữ liệu mẫu (Seed Data) phục vụ trình diễn Demo 5 phút trước Ban Giám khảo.

---

## 1. Nền Tảng Công Nghệ & Thành Phần (Rapid Tech Stack Baseline)

Nhằm tối ưu hóa tốc độ hoàn thiện bản Demo chạy được (Working Demo) trong thời gian ngắn nhất mà vẫn đảm bảo tính module hóa và khả năng mở rộng:

| Tầng kiến trúc | Công nghệ / Thư viện | Phiên bản | Vai trò & Lý do lựa chọn |
|---|---|---|---|
| **Fullstack Framework** | **Next.js (App Router)** | 14.2+ / 15+ | 1 codebase duy nhất cho cả Giao diện (React) và API Handlers. Chia sẻ 100% Type-safe, không tốn công cấu hình CORS. |
| **Ngôn ngữ** | **TypeScript** | 5.4+ | Ép kiểu chặt chẽ (Strict mode), giảm thiểu lỗi runtime. |
| **Giao diện & Styling** | **Tailwind CSS + shadcn/ui** | Tailwind v3.4+ | Tốc độ dựng UI nhanh, có sẵn các component cao cấp: Stepper, Dialog, Badge, Tabs, Toast. |
| **Biểu tượng** | **Lucide React** | Mới nhất | Bộ icon phong phú, chuẩn nghiệp vụ logistics (Truck, Package, ShieldCheck, MapPin...). |
| **Cơ sở dữ liệu** | **PostgreSQL** | 15+ / 16+ | Lưu trữ dữ liệu quan hệ, hỗ trợ giao dịch ACID nghiêm ngặt cho dòng tiền Escrow. |
| **ORM & Di chuyển dữ liệu**| **Prisma ORM** | 5.18+ / 6.0+ | Tự động sinh TypeScript Types, migration nhanh chóng, có sẵn **Prisma Studio** trực quan dữ liệu. |
| **Bản đồ & Tọa độ** | **Leaflet + React-Leaflet** | 1.9+ | Hoàn toàn miễn phí, không phụ thuộc API Key thẻ tín dụng, ghim vị trí và vẽ route tức thì. |
| **Giao tiếp Realtime** | **Pusher Channels / Socket.io** | Mới nhất | Đồng bộ GPS xe đang chạy, thông báo trạng thái đơn hàng và kênh chat nội bộ. |
| **Xác thực & Mã hóa** | **NextAuth.js (v5) / JWT + bcrypt** | Mới nhất | Xác thực dựa trên Cookie/JWT, phân quyền 3 vai trò: `SHIPPER`, `DRIVER`, `ADMIN`. |

---

## 2. Mô Hình Dữ Liệu Chi Tiết (Prisma Schema)

Lưu tại đường dẫn: `prisma/schema.prisma`

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// -------------------------------------------------------------
// 1. NGƯỜI DÙNG & ĐỊNH DANH (USERS & EKYC)
// -------------------------------------------------------------

enum UserRole {
  SHIPPER
  DRIVER
  ADMIN
}

enum UserType {
  INDIVIDUAL // Cá nhân
  ENTERPRISE // Doanh nghiệp
}

enum EkycStatus {
  UNVERIFIED // Chưa nộp hồ sơ
  PENDING    // Đang chờ xét duyệt
  VERIFIED   // Đã xác minh (Được phép tạo/nhận đơn)
  REJECTED   // Bị từ chối
  SUSPENDED  // Bị khóa
}

model User {
  id               String      @id @default(uuid())
  phoneNumber      String      @unique @map("phone_number")
  passwordHash     String      @map("password_hash")
  fullName         String      @map("full_name")
  role             UserRole    @default(SHIPPER)
  userType         UserType    @default(INDIVIDUAL) @map("user_type")
  ekycStatus       EkycStatus  @default(UNVERIFIED) @map("ekyc_status")
  reputationScore  Decimal     @default(5.00) @db.Decimal(3, 2) @map("reputation_score") // Thang điểm 1.00 - 5.00
  
  // Thông tin eKYC CCCD / ĐKKD
  idCardNumber     String?     @unique @map("id_card_number")
  idCardFrontUrl   String?     @map("id_card_front_url")
  idCardBackUrl    String?     @map("id_card_back_url")
  portraitUrl      String?     @map("portrait_url")
  companyName      String?     @map("company_name")
  taxCode          String?     @map("tax_code")
  businessLicenseUrl String?   @map("business_license_url")
  
  // Thông tin thanh toán / Rút tiền
  bankName         String?     @map("bank_name")
  bankAccountNumber String?    @map("bank_account_number")
  bankAccountHolder String?    @map("bank_account_holder")
  
  createdAt        DateTime    @default(now()) @map("created_at")
  updatedAt        DateTime    @updatedAt @map("updated_at")

  // Quan hệ
  wallet           Wallet?
  vehicles         Vehicle[]
  createdOrders    Order[]     @relation("ShipperOrders")
  assignedOrders   Order[]     @relation("DriverOrders")
  returnTrips      ReturnTrip[]
  sentMessages     ChatMessage[]
  reviewsGiven     Review[]    @relation("Reviewer")
  reviewsReceived  Review[]    @relation("Reviewee")

  @@map("users")
}

// -------------------------------------------------------------
// 2. PHƯƠNG TIỆN VẬN TẢI (VEHICLES)
// -------------------------------------------------------------

enum VehicleType {
  TRUCK_BOX      // Xe tải thùng kín
  TRUCK_TARP     // Xe tải mui bạt
  CONTAINER      // Xe Container
  REFRIGERATED   // Xe đông lạnh
  TANKER         // Xe bồn
  FLATBED        // Xe mooc sàn
}

model Vehicle {
  id                  String      @id @default(uuid())
  driverId            String      @map("driver_id")
  plateNumber         String      @unique @map("plate_number") // Ví dụ: 29C-123.45
  vehicleType         VehicleType @map("vehicle_type")
  brand               String?     // Hino, Isuzu, Hyundai...
  maxPayloadKg        Int         @map("max_payload_kg") // Tải trọng tối đa (kg)
  cargoVolumeCbm      Decimal?    @db.Decimal(6, 2) @map("cargo_volume_cbm") // Thể tích thùng m3
  lengthM             Decimal?    @db.Decimal(4, 2) @map("length_m")
  widthM              Decimal?    @db.Decimal(4, 2) @map("width_m")
  heightM             Decimal?    @db.Decimal(4, 2) @map("height_m")
  
  registrationCertUrl String      @map("registration_cert_url") // Ảnh Cà vẹt
  inspectionCertUrl   String      @map("inspection_cert_url")   // Ảnh Đăng kiểm
  isVerified          Boolean     @default(false) @map("is_verified")
  createdAt           DateTime    @default(now()) @map("created_at")
  updatedAt           DateTime    @updatedAt @map("updated_at")

  driver              User        @relation(fields: [driverId], references: [id], onDelete: Cascade)
  orders              Order[]
  returnTrips         ReturnTrip[]

  @@map("vehicles")
}

// -------------------------------------------------------------
// 3. ĐƠN HÀNG & CHUYẾN XE VỀ RỖNG (ORDERS & RETURN TRIPS)
// -------------------------------------------------------------

enum OrderStatus {
  DRAFT                 // Lưu nháp
  SEARCHING             // Đang công khai tìm xe trên sàn
  WAITING_DRIVER_DEPOSIT// Có xe quan tâm, chờ tài xế khóa cọc
  WAITING_ESCROW_PAYMENT// Tài xế đã cọc, chờ chủ hàng nộp cước (30 phút đếm ngược)
  MATCHED_ESCROWED      // Đã nộp cọc + cước đầy đủ -> Mở SĐT & Chat
  PICKING_UP            // Tài xế đang đến kho lấy hàng
  IN_TRANSIT            // Đã lấy hàng, đang vận chuyển trên đường
  DELIVERED             // Đã giao hàng, nộp ảnh e-POD (24h đếm ngược tự xác nhận)
  COMPLETED             // Đã giải ngân cước & hoàn cọc thành công
  CANCELLED             // Đã hủy (xử lý phạt theo quy chế)
  DISPUTED              // Đang khiếu nại, đóng băng tiền
}

enum ServicePackage {
  STANDARD   // Cơ bản (Escrow + POD chuẩn)
  SUPERVISED // Giám sát (Ảnh + GPS mỗi 2h, chia 60% phụ phí cho tài xế)
  INSURED    // Bảo đảm toàn diện (Đền bù 100% giá trị khai báo)
}

enum UrgencyLevel {
  NORMAL   // Đơn thường (24h hết hạn)
  URGENT   // Đơn gấp (3h hết hạn, gắn cờ đỏ nổi bật)
  FLEXIBLE // Linh hoạt thời gian (dễ ghép chuyến rỗng)
}

model Order {
  id               String          @id @default(uuid())
  orderCode        String          @unique @map("order_code") // ORD-2026-XXXX
  shipperId        String          @map("shipper_id")
  driverId         String?         @map("driver_id")
  vehicleId        String?         @map("vehicle_id")

  // Tuyến đường & Tọa độ
  originAddress    String          @map("origin_address")
  originCity       String          @map("origin_city")
  originLat        Float           @map("origin_lat")
  originLng        Float           @map("origin_lng")
  destAddress      String          @map("dest_address")
  destCity         String          @map("dest_city")
  destLat          Float           @map("dest_lat")
  destLng          Float           @map("dest_lng")
  distanceKm       Decimal?        @db.Decimal(8, 2) @map("distance_km")

  // Thông tin hàng hóa
  cargoName        String          @map("cargo_name")
  cargoType        String          @map("cargo_type") // Nông sản, VLXD, Tiêu dùng...
  cargoWeightKg    Int             @map("cargo_weight_kg")
  cargoVolumeCbm   Decimal?        @db.Decimal(6, 2) @map("cargo_volume_cbm")
  cargoPhotoUrl    String?         @map("cargo_photo_url")
  specialNotes     String?         @map("special_notes")

  // Tài chính & Gói dịch vụ
  declaredValue    Decimal         @db.Decimal(15, 2) @map("declared_value") // Giá trị hàng khai báo
  freightPrice     Decimal         @db.Decimal(15, 2) @map("freight_price")   // Cước vận chuyển
  requiredDeposit  Decimal         @db.Decimal(15, 2) @map("required_deposit")// Cọc tài xế (10% giá trị hàng, trần 5tr)
  servicePackage   ServicePackage  @default(STANDARD) @map("service_package")
  urgencyLevel     UrgencyLevel    @default(NORMAL) @map("urgency_level")
  status           OrderStatus     @default(SEARCHING)

  // Mốc thời gian
  pickupDeadline   DateTime        @map("pickup_deadline")
  deliveryDeadline DateTime?       @map("delivery_deadline")
  escrowDeadline   DateTime?       @map("escrow_deadline") // Hết 30 phút mà chủ hàng không nộp cước -> Hủy
  autoReleaseAt    DateTime?       @map("auto_release_at") // Hết 24h sau giao -> Tự động giải ngân
  completedAt      DateTime?       @map("completed_at")
  createdAt        DateTime        @default(now()) @map("created_at")
  updatedAt        DateTime        @updatedAt @map("updated_at")

  // Quan hệ
  shipper          User            @relation("ShipperOrders", fields: [shipperId], references: [id])
  driver           User?           @relation("DriverOrders", fields: [driverId], references: [id])
  vehicle          Vehicle?        @relation(fields: [vehicleId], references: [id])
  escrowAccount    EscrowAccount?
  trackingLogs     TrackingLog[]
  proofOfDelivery  ProofOfDelivery?
  chatRoom         ChatRoom?
  disputes         Dispute[]

  @@map("orders")
}

// Chuyến xe về rỗng do tài xế đăng tải
model ReturnTrip {
  id                 String       @id @default(uuid())
  driverId           String       @map("driver_id")
  vehicleId          String       @map("vehicle_id")
  
  originCity         String       @map("origin_city")
  originAddress      String?      @map("origin_address")
  originLat          Float?       @map("origin_lat")
  originLng          Float?       @map("origin_lng")
  
  destCity           String       @map("dest_city")
  destAddress        String?      @map("dest_address")
  destLat            Float?       @map("dest_lat")
  destLng            Float?       @map("dest_lng")

  availableFrom      DateTime     @map("available_from")
  availableTo        DateTime     @map("available_to")
  availablePayloadKg Int          @map("available_payload_kg")
  expectedPrice      Decimal?     @db.Decimal(15, 2) @map("expected_price")
  isActive           Boolean      @default(true) @map("is_active")
  createdAt          DateTime     @default(now()) @map("created_at")

  driver             User         @relation(fields: [driverId], references: [id], onDelete: Cascade)
  vehicle            Vehicle      @relation(fields: [vehicleId], references: [id], onDelete: Cascade)

  @@map("return_trips")
}

// -------------------------------------------------------------
// 4. KÝ QUỸ TRUNG GIAN ESCROW & SỔ CÁI VÍ NỘI BỘ
// -------------------------------------------------------------

enum EscrowStatus {
  WAITING_DEPOSIT // Chờ tài xế nộp cọc
  WAITING_FREIGHT // Chờ chủ hàng nộp cước (30 phút)
  HOLDING         // Đang khóa giữ tiền song phương an toàn
  RELEASED        // Đã giải ngân cho tài xế + hoàn cọc
  REFUNDED        // Đã hoàn tiền cước cho chủ hàng
  DISPUTED        // Đang đóng băng do tranh chấp
}

model EscrowAccount {
  id                  String       @id @default(uuid())
  orderId             String       @unique @map("order_id")
  
  freightAmount       Decimal      @db.Decimal(15, 2) @map("freight_amount") // 100% Cước do chủ hàng nạp
  driverDepositAmount Decimal      @db.Decimal(15, 2) @map("driver_deposit_amount") // Cọc tài xế đã nộp
  platformFee         Decimal      @db.Decimal(15, 2) @map("platform_fee")   // 8% Hoa hồng sàn
  driverNetEarnings   Decimal      @db.Decimal(15, 2) @map("driver_net_earnings") // 92% Cước thực nhận
  
  status              EscrowStatus @default(WAITING_DEPOSIT)
  createdAt           DateTime     @default(now()) @map("created_at")
  updatedAt           DateTime     @updatedAt @map("updated_at")

  order               Order        @relation(fields: [orderId], references: [id], onDelete: Cascade)

  @@map("escrow_accounts")
}

model Wallet {
  id             String              @id @default(uuid())
  userId         String              @unique @map("userId")
  depositBalance Decimal             @default(0.00) @db.Decimal(15, 2) @map("deposit_balance") // Số dư ví cọc
  lockedDeposit  Decimal             @default(0.00) @db.Decimal(15, 2) @map("locked_deposit")  // Cọc đang bị đóng băng
  incomeBalance  Decimal             @default(0.00) @db.Decimal(15, 2) @map("income_balance")  // Số dư thu nhập có thể rút
  createdAt      DateTime            @default(now()) @map("created_at")
  updatedAt      DateTime            @updatedAt @map("updated_at")

  user           User                @relation(fields: [userId], references: [id], onDelete: Cascade)
  transactions   WalletTransaction[]

  @@map("wallets")
}

enum TransactionType {
  TOPUP_DEPOSIT       // Nạp tiền vào ví cọc
  LOCK_DEPOSIT        // Khóa cọc khi nhận chuyến
  UNLOCK_DEPOSIT      // Mở khóa hoàn cọc khi giao xong
  FORFEIT_DEPOSIT     // Tịch thu cọc khi hủy/bùng hàng
  PAY_FREIGHT_ESCROW  // Chủ hàng nạp cước vào Escrow
  PAYOUT_FREIGHT      // Giải ngân cước về ví thu nhập tài xế
  WITHDRAW            // Rút tiền về ngân hàng
}

model WalletTransaction {
  id             String          @id @default(uuid())
  walletId       String          @map("wallet_id")
  amount         Decimal         @db.Decimal(15, 2)
  type           TransactionType
  description    String
  referenceId    String?         @map("reference_id") // orderId hoặc mã giao dịch
  balanceAfter   Decimal         @db.Decimal(15, 2) @map("balance_after")
  createdAt      DateTime        @default(now()) @map("created_at")

  wallet         Wallet          @relation(fields: [walletId], references: [id], onDelete: Cascade)

  @@map("wallet_transactions")
}

// -------------------------------------------------------------
// 5. THEO DÕI HÀNH TRÌNH, E-POD & PHÒNG CHAT BẢO MẬT
// -------------------------------------------------------------

model TrackingLog {
  id          String   @id @default(uuid())
  orderId     String   @map("order_id")
  lat         Float
  lng         Float
  speedKmh    Float?   @map("speed_kmh")
  photoUrl    String?  @map("photo_url") // Ảnh cập nhật định kỳ mỗi 2h (Gói Giám Sát)
  note        String?
  recordedAt  DateTime @default(now()) @map("recorded_at")

  order       Order    @relation(fields: [orderId], references: [id], onDelete: Cascade)

  @@map("tracking_logs")
}

model ProofOfDelivery {
  id               String   @id @default(uuid())
  orderId          String   @unique @map("order_id")
  photoPodUrl      String   @map("photo_pod_url")      // Ảnh hàng hóa/biên lai tại điểm giao
  receiverSignatureUrl String? @map("receiver_signature_url") // Chữ ký số người nhận
  deliveredAt      DateTime @default(now()) @map("delivered_at")
  receiverName     String?  @map("receiver_name")
  receiverNote     String?  @map("receiver_note")

  order            Order    @relation(fields: [orderId], references: [id], onDelete: Cascade)

  @@map("proof_of_deliveries")
}

model ChatRoom {
  id          String        @id @default(uuid())
  orderId     String        @unique @map("order_id")
  createdAt   DateTime      @default(now()) @map("created_at")

  order       Order         @relation(fields: [orderId], references: [id], onDelete: Cascade)
  messages    ChatMessage[]

  @@map("chat_rooms")
}

model ChatMessage {
  id          String   @id @default(uuid())
  roomId      String   @map("room_id")
  senderId    String   @map("sender_id")
  content     String   // Nội dung hiển thị (đã qua bộ lọc Anti-Leakage nếu có SĐT)
  rawContent  String?  @map("raw_content") // Lưu nội dung gốc phục vụ đối soát tranh chấp
  isFiltered  Boolean  @default(false) @map("is_filtered") // Đánh dấu nếu chứa thông tin liên hệ né sàn
  createdAt   DateTime @default(now()) @map("created_at")

  room        ChatRoom @relation(fields: [roomId], references: [id], onDelete: Cascade)
  sender      User     @relation(fields: [senderId], references: [id], onDelete: Cascade)

  @@map("chat_messages")
}

model Dispute {
  id          String   @id @default(uuid())
  orderId     String   @map("order_id")
  creatorId   String   @map("creator_id")
  reason      String   // Hàng hư hỏng, mất mát, giao trễ, tài xế không liên lạc được...
  evidenceUrls String[] @map("evidence_urls") // Mảng link ảnh chứng minh
  status      String   @default("OPEN") // OPEN, RESOLVED, REJECTED
  resolution  String?  // Kết luận phân xử của Admin
  createdAt   DateTime @default(now()) @map("created_at")
  updatedAt   DateTime @updatedAt @map("updated_at")

  order       Order    @relation(fields: [orderId], references: [id], onDelete: Cascade)

  @@map("disputes")
}

model Review {
  id          String   @id @default(uuid())
  reviewerId  String   @map("reviewer_id")
  revieweeId  String   @map("reviewee_id")
  rating      Int      // 1 đến 5 sao
  comment     String?
  createdAt   DateTime @default(now()) @map("created_at")

  reviewer    User     @relation("Reviewer", fields: [reviewerId], references: [id])
  reviewee    User     @relation("Reviewee", fields: [revieweeId], references: [id])

  @@map("reviews")
}
```

---

## 3. Quy Chuẩn Vận Hành & Các Tham Số Cốt Lõi (Resolution of Table J)

Toàn bộ logic nghiệp vụ tuân thủ nghiêm ngặt bộ tham số đã chốt tại [MVP.md](MVP.md):

| Tham số | Giá trị chuẩn cho Demo | Cơ chế tự động trong Backend |
| :--- | :---: | :--- |
| **Tỷ lệ cọc tài xế ($k\%$)** | **10%** giá trị hàng khai báo | **Min: 300.000đ**, **Trần tối đa: 5.000.000đ**. Tránh rào cản vốn cho tài xế cá nhân. |
| **Thời hạn thanh toán cước ($X$ phút)** | **30 phút** đếm ngược | Quá 30 phút mà chủ hàng không nộp cước: Hủy ghép, hoàn 100% cọc cho tài xế, trừ 0.2 sao uy tín chủ hàng. |
| **Thời hạn tự giải ngân ($N$ giờ)** | **24 giờ** đếm ngược | Quá 24h từ khi tài xế nộp ảnh e-POD mà chủ hàng im lặng không khiếu nại: Hệ thống tự hoàn tất và giải ngân. |
| **Thời hạn tìm xe ($X$ giờ)** | Đơn thường: **24h**<br>Đơn gấp: **3h** | Đơn gấp tự gắn banner đỏ trên đầu chợ, tự động hủy chuyển sang `CANCELLED` khi hết hạn. |
| **Phí sàn (Take Rate)** | **8%** giá trị cước vận chuyển | Khấu trừ tự động khi giải ngân: Tài xế thực nhận **92% cước**, Sàn thu **8%**. |
| **Phụ phí gói Giám sát** | Thêm 15% cước | Chuyển **60% phụ phí** này cho tài xế khi hoàn tất, **40%** sàn giữ. |

---

## 4. Đặc Tả Danh Mục RESTful API Endpoints v1

Tất cả API đặt tại đường dẫn: `src/app/api/v1/...`  
Format phản hồi chung:
```json
{
  "success": true,
  "data": { ... },
  "message": "Thông báo thực hiện thành công"
}
```

### 4.1. Phân Hệ Xác Thực & eKYC (`/api/v1/auth`, `/api/v1/ekyc`)

| Endpoint | Method | Chức năng | Input chính | Quyền hạn |
|---|:---:|---|---|:---:|
| `/auth/register` | `POST` | Đăng ký SĐT + Mật khẩu + Role | `phoneNumber`, `password`, `fullName`, `role` | Public |
| `/auth/login` | `POST` | Đăng nhập trả về JWT Session | `phoneNumber`, `password` | Public |
| `/auth/me` | `GET` | Lấy thông tin tài khoản hiện tại | Header `Authorization: Bearer <token>` | User |
| `/auth/switch-role` | `POST` | **Nút Demo Quick-Switch**: Đổi góc nhìn Shipper $\leftrightarrow$ Driver để test | `targetRole: "SHIPPER" \| "DRIVER"` | User |
| `/ekyc/submit` | `POST` | Nộp thông tin CCCD + GPLX + Đăng kiểm | `idCardNumber`, `idCardFrontUrl`, `idCardBackUrl`... | User |
| `/ekyc/quick-verify` | `POST` | **Chế độ Demo:** Kích hoạt tài khoản ngay lập tức không cần chờ | `userId` | Admin / Demo |

### 4.2. Phân Hệ Đơn Hàng & Chợ Xe (`/api/v1/orders`, `/api/v1/return-trips`)

| Endpoint | Method | Chức năng | Input chính | Quyền hạn |
|---|:---:|---|---|:---:|
| `/orders` | `POST` | Tạo đơn hàng mới | `originAddress`, `destAddress`, `cargoWeightKg`, `declaredValue`, `freightPrice`... | Verified Shipper |
| `/orders/market` | `GET` | Chợ tìm hàng công khai cho tài xế | Query: `urgency`, `cargoType`, `originCity`, `destCity` | Verified Driver |
| `/orders/:id` | `GET` | Xem chi tiết đơn hàng (SĐT ẩn nếu chưa hoàn tất Escrow) | `id` (mã đơn) | Verified User |
| `/return-trips` | `POST` | Tài xế đăng lịch chuyến xe về rỗng | `originCity`, `destCity`, `availableFrom`, `availableTo`, `availablePayloadKg` | Verified Driver |
| `/return-trips` | `GET` | Danh sách chuyến xe rỗng tìm hàng | Query: `fromCity`, `toCity` | Verified Shipper |

### 4.3. Phân Hệ Smart Matching AI (`/api/v1/matching`)

| Endpoint | Method | Chức năng | Logic thực thi |
|---|:---:|---|---|
| `/matching/suggested-orders` | `GET` | Gợi ý đơn hàng tối ưu cho chuyến xe về rỗng của tài xế | Chạy thuật toán Heuristic MatchScore đa tiêu chí. Trả về mảng đơn hàng sắp xếp theo % độ khớp kèm lý do gợi ý. |
| `/matching/suggested-trucks` | `GET` | Gợi ý xe rỗng gần tuyến cho chủ hàng | Tính khoảng cách lệch tuyến (Detour km), đề xuất mức giảm cước 15% - 25%. |

**Công thức chuẩn hóa thuật toán Heuristic MatchScore ($0 \to 100\%$):**
$$\text{MatchScore} = 0.35 \cdot S_{\text{route}} + 0.25 \cdot S_{\text{capacity}} + 0.15 \cdot S_{\text{time}} + 0.15 \cdot S_{\text{reputation}} + 0.10 \cdot S_{\text{price}}$$
- $S_{\text{route}} = \max(0, 1 - \frac{\text{DetourKm}}{30})$: Lệch 0km được 1 điểm; lệch $>30\text{km}$ về 0 điểm.
- $S_{\text{capacity}} = 1 - \frac{|\text{TảiTrọngXe} - \text{KhốiLượngHàng}|}{\text{TảiTrọngXe}}$: Ưu tiên xe vừa khít hàng.
- $S_{\text{time}} = \max(0, 1 - \frac{|\text{GiờHẹn} - \text{GiờXeRảnh}|}{6})$: Lệch trong vòng 6 giờ.

### 4.4. Phân Hệ Ký Quỹ Escrow & Ví Nội Bộ (`/api/v1/escrow`, `/api/v1/wallet`)

| Endpoint | Method | Chức năng | Cơ chế bảo vệ |
|---|:---:|---|---|
| `/escrow/driver-deposit` | `POST` | Tài xế bấm nhận đơn $\to$ Khóa cọc $10\%$ | Kiểm tra số dư ví cọc $\ge$ cọc yêu cầu. Chuyển tiền từ `depositBalance` sang `lockedDeposit`. Đơn chuyển sang `WAITING_ESCROW_PAYMENT`. Bắt đầu đếm ngược 30 phút. |
| `/escrow/shipper-pay` | `POST` | Chủ hàng nộp 100% cước vào Escrow | Nạp tiền vào tài khoản trung gian. Kích hoạt trạng thái `MATCHED_ESCROWED`. **Mở khóa SĐT và mở phòng chat.** |
| `/escrow/release` | `POST` | Chủ hàng xác nhận hài lòng $\to$ Giải ngân | 92% cước chuyển vào `incomeBalance` tài xế; 8% phí sàn thu; cọc được hoàn trả về `depositBalance`. |
| `/wallet/balance` | `GET` | Xem số dư ví cọc và ví thu nhập | Trả về: `depositBalance`, `lockedDeposit`, `incomeBalance`. |
| `/wallet/topup-demo` | `POST` | **Nút Demo Nạp Tiền 1 Chạm:** Nạp nhanh số dư để test luồng cọc | `amount: 10000000` (Nạp 10.000.000đ tức thì). |

### 4.5. Phân Hệ Theo Dõi, e-POD & Chat (`/api/v1/tracking`, `/api/v1/pod`, `/api/v1/chat`)

| Endpoint | Method | Chức năng | Logic thực thi |
|---|:---:|---|---|
| `/tracking/update-location` | `POST` | Tài xế cập nhật tọa độ GPS | Lưu vào `tracking_logs`, phát realtime qua WebSocket đến màn hình Chủ hàng. |
| `/pod/submit` | `POST` | Tài xế nộp ảnh giao hàng & chữ ký | Lưu vào `proof_of_deliveries`, chuyển trạng thái đơn sang `DELIVERED`, bắt đầu đếm ngược 24h tự xác nhận. |
| `/chat/messages` | `POST` | Gửi tin nhắn trao đổi trong đơn | Đi qua middleware Anti-Leakage: Nếu có chuỗi số điện thoại hoặc từ khóa *"gọi riêng"*, *"zalo"* $\to$ Che dấu thành `[THÔNG TIN ĐÃ ĐƯỢC ẨN ĐỂ BẢO VỆ GIAO DỊCH]`. |

---

## 5. Dữ Liệu Mẫu Chuẩn Phục Vụ Demo 5 Phút (Seed Data Script)

Khi khởi tạo cơ sở dữ liệu (`npx prisma db seed`), hệ thống tự động chèn sẵn các bản ghi chuẩn bị sẵn cho bài thuyết trình:

```typescript
// 1. Tài khoản Chủ hàng Doanh nghiệp
const shipper = {
  phoneNumber: "0901234567",
  password: "Demo@2026", // bcrypt băm sẵn
  fullName: "Công ty Cổ phần Thép Việt Nhật",
  role: "SHIPPER",
  userType: "ENTERPRISE",
  ekycStatus: "VERIFIED",
  reputationScore: 4.95
};

// 2. Tài khoản Tài xế có xe tải 10 tấn
const driver = {
  phoneNumber: "0987654321",
  password: "Demo@2026",
  fullName: "Nguyễn Văn Hùng",
  role: "DRIVER",
  ekycStatus: "VERIFIED",
  reputationScore: 4.90,
  vehicle: {
    plateNumber: "15C-888.99",
    vehicleType: "TRUCK_BOX",
    maxPayloadKg: 10000 // 10 tấn
  },
  wallet: {
    depositBalance: 15000000 // Có sẵn 15 triệu trong ví cọc để demo khóa cọc
  }
};

// 3. Chuyến xe về rỗng của Tài xế Hùng
const returnTrip = {
  driverId: driver.id,
  originCity: "Hải Phòng",
  destCity: "Hà Nội",
  availablePayloadKg: 10000,
  expectedPrice: 3500000 // Giá rẻ hơn thị trường 25%
};

// 4. Đơn hàng mẫu của Chủ hàng
const sampleOrder = {
  orderCode: "ORD-2026-8942",
  originAddress: "Cảng Đình Vũ, Hải Phòng",
  originCity: "Hải Phòng",
  originLat: 20.8549,
  originLng: 106.7481,
  destAddress: "KCN Thăng Long, Đông Anh, Hà Nội",
  destCity: "Hà Nội",
  destLat: 21.1215,
  destLng: 105.7825,
  cargoName: "8 Tấn Cuộn Thép Công Nghiệp",
  cargoWeightKg: 8000,
  declaredValue: 200000000, // 200 triệu -> Cọc 10% = 20tr, chạm trần tối đa = 5tr
  freightPrice: 3800000,
  requiredDeposit: 5000000, // Trần 5 triệu
  status: "SEARCHING",
  servicePackage: "SUPERVISED"
};
```

---

## 6. Danh Mục Mã Lỗi Chuẩn (Standard Error Codes)

Hệ thống sử dụng các mã lỗi chuẩn để hiển thị thông báo trực quan trên Toast giao diện:

| Mã lỗi | HTTP Status | Ý nghĩa hiển thị cho người dùng |
|---|:---:|---|
| `ERR_UNVERIFIED_EKYC` | 403 | Tài khoản chưa xác thực CCCD/GPLX. Vui lòng hoàn tất eKYC để thực hiện hành động này. |
| `ERR_INSUFFICIENT_DEPOSIT`| 400 | Số dư ví cọc không đủ để nhận đơn (Yêu cầu nộp cọc tối thiểu). Vui lòng nạp thêm. |
| `ERR_ESCROW_EXPIRED` | 410 | Đơn hàng đã hết hạn thanh toán ký quỹ 30 phút. Tiền cọc đã được hoàn trả cho tài xế. |
| `ERR_CONTACT_MASKED` | 403 | Thông tin liên lạc đang được ẩn để bảo vệ giao dịch. Vui lòng hoàn tất ký quỹ Escrow để mở SĐT. |
| `ERR_CARGO_PROHIBITED` | 422 | Hàng hóa nằm trong danh mục cảnh báo hàng cấm / chất nguy hiểm. Đơn chuyển qua hàng đợi kiểm duyệt. |
