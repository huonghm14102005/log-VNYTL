"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { formatVND } from "@/lib/currency";
import {
  MapPin,
  Truck,
  Navigation,
  CheckCircle2,
  Clock,
  RotateCcw,
  ShieldCheck,
  Camera,
} from "lucide-react";

export const MapView: React.FC = () => {
  const { selectedOrder, updateLocationStep, submitPod, showToast, role } = useApp();

  const [simulatedKm, setSimulatedKm] = useState(55);
  const [showPodModal, setShowPodModal] = useState(false);
  const [receiverName, setReceiverName] = useState("Nguyễn Văn Minh (Thủ kho Đông Anh)");

  const order = selectedOrder || {
    orderCode: "FT202609180023",
    originCity: "Hải Phòng",
    originAddress: "Cảng Đình Vũ, Đông Hải 2, Hải An, Hải Phòng",
    destCity: "Hà Nội",
    destAddress: "KCN Thăng Long, Đông Anh, Hà Nội",
    distanceKm: 120,
    cargoName: "Máy móc công nghiệp",
    cargoWeightKg: 8000,
    vehicleTypeRequired: "Xe tải thùng",
    freightPrice: 3500000,
    pickupTime: "18/09/2026 - 08:00",
    deliveryTime: "18/09/2026 - 14:00",
    status: "IN_TRANSIT",
  };

  const progressPercent = Math.min(100, Math.round((simulatedKm / 120) * 100));

  const handleStepLocation = () => {
    const next = Math.min(120, simulatedKm + 25);
    setSimulatedKm(next);
    if (selectedOrder) updateLocationStep(selectedOrder.id);
    if (next >= 120) {
      showToast("Xe đã tới điểm giao hàng tại Hà Nội! Mời tài xế chụp ảnh nghiệm thu e-POD.");
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header bar matching image1.png */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Navigation className="w-5 h-5 text-blue-600" />
            Bản đồ hành trình thời gian thực (GPS Live Tracking)
          </h2>
          <p className="text-xs text-slate-500">Giám sát xe tải trên hành lang cao tốc Hà Nội - Hải Phòng</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleStepLocation}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-all"
          >
            <Truck className="w-3.5 h-3.5" />
            Mô phỏng xe chạy (+25 km)
          </button>

          {simulatedKm >= 120 && (
            <button
              onClick={() => setShowPodModal(true)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-all animate-pulse"
            >
              <Camera className="w-3.5 h-3.5" />
              Nộp ảnh e-POD & Chữ ký
            </button>
          )}
        </div>
      </div>

      {/* Main Split Layout matching Screen 5 in image1.png */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Chi tiết hành trình matching image1.png (5 Cols) */}
        <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <p className="text-xs text-slate-400 font-medium">Chi tiết hành trình</p>
              <h3 className="text-base font-extrabold text-slate-900">#{order.orderCode}</h3>
            </div>
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700">
              {simulatedKm >= 120 ? "Đã đến điểm giao" : "Đang vận chuyển"}
            </span>
          </div>

          {/* Stepper Timeline Points matching image1.png */}
          <div className="space-y-4 relative pl-6 border-l-2 border-dashed border-blue-300 ml-2">
            {/* Origin */}
            <div className="relative">
              <span className="w-4 h-4 rounded-full bg-emerald-500 border-2 border-white ring-2 ring-emerald-200 absolute -left-[33px] top-0.5"></span>
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-800">{order.originCity}</h4>
                <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                  Đã lấy hàng
                </span>
              </div>
              <p className="text-xs text-slate-500">{order.originAddress}</p>
              <p className="text-[11px] text-slate-400 mt-0.5">08:00 - 18/09/2026</p>
            </div>

            {/* Destination */}
            <div className="relative pt-3">
              <span className="w-4 h-4 rounded-full bg-red-500 border-2 border-white ring-2 ring-red-200 absolute -left-[33px] top-3.5"></span>
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-800">{order.destCity}</h4>
                <span className="text-[11px] font-semibold text-slate-500">
                  {simulatedKm >= 120 ? "Đã tới" : `Còn ${120 - simulatedKm} km`}
                </span>
              </div>
              <p className="text-xs text-slate-500">{order.destAddress}</p>
              <p className="text-[11px] text-slate-400 mt-0.5">14:00 - 18/09/2026</p>
            </div>
          </div>

          {/* Progress Bar matching image1.png */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700">
                Đã đi {simulatedKm} km / 120 km
              </span>
              <span className="font-bold text-blue-600">
                {simulatedKm >= 120 ? "Đến nơi" : "Thời gian còn lại: 1 giờ 30 phút"}
              </span>
            </div>
            <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>

          {/* Thông tin chuyến box */}
          <div className="space-y-2.5 text-xs border-t border-slate-100 pt-3">
            <div className="flex justify-between text-slate-600">
              <span className="text-slate-400">Hàng hóa:</span>
              <span className="font-semibold text-slate-800">{order.cargoName}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span className="text-slate-400">Trọng lượng:</span>
              <span className="font-semibold text-slate-800">{order.cargoWeightKg.toLocaleString()} kg</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span className="text-slate-400">Loại xe:</span>
              <span className="font-semibold text-slate-800">{order.vehicleTypeRequired}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span className="text-slate-400">Cước vận chuyển:</span>
              <span className="font-extrabold text-blue-600">{formatVND(order.freightPrice)}</span>
            </div>
          </div>

          {/* Action button matching image1.png */}
          <button
            onClick={() => showToast("Đang kết nối điều hướng Google Maps / OSRM")}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
          >
            <Navigation className="w-4 h-4" />
            Chỉ đường dẫn đường
          </button>
        </div>

        {/* Right Column: Stylized Live Route Map matching Screen 5 in image1.png (7 Cols) */}
        <div className="lg:col-span-7 bg-slate-100 rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden relative min-h-[480px] flex flex-col">
          {/* Map Top Controls matching image1.png */}
          <div className="absolute top-4 right-4 z-10 flex gap-2">
            <span className="bg-white/95 backdrop-blur-md px-3 py-1 rounded-xl text-xs font-bold text-slate-700 shadow-sm border border-slate-200">
              Bản đồ
            </span>
            <span className="bg-white/70 backdrop-blur-md px-3 py-1 rounded-xl text-xs font-medium text-slate-500 shadow-sm hover:bg-white cursor-pointer">
              Vệ tinh
            </span>
          </div>

          {/* Map Visualization SVG (Hải Phòng -> Hải Dương -> Hà Nội) */}
          <div className="flex-1 w-full h-full bg-[#E2E8F0] relative overflow-hidden flex items-center justify-center p-6">
            {/* Background Grid Lines representing map roads */}
            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:16px_16px]"></div>

            <svg viewBox="0 0 600 400" className="w-full h-full max-w-xl max-h-96 drop-shadow-md">
              {/* Route Road CT04 */}
              <path
                d="M 500,320 C 380,310 320,200 120,100"
                fill="none"
                stroke="#94A3B8"
                strokeWidth="12"
                strokeLinecap="round"
              />
              <path
                d="M 500,320 C 380,310 320,200 120,100"
                fill="none"
                stroke="#2563EB"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray="8 4"
              />

              {/* Pin 1: Hải Phòng */}
              <g transform="translate(500, 320)">
                <circle r="14" fill="#10B981" opacity="0.3" />
                <circle r="8" fill="#10B981" />
                <text x="16" y="5" fill="#0F172A" fontSize="13" fontWeight="bold">
                  Hải Phòng (Kho Đình Vũ)
                </text>
              </g>

              {/* Pin 2: Hải Dương (Waypoint) */}
              <g transform="translate(310, 205)">
                <circle r="5" fill="#3B82F6" />
                <text x="-40" y="-12" fill="#64748B" fontSize="11" fontWeight="semibold">
                  Hải Dương (55 km)
                </text>
              </g>

              {/* Pin 3: Hà Nội */}
              <g transform="translate(120, 100)">
                <circle r="16" fill="#EF4444" opacity="0.3" />
                <circle r="9" fill="#EF4444" />
                <text x="-130" y="-10" fill="#0F172A" fontSize="13" fontWeight="bold">
                  Hà Nội (KCN Thăng Long)
                </text>
              </g>

              {/* Moving Truck Icon */}
              {simulatedKm < 120 ? (
                <g transform={`translate(${500 - (simulatedKm / 120) * 380}, ${320 - (simulatedKm / 120) * 220})`}>
                  <circle r="20" fill="#2563EB" opacity="0.2" className="animate-ping" />
                  <rect x="-16" y="-12" width="32" height="24" rx="6" fill="#1E293B" stroke="#FFFFFF" strokeWidth="2" />
                  <g transform="translate(-10, -9) scale(0.85)">
                    <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M15 18H9" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M19 18h2a1 1 0 0 0 1-1v-5.28a1 1 0 0 0-.29-.7l-3.42-3.43a1 1 0 0 0-.71-.29H14v10.7" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="7" cy="18" r="2" fill="none" stroke="#FFFFFF" strokeWidth="2" />
                    <circle cx="17" cy="18" r="2" fill="none" stroke="#FFFFFF" strokeWidth="2" />
                  </g>
                </g>
              ) : (
                <g transform="translate(120, 100)">
                  <rect x="-24" y="-36" width="60" height="24" rx="6" fill="#10B981" stroke="#FFFFFF" strokeWidth="2" />
                  <text x="-18" y="-20" fill="#FFFFFF" fontSize="11" fontWeight="bold">ĐÃ TỚI NƠI</text>
                </g>
              )}
            </svg>

            {/* Bottom Floating Stats on Map */}
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-xl border border-slate-200 text-xs shadow-md space-y-1">
              <div className="flex items-center gap-2 font-bold text-slate-800">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Tốc độ di chuyển: 62 km/h
              </div>
              <p className="text-slate-500 text-[11px]">Đang lưu thông trên Cao tốc Hà Nội - Hải Phòng</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Nộp ảnh e-POD */}
      {showPodModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-100">
            <div className="flex items-center gap-3 text-emerald-600">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                <Camera className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Biên Bản Giao Nhận Điện Tử (e-POD)</h3>
            </div>

            <p className="text-xs text-slate-600">
              Xe đã đến kho nhận hàng tại Hà Nội. Tài xế vui lòng tải ảnh chụp kiện hàng đã dỡ xuống và ghi tên người ký nhận để hoàn tất cuốc xe.
            </p>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Tên người nhận tại kho:</label>
                <input
                  type="text"
                  value={receiverName}
                  onChange={(e) => setReceiverName(e.target.value)}
                  className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-slate-800 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Ảnh chụp kiện hàng tại điểm giao:</label>
                <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 text-center bg-slate-50">
                  <img
                    src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=300&auto=format&fit=crop&q=80"
                    alt="POD Demo"
                    className="w-full h-32 object-cover rounded-lg mb-2"
                  />
                  <span className="text-emerald-600 font-bold text-[11px] flex items-center justify-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Đã đính kèm ảnh có gắn tọa độ GPS (Đông Anh)
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowPodModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-100"
              >
                Đóng
              </button>
              <button
                onClick={() => {
                  if (selectedOrder) submitPod(selectedOrder.id, receiverName, "");
                  setShowPodModal(false);
                }}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm"
              >
                Xác nhận nộp e-POD
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
