**MÔ TẢ CHỨC NĂNG**

**Bên có hàng (Chủ hàng)**

Sàn kết nối hàng hóa và phương tiện vận tải – Vietnam Young Logistics Talent 2026. Phiên bản cập nhật theo mô hình chợ hai chiều.

**Quy ước:** mục nào có nhãn **[AI]** là chức năng dùng AI hoặc tối ưu hóa. Mục không có nhãn là quy tắc cố định. Các tham số ghi bằng chữ in nghiêng như *X phút*, *N giờ*, *k%* là giá trị nhóm cần chốt (xem mục J).

# 0. Tổng quan mô hình

Web hoạt động như một **chợ hai chiều**:

* **Bên có hàng** đăng nhu cầu: hàng cần đi từ đâu đến đâu, khi nào, cần loại xe gì.
* **Bên có xe** đăng nhu cầu: xe (hoặc chuyến về rỗng) muốn vận chuyển trong phạm vi nào, khi nào rảnh.
* Mỗi bên có thể **chờ** bên kia tìm đến, hoặc **chủ động tìm** và gửi lời mời.
* Hệ thống có **engine ghép [AI]** chạy nền, chủ động đề xuất cặp phù hợp và thông báo cho cả hai bên, đặc biệt cho đơn gấp và xe sắp hết thời gian rảnh.

**Luồng chính:** chủ hàng chọn xe (hoặc xe đăng ký nhận đơn) → tài xế xác nhận và nộp cọc → giao hàng → xác nhận → thanh toán (phương thức thanh toán là gì và tránh rủi ro cho tài xế nếu chủ hàng bùng kèo)

**Phân vai:** AI chỉ gợi ý và cảnh báo. Quyết định cuối cùng luôn thuộc về chủ hàng và tài xế.

# A. Các bước đăng ký tài khoản chủ hàng

### Bước 1: Tạo tài khoản

Nhập họ tên, số điện thoại, mật khẩu, xác nhận mật khẩu. Hệ thống gửi OTP để xác thực. Chọn loại tài khoản: **Cá nhân** hoặc **Doanh nghiệp**.

### Bước 2: Xác minh thông tin chủ hàng

* Cá nhân: CCCD (2 mặt), ngày sinh, địa chỉ, ảnh chân dung.
* Doanh nghiệp: tên công ty, mã số thuế, giấy đăng ký kinh doanh, người đại diện, địa chỉ kho/xuất hàng.
* Mục đích: biết rõ ai gửi hàng, đảm bảo thanh toán và có căn cứ truy cứu trách nhiệm khi có vấn đề (hàng cấm, tranh chấp).

### Bước 3: Thông tin thanh toán và xuất hóa đơn

* Chọn nguồn thanh toán mặc định: ví nền tảng, chuyển khoản, thẻ.
* Thêm thông tin xuất hóa đơn VAT nếu cần.
* *(Hướng mở rộng, không có trong bản thi: thanh toán công nợ cho doanh nghiệp đã xác minh và có hạn mức, vì hiện tại mọi đơn đều thanh toán trước vào tài khoản trung gian.)*

### Bước 4: Xác nhận điều khoản

Bắt buộc tick "đã đọc và đồng ý": quyền và nghĩa vụ của nền tảng và của hai bên, danh mục hàng cấm, chính sách phí, chính sách hủy đơn, cơ chế giữ tiền trung gian, bảo mật thông tin, xử lý tranh chấp.

### Bước 5: Duyệt và kích hoạt

Hệ thống duyệt hồ sơ. Nếu thiếu hoặc sai thì báo nội dung cần bổ sung. Khi được duyệt, chủ hàng có thể đăng đơn.

# B. Menu chính (thanh bên trái)

1. Tổng quan
2. Tạo đơn hàng
3. Đơn hàng của tôi
4. Chợ xe (Tìm xe / Xe đề xuất)
5. Theo dõi hành trình
6. Thanh toán và chi phí
7. Hỗ trợ
8. Hồ sơ chủ hàng
9. Cài đặt

# C. Chi tiết từng mục

## 1. Tổng quan

* **Thông tin tài khoản:** tên, loại tài khoản, trạng thái xác minh, điểm uy tín chủ hàng.
* **Thống kê đơn:** tổng số đơn đã gửi, đang tìm xe, chờ thanh toán, đang vận chuyển, giao thành công, đã hủy/hết hạn, tỷ lệ thành công.
* **Cần xử lý ngay:** xe đã nhận đơn đang chờ bạn thanh toán (kèm đếm ngược *X phút*), lời mời hoặc đăng ký mới từ xe, đơn sắp hết hạn, đơn cần bổ sung thông tin.
* **Đơn đang chạy:** bản đồ nhỏ và trạng thái từng đơn.
* **Nút nổi bật:** **+ Tạo đơn mới** và ô **Nhập nhanh bằng AI**.
* **Gợi ý từ trợ lý AI [AI]:** ví dụ "Đơn Hải Phòng → Hà Nội đã chờ 3 giờ. Thêm 200.000đ hoặc mở rộng khung giờ thêm 2 tiếng sẽ có xe nhanh hơn, dự kiến khoảng 40 phút".

## 2. Tạo đơn hàng

Chia thành từng bước để dễ nhập. Có thể lưu nháp ở mọi bước.

### Bước 1: Tuyến vận chuyển và thời gian

* Điểm lấy hàng và điểm giao hàng: nhập địa chỉ **và ghim vị trí trên bản đồ (bắt buộc)**. Hệ thống lưu tọa độ để tính khoảng cách, phụ phí vùng (đường hẹp, giới hạn thời gian, trạm thu phí, v…) và độ khớp tuyến với xe. Kèm tỉnh/thành, người liên hệ tại điểm.
* Thời gian lấy hàng: chọn ngày, sau đó khung giờ sớm nhất và muộn nhất. Có thể thêm thời gian giao mong muốn.
* **Độ khẩn cấp:** *Gấp* (cần có xe trong vòng ... giờ) / *Trong ngày* / *Linh hoạt*. Chọn *Gấp* thì đơn xuất hiện ở mục "Gấp" của bên có xe và bị tính phụ phí đơn gấp.
* **Độ linh hoạt:**
  + Có chấp nhận xe đang chạy chuyến về rỗng với giá thấp hơn hay không.
  + Có chấp nhận xe loại tương đương (ví dụ xe 5 tấn thay xe 3,5 tấn) hay không.
* Hai nhóm trường này là dữ liệu đầu vào để engine ghép **[AI]** chấm điểm.

### Bước 2: Thông tin hàng hóa

* Tên hàng, loại hàng (hàng khô, hàng lỏng, bách hóa, hàng lạnh, hàng nguy hiểm, máy móc, vật liệu xây dựng...).
* Trọng lượng (kg/tấn), số khối (cbm), số lượng kiện, kích thước.
* Tính chất đặc biệt: dễ vỡ, cồng kềnh, cần bảo quản lạnh...
* Ảnh hàng (chụp hoặc tải lên).
* **Giá trị hàng hóa khai báo.** Ngay dưới ô nhập có cảnh báo: *"Giá trị khai báo là căn cứ tính tiền cọc của tài xế và mức bồi thường tối đa. Khai cao thì ít tài xế nhận hơn. Khai thấp thì được bồi thường thấp hơn."*
* Cam kết không chứa hàng cấm (tick xác nhận).
* **Kiểm tra hàng cấm và rủi ro [AI]:** dựa trên mô tả và ảnh, hệ thống cảnh báo hàng cấm, hàng cần giấy phép, hoặc mô tả quá mơ hồ. Danh mục hàng cấm là quy tắc cố định. AI chỉ cảnh báo và chuyển đơn nghi vấn cho kiểm duyệt, không tự quyết định chặn.

### Bước 3: Yêu cầu xe

* Loại xe: xe tải thùng, container, mooc sàn, xe bồn, xe lạnh, xe ben... (có hình minh họa từng loại).
* Kích thước thùng tối thiểu, tải trọng tối thiểu.
* Số lượng xe cần (lô lớn cần nhiều xe thì hệ thống tách thành nhiều vị trí, mỗi vị trí ghép một xe).
* Hình thức: thuê nguyên xe (ghép hàng là hướng mở rộng).
* Nếu chưa biết chọn xe nào, AI gợi ý loại xe phù hợp từ thông tin hàng ở bước 2 **[AI]**.

### Bước 4: Yêu cầu đặc biệt và ghi chú

* Ghi chú tự do (giới hạn ký tự) kèm tag chọn nhanh: bốc xếp giúp, có giờ cấm tải, không xếp chồng, cần bạt che mưa, xe rộng, cần hóa đơn đỏ, thu hộ COD, giao đúng giờ...
* Toàn bộ ghi chú và tag được lưu như một phần "hợp đồng" của đơn, làm căn cứ khi có tranh chấp.
* **Gợi ý bổ sung [AI]:** nếu mô tả thiếu thông tin hay gây tranh cãi (ví dụ hàng nặng nhưng chưa ghi ai bốc xếp) thì hệ thống nhắc thêm.

### Bước 5: Gói bảo đảm hàng hóa và dịch vụ tùy chọn

* **Gói bảo đảm** (chi tiết ở mục E):
  + *Cơ bản:* tài xế cọc, cước giữ trung gian (không thu thêm).
  + *Giám sát:* cập nhật ảnh và vị trí định kỳ *(mỗi 4 giờ hoặc 2 giờ)*, có phụ phí.
* Giao nhanh, đúng khung giờ cao điểm.
* Xuất hóa đơn VAT.
* Mỗi lựa chọn hiển thị rõ **phụ phí, quyền lợi và trách nhiệm** đi kèm.

### Bước 6: Giá cước và phạm vi hiển thị

* **Chế độ giá:**
  + *Giá đề xuất của nền tảng* (mặc định): hệ thống gợi ý mức cước theo tuyến, loại xe, thời điểm, kèm dự đoán thời gian tìm được xe **[AI]**. Ví dụ: "với mức này khoảng 3 giờ có xe, tăng 10% còn khoảng 40 phút".(tính như nào)
  + *Tự đặt giá:* chủ hàng nhập giá. Hệ thống hiển thị mức tham khảo và cảnh báo nếu giá quá thấp, ít xe nhận. Chủ hàng phải đọc và đồng ý quyền, nghĩa vụ đi kèm.
  + *Thương lượng:* chỉ mở sau khi có xe quan tâm, chat trong nền tảng. **Thương lượng phải kết thúc trước khi tài xế nộp cọc.** Giá đã chốt được khóa, vì cọc và tiền giữ tính trên giá này.
* **Phạm vi hiển thị đơn:**
  + Mặc định đơn được **đăng lên chợ** để xe phù hợp thấy và đăng ký nhận.
  + Song song đó, chủ hàng có thể **mời trực tiếp** các xe cụ thể (từ danh sách "Chợ xe" hoặc xe yêu thích). Hai cách chạy cùng lúc, không loại trừ nhau.
* **Thời hạn tìm xe:** đơn tự hết hạn sau *X giờ* nếu chưa ghép được. Hệ thống báo trước khi hết hạn để chủ hàng gia hạn, tăng giá hoặc sửa yêu cầu.
* **Tăng tốc (trả phí, tùy chọn):** đơn được ưu tiên hiển thị. Mọi ưu tiên trả phí đều gắn nhãn **"Quảng bá"**, tách biệt với xếp hạng của engine.

### Bước 7: Xem lại và xác nhận

* Tóm tắt toàn bộ đơn, bảng phí dự kiến (cước + phụ phí + gói bảo đảm + phí nền tảng + VAT), điều khoản hủy đơn.
* Tick đồng ý điều khoản, sau đó bấm **Đăng đơn**.
* Sau khi đăng, engine ghép chạy ngay và hiển thị các xe đề xuất đầu tiên.

## 3. Đơn hàng của tôi

* **Tab trạng thái:** Nháp / Đang tìm xe / Chờ xác nhận và thanh toán / Đang vận chuyển / Hoàn thành / Đã hủy hoặc hết hạn
* **Mỗi đơn hiển thị:** mã đơn, tuyến, hàng, trạng thái, cước, xe được ghép(biển xe, tên tài xế), đếm ngược nếu đang chờ hành động.

### Chi tiết đơn

* **Danh sách xe chia thành 3 nhóm:**
  + *Xe đã đăng ký nhận đơn* (xe chủ động tìm đến).
  + *Xe hệ thống đề xuất* **[AI]**, mỗi xe kèm lý do gợi ý (ví dụ "khớp 92%, lệch tuyến 3 km, xe về Hải Phòng trước 18h").
  + *Xe bạn đã mời* và trạng thái phản hồi (chưa xem, đã xem, từ chối, chấp nhận).
* Thông tin từng xe: ID xe, tên đội xe (nếu có), loại xe, điểm đánh giá, số chuyến đã chạy, tỷ lệ hủy, huy hiệu đã xác minh.
* **Nút thao tác:** Chọn xe, Từ chối, Mời thêm xe, Sửa đơn, Tăng giá, Xóa, Đặt lại đơn tương tự.
* **Chẩn đoán đơn [AI]:** tốc độ tìm xe hiện tại, số xe đã xem đơn, dự đoán thời gian có xe, và gợi ý cải thiện (thêm giá, bổ sung ghi chú, đổi khung giờ, nới yêu cầu xe).
* **Sau khi giao:** xác nhận đã nhận hàng, xem ảnh POD, đánh giá tài xế, mở khiếu nại nếu cần.

**Hộp thư lời mời và phản hồi:** tập trung mọi lời mời gửi đi, đăng ký nhận từ xe và tin nhắn thương lượng giá.

## 4. Chợ xe (Tìm xe / Xe đề xuất)

Giao diện có 3 tab:

| **Tab** | **Nội dung** |
| --- | --- |
| **Đề xuất cho bạn [AI]** | Xe được engine ghép chấm điểm và sắp xếp cho từng đơn của bạn, kèm lý do. Xe đang đăng chuyến về rỗng có điểm đi và điểm về nằm trên hoặc gần tuyến đơn của bạn. Xe càng gần hạn chót càng lên trên, vì cơ hội này sắp mất. Ghép với xe rỗng thường được giảm cước. |
| **Tất cả xe** | Toàn bộ xe đủ điều kiện, dùng bộ lọc thủ công. |

* **Bộ lọc (ràng buộc cứng):** phạm vi hoạt động (tỉnh/thành), loại xe, tải trọng, kích thước thùng, loại hàng nhận được, điểm đánh giá, mức giá, ngày rảnh.
* **Thẻ xe:** ID xe, tên đội xe, ảnh xe, phạm vi, giá tham khảo, huy hiệu đã xác minh, **lý do gợi ý** và nhãn **"Quảng bá"** nếu là vị trí trả phí.
* **Hành động:** Gửi lời mời chuyến, lưu vào xe yêu thích, xem hồ sơ xe.
* Chủ hàng vẫn thấy danh sách đầy đủ và tự chọn. Gợi ý của AI không giới hạn lựa chọn.

## 5. Theo dõi hành trình

* Bản đồ vị trí xe theo thời gian thực, các mốc: đã đến lấy hàng, đã nhận hàng, đang chạy, sắp đến điểm giao, đã giao.
* Thời gian dự kiến đến, quãng đường còn lại.
* **Cảnh báo bất thường [AI]:** chậm trễ, xe đi lệch tuyến, dừng lâu bất thường.
* **Cập nhật ảnh định kỳ** (nếu chọn gói Giám sát):
  + Ảnh phải chụp trực tiếp trong app, tự gắn giờ và GPS, không cho tải từ thư viện.
  + AI so sánh ảnh cập nhật với ảnh hàng lúc nhận (cùng lô hàng không, có dấu hiệu dỡ bớt không, ảnh có phải chụp lại từ màn hình không) **[AI]**.
  + Nếu tài xế bỏ lỡ một mốc: nhắc tài xế → báo chủ hàng → chuyển CSKH → kích hoạt quy trình sự cố.
* **Khi giao hàng:** mã OTP hoặc chữ ký người nhận, ảnh POD.
* Nút liên hệ tài xế, báo sự cố.

## 6. Thanh toán và chi phí

* **Bảng cước từng đơn:** cước cơ bản, phụ phí, gói bảo đảm, phí nền tảng, VAT, tổng cộng.
* **Trạng thái tiền của từng đơn:** đã khóa ở tài khoản trung gian / đã giải ngân / đã hoàn / đang đóng băng do tranh chấp.
* Lịch sử giao dịch, hóa đơn, yêu cầu hoàn tiền.
* Thống kê chi phí theo thời gian, theo tuyến.
* Luồng tiền chi tiết xem mục D.

## 7. Hỗ trợ

* FAQ và hướng dẫn cách đăng đơn, mục **Mẹo** (cách chụp ảnh hàng, cách ghi chú tránh tranh cãi, cách đặt giá hợp lý).
* Chat với CSKH, số hotline.
* **Báo sự cố trên đơn đang chạy:** hàng hư hại, xe hỏng, tài xế không liên lạc được, giao sai địa điểm, nghi ngờ mất hàng.
* **Khiếu nại/tranh chấp:** kèm hình ảnh và bằng chứng. Khi mở tranh chấp, tiền của đơn bị đóng băng đến khi có kết luận.
* **Tóm tắt hồ sơ tranh chấp [AI]:** gom ghi chú đơn, ảnh POD, dữ liệu GPS và lịch sử cập nhật thành bản tóm tắt cho nhân viên xử lý.
* Trợ lý hội thoại trả lời FAQ **[AI]**.
* Lịch sử yêu cầu hỗ trợ.

## 8. Hồ sơ chủ hàng

* Thông tin cá nhân hoặc doanh nghiệp, giấy tờ, trạng thái xác minh.
* Sổ địa chỉ (kho, điểm nhận/giao hay dùng, đã ghim tọa độ).
* Thông tin xuất hóa đơn, nguồn thanh toán.
* Danh sách xe yêu thích.
* Điểm uy tín của chủ hàng (tỷ lệ đơn hoàn thành, tỷ lệ hủy, tỷ lệ thanh toán đúng hạn). Điểm này hiển thị cho tài xế khi họ cân nhắc nhận đơn.

## 9. Cài đặt

Đổi mật khẩu, thông báo (đơn hàng, lời mời, thanh toán, hệ thống), ngôn ngữ, quyền riêng tư, điều khoản, thiết bị đăng nhập, xóa tài khoản, đăng xuất. Tài khoản doanh nghiệp có thể thêm tài khoản phụ và phân quyền (nhân viên điều phối).

# D. Luồng tiền: giữ trung gian và tiền cọc

| **Bước** | **Điều xảy ra** |
| --- | --- |
| 1 | Chủ hàng và tài xế đã thống nhất xe và giá (giá được khóa). |
| 2 | **Tài xế xác nhận nhận đơn và nộp cọc.** Tiền cọc bị khóa. |
| 3 | Đơn chuyển sang "Đã ghép xe". **Hai bên mới thấy thông tin liên hệ của nhau.** |
| 4 | Tài xế lấy hàng, vận chuyển, giao hàng và tải ảnh POD (kèm OTP hoặc chữ ký người nhận). |
| 5 | Chủ hàng xác nhận đã nhận hàng, hoặc **hệ thống tự xác nhận** sau *N giờ* nếu không có khiếu nại. |
| 6 | Nền tảng giải ngân cước cho tài xế (sau khi trừ phí nền tảng) và hoàn tiền cọc. |

### Tiền cọc của tài xế

* Tính bằng *k%* **giá trị hàng khai báo**, vì rủi ro mất hàng phụ thuộc vào giá trị hàng chứ không phải cước.
* Có mức tối thiểu và tối đa để tài xế nhỏ không bị chặn bởi đơn giá trị lớn. Tài xế uy tín cao có thể được giảm tỷ lệ cọc.
* Đội xe có thể nạp sẵn "ví cọc" chung để không phải cọc từng chuyến.
* Giá trị khai báo cũng là mức bồi thường tối đa. Chủ hàng khai thấp thì được bồi thường thấp, nên cơ chế tự cân bằng.

### Xử lý hủy đơn và sự cố

| **Tình huống** | **Xử lý** |
| --- | --- |
| Chủ hàng không thanh toán đúng hạn | Hoàn cọc cho tài xế, đơn quay về tìm xe, ghi nhận vào điểm uy tín chủ hàng. |
| Tài xế hủy sau khi đã ghép | Mất một phần hoặc toàn bộ cọc, cước hoàn cho chủ hàng, đơn quay về tìm xe (ưu tiên hiển thị). |
| Chủ hàng hủy muộn (sau ghép) | Bị trừ phí hủy theo mốc thời gian, một phần cuyển cho tà xế. |
| Tài xế mất liên lạc hoặc nghi cuỗm hàng | Đóng băng tiền, xử lý qua tranh chấp, tiền cọc dùng để bồi thường. |
| Hàng hư hại hoặc thiếu | Mở tranh chấp, đóng băng tiền, xử lý dựa trên ảnh nhận hàng, ảnh POD và GPS. |
| Chủ hàng im lặng sau khi giao | Tự xác nhận sau *N giờ*, giải ngân cho tài xế. |

# E. Gói bảo đảm hàng hóa

Cơ chế của nền tảng là **cọc trước cộng với cập nhật ảnh định kỳ**, chưa phải bảo hiểm theo nghĩa pháp lý. Vì vậy dùng tên **"Gói bảo đảm"** thay cho "bảo hiểm". Bảo hiểm thật chỉ bán qua đối tác bảo hiểm được cấp phép.

| **Gói** | **Nội dung** | **Phí** |
| --- | --- | --- |
| **Cơ bản** | Tài xế cọc, cước giữ trung gian, ảnh POD khi giao. | Không thu thêm |
| **Giám sát** | Gói Cơ bản cộng cập nhật ảnh và vị trí mỗi *4 giờ* (hoặc *2 giờ*). | Phụ phí, tăng theo tần suất. **Một phần phụ phí chuyển cho tài xế** để khuyến khích thực hiện. |
| **Bảo hiểm** *(hướng mở rộng)* | Liên kết đối tác bảo hiểm được cấp phép. | Theo % giá trị hàng |

Mỗi gói hiển thị rõ mức bồi thường tối đa, điều kiện và trách nhiệm mỗi bên.

# F. Cách tính phí

Tổng phí = Cước cơ bản (quãng đường × tải trọng/loại xe) + Phụ phí + Gói bảo đảm + Phí nền tảng + VAT (nếu chọn)

| **Yếu tố** | **Ảnh hưởng** | **Cách hiển thị** |
| --- | --- | --- |
| Vùng hẻo lánh, đường khó | Phụ phí vùng | Tự nhận diện theo tọa độ |
| Hàng cồng kềnh, quá khổ | Phụ phí hàng | Theo kích thước, khối lượng |
| Giao nhanh, đúng giờ | Phụ phí tốc độ | Chọn ở bước 5 |
| **Đơn gấp** (cần xe trong thời gian ngắn) | Phụ phí đơn gấp | Chọn độ khẩn cấp ở bước 1 |
| Khung giờ cao điểm | Phụ phí thời điểm | Tự động theo giờ |
| Thời tiết xấu | Phụ phí thời tiết | Tự động |
| Tuyến ít phổ biến | Phụ phí tuyến | Theo dữ liệu tuyến |
| Hóa đơn đỏ (VAT) | Thêm thuế/phí | Chọn ở bước 5 |
| Gói Giám sát | Phụ phí theo tần suất cập nhật | Chọn ở bước 5 |
| **Ghép với xe chạy chuyến về rỗng** | **Giảm cước** | Tự động khi xe và đơn khớp tuyến |

Mỗi khi chọn thêm dịch vụ, màn hình hiển thị **quyền lợi và trách nhiệm** đi kèm (ví dụ giao nhanh mà chậm thì xử lý thế nào, mức bồi thường tối đa của từng gói).

**Gợi ý giá [AI]:** mô hình đề xuất cước theo tuyến, loại xe, thời điểm, mùa vụ, kèm dự đoán thời gian tìm được xe. Đây là gợi ý, chủ hàng vẫn tự quyết mức giá.

# G. Engine ghép thông minh [AI]

Đây là phần AI cốt lõi, dùng chung cho cả hai bên của chợ.

| **Lớp** | **Việc làm** | **Loại kỹ thuật** |
| --- | --- | --- |
| **1. Ràng buộc cứng** | Loại bỏ cặp không hợp lệ: sai loại xe, quá tải, vượt kích thước, ngoài phạm vi, hàng cấm, tài khoản chưa xác minh. | Quy tắc cố định (không dùng AI vì sai là mất an toàn) |
| **2. Chấm điểm cặp** | Mỗi cặp đơn hàng và xe qua lớp 1 được chấm điểm phù hợp. | Trọng số chuyên gia ban đầu, sau đó học từ dữ liệu |
| **3. Ghép toàn cục** | Chọn tập cặp tốt nhất cho cả hệ thống, tránh nhiều đơn cùng đề xuất một xe "đẹp nhất" trong khi xe khác ế. | Tối ưu hóa bài toán gán (Hungarian hoặc OR-Tools) |
| **4. Chủ động thông báo** | Có đơn mới, đơn gấp, hoặc xe sắp hết hạn về rỗng thì đẩy thông báo ngay cho bên phù hợp. | Kích hoạt theo sự kiện |

### Điểm phù hợp của một cặp (lớp 2)

điểm = w1·khớp\_tuyến + w2·khớp\_thời\_gian + w3·khẩn\_cấp + w4·khớp\_giá + w5·xác\_suất\_nhận

* **Khớp tuyến:** tính quãng đi lệch của xe (công thức bên dưới). Detour càng nhỏ thì điểm càng cao. Đơn nằm đúng trên đường về của xe rỗng thì detour gần bằng 0.

detour = d(xe→điểm lấy) + d(lấy→giao) + d(giao→điểm xe muốn về) − d(xe→điểm xe muốn về)

* **Khẩn cấp:** tính cả hai phía, hàng cần đi gấp và xe sắp hết thời gian rảnh.
* **Xác suất nhận:** ước lượng từ lịch sử nhận, hủy, đánh giá, và tỷ lệ cọc so với uy tín.
* **Điểm chờ lâu (aging):** đơn hoặc xe chờ lâu được cộng điểm để không bị bỏ quên.

### Cách vận hành

* Chạy theo lô mỗi 1 đến 5 phút. Đơn gấp và xe sắp hết hạn kích hoạt chạy ngay.
* Kết quả là **gợi ý**, không gán cứng. Xe được đề xuất mạnh cho một đơn sẽ được **giữ chỗ mềm** trong một khoảng thời gian, tránh bị đề xuất mạnh cho nhiều đơn cùng lúc. Bị từ chối hoặc hết hạn giữ chỗ thì loại cặp đó và chạy lại.
* Mỗi gợi ý luôn kèm **lý do**.

### Chống thiên vị

* Không ưu tiên đơn giá cao một cách ngầm định. Đơn chờ lâu được cộng điểm.
* Vị trí trả phí ("Tăng tốc") luôn gắn nhãn **Quảng bá** và tách khỏi xếp hạng của engine.

### Về dữ liệu

Giai đoạn thi dùng trọng số chuyên gia và dữ liệu mô phỏng (nêu rõ là mô phỏng). Lộ trình thay dần bằng mô hình học từ dữ liệu thật khi vận hành.

### Tổng hợp các chức năng AI của bên có hàng

| **Chức năng** | **Vị trí trong giao diện** |
| --- | --- |
| Nhập đơn bằng câu chữ hoặc ảnh | Tạo đơn, bước 0 |
| Kiểm tra hàng cấm và rủi ro (cảnh báo) | Tạo đơn, bước 2 |
| Gợi ý loại xe, gợi ý bổ sung ghi chú | Tạo đơn, bước 3 và 4 |
| Gợi ý giá và dự đoán thời gian tìm xe | Tạo đơn, bước 6 |
| Đề xuất xe và xe về rỗng gần tuyến | Chợ xe, Đơn hàng của tôi |
| Chẩn đoán đơn | Đơn hàng của tôi |
| Ghép toàn cục và thông báo chủ động | Nền hệ thống |
| Cảnh báo bất thường hành trình, so sánh ảnh cập nhật | Theo dõi hành trình |
| Tóm tắt hồ sơ tranh chấp, trợ lý FAQ | Hỗ trợ |

# H. Trạng thái đơn hàng

**Nháp → Đang tìm xe (công khai) → Có xe quan tâm hoặc được đề xuất → Chờ tài xế xác nhận và cọc → Chờ chủ hàng thanh toán → Đã ghép xe (tiền đã khóa, mở liên hệ) → Đang đến lấy hàng → Đang vận chuyển → Đã giao (chờ xác nhận, tự xác nhận sau N giờ) → Hoàn tất (giải ngân và hoàn cọc)**

**Nhánh phụ:**

* **Hết hạn:** không ghép được trong *X giờ*.
* **Đã hủy:** hủy trước hoặc sau khi ghép, xử lý phí khác nhau (xem mục D).
* **Tranh chấp:** đóng băng tiền đến khi có kết luận.
* **Sự cố:** xe hỏng, mất liên lạc, hàng hư hại.

# I. Các vấn đề đã nêu và cách xử lý

| **Vấn đề** | **Hướng giải quyết** |
| --- | --- |
| Hai bên trao đổi rồi đi riêng ngoài nền tảng | Ẩn số điện thoại đến khi ghép xe và thanh toán. Chat trong nền tảng. Ưu đãi cho giao dịch trên nền tảng (gói bảo đảm, tích điểm, khiếu nại có bảo vệ). Phát hiện số điện thoại, link trong chat **[AI]**. Cảnh báo và xử phạt khi vi phạm. |
| Tài xế cuỗm hàng | Tài xế cọc theo giá trị hàng. Xác minh danh tính, biển số. GPS theo dõi. Cập nhật ảnh định kỳ (gói Giám sát). Cọc dùng để bồi thường. |
| An toàn hàng hóa | Gói bảo đảm, ảnh nhận hàng và giao hàng (POD), OTP hoặc chữ ký người nhận. |
| Tranh chấp do mô tả thiếu | Ghi chú chi tiết và tag yêu cầu đặc biệt, lưu như một phần "hợp đồng" của đơn. Gợi ý bổ sung ghi chú **[AI]**. |
| Chủ hàng không muốn dùng giá nền tảng | Cho phép tự đặt giá, nhưng phải đọc và đồng ý quyền, nghĩa vụ từ đầu. |
| Chủ hàng im lặng để giữ tiền | Tự xác nhận sau *N giờ*. |
| Chủ hàng không thanh toán sau khi tài xế đã cọc | Hoàn cọc, đơn quay về tìm xe, ghi vào điểm uy tín. |
| Khai giá trị hàng thấp để giảm phí | Mức bồi thường tối đa bằng giá trị đã khai, có cảnh báo ngay tại ô nhập. |
| Ai đăng sớm hoặc trả cao thì thắng | Cộng điểm chờ lâu, vị trí trả phí gắn nhãn Quảng bá. |
| Xe rỗng không tìm được hàng, hàng gấp bị xếp cuối | Tab "Xe về rỗng gần tuyến", mục "Gấp" bên xe, thông báo chủ động **[AI]**. |
| Xe không khớp yêu cầu | Đơn hết hạn sau *X giờ*, báo trước để gia hạn, gợi ý nới yêu cầu hoặc tăng giá **[AI]**. |
| Bảo mật thông tin khách hàng | Cam kết bảo mật, chỉ hiện thông tin liên hệ cho bên đã ghép, tuân thủ quy định về dữ liệu cá nhân. |
| Tips cho tài xế và chủ hàng | Mục Mẹo trong trung tâm trợ giúp. |

# J. Các tham số cần chốt

| **Tham số** | **Ý nghĩa** | **Giá trị nhóm chốt** |
| --- | --- | --- |
| *k%* | Tỷ lệ cọc của tài xế (tính trên giá trị hàng), kèm mức tối thiểu và tối đa |  |
| *X phút* | Thời hạn chủ hàng thanh toán sau khi tài xế xác nhận và cọc |  |
| *N giờ* | Thời gian tự xác nhận sau khi giao |  |
| *X giờ* | Thời hạn tìm xe, quá hạn thì đơn hết hạn |  |
| Chu kỳ cập nhật | 4 giờ hoặc 2 giờ cho gói Giám sát |  |
| Phí hủy | Mốc thời gian và mức phí cho chủ hàng và tài xế |  |
| Tỷ lệ phụ phí chia cho tài xế | Phần phụ phí gói Giám sát chuyển cho tài xế |  |
| Tên chính thức của các gói | Cơ bản / Giám sát / Bảo hiểm |  |

# K. Điểm cần khớp với bản bên có xe

Để hai bản mô tả cùng một hệ thống, bên có xe cần có:

1. Đăng **chuyến về rỗng** (điểm đang đứng, điểm muốn về, hạn chót) và lịch xe rảnh.
2. Mục **"Gấp"** riêng khi tìm hàng.
3. **Ví cọc** và trạng thái tiền cọc trong phần Thu nhập.
4. Nhận lời mời từ chủ hàng, xác nhận kèm nộp cọc.
5. Tab **Đề xuất cho bạn [AI]**, mỗi thẻ hàng có lý do gợi ý.
6. Cập nhật ảnh và vị trí định kỳ theo gói Giám sát, nhận một phần phụ phí.
7. Nhận thông báo chủ động từ engine ghép.

ĐỀ XUẤT PHÁT TRIỂN THÊM WEB

Ưu đãi để thu hút khách hàng sử dụng dịch vụ