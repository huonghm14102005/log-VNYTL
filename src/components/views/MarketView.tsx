"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { formatVND } from "@/lib/currency";
import {
  Search,
  RotateCcw,
  SlidersHorizontal,
  Sparkles,
  Zap,
  MapPin,
  Calendar,
  Truck,
  ShieldCheck,
  ChevronRight,
  Flame,
  Package,
  Scale,
  ArrowRight,
  Lightbulb,
} from "lucide-react";

export const MarketView: React.FC = () => {
  const { orders, setSelectedOrder, setActiveTab } = useApp();

  const [fromCity, setFromCity] = useState("Hải Phòng");
  const [toCity, setToCity] = useState("Hà Nội");
  const [filterType, setFilterType] = useState<"ALL" | "AI_MATCHED" | "URGENT">("ALL");
  const [weightLimit, setWeightLimit] = useState(15);

  const filteredOrders = orders.filter((order) => {
    if (filterType === "AI_MATCHED" && !order.isReturnTripMatch) return false;
    if (filterType === "URGENT" && order.urgencyLevel !== "URGENT") return false;
    if (fromCity && !order.originCity.toLowerCase().includes(fromCity.toLowerCase())) return false;
    if (toCity && !order.destCity.toLowerCase().includes(toCity.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Top Search Filter Bar matching image1.png */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <Search className="w-5 h-5 text-blue-600" />
            Tìm chuyến hàng (Sàn kết nối vận tải hai chiều)
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilterType("AI_MATCHED")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filterType === "AI_MATCHED"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-blue-50 text-blue-600 hover:bg-blue-100"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              Đề xuất xe về rỗng (Tiết kiệm 25%)
            </button>
            <button
              onClick={() => setFilterType("URGENT")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filterType === "URGENT"
                  ? "bg-red-600 text-white shadow-sm"
                  : "bg-red-50 text-red-600 hover:bg-red-100"
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              Đơn Cần Đi Gấp
            </button>
          </div>
        </div>

        {/* Input Bar 4 fields matching image1.png */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div className="relative">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Điểm đi
            </span>
            <div className="relative">
              <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={fromCity}
                onChange={(e) => setFromCity(e.target.value)}
                placeholder="Hải Phòng..."
                className="w-full bg-slate-50 text-sm font-semibold text-slate-800 pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:border-blue-500 focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          <div className="relative">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Điểm đến
            </span>
            <div className="relative">
              <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={toCity}
                onChange={(e) => setToCity(e.target.value)}
                placeholder="Hà Nội..."
                className="w-full bg-slate-50 text-sm font-semibold text-slate-800 pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:border-blue-500 focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Loại xe
            </span>
            <select className="w-full bg-slate-50 text-sm font-semibold text-slate-800 px-3 py-2 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none">
              <option>Tất cả các loại xe</option>
              <option>Xe tải thùng kín</option>
              <option>Xe tải mui bạt</option>
              <option>Xe Container</option>
            </select>
          </div>

          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Thời gian
            </span>
            <select className="w-full bg-slate-50 text-sm font-semibold text-slate-800 px-3 py-2 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none">
              <option>Trong 7 ngày</option>
              <option>Hôm nay (Gấp)</option>
              <option>Ngày mai</option>
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={() => {
              setFromCity("");
              setToCity("");
              setFilterType("ALL");
            }}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 px-4 py-2 rounded-xl hover:bg-slate-100 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Đặt lại
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-6 py-2 rounded-xl shadow-sm transition-all">
            Tìm kiếm
          </button>
        </div>
      </div>

      {/* 2. Main Grid: Left Filter (3 Cols) + Right List (9 Cols) matching image1.png */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Filter Panel matching image1.png */}
        <div className="lg:col-span-3 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-6 h-fit">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-blue-600" />
              Bộ lọc
            </h3>
            <span className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer">
              Xóa lọc
            </span>
          </div>

          {/* Loại hàng */}
          <div className="space-y-2">
            <p className="text-xs font-bold text-slate-700">Loại hàng</p>
            {[
              "Hàng tiêu dùng",
              "Máy móc thiết bị",
              "Vật liệu xây dựng",
              "Nông sản",
              "Khác",
            ].map((label, i) => (
              <label key={i} className="flex items-center gap-2.5 text-xs text-slate-600 hover:text-slate-900 cursor-pointer">
                <input type="checkbox" defaultChecked={i < 2} className="rounded text-blue-600 focus:ring-0" />
                <span>{label}</span>
              </label>
            ))}
          </div>

          {/* Loại xe */}
          <div className="space-y-2 border-t border-slate-100 pt-4">
            <p className="text-xs font-bold text-slate-700">Loại xe</p>
            {[
              "Xe tải thùng",
              "Container",
              "Đầu kéo",
              "Xe chuyên dụng",
            ].map((label, i) => (
              <label key={i} className="flex items-center gap-2.5 text-xs text-slate-600 hover:text-slate-900 cursor-pointer">
                <input type="checkbox" defaultChecked={i === 0} className="rounded text-blue-600 focus:ring-0" />
                <span>{label}</span>
              </label>
            ))}
          </div>

          {/* Trọng lượng slider */}
          <div className="space-y-2 border-t border-slate-100 pt-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold text-slate-700">Trọng lượng (tấn)</p>
              <span className="text-xs font-extrabold text-blue-600">{weightLimit} tấn</span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              value={weightLimit}
              onChange={(e) => setWeightLimit(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
              <span>0</span>
              <span>25 tấn</span>
              <span>50 tấn</span>
            </div>
          </div>
        </div>

        {/* Right List of Cargo Orders matching image1.png */}
        <div className="lg:col-span-9 space-y-4">
          <div className="flex items-center justify-between px-1">
            <p className="text-sm font-semibold text-slate-600">
              Tìm thấy <strong className="text-blue-600">{filteredOrders.length}</strong> chuyến hàng phù hợp
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <span>Sắp xếp:</span>
              <select className="bg-transparent font-bold text-slate-800 focus:outline-none cursor-pointer">
                <option>Độ khớp tối ưu nhất</option>
                <option>Cước cao nhất</option>
                <option>Thời gian gần nhất</option>
              </select>
            </div>
          </div>

          {/* Cards */}
          <div className="space-y-3.5">
            {filteredOrders.map((order) => {
              const isUrgent = order.urgencyLevel === "URGENT";

              return (
                <div
                  key={order.id}
                  className={`bg-white p-5 rounded-2xl border transition-all duration-150 hover:shadow-md ${
                    isUrgent
                      ? "border-red-300 ring-1 ring-red-100 bg-red-50/20"
                      : order.isReturnTripMatch
                      ? "border-blue-300 ring-1 ring-blue-100 bg-blue-50/10"
                      : "border-slate-200/90"
                  }`}
                >
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    {/* Route & Tags */}
                    <div className="space-y-2 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="text-base font-extrabold text-slate-900 flex items-center gap-1.5">
                          <span>{order.originCity}</span>
                          <ArrowRight className="w-4 h-4 text-blue-600 inline shrink-0" />
                          <span>{order.destCity}</span>
                        </h4>

                        {/* Badges matching image1.png */}
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-cyan-100 text-cyan-800 border border-cyan-200">
                          Còn 2 chỗ
                        </span>

                        {order.matchScore && (
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800 border border-blue-200 flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-amber-500" />
                            Khớp tuyến {order.matchScore}%
                          </span>
                        )}

                        {isUrgent && (
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-red-100 text-red-700 border border-red-200 flex items-center gap-1">
                            <Zap className="w-3 h-3 fill-red-600 text-red-600" />
                            CẦN ĐI GẤP
                          </span>
                        )}
                      </div>

                      {/* Cargo specifics */}
                      <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-500 font-medium">
                        <span className="flex items-center gap-1">
                          <Package className="w-3.5 h-3.5 text-slate-400" />
                          {order.cargoName}
                        </span>
                        <span className="flex items-center gap-1">
                          <Scale className="w-3.5 h-3.5 text-slate-400" />
                          {order.cargoWeightKg / 1000} tấn
                        </span>
                        <span className="flex items-center gap-1">
                          <Truck className="w-3.5 h-3.5 text-slate-400" />
                          {order.vehicleTypeRequired}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          {order.distanceKm} km
                        </span>
                      </div>

                      {/* Timeline */}
                      <div className="text-xs text-slate-600 flex items-center gap-3">
                        <span>Nhận: {order.pickupTime}</span>
                        <span>•</span>
                        <span>Giao: {order.deliveryTime}</span>
                      </div>

                      {order.matchReason && (
                        <p className="text-xs text-blue-700 bg-blue-50/80 p-2 rounded-lg font-medium border border-blue-100 flex items-center gap-1.5">
                          <Lightbulb className="w-4 h-4 text-amber-500 shrink-0" />
                          <span><strong>Gợi ý hệ thống:</strong> {order.matchReason}</span>
                        </p>
                      )}
                    </div>

                    {/* Price & CTA Button matching image1.png */}
                    <div className="text-left md:text-right shrink-0 w-full md:w-auto flex md:flex-col justify-between items-end gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                      <div>
                        <span className="text-[11px] text-slate-400 block">Cước vận chuyển</span>
                        <p className="text-xl font-extrabold text-blue-600">
                          {formatVND(order.freightPrice)}
                        </p>
                        <span className="text-[10px] text-slate-400 block">(Có thể thương lượng)</span>
                      </div>

                      <button
                        onClick={() => {
                          setSelectedOrder(order);
                          setActiveTab("order-detail");
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-sm flex items-center gap-1.5"
                      >
                        Xem chi tiết
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
