"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { formatVND } from "@/lib/currency";
import {
  Sparkles,
  MapPin,
  Package,
  Truck,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Flame,
  Lightbulb,
} from "lucide-react";

export const CreateOrderView: React.FC = () => {
  const { createOrder, setActiveTab, setSelectedOrder } = useApp();

  const [step, setStep] = useState(1);

  // Form states
  const [originCity, setOriginCity] = useState("Hưng Yên");
  const [originAddress, setOriginAddress] = useState("Kho Sebang Logistics, KCN Phố Nối A, Hưng Yên");
  const [destCity, setDestCity] = useState("Hải Phòng");
  const [destAddress, setDestAddress] = useState("Cảng Nam Hải Đình Vũ, Hải An, Hải Phòng");
  const [cargoName, setCargoName] = useState("Cont 40ft Than Viên Nén Xuất Khẩu");
  const [cargoType, setCargoType] = useState("Hàng Container / Năng lượng");
  const [cargoWeightKg, setCargoWeightKg] = useState(26000);
  const [cargoVolumeCbm, setCargoVolumeCbm] = useState(67.5);
  const [cargoLength, setCargoLength] = useState("12.0");
  const [cargoWidth, setCargoWidth] = useState("2.35");
  const [cargoHeight, setCargoHeight] = useState("2.39");
  const [cargoPhotoUrl, setCargoPhotoUrl] = useState("https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&auto=format&fit=crop&q=80");
  const [driverNotes, setDriverNotes] = useState("Hàng than đóng cont 40 kẹp seal chì niêm phong. Yêu cầu xe đầu kéo khóa gù mooc chắc chắn.");
  
  // Extra services
  const [extraServices, setExtraServices] = useState<string[]>(["Hỗ trợ kẹp seal hải quan", "Xuất hóa đơn GTGT"]);

  const [vehicleType, setVehicleType] = useState("Xe đầu kéo (Kéo container 40ft / Moóc sàn)");
  const [declaredValue, setDeclaredValue] = useState(350000000); // 350tr
  const [baseFreightPrice, setBaseFreightPrice] = useState(5800000); // 5.8tr
  const [servicePackage, setServicePackage] = useState<"STANDARD" | "SUPERVISED" | "INSURED">("SUPERVISED");
  const [urgencyLevel, setUrgencyLevel] = useState<"NORMAL" | "URGENT" | "FLEXIBLE">("NORMAL");
  const [voucherCode, setVoucherCode] = useState("VYLT2026");
  const [isVoucherApplied, setIsVoucherApplied] = useState(true);

  // Áp dụng mẫu đơn hàng nhanh
  const applyPreset = (preset: "THAN_CONT40" | "THEP_CUON" | "TOM_DONG_LANH" | "MAY_BIEN_AP") => {
    if (preset === "THAN_CONT40") {
      setOriginCity("Hưng Yên");
      setOriginAddress("Kho Sebang Logistics, KCN Phố Nối A, Hưng Yên");
      setDestCity("Hải Phòng");
      setDestAddress("Cảng Nam Hải Đình Vũ, Hải An, Hải Phòng");
      setCargoName("Cont 40ft Than Viên Nén Xuất Khẩu");
      setCargoType("Hàng Container / Năng lượng");
      setCargoWeightKg(26000);
      setCargoVolumeCbm(67.5);
      setCargoLength("12.0");
      setCargoWidth("2.35");
      setCargoHeight("2.39");
      setDriverNotes("Hàng than đóng cont 40 kẹp seal chì niêm phong. Yêu cầu xe đầu kéo khóa gù mooc chắc chắn, giao bãi Cảng Nam Hải Đình Vũ.");
      setVehicleType("Xe đầu kéo (Kéo container 40ft / Moóc sàn)");
      setDeclaredValue(350000000);
      setBaseFreightPrice(5800000);
      setExtraServices(["Hỗ trợ kẹp seal hải quan", "Xuất hóa đơn GTGT"]);
    } else if (preset === "THEP_CUON") {
      setOriginCity("Hải Phòng");
      setOriginAddress("Cảng Hoàng Diệu / Tân Vũ, Ngô Quyền, Hải Phòng");
      setDestCity("Hải Phòng");
      setDestAddress("QL10 (chân cầu Kiền), TDP Ngô Yến, P. An Hồng, Hải Phòng");
      setCargoName("Thép Cuộn Cán Nóng (6 x 1500 mm)");
      setCargoType("Kim loại / Hàng siêu trọng");
      setCargoWeightKg(22000);
      setCargoVolumeCbm(12);
      setCargoLength("1.5");
      setCargoWidth("1.5");
      setCargoHeight("1.5");
      setDriverNotes("Hàng thép cuộn 22T/cuộn siêu nặng. Bắt buộc xe có máng chữ V hoặc nêm gỗ chèn chống lăn, chằng tối thiểu 4 xích tăng đơ chịu lực.");
      setVehicleType("Xe đầu kéo (Mooc sàn chở thép cuộn)");
      setDeclaredValue(420000000);
      setBaseFreightPrice(5200000);
      setExtraServices(["Chằng buộc xích tăng đơ", "Xuất hóa đơn GTGT"]);
    } else if (preset === "TOM_DONG_LANH") {
      setOriginCity("Hưng Yên");
      setOriginAddress("Kho lạnh KCN Phố Nối B, Mỹ Hào, Hưng Yên");
      setDestCity("Hải Phòng");
      setDestAddress("Cảng Quốc tế Lạch Huyện (TC-HICT), Hải Phòng");
      setCargoName("Tôm Sú Đông Lạnh Xuất Khẩu (-18°C)");
      setCargoType("Thực phẩm đông lạnh / Cont lạnh");
      setCargoWeightKg(25000);
      setCargoVolumeCbm(65);
      setCargoLength("12.0");
      setCargoWidth("2.35");
      setCargoHeight("2.4");
      setDriverNotes("Cont lạnh 40RF duy trì -18 độ C suốt hành trình. Cắm máy phát GenSet chạy điện liên tục.");
      setVehicleType("Xe đầu kéo (Cont lạnh 40RF có GenSet)");
      setDeclaredValue(850000000);
      setBaseFreightPrice(6500000);
      setExtraServices(["Chạy máy phát GenSet", "Xuất hóa đơn GTGT"]);
    } else if (preset === "MAY_BIEN_AP") {
      setOriginCity("Bắc Ninh");
      setOriginAddress("KCN Tiên Sơn, Bắc Ninh");
      setDestCity("Hải Phòng");
      setDestAddress("Trạm phân phối điện KCN VSIP Thủy Nguyên, Hải Phòng");
      setCargoName("Máy Biến Áp Dầu 3 Pha 1600kVA & Tủ Điện");
      setCargoType("Thiết bị điện công nghiệp nặng");
      setCargoWeightKg(14000);
      setCargoVolumeCbm(22);
      setCargoLength("4.2");
      setCargoWidth("2.2");
      setCargoHeight("2.5");
      setDriverNotes("Yêu cầu xe tải cẩu 4 chân (cẩu 12 tấn) tự nâng hạ hàng tại trạm biến áp, bọc cáp chống trầy xước.");
      setVehicleType("Xe tải cẩu 4 chân (Cẩu 10-12 tấn)");
      setDeclaredValue(480000000);
      setBaseFreightPrice(6200000);
      setExtraServices(["Ca cẩu bốc dỡ 2 đầu", "Xuất hóa đơn GTGT"]);
    }
  };

  // Tính cọc yêu cầu: 10% giá trị khai báo, tối đa trần 5tr
  const requiredDeposit = Math.min(5000000, Math.max(300000, declaredValue * 0.1));

  // Tính phụ phí dịch vụ bổ sung
  const loadingFee = extraServices.includes("Hỗ trợ bốc xếp hai đầu") ? 300000 : 0;
  const vatFee = extraServices.includes("Xuất hóa đơn GTGT") ? Math.round(baseFreightPrice * 0.08) : 0;
  const multiDropFee = extraServices.includes("Giao hàng nhiều điểm dỡ") ? 200000 : 0;
  const timedDeliveryFee = extraServices.includes("Hẹn giờ giao chính xác") ? 100000 : 0;
  const totalExtraFees = loadingFee + vatFee + multiDropFee + timedDeliveryFee;

  // Gói dịch vụ
  // Gói giám sát: +5% cước (thay vì 15% theo feedback)
  const packageFee =
    servicePackage === "SUPERVISED"
      ? Math.round(baseFreightPrice * 0.05)
      : servicePackage === "INSURED"
      ? Math.round(declaredValue * 0.012)
      : 0;

  // Voucher discount
  const voucherDiscount = isVoucherApplied ? 200000 : 0;

  // Tổng cước thanh toán
  const totalFreightPrice = Math.max(500000, baseFreightPrice + totalExtraFees + packageFee - voucherDiscount);

  const toggleExtraService = (service: string) => {
    if (extraServices.includes(service)) {
      setExtraServices(extraServices.filter((s) => s !== service));
    } else {
      setExtraServices([...extraServices, service]);
    }
  };

  const handleApplyVoucher = (code: string) => {
    if (code.toUpperCase() === "VYLT2026" || code.toUpperCase() === "CHAOBANMOI") {
      setIsVoucherApplied(true);
      setVoucherCode(code.toUpperCase());
    } else {
      setIsVoucherApplied(false);
    }
  };

  const handleSubmit = () => {
    const newOrder = createOrder({
      originCity,
      originAddress,
      destCity,
      destAddress,
      cargoName,
      cargoType,
      cargoWeightKg,
      cargoVolumeCbm,
      cargoDimensions: `${cargoLength} x ${cargoWidth} x ${cargoHeight} m`,
      cargoPhotoUrl,
      driverNotes,
      extraServices,
      vehicleTypeRequired: vehicleType,
      declaredValue,
      freightPrice: totalFreightPrice,
      requiredDeposit,
      servicePackage,
      urgencyLevel,
      voucherCode: isVoucherApplied ? voucherCode : undefined,
      discountAmount: voucherDiscount,
    });

    setSelectedOrder(newOrder);
    setActiveTab("my-orders");
  };

  return (
    <div className="space-y-6 pb-12 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            Tạo đơn hàng vận chuyển mới
          </h2>
          <p className="text-xs text-slate-500">Mô hình chợ hai chiều, tự động kết nối với xe rỗng chiều về</p>
        </div>
        <button
          onClick={() => setActiveTab("my-orders")}
          className="text-xs font-semibold text-slate-500 hover:text-slate-800"
        >
          Hủy bỏ
        </button>
      </div>

      {/* Wizard Stepper Indicators */}
      <div className="flex items-center justify-between px-2 text-xs font-bold">
        {[
          { stepNum: 1, title: "1. Lộ trình & Thời gian" },
          { stepNum: 2, title: "2. Hàng hóa & Khai báo" },
          { stepNum: 3, title: "3. Loại xe & Gói dịch vụ" },
          { stepNum: 4, title: "4. Xem cước & Xác nhận" },
        ].map((item) => (
          <button
            key={item.stepNum}
            onClick={() => setStep(item.stepNum)}
            className={`flex items-center gap-1.5 pb-2 border-b-2 transition-all ${
              step === item.stepNum
                ? "border-blue-600 text-blue-600"
                : step > item.stepNum
                ? "border-emerald-500 text-emerald-600"
                : "border-slate-200 text-slate-400"
            }`}
          >
            <span>{item.title}</span>
          </button>
        ))}
      </div>

      {/* Step Contents */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
        {/* Step 1: Lộ trình */}
        {step === 1 && (
          <div className="space-y-4">
            {/* Quick Presets for Demo */}
            <div className="p-3.5 bg-blue-50/70 rounded-xl border border-blue-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  Mẫu đơn thực tế (Điền nhanh 1 chạm cho Chủ hàng):
                </span>
                <span className="text-[10px] text-blue-600 font-semibold">Chuẩn tải trọng & Loại xe</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => applyPreset("THAN_CONT40")}
                  className={`p-2.5 rounded-xl text-left text-xs font-semibold border transition-all ${
                    cargoName.includes("Than")
                      ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                      : "bg-white text-slate-700 border-blue-200 hover:border-blue-400 hover:bg-blue-50/50"
                  }`}
                >
                  <p className="font-bold">1. Cont 40ft Than (26 Tấn)</p>
                  <p className={`text-[10px] ${cargoName.includes("Than") ? "text-blue-100" : "text-slate-500"}`}>
                    Kho Sebang Hưng Yên ➔ Cảng Nam Hải Đình Vũ
                  </p>
                </button>
                <button
                  type="button"
                  onClick={() => applyPreset("THEP_CUON")}
                  className={`p-2.5 rounded-xl text-left text-xs font-semibold border transition-all ${
                    cargoName.includes("Thép")
                      ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                      : "bg-white text-slate-700 border-blue-200 hover:border-blue-400 hover:bg-blue-50/50"
                  }`}
                >
                  <p className="font-bold">2. Thép Cuộn 6x1500mm (22 Tấn)</p>
                  <p className={`text-[10px] ${cargoName.includes("Thép") ? "text-blue-100" : "text-slate-500"}`}>
                    Cảng Tân Vũ ➔ Chân cầu Kiền, An Hồng
                  </p>
                </button>
                <button
                  type="button"
                  onClick={() => applyPreset("TOM_DONG_LANH")}
                  className={`p-2.5 rounded-xl text-left text-xs font-semibold border transition-all ${
                    cargoName.includes("Tôm")
                      ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                      : "bg-white text-slate-700 border-blue-200 hover:border-blue-400 hover:bg-blue-50/50"
                  }`}
                >
                  <p className="font-bold">3. Cont Lạnh 40RF Tôm (25 Tấn)</p>
                  <p className={`text-[10px] ${cargoName.includes("Tôm") ? "text-blue-100" : "text-slate-500"}`}>
                    KCN Phố Nối B ➔ Cảng Lạch Huyện (-18°C)
                  </p>
                </button>
                <button
                  type="button"
                  onClick={() => applyPreset("MAY_BIEN_AP")}
                  className={`p-2.5 rounded-xl text-left text-xs font-semibold border transition-all ${
                    cargoName.includes("Biến Áp")
                      ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                      : "bg-white text-slate-700 border-blue-200 hover:border-blue-400 hover:bg-blue-50/50"
                  }`}
                >
                  <p className="font-bold">4. Xe Cẩu 4 Chân Biến Áp (14 Tấn)</p>
                  <p className={`text-[10px] ${cargoName.includes("Biến Áp") ? "text-blue-100" : "text-slate-500"}`}>
                    KCN Tiên Sơn ➔ KCN VSIP Thủy Nguyên
                  </p>
                </button>
              </div>
            </div>

            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-600" />
              Tuyến vận chuyển & Độ khẩn cấp
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700">Điểm lấy hàng (Tỉnh/Thành):</label>
                <input
                  type="text"
                  value={originCity}
                  onChange={(e) => setOriginCity(e.target.value)}
                  className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-slate-800 font-semibold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-700">Điểm giao hàng (Tỉnh/Thành):</label>
                <input
                  type="text"
                  value={destCity}
                  onChange={(e) => setDestCity(e.target.value)}
                  className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-slate-800 font-semibold"
                />
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="font-bold text-slate-700">Địa chỉ cụ thể lấy hàng (Kho/Cảng):</label>
                <input
                  type="text"
                  value={originAddress}
                  onChange={(e) => setOriginAddress(e.target.value)}
                  className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-slate-800"
                />
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="font-bold text-slate-700">Địa chỉ cụ thể giao hàng:</label>
                <input
                  type="text"
                  value={destAddress}
                  onChange={(e) => setDestAddress(e.target.value)}
                  className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-slate-800"
                />
              </div>

              {/* Mức độ khẩn cấp */}
              <div className="space-y-1.5 md:col-span-2 pt-2 border-t border-slate-100">
                <label className="font-bold text-slate-700 block">Độ khẩn cấp của đơn hàng:</label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setUrgencyLevel("URGENT")}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      urgencyLevel === "URGENT"
                        ? "border-red-500 bg-red-50 text-red-700 font-bold shadow-2xs"
                        : "border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <Flame className="w-4 h-4 mx-auto mb-1 text-red-600" />
                    Đơn Gấp (Cần xe trong 3h)
                  </button>

                  <button
                    type="button"
                    onClick={() => setUrgencyLevel("NORMAL")}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      urgencyLevel === "NORMAL"
                        ? "border-blue-500 bg-blue-50 text-blue-700 font-bold shadow-2xs"
                        : "border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    Tiêu chuẩn (Trong ngày)
                  </button>

                  <button
                    type="button"
                    onClick={() => setUrgencyLevel("FLEXIBLE")}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      urgencyLevel === "FLEXIBLE"
                        ? "border-emerald-500 bg-emerald-50 text-emerald-700 font-bold shadow-2xs"
                        : "border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    Linh hoạt (Dễ ghép xe rỗng)
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Hàng hóa (Bổ sung số khối, kích thước D x R x C, tải ảnh hàng, lưu ý tài xế) */}
        {step === 2 && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <Package className="w-4 h-4 text-blue-600" />
              Thông tin hàng hóa, Quy cách & Kích thước
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1.5 md:col-span-2">
                <label className="font-bold text-slate-700">Tên mặt hàng:</label>
                <input
                  type="text"
                  value={cargoName}
                  onChange={(e) => setCargoName(e.target.value)}
                  placeholder="VD: 8 Tấn Cuộn Thép Công Nghiệp"
                  className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-slate-800 font-semibold"
                />
              </div>

              {/* Trọng lượng & Số khối m3 */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700">Trọng lượng (kg hoặc tấn):</label>
                <div className="relative">
                  <input
                    type="number"
                    value={cargoWeightKg}
                    onChange={(e) => setCargoWeightKg(Number(e.target.value))}
                    className="w-full bg-slate-50 p-2.5 pr-14 rounded-xl border border-slate-200 text-slate-800 font-semibold"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium">kg</span>
                </div>
                <p className="text-[10px] text-slate-400 font-medium">Tương đương: {cargoWeightKg / 1000} tấn</p>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-700">Thể tích / Số khối (m³):</label>
                <div className="relative">
                  <input
                    type="number"
                    value={cargoVolumeCbm}
                    onChange={(e) => setCargoVolumeCbm(Number(e.target.value))}
                    className="w-full bg-slate-50 p-2.5 pr-14 rounded-xl border border-slate-200 text-slate-800 font-semibold"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium">m³ (CBM)</span>
                </div>
                <p className="text-[10px] text-slate-400 font-medium">Quy đổi thể tích để chọn xe vừa thùng</p>
              </div>

              {/* Kích thước Dài x Rộng x Cao (m) */}
              <div className="space-y-1.5 md:col-span-2">
                <label className="font-bold text-slate-700">Kích thước hàng hóa (Dài × Rộng × Cao tính bằng mét):</label>
                <div className="grid grid-cols-3 gap-3">
                  <div className="relative">
                    <input
                      type="text"
                      value={cargoLength}
                      onChange={(e) => setCargoLength(e.target.value)}
                      placeholder="Dài"
                      className="w-full bg-slate-50 p-2.5 pr-10 rounded-xl border border-slate-200 text-slate-800 text-center font-bold"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">m dài</span>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      value={cargoWidth}
                      onChange={(e) => setCargoWidth(e.target.value)}
                      placeholder="Rộng"
                      className="w-full bg-slate-50 p-2.5 pr-10 rounded-xl border border-slate-200 text-slate-800 text-center font-bold"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">m rộng</span>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      value={cargoHeight}
                      onChange={(e) => setCargoHeight(e.target.value)}
                      placeholder="Cao"
                      className="w-full bg-slate-50 p-2.5 pr-10 rounded-xl border border-slate-200 text-slate-800 text-center font-bold"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">m cao</span>
                  </div>
                </div>
              </div>

              {/* Nút tải ảnh hàng lên */}
              <div className="space-y-1.5 md:col-span-2 pt-1">
                <label className="font-bold text-slate-700 block">Hình ảnh chụp hàng hóa / Quy cách đóng gói:</label>
                <div className="flex flex-col sm:flex-row items-center gap-4 p-3.5 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 hover:border-blue-400 transition-colors">
                  {cargoPhotoUrl ? (
                    <div className="relative w-28 h-20 rounded-xl overflow-hidden border border-slate-300 shrink-0">
                      <img src={cargoPhotoUrl} alt="Cargo" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setCargoPhotoUrl("")}
                        className="absolute top-1 right-1 bg-black/60 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px]"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <div className="w-28 h-20 rounded-xl bg-slate-200 border border-slate-300 flex flex-col items-center justify-center text-slate-500 shrink-0">
                      <Package className="w-6 h-6 text-slate-400" />
                      <span className="text-[10px]">Chưa có ảnh</span>
                    </div>
                  )}

                  <div className="space-y-1.5 flex-1 text-center sm:text-left">
                    <p className="text-xs font-bold text-slate-800">Tải ảnh chụp thực tế kiện hàng</p>
                    <p className="text-[11px] text-slate-500">Giúp tài xế chuẩn bị bạt che, dây chằng hoặc xe nâng phù hợp.</p>
                    <div className="flex flex-wrap gap-2 pt-1 justify-center sm:justify-start">
                      <button
                        type="button"
                        onClick={() =>
                          setCargoPhotoUrl("https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&auto=format&fit=crop&q=80")
                        }
                        className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-2xs"
                      >
                        + Tải ảnh hàng lên
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setCargoPhotoUrl("https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=400&auto=format&fit=crop&q=80")
                        }
                        className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-white"
                      >
                        Chọn ảnh mẫu linh kiện máy
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Thanh nhập Lưu ý cho tài xế */}
              <div className="space-y-1.5 md:col-span-2 pt-1">
                <label className="font-bold text-slate-700 block">Lưu ý cho tài xế:</label>
                <textarea
                  rows={2}
                  value={driverNotes}
                  onChange={(e) => setDriverNotes(e.target.value)}
                  placeholder="Ghi chú thêm về yêu cầu che bạt, nâng hạ, thời gian nhận..."
                  className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-slate-800 font-medium focus:bg-white focus:outline-none focus:border-blue-500"
                />
                {/* Gợi ý nhanh dạng chip */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="text-[11px] text-slate-400 font-semibold self-center mr-1">Gợi ý:</span>
                  {[
                    "Hàng dễ vỡ, bốc dỡ nhẹ tay",
                    "Cần phủ bạt kín chống mưa",
                    "Giao trong giờ hành chính",
                    "Xe cần có bàn nâng thủy lực",
                  ].map((chip) => (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => setDriverNotes((prev) => (prev ? `${prev}. ${chip}` : chip))}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-600 text-[11px] font-medium transition-colors"
                    >
                      + {chip}
                    </button>
                  ))}
                </div>
              </div>

              {/* Khai báo giá trị hàng */}
              <div className="space-y-1.5 md:col-span-2 pt-2 border-t border-slate-100">
                <label className="font-bold text-slate-700">Giá trị hàng hóa khai báo (VNĐ):</label>
                <input
                  type="number"
                  value={declaredValue}
                  onChange={(e) => setDeclaredValue(Number(e.target.value))}
                  className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-slate-800 font-bold"
                />
              </div>

              {/* Box cảnh báo cọc tài xế theo Bảng J */}
              <div className="md:col-span-2 p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 space-y-1">
                <p className="font-bold flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  Quy định ký quỹ Escrow bảo đảm hai chiều:
                </p>
                <p className="text-[11px] leading-relaxed flex flex-wrap items-center gap-1">
                  <span>Giá trị hàng khai báo là <strong>{formatVND(declaredValue)}</strong>. Tiền cọc trách nhiệm của tài xế sẽ tính bằng 10% (trần tối đa 5.000.000đ)</span>
                  <ArrowRight className="w-3.5 h-3.5 inline text-amber-700 shrink-0" />
                  <span>Cọc tài xế cần nộp: <strong className="text-blue-700 font-extrabold">{formatVND(requiredDeposit)}</strong>.</span>
                </p>
              </div>

              <div className="md:col-span-2 pt-1">
                <label className="flex items-center gap-2 text-slate-700 font-medium cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded text-blue-600" />
                  <span>Cam kết kiện hàng không chứa danh mục hàng cấm hoặc chất gây cháy nổ theo quy định pháp luật.</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Xe & Gói dịch vụ & Thẻ yêu cầu bổ sung */}
        {step === 3 && (
          <div className="space-y-5">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <Truck className="w-4 h-4 text-blue-600" />
              Yêu cầu loại xe & Gói bảo đảm hàng hóa
            </h3>

            <div className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Loại phương tiện mong muốn:</label>
                <select
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value)}
                  className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-slate-800 font-semibold"
                >
                  <option>Xe đầu kéo (Kéo container 40ft / Moóc sàn)</option>
                  <option>Xe đầu kéo (Mooc sàn chở thép cuộn)</option>
                  <option>Xe đầu kéo (Cont lạnh 40RF có GenSet)</option>
                  <option>Xe tải cẩu 4 chân (Cẩu 10-12 tấn)</option>
                  <option>Xe đầu kéo (Fooc lùn / Lowbed 3 trục chở máy công trình)</option>
                  <option>Xe tải thùng kín (10 tấn)</option>
                  <option>Xe tải mui bạt (15 tấn)</option>
                  <option>Xe bồn xitéc chuyên dụng (Chất lỏng / Xăng dầu)</option>
                </select>
                <p className="text-[11px] text-slate-400 mt-1">Đã tích hợp đầy đủ xe đầu kéo cont 40ft, mooc sàn chở thép, cont lạnh và xe cẩu.</p>
              </div>

              {/* Thẻ Lựa chọn yêu cầu bổ sung dạng thẻ sẵn có phụ phí */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-slate-700 block">Yêu cầu dịch vụ bổ sung (Có tính phụ phí sẵn):</label>
                  <span className="text-[11px] text-slate-400">Chọn dịch vụ cần thiết</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    {
                      name: "Hỗ trợ bốc xếp hai đầu",
                      feeText: "+ 300.000đ",
                      desc: "Tài xế và phụ xe hỗ trợ bốc xếp hàng lên/xuống thùng xe.",
                    },
                    {
                      name: "Xuất hóa đơn GTGT",
                      feeText: "+ 8% cước",
                      desc: "Xuất hóa đơn điện tử VAT đầy đủ theo thông tin doanh nghiệp.",
                    },
                    {
                      name: "Giao hàng nhiều điểm dỡ",
                      feeText: "+ 200.000đ",
                      desc: "Giao tại 2-3 điểm trả hàng phụ dọc hành lang di chuyển.",
                    },
                    {
                      name: "Hẹn giờ giao chính xác",
                      feeText: "+ 100.000đ",
                      desc: "Giao hàng đúng khung giờ hẹn theo ca làm việc của kho.",
                    },
                  ].map((srv) => {
                    const isSelected = extraServices.includes(srv.name);
                    return (
                      <div
                        key={srv.name}
                        onClick={() => toggleExtraService(srv.name)}
                        className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start justify-between gap-2 ${
                          isSelected
                            ? "border-blue-600 bg-blue-50/60 shadow-2xs ring-1 ring-blue-500"
                            : "border-slate-200 hover:bg-slate-50"
                        }`}
                      >
                        <div className="space-y-0.5">
                          <p className="font-bold text-slate-900">{srv.name}</p>
                          <p className="text-[11px] text-slate-500">{srv.desc}</p>
                        </div>
                        <span className="text-xs font-extrabold text-blue-600 bg-white px-2 py-0.5 rounded-md border border-blue-200 shrink-0">
                          {srv.feeText}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 3 Gói dịch vụ chính thức (Gói giám sát +5% cước, không hiển thị 60% phụ phí) */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <label className="font-bold text-slate-700 block">Chọn gói bảo đảm hàng hóa:</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div
                    onClick={() => setServicePackage("STANDARD")}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      servicePackage === "STANDARD"
                        ? "border-blue-600 bg-blue-50/50 shadow-xs ring-1 ring-blue-500"
                        : "border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <p className="font-bold text-slate-900 text-sm">Gói Tiêu Chuẩn</p>
                    <p className="text-[11px] text-slate-500 mt-1">Cước giữ Escrow, tài xế cọc trách nhiệm, ảnh biên bản bàn giao điện tử e-POD khi giao hàng.</p>
                    <span className="text-xs font-bold text-emerald-600 mt-2 block">Miễn phí thêm</span>
                  </div>

                  <div
                    onClick={() => setServicePackage("SUPERVISED")}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      servicePackage === "SUPERVISED"
                        ? "border-blue-600 bg-blue-50/50 shadow-xs ring-1 ring-blue-500"
                        : "border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <p className="font-bold text-slate-900 text-sm flex items-center justify-between">
                      Gói Giám Sát
                      <span className="text-[10px] bg-blue-600 text-white px-1.5 py-0.5 rounded font-extrabold">Đề xuất</span>
                    </p>
                    <p className="text-[11px] text-slate-500 mt-1">
                      Giám sát hành trình trực tiếp, chụp ảnh hàng định kỳ mỗi 2h, cập nhật lộ trình liên tục.
                    </p>
                    <span className="text-xs font-bold text-blue-600 mt-2 block">+ 5% cước</span>
                  </div>

                  <div
                    onClick={() => setServicePackage("INSURED")}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      servicePackage === "INSURED"
                        ? "border-blue-600 bg-blue-50/50 shadow-xs ring-1 ring-blue-500"
                        : "border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <p className="font-bold text-slate-900 text-sm">Gói Toàn Diện</p>
                    <p className="text-[11px] text-slate-500 mt-1">Bồi thường 100% giá trị khai báo thông qua quỹ dự phòng bảo hiểm rủi ro của sàn.</p>
                    <span className="text-xs font-bold text-purple-600 mt-2 block">+ 1.2% giá trị hàng</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Xem lại, Voucher & Chính sách hoàn tiền Escrow */}
        {step === 4 && (
          <div className="space-y-5">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Tổng quan chi phí & Đăng đơn lên sàn
            </h3>

            {/* Bảng kê chi tiết cước phí */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Tuyến vận chuyển:</span>
                <span className="font-extrabold text-slate-900 flex items-center gap-1.5">
                  {originCity} <ArrowRight className="w-4 h-4 text-blue-600 inline" /> {destCity} (120 km)
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">Mặt hàng & Quy cách:</span>
                <span className="font-semibold text-slate-800">
                  {cargoName} · {cargoWeightKg / 1000} tấn · {cargoVolumeCbm} m³ ({cargoLength}×{cargoWidth}×{cargoHeight}m)
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">Cước vận chuyển cơ bản:</span>
                <span className="font-bold text-slate-800">{formatVND(baseFreightPrice)}</span>
              </div>

              {totalExtraFees > 0 && (
                <div className="flex justify-between text-blue-700">
                  <span>Phụ phí dịch vụ bổ sung ({extraServices.join(", ")}):</span>
                  <span className="font-bold">+{formatVND(totalExtraFees)}</span>
                </div>
              )}

              {packageFee > 0 && (
                <div className="flex justify-between text-blue-700">
                  <span>Phí {servicePackage === "SUPERVISED" ? "Gói Giám Sát (+5%)" : "Gói Toàn Diện (+1.2%)"}:</span>
                  <span className="font-bold">+{formatVND(packageFee)}</span>
                </div>
              )}

              {/* Áp dụng Voucher giảm giá */}
              <div className="border-t border-slate-200 pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-700">Mã voucher giảm giá:</span>
                  <input
                    type="text"
                    value={voucherCode}
                    onChange={(e) => handleApplyVoucher(e.target.value)}
                    placeholder="Nhập mã VYLT2026..."
                    className="uppercase bg-white border border-slate-300 px-2.5 py-1 rounded-lg text-xs font-bold w-28 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => handleApplyVoucher("VYLT2026")}
                    className="text-[10px] text-blue-600 font-bold hover:underline"
                  >
                    Dùng mã mẫu VYLT2026 (-200k)
                  </button>
                </div>
                {isVoucherApplied && (
                  <span className="font-extrabold text-emerald-600 text-xs">
                    - {formatVND(voucherDiscount)}
                  </span>
                )}
              </div>

              <div className="flex justify-between border-t border-slate-300 pt-3 text-sm">
                <span className="font-bold text-slate-800">Tổng cước thanh toán qua Escrow:</span>
                <span className="font-extrabold text-blue-600 text-lg">{formatVND(totalFreightPrice)}</span>
              </div>

              <div className="flex justify-between text-slate-500 pt-1 text-[11px]">
                <span>Tiền cọc tài xế cần nộp vào Escrow:</span>
                <span className="font-bold text-slate-700">{formatVND(requiredDeposit)}</span>
              </div>
            </div>

            {/* Thông tin Chính sách Hoàn tiền Escrow & Giữ tiền 7 ngày */}
            <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200 text-xs text-emerald-900 space-y-2">
              <div className="flex items-center gap-2 font-bold text-emerald-800 text-sm">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Chính sách Hoàn tiền & Bảo đảm Ký quỹ Escrow (VYLT 2026)</span>
              </div>
              <ul className="list-disc pl-5 space-y-1 text-[11px] text-emerald-800 leading-relaxed">
                <li>
                  <strong>Khi nào được hoàn tiền:</strong> Hoàn tiền 100% về ví trong vòng 24h nếu đơn hàng không tìm được xe phù hợp hoặc tài xế hủy nhận đơn trước giờ lấy hàng.
                </li>
                <li>
                  <strong>Cơ chế bảo vệ 7 ngày:</strong> Tiền cước và cọc được tạm giữ bảo đảm an toàn tối đa 7 ngày trong trường hợp phát sinh khiếu nại chất lượng hàng hóa để hội đồng đối soát làm việc trước khi giải ngân.
                </li>
                <li>
                  <strong>Bảo mật SĐT:</strong> Số điện thoại chỉ hiển thị khi cả 2 bên đã hoàn tất khóa cọc và tiền cước an toàn trong Escrow.
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Navigation Step Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="px-5 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50 flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" /> Quay lại
            </button>
          ) : (
            <div></div>
          )}

          {step < 4 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm"
            >
              Tiếp tục <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-8 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold shadow-md flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" /> Đăng đơn lên Sàn ngay
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
