# BẢN THIẾT KẾ KIẾN TRÚC HỆ THỐNG (SYSTEM ARCHITECTURE)
## SÀN KẾT NỐI HÀNG HÓA VÀ PHƯƠNG TIỆN VẬN TẢI HAI CHIỀU
**Dự án tham gia:** Vietnam Young Logistics Talent 2026 (VYLT 2026)  
**Tài liệu tham chiếu:** [SPECS.md](SPECS.md) · [CONVENTIONS.md](CONVENTIONS.md) · [MVP.md](MVP.md) · [mo-ta-ben-co-hang.md](mo-ta-ben-co-hang.md) · [Giao diện Web.md](Giao%20di%E1%BB%87n%20Web.md)  
**Phiên bản:** 1.0 (Technical Architecture Blueprint)  
**Ngày lập:** 19/09/2026  

---

## MỤC LỤC
1. [Tổng quan Kiến trúc & Nguyên tắc thiết kế](#1-tổng-quan-kiến-trúc--nguyên-tắc-thiết-kế)
2. [Sơ đồ Kiến trúc tổng thể (High-Level Architecture)](#2-sơ-đồ-kiến-trúc-tổng-thể-high-level-architecture)
3. [Phân rã các Phân hệ & Dịch vụ cốt lõi (Core Services)](#3-phân-rã-các-phân-hệ--dịch-vụ-cốt-lõi-core-services)
   - 3.1. Auth & eKYC Service (Định danh CCCD)
   - 3.2. Order & Trip Service (Quản lý Đơn & Chuyến rỗng)
   - 3.3. Smart Matching Engine (Thuật toán ghép nối)
   - 3.4. Escrow & Wallet Service (Ký quỹ & Sổ cái tài chính)
   - 3.5. Tracking & e-POD Service (Định vị & Bằng chứng giao hàng)
   - 3.6. Communication & Anti-Leakage Service (Chat & Lọc thông tin)
4. [Thiết kế Cơ sở dữ liệu chi tiết (Detailed Database Schema)](#4-thiết-kế-cơ-sở-dữ-liệu-chi-tiết-detailed-database-schema)
5. [Thiết kế Giao tiếp & Chuẩn hóa API (API & WebSocket Specs)](#5-thiết-kế-giao-tiếp--chuẩn-hóa-api-api--websocket-specs)
6. [Kiến trúc Bảo mật & Tuân thủ Dữ liệu (Security & Compliance)](#6-kiến-trúc-bảo-mật--tuân-thủ-dữ-liệu-security--compliance)
7. [Hạ tầng Triển khai & DevOps (Deployment & Infrastructure)](#7-hạ-tầng-triển-khai--devops-deployment--infrastructure)
8. [Lộ trình Mở rộng từ MVP lên Production (Scalability Roadmap)](#8-lộ-trình-mở-rộng-từ-mvp-lên-production-scalability-roadmap)

---

## 1. TỔNG QUAN KIẾN TRÚC & NGUYÊN TẮC THIẾT KẾ

### 1.1. Bối cảnh kỹ thuật
Hệ thống là một **Chợ điện tử hai chiều (Two-Sided Marketplace)** phục vụ logistics vận tải đường bộ. Đặc thù kỹ thuật của hệ thống đòi hỏi:
- Khả năng xử lý dữ liệu không gian địa lý (Geospatial querying) để định vị và tính khoảng cách lệch tuyến của các chuyến xe rỗng.
- Tính toàn vẹn và nhất quán tuyệt đối về giao dịch tài chính (ACID transaction) trong cơ chế giữ tiền trung gian (**Escrow**) và cọc ví của tài xế.
- Độ trễ thấp trong giao tiếp thời gian thực (Real-time WebSockets) phục vụ theo dõi hành trình GPS, gửi ảnh e-POD và chat trao đổi.
- Quy trình định danh eKYC CCCD bảo mật, tuân thủ Nghị định 13/2023/NĐ-CP về bảo vệ dữ liệu cá nhân.

### 1.2. Chiến lược kiến trúc: Modular Monolith cho MVP, sẵn sàng Microservices
Đối với giai đoạn tham gia cuộc thi VYLT 2026 và triển khai thử nghiệm (Pilot), kiến trúc được lựa chọn là **Modular Monolith (Nguyên khối theo mô-đun)**:
- **Lý do lựa chọn:**
  1. *Tốc độ phát triển & triển khai nhanh:* Tránh được độ phức tạp về mạng, đồng bộ phân tán và chi phí hạ tầng của Microservices hoàn chỉnh trong giai đoạn đầu.
  2. *Ranh giới mô-đun nghiêm ngặt (Strict Domain Boundaries):* Các service nghiệp vụ được tách biệt rõ ràng ở tầng code (Domain-Driven Design). Mỗi module sở hữu schema dữ liệu riêng, giao tiếp qua Interface/Event bus nội bộ.
  3. *Dễ dàng tách thành Microservices độc lập:* Khi quy mô đạt trên 50.000 chuyến/ngày, các module như *Smart Matching Engine* hoặc *Escrow Service* có thể được bóc tách thành service riêng mà không cần viết lại mã nguồn.

```
                    NGUYÊN TẮC THIẾT KẾ CỐT LÕI
   ┌─────────────────────────────────────────────────────────────┐
   │ 1. Zero Trust Identity: Không eKYC CCCD = Không nhận/tạo đơn│
   │ 2. Guaranteed Escrow: Giữ tiền hai chiều, chỉ mở SĐT khi cọc│
   │ 3. Realtime First: Vị trí, trạng thái, cảnh báo cập nhật tức thì│
   │ 4. Single Source of Truth: Sổ cái tài chính bất biến        │
   └─────────────────────────────────────────────────────────────┘
```

---

## 2. SƠ ĐỒ KIẾN TRÚC TỔNG THỂ (HIGH-LEVEL ARCHITECTURE)

```mermaid
graph TB
    subgraph CLIENT_TIER["TẦNG GIAO DIỆN (CLIENTS)"]
        ShipperApp["Shipper Web App<br/>(Chủ hàng - Next.js / PC & Mobile)"]
        DriverApp["Driver Web/PWA App<br/>(Tài xế - React / Mobile Optimized)"]
        AdminPortal["Admin Management Console<br/>(Quản trị viên - Next.js)"]
    end

    subgraph GATEWAY_TIER["TẦNG ĐIỀU PHỐI (API GATEWAY & SECURITY)"]
        NginxGateway["Reverse Proxy & Load Balancer<br/>(Nginx / Cloudflare)"]
        RateLimiter["Rate Limiting & DDoS Shield"]
        AuthFilter["JWT Authenticator & Role Checker"]
    end

    subgraph APP_TIER["TẦNG ỨNG DỤNG (MODULAR APPLICATION CORE)"]
        subgraph MODULAR_MONOLITH["Core Backend Engine (Node.js / FastAPI)"]
            AuthModule["Auth & eKYC Module<br/>(CCCD, Face-matching, OTP)"]
            OrderModule["Order & Trip Module<br/>(Tạo đơn, Đăng xe rỗng)"]
            MatchingModule["Smart Matching Engine<br/>(Heuristic Route & Capacity)"]
            EscrowModule["Escrow & Wallet Module<br/>(Khóa cọc, Giữ tiền, Sổ cái)"]
            TrackingModule["Realtime Tracking & e-POD<br/>(GPS Logs, Ảnh bàn giao)"]
            ChatModule["In-App Chat & Anti-Leakage<br/>(Regex Filter, Socket.io)"]
            AuditModule["Notification & Event Bus<br/>(Internal Pub/Sub)"]
        end
    end

    subgraph CACHE_TIER["TẦNG BỘ NHỚ ĐỆM & REALTIME (REDIS)"]
        RedisGeo["Redis Geospatial<br/>(Định vị xe & Tuyến đường)"]
        RedisTimer["Redis Expire Keys<br/>(Bộ đếm 30p Escrow, 24h POD)"]
        RedisCache["Cache Kết quả Matching"]
    end

    subgraph DATA_TIER["TẦNG LƯU TRỮ DỮ LIỆU (DATABASE & STORAGE)"]
        PostgreSQL[("PostgreSQL Database<br/>(ACID, PostGIS, Relational Data)")]
        ObjectStorage[("S3 / Cloudinary Storage<br/>(Ảnh CCCD, Đăng kiểm, e-POD)")]
    end

    subgraph EXT_TIER["DỊCH VỤ NGOÀI (EXTERNAL SERVICES)"]
        MapboxAPI["Bản đồ & Định tuyến<br/>(Mapbox / OSRM)"]
        SMSGateway["Cổng tin nhắn OTP<br/>(Twilio / SpeedSMS)"]
        BankSimulator["Cổng thanh toán giả lập<br/>(VietQR / Mock Banking)"]
    end

    CLIENT_TIER --> NginxGateway
    NginxGateway --> RateLimiter
    RateLimiter --> AuthFilter
    AuthFilter --> MODULAR_MONOLITH

    MODULAR_MONOLITH <--> CACHE_TIER
    MODULAR_MONOLITH <--> DATA_TIER
    MODULAR_MONOLITH <--> EXT_TIER
```

---

## 3. PHÂN RÃ CÁC PHÂN HỆ & DỊCH VỤ CỐT LÕI (CORE SERVICES)

### 3.1. Auth & eKYC Service (Định danh Căn cước công dân chuẩn Grab/ShopeeFood)
- **Nhiệm vụ:** Đăng ký SĐT, xác thực OTP, tiếp nhận ảnh CCCD 2 mặt, ảnh selfie chân dung, giấy phép lái xe, giấy tờ xe.
- **Quy trình xử lý tự động & thủ công:**
  1. *Bước 1 - OCR Extraction:* Tiếp nhận ảnh CCCD $\to$ Dùng thư viện Tesseract OCR hoặc Google Vision API bóc tách: Số CCCD, Họ tên, Ngày sinh, Quê quán, Ngày hết hạn.
  2. *Bước 2 - Liveness & Face-Matching:* So sánh đặc trưng khuôn mặt giữa ảnh selfie và ảnh trên thẻ CCCD. Tính toán độ tương đồng (Confidence Score $\ge 85\%$).
  3. *Bước 3 - Fraud Check:* Kiểm tra số CCCD đã tồn tại trong CSDL chưa (Ràng buộc 1 CCCD = 1 Tài khoản). Kiểm tra tên chủ tài khoản ngân hàng rút tiền có trùng khớp 100% với tên trên CCCD không.
  4. *Bước 4 - Phê duyệt:* Tự động kích hoạt nếu điểm tin cậy cao, hoặc chuyển vào hàng đợi `Admin Pending Queue` để quản trị viên kiểm tra thủ công.
- **Ràng buộc bảo mật:** Nếu `users.status != 'VERIFIED'`, chặn toàn bộ request gọi đến các API `POST /api/v1/orders` và `POST /api/v1/bids`.

### 3.2. Order & Trip Service (Quản lý Đơn hàng & Chuyến về rỗng)
- **Nhiệm vụ:**
  - Quản lý vòng đời đơn hàng theo máy trạng thái hữu hạn (**Finite State Machine - FSM**).
  - Quản lý lịch xe rảnh và các chuyến về rỗng (Return Trips) của tài xế.
- **Đặc tả tọa độ:** Điểm lấy hàng và giao hàng bắt buộc lưu trữ dưới định dạng `POINT(lng, lat)` chuẩn của phần mở rộng **PostGIS**.
- **Xử lý thời hạn tự động (Background Jobs):**
  - Đơn thường: Hết hạn sau 24 giờ nếu không có xe nhận.
  - Đơn gấp: Đánh dấu cờ `is_urgent = true`, ưu tiên đẩy lên đầu sàn trong 3 giờ.

### 3.3. Smart Matching Engine (Thuật toán ghép cặp thông minh)
- **Cơ chế hoạt động:**
  1. Khi một chuyến về rỗng được tài xế đăng tải (hoặc xe đang dừng sau khi trả hàng), hệ thống kích hoạt truy vấn địa lý trong Redis (`GEORADIUS` bán kính 15km quanh điểm xuất phát của xe).
  2. Lọc các đơn hàng có hướng di chuyển tương đồng (Góc phương vị lệch không quá $30^\circ$ so với lộ trình về đích của xe).
  3. Áp dụng công thức chấm điểm đa tiêu chí:
     $$\text{MatchScore} = 0.35 \cdot S_{\text{route}} + 0.25 \cdot S_{\text{capacity}} + 0.15 \cdot S_{\text{time}} + 0.15 \cdot S_{\text{reputation}} + 0.10 \cdot S_{\text{price}}$$
  4. Trả về danh sách đơn hàng được sắp xếp theo MatchScore giảm dần trên tab **"Đề xuất cho bạn [AI]"** của tài xế.

```mermaid
sequenceDiagram
    autonumber
    actor Driver as Tài xế (Xe rỗng)
    participant App as Driver App
    participant Match as Matching Engine
    participant DB as PostgreSQL / PostGIS
    participant Redis as Redis Cache
    actor Shipper as Chủ hàng

    Shipper->>DB: Đăng đơn hàng (Hải Phòng -> Hà Nội, 5 tấn)
    Driver->>App: Đăng chuyến về rỗng (Đang ở Đình Vũ, muốn về Hà Nội)
    App->>Match: Yêu cầu tìm đơn khớp tuyến
    Match->>Redis: Lấy danh sách đơn trong bán kính 15km
    Match->>DB: Truy vấn thông số tải trọng & kích thước thùng
    Match-->>Match: Chấm điểm Multi-Criteria MatchScore
    Match-->>App: Trả về kết quả: Đơn #1024 khớp 96%
    Driver->>App: Bấm "Nhận chuyến & Khóa cọc"
```

### 3.4. Escrow & Wallet Service (Ký quỹ hai chiều & Sổ cái tài chính)
- **Nhiệm vụ:** Đảm bảo nguyên tắc *"Không có tiền ký quỹ = Không được thực hiện giao dịch"*.
- **Cấu trúc Ví người dùng:**
  - `deposit_balance`: Số dư khả dụng dùng để khóa cọc (Tài xế nộp cọc $k\%$, tối thiểu 300.000đ, tối đa 5.000.000đ).
  - `locked_deposit`: Số tiền cọc đang bị đóng băng cho các chuyến xe đang thực hiện.
  - `income_balance`: Số dư thu nhập tiền cước nhận được (có thể rút về ngân hàng).
- **Cơ chế Escrow Ledger (Sổ cái kế toán kép):**
  - Mọi biến động số dư đều phải ghi nhận qua cặp bút toán Nợ/Có (Double-Entry Bookkeeping).
  - Không bao giờ cập nhật số dư trực tiếp mà phải thông qua bảng `wallet_transactions`.

```
                       LUỒNG DÒNG TIỀN TRUNG GIAN ESCROW
   [Tài xế] ──(Khóa cọc 10%)──> [Quỹ Cọc Đóng Băng] ──────────┐
                                                              │ (Giao hàng thành công)
   [Chủ hàng] ──(Nộp cước 100%)─> [Tài Khoản Trung Gian Escrow]─┼──> Hoàn cọc cho Tài xế
                                                              ├──> 92% Cước về Ví Tài xế
                                                              └──> 8% Phí Sàn Vận Hành
```

### 3.5. Tracking & e-POD Service (Định vị thời gian thực & Biên bản điện tử)
- **Theo dõi lộ trình (GPS Tracking):** 
  - Driver App định kỳ gửi tọa độ qua WebSocket mỗi 30 giây khi xe ở trạng thái `IN_TRANSIT`.
  - Tọa độ được lưu vào bảng `tracking_logs` và phát trực tiếp (broadcast) đến Shipper Web App qua kênh Socket riêng của mã đơn hàng.
- **Biên bản giao nhận điện tử (e-POD - Electronic Proof of Delivery):**
  - Chụp ảnh biên bản giấy / hàng hóa đã dỡ tại điểm giao.
  - Khách hàng ký nhận trực tiếp lên màn hình cảm ứng điện thoại (lưu dạng SVG/PNG base64).
  - Lưu trữ ảnh lên Cloudinary/S3 kèm thông tin gắn thẻ tọa độ GPS và dấu thời gian (Timestamp) không thể chỉnh sửa.

### 3.6. Communication & Anti-Leakage Service (Chat nội bộ & Chống đi riêng)
- **Mở kênh liên lạc có điều kiện:** Chỉ khi đơn hàng đạt trạng thái `MATCHED_ESCROWED` (Cả tài xế đã cọc và chủ hàng đã nộp tiền cước vào Escrow), hệ thống mới hiển thị Số điện thoại và mở phòng Chat riêng giữa hai bên.
- **Bộ lọc AI Anti-Leakage Filter:**
  - Tin nhắn gửi qua WebSocket đi qua middleware kiểm tra trước khi chuyển tiếp:
    * Regex phát hiện chuỗi 10-11 chữ số (SĐT di động Việt Nam: `09x, 08x, 07x, 03x`).
    * Regex phát hiện SĐT viết cách hoặc viết bằng chữ (Ví dụ: *"không chín một hai..."*).
    * Từ khóa né sàn: *"zalo"*, *"gọi riêng"*, *"đi ngoài"*, *"chuyển khoản riêng"*, link web ngoài.
  - Hành vi xử lý: Tự động che tin nhắn thành `[THÔNG TIN ĐÃ ĐƯỢC ẨN ĐỂ BẢO VỆ GIAO DỊCH]`, đồng thời gửi cảnh báo vi phạm điều khoản dịch vụ đến người dùng.

---

## 4. THIẾT KẾ CƠ SỞ DỮ LIỆU CHI TIẾT (DETAILED DATABASE SCHEMA)

Hệ thống sử dụng cơ sở dữ liệu quan hệ **PostgreSQL 15+** kết hợp tiện ích mở rộng **PostGIS**.

```mermaid
erDiagram
    USERS ||--o{ VEHICLES : "sở hữu"
    USERS ||--|| WALLETS : "sở hữu"
    USERS ||--o{ ORDERS : "tạo (chủ hàng)"
    USERS ||--o{ RETURN_TRIPS : "đăng (tài xế)"
    USERS ||--o{ REVIEWS : "đánh giá"
    
    ORDERS ||--o{ BIDS : "nhận báo giá"
    ORDERS ||--|| ESCROW_ACCOUNTS : "ký quỹ"
    ORDERS ||--o{ TRACKING_LOGS : "ghi nhận lộ trình"
    ORDERS ||--|| CHAT_ROOMS : "gắn liền phòng chat"
    
    CHAT_ROOMS ||--o{ CHAT_MESSAGES : "chứa"
    WALLETS ||--o{ WALLET_TRANSACTIONS : "ghi chép biến động"
```

### 4.1. Bảng `users` (Người dùng & eKYC)
| Cột | Kiểu dữ liệu | Ràng buộc | Ý nghĩa |
| :--- | :--- | :--- | :--- |
| `id` | UUID | PRIMARY KEY, DEFAULT gen_random_uuid() | Định danh duy nhất |
| `phone_number` | VARCHAR(15) | UNIQUE, NOT NULL | Số điện thoại đăng nhập |
| `password_hash` | VARCHAR(255) | NOT NULL | Mật khẩu băm (bcrypt) |
| `full_name` | VARCHAR(100) | NOT NULL | Họ và tên |
| `role` | VARCHAR(20) | NOT NULL, CHECK (role IN ('SHIPPER', 'DRIVER', 'ADMIN')) | Phân quyền vai trò |
| `user_type` | VARCHAR(20) | CHECK (user_type IN ('INDIVIDUAL', 'ENTERPRISE')) | Cá nhân hoặc Doanh nghiệp |
| `status` | VARCHAR(20) | DEFAULT 'PENDING', CHECK (status IN ('UNVERIFIED', 'PENDING', 'VERIFIED', 'REJECTED', 'SUSPENDED')) | Trạng thái eKYC |
| `id_card_number` | VARCHAR(20) | UNIQUE | Số CCCD (12 chữ số) |
| `id_card_front_url` | TEXT | | Link ảnh CCCD mặt trước |
| `id_card_back_url` | TEXT | | Link ảnh CCCD mặt sau |
| `portrait_url` | TEXT | | Link ảnh chân dung đối chiếu |
| `bank_name` | VARCHAR(50) | | Tên ngân hàng nhận cước |
| `bank_account_number`| VARCHAR(30) | | Số tài khoản ngân hàng |
| `bank_account_holder`| VARCHAR(100) | | Tên chủ tài khoản (phải trùng full_name) |
| `reputation_score` | NUMERIC(3, 2) | DEFAULT 5.00 | Điểm uy tín (1.00 - 5.00) |
| `created_at` | TIMESTAMPTZ | DEFAULT NOW() | Thời gian tạo |

### 4.2. Bảng `vehicles` (Phương tiện vận tải của tài xế)
| Cột | Kiểu dữ liệu | Ràng buộc | Ý nghĩa |
| :--- | :--- | :--- | :--- |
| `id` | UUID | PRIMARY KEY | ID xe |
| `driver_id` | UUID | REFERENCES users(id) ON DELETE CASCADE | ID tài xế sở hữu |
| `plate_number` | VARCHAR(15) | UNIQUE, NOT NULL | Biển kiểm soát (Ví dụ: 29C-123.45) |
| `vehicle_type` | VARCHAR(30) | NOT NULL | Loại xe: Tải thùng, Bạt, Container, Lạnh... |
| `max_payload_kg` | INTEGER | NOT NULL | Tải trọng tối đa (kg) |
| `cargo_volume_cbm` | NUMERIC(6, 2)| | Thể tích thùng chứa ($m^3$) |
| `length_m` | NUMERIC(4, 2)| | Chiều dài thùng xe |
| `width_m` | NUMERIC(4, 2)| | Chiều rộng thùng xe |
| `height_m` | NUMERIC(4, 2)| | Chiều cao thùng xe |
| `registration_cert_url`| TEXT | NOT NULL | Ảnh Cà vẹt xe |
| `inspection_cert_url` | TEXT | NOT NULL | Ảnh Giấy đăng kiểm còn hạn |
| `is_verified` | BOOLEAN | DEFAULT FALSE | Trạng thái xe đã duyệt |

### 4.3. Bảng `orders` (Đơn hàng vận chuyển)
| Cột | Kiểu dữ liệu | Ràng buộc | Ý nghĩa |
| :--- | :--- | :--- | :--- |
| `id` | UUID | PRIMARY KEY | ID đơn hàng |
| `order_code` | VARCHAR(20) | UNIQUE, NOT NULL | Mã hiển thị (Ví dụ: ORD-2026-8942) |
| `shipper_id` | UUID | REFERENCES users(id) | ID chủ hàng tạo đơn |
| `driver_id` | UUID | REFERENCES users(id) | ID tài xế nhận đơn (NULL khi đang tìm) |
| `vehicle_id` | UUID | REFERENCES vehicles(id)| Xe nhận vận chuyển |
| `origin_address` | TEXT | NOT NULL | Địa chỉ lấy hàng |
| `origin_geom` | GEOMETRY(POINT, 4326) | NOT NULL | Tọa độ điểm lấy hàng (PostGIS) |
| `dest_address` | TEXT | NOT NULL | Địa chỉ giao hàng |
| `dest_geom` | GEOMETRY(POINT, 4326) | NOT NULL | Tọa độ điểm giao hàng (PostGIS) |
| `cargo_name` | VARCHAR(150) | NOT NULL | Tên mặt hàng |
| `cargo_weight_kg` | INTEGER | NOT NULL | Khối lượng hàng (kg) |
| `declared_value` | DECIMAL(15, 2)| NOT NULL | Giá trị khai báo tính cọc & bồi thường |
| `target_price` | DECIMAL(15, 2)| NOT NULL | Giá cước thỏa thuận (VNĐ) |
| `required_deposit` | DECIMAL(15, 2)| NOT NULL | Tiền cọc tài xế cần nộp ($k\% \times$ declared_value) |
| `service_package` | VARCHAR(20) | NOT NULL | STANDARD, SUPERVISED, INSURED |
| `urgency_level` | VARCHAR(20) | DEFAULT 'NORMAL' | URGENT (Gấp), NORMAL, FLEXIBLE |
| `status` | VARCHAR(30) | NOT NULL | Trạng thái đơn (DRAFT, SEARCHING, MATCHED, IN_TRANSIT, DELIVERED, COMPLETED, CANCELLED) |
| `pickup_deadline` | TIMESTAMPTZ | NOT NULL | Thời gian lấy hàng mong muốn |
| `created_at` | TIMESTAMPTZ | DEFAULT NOW() | Thời gian tạo đơn |

### 4.4. Bảng `return_trips` (Chuyến xe về rỗng)
| Cột | Kiểu dữ liệu | Ràng buộc | Ý nghĩa |
| :--- | :--- | :--- | :--- |
| `id` | UUID | PRIMARY KEY | ID chuyến về rỗng |
| `driver_id` | UUID | REFERENCES users(id) | ID tài xế đăng chuyến |
| `vehicle_id` | UUID | REFERENCES vehicles(id)| Xe sử dụng |
| `origin_city` | VARCHAR(50) | NOT NULL | Tỉnh/thành xuất phát |
| `dest_city` | VARCHAR(50) | NOT NULL | Tỉnh/thành mong muốn về |
| `available_from` | TIMESTAMPTZ | NOT NULL | Thời gian bắt đầu rảnh |
| `available_to` | TIMESTAMPTZ | NOT NULL | Hạn chót cần xuất phát |
| `available_payload_kg`| INTEGER | NOT NULL | Tải trọng còn trống |
| `is_active` | BOOLEAN | DEFAULT TRUE | Chuyến còn nhận hàng hay không |

### 4.5. Bảng `escrow_accounts` (Tài khoản ký quỹ trung gian)
| Cột | Kiểu dữ liệu | Ràng buộc | Ý nghĩa |
| :--- | :--- | :--- | :--- |
| `id` | UUID | PRIMARY KEY | ID tài khoản giữ tiền |
| `order_id` | UUID | UNIQUE, REFERENCES orders(id) | Đơn hàng áp dụng |
| `freight_amount` | DECIMAL(15, 2)| NOT NULL | Cước vận chuyển do chủ hàng nạp |
| `driver_deposit_amount`| DECIMAL(15, 2)| NOT NULL | Cọc tài xế đã nộp |
| `platform_fee` | DECIMAL(15, 2)| NOT NULL | Phí sàn thu (8% cước) |
| `status` | VARCHAR(20) | CHECK (status IN ('PENDING_PAYMENT', 'HOLDING', 'RELEASED', 'REFUNDED', 'DISPUTED')) | Trạng thái giữ tiền |
| `payment_deadline` | TIMESTAMPTZ | | Hạn 30 phút để chủ hàng nạp tiền |
| `auto_release_at` | TIMESTAMPTZ | | Hạn 24 giờ tự động giải ngân sau giao |

---

## 5. THIẾT KẾ GIAO TIẾP & CHUẨN HÓA API (API & WEBSOCKET SPECS)

Tất cả các REST API đều tuân theo chuẩn RESTful JSON, yêu cầu header `Authorization: Bearer <JWT_TOKEN>`.

### 5.1. Danh mục API chính (Core REST Endpoints)

| Phân hệ | Phương thức | Endpoint | Mô tả | Yêu cầu quyền |
| :--- | :---: | :--- | :--- | :--- |
| **Auth** | `POST` | `/api/v1/auth/register` | Đăng ký tài khoản SĐT & Mật khẩu | Public |
| **Auth** | `POST` | `/api/v1/auth/verify-otp` | Xác thực mã OTP gửi về điện thoại | Public |
| **Auth** | `POST` | `/api/v1/auth/login` | Đăng nhập trả về Access Token | Public |
| **eKYC** | `POST` | `/api/v1/ekyc/id-card` | Tải lên ảnh CCCD 2 mặt (OCR bóc tách) | User (Mọi role) |
| **eKYC** | `POST` | `/api/v1/ekyc/face-match` | Chụp selfie chân dung đối chiếu CCCD | User (Mọi role) |
| **Vehicle**| `POST` | `/api/v1/vehicles` | Khai báo phương tiện, đăng ký, đăng kiểm | Driver |
| **Orders** | `POST` | `/api/v1/orders` | Chủ hàng tạo đơn hàng mới | Verified Shipper |
| **Orders** | `GET` | `/api/v1/orders/market` | Chợ đơn hàng công khai (Bộ lọc, tab Gấp) | Verified Driver |
| **Orders** | `GET` | `/api/v1/orders/{id}` | Xem chi tiết đơn (Ẩn SĐT nếu chưa escrow)| Verified User |
| **Trips** | `POST` | `/api/v1/trips/return-trip`| Tài xế đăng lịch xe rảnh / chuyến về rỗng | Verified Driver |
| **Match** | `GET` | `/api/v1/matching/suggested`| Lấy danh sách đơn đề xuất AI cho xe rỗng | Verified Driver |
| **Escrow** | `POST` | `/api/v1/orders/{id}/accept-deposit` | Tài xế bấm nhận đơn & khóa cọc từ ví | Verified Driver |
| **Escrow** | `POST` | `/api/v1/orders/{id}/pay-escrow` | Chủ hàng thanh toán cước vào Escrow | Verified Shipper |
| **Track** | `POST` | `/api/v1/orders/{id}/checkpoint` | Cập nhật mốc vận chuyển + ảnh hàng | Assigned Driver |
| **e-POD** | `POST` | `/api/v1/orders/{id}/submit-pod` | Nộp ảnh giao hàng & chữ ký e-POD | Assigned Driver |
| **Escrow** | `POST` | `/api/v1/orders/{id}/confirm-release` | Chủ hàng xác nhận hoàn tất giải ngân | Assigned Shipper |
| **Admin** | `POST` | `/api/v1/admin/ekyc/{id}/approve` | Quản trị viên duyệt kích hoạt hồ sơ | Admin |

### 5.2. Sự kiện thời gian thực (WebSocket / Socket.io Events)

```javascript
// Kết nối Socket yêu cầu Token xác thực
const socket = io("wss://api.vylt2026.vn", {
  auth: { token: "Bearer eyJhbGciOi..." }
});

// 1. Tài xế phát tọa độ GPS định kỳ (Driver -> Server)
socket.emit("driver:location_update", {
  order_id: "7b2d4f8e-...",
  lat: 20.8449,
  lng: 106.6881,
  speed_kmh: 55,
  heading: 285
});

// 2. Chủ hàng lắng nghe vị trí xe thời gian thực (Server -> Shipper)
socket.on("order:location_changed", (data) => {
  renderTruckMarkerOnMap(data.lat, data.lng);
});

// 3. Sự kiện đếm ngược thanh toán Escrow (Server -> Shipper)
socket.on("escrow:countdown_tick", (data) => {
  updateTimerUI(data.remaining_seconds); // Đếm ngược 30 phút
});

// 4. Sự kiện Chat nội bộ có bộ lọc Anti-Leakage (Bilateral)
socket.emit("chat:send_message", {
  order_id: "7b2d4f8e-...",
  message: "Hàng đã sẵn sàng tại kho 3, bác tài tới gọi bảo vệ nhé"
});
```

---

## 6. KIẾN TRÚC BẢO MẬT & TUÂN THỦ DỮ LIỆU (SECURITY & COMPLIANCE)

### 6.1. Bảo vệ dữ liệu cá nhân theo Nghị định 13/2023/NĐ-CP
- **Mã hóa dữ liệu nhạy cảm (Encryption at Rest):** Số Căn cước công dân (`id_card_number`), tài khoản ngân hàng và số điện thoại được mã hóa bằng thuật toán **AES-256** trước khi lưu vào database.
- **Che dấu thông tin (Data Masking):** Trên giao diện, số CCCD được hiển thị dưới dạng `001095******`, số điện thoại hiển thị `0912***789` khi chưa hoàn tất ký quỹ Escrow.
- **Quyền riêng tư hình ảnh:** Ảnh chụp CCCD và ảnh selfie chỉ được lưu trữ trong bucket riêng tư (Private Bucket), truy cập qua URL tạm thời có chữ ký (Pre-signed URL, hết hạn sau 15 phút), ngăn chặn rò rỉ thông tin cá nhân.

### 6.2. Toàn vẹn giao dịch tài chính (Financial Integrity)
- **Cơ chế Khóa chống xung đột (Pessimistic Locking):** Khi tài xế bấm nhận chuyến hoặc chủ hàng thanh toán cước, giao dịch cơ sở dữ liệu sử dụng `SELECT ... FOR UPDATE` trên bảng ví (`wallets`) để ngăn chặn tình trạng một tài khoản cọc cho nhiều đơn hàng cùng lúc khi số dư không đủ.
- **Sổ cái bất biến (Audit Logging):** Mọi giao dịch nạp, trừ, đóng băng, giải ngân tiền đều ghi kèm `IP_Address`, `User_Agent` và `Checksum` đối soát độc lập.

---

## 7. HẠ TẦNG TRIỂN KHAI & DEVOPS (DEPLOYMENT & INFRASTRUCTURE)

### 7.1. Cấu hình Docker Compose cho môi trường MVP / Bản thi

Hệ thống được đóng gói thành các container Docker độc lập, sẵn sàng chạy với 1 câu lệnh `docker compose up -d`:

```yaml
version: '3.8'

services:
  # 1. Reverse Proxy & API Gateway
  gateway:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./docker/nginx/nginx.conf:/etc/nginx/nginx.conf:ro
    depends_on:
      - backend
      - frontend

  # 2. Frontend Client (Next.js)
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    environment:
      - NEXT_PUBLIC_API_URL=http://localhost/api/v1
    ports:
      - "3000:3000"

  # 3. Backend Core Engine (Node.js / Express)
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    environment:
      - DATABASE_URL=postgres://vylt_user:vylt_pass@postgres:5432/vylt_logistics
      - REDIS_URL=redis://redis:6379
      - JWT_SECRET=vylt_super_secret_key_2026
    ports:
      - "5000:5000"
    depends_on:
      - postgres
      - redis

  # 4. Cơ sở dữ liệu PostgreSQL + PostGIS
  postgres:
    image: postgis/postgis:15-3.3-alpine
    environment:
      - POSTGRES_USER=vylt_user
      - POSTGRES_PASSWORD=vylt_pass
      - POSTGRES_DB=vylt_logistics
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  # 5. Bộ nhớ đệm & Realtime Engine
  redis:
    image: redis:7-alpine
    command: redis-server --appendonly yes
    volumes:
      - redis_data:/data
    ports:
      - "6379:6379"

volumes:
  postgres_data:
  redis_data:
```

---

## 8. LỘ TRÌNH MỞ RỘNG TỪ MVP LÊN PRODUCTION (SCALABILITY ROADMAP)

| Hạng mục | Bản thi MVP (Hiện tại) | Giai đoạn Thí điểm (Pilot 6 tháng) | Vận hành Thương mại (Scale toàn quốc) |
| :--- | :--- | :--- | :--- |
| **Kiến trúc** | Modular Monolith (1 repo, 1 DB) | Tách riêng Realtime Tracking Service | Microservices hoàn chỉnh điều phối bởi Kubernetes (EKS/GKE) |
| **Matching** | Heuristic Scoring (Trọng số chuyên gia) | Tối ưu thuật toán OSRM Routing | Mô hình Machine Learning Reinforcement Learning dự báo cước động |
| **Thanh toán** | Ví giả lập nội bộ (Mock Wallet) | Tích hợp cổng VietQR / VNPay | Liên kết ngân hàng mở tài khoản Escrow chuyên dụng tại Ngân hàng TMCP |
| **Bản đồ** | OpenStreetMap / Mapbox Free tier | Mapbox Pro có lớp dữ liệu cấm tải | Tích hợp dữ liệu giao thông thời gian thực từ Tổng cục Đường bộ |
| **eKYC** | Tesseract OCR + Duyệt Admin thủ công | Tích hợp VNPT eKYC / FPT.AI eKYC | Tích hợp trực tiếp VNeID (Bộ Công An) qua tài khoản định danh điện tử cấp 2 |

---
*Bản thiết kế kiến trúc kỹ thuật này là tài liệu nền tảng phục vụ triển khai mã nguồn và bảo vệ phương án kỹ thuật trước Hội đồng Chuyên môn Vietnam Young Logistics Talent 2026.*
