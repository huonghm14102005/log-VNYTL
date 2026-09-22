"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
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

// Dynamically import Leaflet map to avoid SSR window errors in Next.js
const RealLeafletMap = dynamic(
  () => import("@/components/RealLeafletMap").then((m) => m.RealLeafletMap),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[480px] bg-slate-100 rounded-2xl flex flex-col items-center justify-center gap-3 text-slate-500">
        <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xs font-semibold">Đang tải bản đồ số OpenStreetMap...</p>
      </div>
    ),
  }
);

export const MapView: React.FC = () => {
  const { selectedOrder, updateLocationStep, submitPod, showToast, role } = useApp();

  const [simulatedKm, setSimulatedKm] = useState(55);
  const [showPodModal, setShowPodModal] = useState(false);
  const [receiverName, setReceiverName] = useState("Nguyễn Văn Minh (Thủ kho Đông Anh)");

  const order = selectedOrder || {
    orderCode: "FT202609180023",
    originCity: "Hưng Yên",
    originAddress: "Kho Sebang Logistics, KCN Phố Nối A, Hưng Yên",
    destCity: "Hải Phòng",
    destAddress: "Cảng Nam Hải Đình Vũ, Hải An, Hải Phòng",
    distanceKm: 95,
    cargoName: "Cont 40ft Than Viên Nén Xuất Khẩu",
    cargoWeightKg: 26000,
    vehicleTypeRequired: "Xe đầu kéo (Cont 40ft)",
    freightPrice: 5800000,
    pickupTime: "18/09/2026 - 08:00",
    deliveryTime: "18/09/2026 - 13:30",
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
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Navigation className="w-5 h-5 text-blue-600" />
            Bản đồ giám sát hành trình thời gian thực
          </h2>
          <p className="text-xs text-slate-500">Giám sát lộ trình xe tải trên hành lang cao tốc Hà Nội - Hải Phòng</p>
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
              Nộp ảnh biên bản giao hàng
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

        {/* Right Column: Real Interactive GPS Route Map with OpenStreetMap / Satellite (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden min-h-[480px] flex flex-col">
          <RealLeafletMap
            simulatedKm={simulatedKm}
            originCity={order.originCity}
            originAddress={order.originAddress}
            destCity={order.destCity}
            destAddress={order.destAddress}
            orderCode={order.orderCode}
          />
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
