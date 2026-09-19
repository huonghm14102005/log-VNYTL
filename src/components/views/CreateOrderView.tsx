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
} from "lucide-react";

export const CreateOrderView: React.FC = () => {
  const { createOrder, setActiveTab, setSelectedOrder } = useApp();

  const [step, setStep] = useState(1);
  const [aiPrompt, setAiPrompt] = useState("");

  // Form states
  const [originCity, setOriginCity] = useState("Hải Phòng");
  const [originAddress, setOriginAddress] = useState("Kho Thép Cảng Đình Vũ, Hải An, Hải Phòng");
  const [destCity, setDestCity] = useState("Hà Nội");
  const [destAddress, setDestAddress] = useState("Tổng kho kim khí KCN Thăng Long, Đông Anh, Hà Nội");
  const [cargoName, setCargoName] = useState("8 Tấn Cuộn Thép Công Nghiệp");
  const [cargoType, setCargoType] = useState("Kim loại / Vật liệu nặng");
  const [cargoWeightKg, setCargoWeightKg] = useState(8000);
  const [vehicleType, setVehicleType] = useState("Xe tải thùng");
  const [declaredValue, setDeclaredValue] = useState(200000000); // 200tr
  const [freightPrice, setFreightPrice] = useState(3800000); // 3.8tr
  const [servicePackage, setServicePackage] = useState<"STANDARD" | "SUPERVISED" | "INSURED">("SUPERVISED");
  const [urgencyLevel, setUrgencyLevel] = useState<"NORMAL" | "URGENT" | "FLEXIBLE">("URGENT");

  // Tính cọc yêu cầu: 10% giá trị khai báo, tối đa trần 5tr
  const requiredDeposit = Math.min(5000000, Math.max(300000, declaredValue * 0.1));

  // AI Prompt Auto-fill demo
  const handleApplyAiPrompt = (sampleText: string) => {
    setAiPrompt(sampleText);
    setOriginCity("Hải Phòng");
    setOriginAddress("Kho Thép Cảng Đình Vũ, Hải Phòng");
    setDestCity("Hà Nội");
    setDestAddress("Tổng kho KCN Thăng Long, Hà Nội");
    setCargoName("8 Tấn Cuộn Thép Công Nghiệp");
    setCargoWeightKg(8000);
    setVehicleType("Xe tải thùng");
    setDeclaredValue(200000000);
    setFreightPrice(3800000);
    setUrgencyLevel("URGENT");
    setServicePackage("SUPERVISED");
    setStep(4); // Nhảy ngay tới bước 4 để xem lại
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
      vehicleTypeRequired: vehicleType,
      declaredValue,
      freightPrice,
      requiredDeposit,
      servicePackage,
      urgencyLevel,
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

      {/* AI Quick Input Box (Tính năng ghi điểm VYLT 2026) */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl p-5 text-white shadow-md space-y-3">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300">
            <Sparkles className="w-4 h-4 text-amber-300" />
            Nhập nhanh bằng Trợ lý AI (NLP Prompt)
          </span>
          <span className="text-[11px] text-blue-100 font-medium">1 chạm điền tự động</span>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            placeholder="Ví dụ: Cần xe 10 tấn chở 8 tấn cuộn thép từ Đình Vũ Hải Phòng về KCN Thăng Long Hà Nội chiều nay, giá 3.8tr..."
            className="flex-1 bg-white/10 text-white placeholder-blue-200 text-xs px-3.5 py-2.5 rounded-xl border border-white/20 focus:outline-none focus:bg-white/20"
          />
          <button
            onClick={() => handleApplyAiPrompt(aiPrompt || "Cần xe 10 tấn chở 8 tấn cuộn thép từ Đình Vũ Hải Phòng về KCN Thăng Long Hà Nội chiều nay, giá 3.8tr")}
            className="bg-amber-400 hover:bg-amber-300 text-slate-900 text-xs font-extrabold px-4 py-2.5 rounded-xl transition-all shadow-sm shrink-0"
          >
            Phân tích & Điền form
          </button>
        </div>

        {/* Mẫu thử nghiệm 1 chạm */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px]">
          <span className="text-blue-200">Gợi ý mẫu demo:</span>
          <button
            onClick={() =>
              handleApplyAiPrompt(
                "Hải Phòng về Hà Nội, 8 tấn thép cuộn, cần xe gấp chiều nay, giá 3.800.000đ"
              )
            }
            className="bg-white/15 hover:bg-white/25 px-2.5 py-1 rounded-lg border border-white/20 text-white transition-all text-left"
          >
            🎯 Tuyến Hải Phòng ➔ Hà Nội (8 tấn thép, xe gấp, 3.8tr)
          </button>
        </div>
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
                  className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-slate-800"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-700">Điểm giao hàng (Tỉnh/Thành):</label>
                <input
                  type="text"
                  value={destCity}
                  onChange={(e) => setDestCity(e.target.value)}
                  className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-slate-800"
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
                        ? "border-red-500 bg-red-50 text-red-700 font-bold"
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
                        ? "border-blue-500 bg-blue-50 text-blue-700 font-bold"
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
                        ? "border-emerald-500 bg-emerald-50 text-emerald-700 font-bold"
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

        {/* Step 2: Hàng hóa */}
        {step === 2 && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <Package className="w-4 h-4 text-blue-600" />
              Thông tin hàng hóa & Khai báo giá trị
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1.5 md:col-span-2">
                <label className="font-bold text-slate-700">Tên mặt hàng:</label>
                <input
                  type="text"
                  value={cargoName}
                  onChange={(e) => setCargoName(e.target.value)}
                  className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-slate-800"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-700">Trọng lượng (kg):</label>
                <input
                  type="number"
                  value={cargoWeightKg}
                  onChange={(e) => setCargoWeightKg(Number(e.target.value))}
                  className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-slate-800"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-700">Giá trị hàng hóa khai báo (VNĐ):</label>
                <input
                  type="number"
                  value={declaredValue}
                  onChange={(e) => setDeclaredValue(Number(e.target.value))}
                  className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-slate-800"
                />
              </div>

              {/* Box cảnh báo cọc tài xế theo Bảng J */}
              <div className="md:col-span-2 p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 space-y-1">
                <p className="font-bold flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  Quy định ký quỹ Escrow:
                </p>
                <p className="text-[11px] leading-relaxed">
                  Giá trị hàng khai báo là <strong>{formatVND(declaredValue)}</strong>. Tiền cọc trách nhiệm của tài xế sẽ tính bằng 10% (trần tối đa 5.000.000đ) ➔ Cọc tài xế cần nộp: <strong className="text-blue-700 font-extrabold">{formatVND(requiredDeposit)}</strong>.
                </p>
              </div>

              <div className="md:col-span-2 pt-2">
                <label className="flex items-center gap-2 text-slate-700 font-medium cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded text-blue-600" />
                  <span>Cam kết kiện hàng không chứa danh mục hàng cấm hoặc chất gây cháy nổ theo quy định pháp luật.</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Xe & Gói dịch vụ */}
        {step === 3 && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <Truck className="w-4 h-4 text-blue-600" />
              Yêu cầu loại xe & Gói bảo đảm hàng hóa
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Loại phương tiện mong muốn:</label>
                <select
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value)}
                  className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-slate-800 font-semibold"
                >
                  <option>Xe tải thùng kín (10 tấn)</option>
                  <option>Xe tải mui bạt (15 tấn)</option>
                  <option>Xe Container 40 feet</option>
                  <option>Xe đông lạnh chuyên dụng</option>
                </select>
              </div>

              {/* 3 Gói dịch vụ chính thức theo tài liệu MVP.md */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <label className="font-bold text-slate-700 block">Chọn gói bảo đảm hàng hóa:</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div
                    onClick={() => setServicePackage("STANDARD")}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      servicePackage === "STANDARD"
                        ? "border-blue-600 bg-blue-50/50 shadow-xs"
                        : "border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <p className="font-bold text-slate-900 text-sm">Gói Tiêu Chuẩn</p>
                    <p className="text-[11px] text-slate-500 mt-1">Cước giữ Escrow, tài xế cọc, ảnh e-POD khi giao hàng.</p>
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
                      GPS trực tiếp, chụp ảnh hàng định kỳ mỗi 2h (chia 60% phụ phí cho tài xế).
                    </p>
                    <span className="text-xs font-bold text-blue-600 mt-2 block">+ 15% cước</span>
                  </div>

                  <div
                    onClick={() => setServicePackage("INSURED")}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      servicePackage === "INSURED"
                        ? "border-blue-600 bg-blue-50/50 shadow-xs"
                        : "border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <p className="font-bold text-slate-900 text-sm">Gói Toàn Diện</p>
                    <p className="text-[11px] text-slate-500 mt-1">Bồi thường 100% giá trị khai báo thông qua quỹ dự phòng sàn.</p>
                    <span className="text-xs font-bold text-purple-600 mt-2 block">+ 1.2% giá trị hàng</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Xem lại & Xác nhận */}
        {step === 4 && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Tổng quan chi phí & Đăng đơn lên sàn
            </h3>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Tuyến vận chuyển:</span>
                <span className="font-extrabold text-slate-900">{originCity} ➔ {destCity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Mặt hàng:</span>
                <span className="font-semibold text-slate-800">{cargoName} ({cargoWeightKg / 1000} tấn)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Cước thỏa thuận:</span>
                <span className="font-extrabold text-blue-600 text-base">{formatVND(freightPrice)}</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-2">
                <span className="text-slate-500">Tiền cọc tài xế cần nộp:</span>
                <span className="font-bold text-slate-800">{formatVND(requiredDeposit)}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-100 text-xs text-blue-800">
              💡 <strong>Thuật toán Ghép cặp AI:</strong> Sau khi đăng, hệ thống sẽ tự động quét danh sách các chuyến xe tải về rỗng và đề xuất cho các tài xế uy tín đang dừng tại {originCity}!
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
