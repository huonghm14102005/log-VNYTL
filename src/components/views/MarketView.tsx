"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { formatVND } from "@/lib/currency";
import { MiniMarketMap } from "@/components/MiniMarketMap";
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
  Box,
  Boxes,
  Snowflake,
  Droplet,
  Layers,
  Construction,
  Repeat,
  Map,
} from "lucide-react";

export const MarketView: React.FC = () => {
  const { orders, setSelectedOrder, setActiveTab, selectedOrder, role } = useApp();

  const isShipper = role === "SHIPPER";
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [filterType, setFilterType] = useState<"ALL" | "AI_MATCHED" | "URGENT">("ALL");
  const [weightLimit, setWeightLimit] = useState(35);
  const [showMiniMap, setShowMiniMap] = useState(true);
  const [hoveredOrderId, setHoveredOrderId] = useState<string | null>(null);
  
  // State Loại hàng
  const [isContainerCargo, setIsContainerCargo] = useState(false);
  const [containerTypes, setContainerTypes] = useState<string[]>(["Cont 40ft HC (Cao)"]);
  const [isOtherCargo, setIsOtherCargo] = useState(false);
  const [otherCargoText, setOtherCargoText] = useState("");

  // State Loại xe chuyên dụng
  const [isSpecialized, setIsSpecialized] = useState(false);
  const [specializedTypes, setSpecializedTypes] = useState<string[]>(["Xe bồn (Xitec chất lỏng/xăng dầu)"]);
  const [specializedNote, setSpecializedNote] = useState("");

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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Search className="w-5 h-5 text-blue-600" />
              {isShipper ? "Sàn Xe Về Rỗng & Đội Xe Đối Tác" : "Tìm chuyến hàng (Sàn kết nối vận tải hai chiều)"}
            </h2>
            <p className="text-xs text-slate-500">
              {isShipper
                ? "Kết nối trực tiếp xe đầu kéo container / xe chuyên dụng chiều về rỗng để tối ưu 20-30% cước"
                : "Tìm chuyến hàng phù hợp tải trọng xe đầu kéo và xe tải nặng của bạn"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilterType(filterType === "AI_MATCHED" ? "ALL" : "AI_MATCHED")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filterType === "AI_MATCHED"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-blue-50 text-blue-600 hover:bg-blue-100"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              {isShipper ? "Xe về rỗng trợ giá (-25%)" : "Đề xuất xe về rỗng (Tiết kiệm 25%)"}
            </button>
            <button
              onClick={() => setFilterType(filterType === "URGENT" ? "ALL" : "URGENT")}
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

        {/* Input Bar 3 core logistics fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="relative">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Điểm đi (Lấy hàng)
            </span>
            <div className="relative">
              <MapPin className="w-4 h-4 text-blue-600 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={fromCity}
                onChange={(e) => setFromCity(e.target.value)}
                placeholder="Hải Phòng, Cảng Đình Vũ..."
                className="w-full bg-slate-50 text-sm font-semibold text-slate-800 pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:border-blue-500 focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          <div className="relative">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Điểm đến (Giao hàng)
            </span>
            <div className="relative">
              <MapPin className="w-4 h-4 text-emerald-600 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={toCity}
                onChange={(e) => setToCity(e.target.value)}
                placeholder="Hà Nội, Bắc Ninh..."
                className="w-full bg-slate-50 text-sm font-semibold text-slate-800 pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:border-blue-500 focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Thời gian khởi hành
            </span>
            <div className="relative">
              <Calendar className="w-4 h-4 text-amber-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select className="w-full bg-slate-50 text-sm font-semibold text-slate-800 pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none cursor-pointer">
                <option>Trong 7 ngày tới</option>
                <option>Hôm nay (Cần đi gấp)</option>
                <option>Ngày mai</option>
                <option>Cuối tuần này</option>
              </select>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={() => {
              setFromCity("");
              setToCity("");
              setFilterType("ALL");
              setIsSpecialized(false);
              setSpecializedNote("");
            }}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 px-4 py-2 rounded-xl hover:bg-slate-100 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Đặt lại
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-6 py-2 rounded-xl shadow-sm transition-all">
            Tìm kiếm chuyến
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
              Bộ lọc nâng cao
            </h3>
            <button
              onClick={() => {
                setIsSpecialized(false);
                setSpecializedNote("");
              }}
              className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer"
            >
              Xóa lọc
            </button>
          </div>

          {/* 1. Nhóm Bộ lọc: Loại hàng */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold text-slate-800">Loại hàng hóa</p>
              <span className="text-[10px] text-slate-400">Đa chọn</span>
            </div>

            <div className="space-y-2">
              {[
                { id: "fmcg", label: "Hàng tiêu dùng bách hóa" },
                { id: "machinery", label: "Máy móc thiết bị công nghiệp" },
                { id: "building", label: "Vật liệu xây dựng" },
                { id: "agri", label: "Nông sản & Thực phẩm" },
              ].map((cargo) => (
                <label key={cargo.id} className="flex items-center gap-2.5 text-xs text-slate-600 hover:text-slate-900 cursor-pointer">
                  <input type="checkbox" defaultChecked={cargo.id === "fmcg"} className="rounded text-blue-600 focus:ring-0" />
                  <span>{cargo.label}</span>
                </label>
              ))}

              {/* Tùy chọn Hàng đóng Container (FCL) */}
              <label className="flex items-center gap-2.5 text-xs font-bold text-blue-900 hover:text-blue-700 cursor-pointer pt-0.5">
                <input 
                  type="checkbox" 
                  checked={isContainerCargo}
                  onChange={(e) => setIsContainerCargo(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-0" 
                />
                <span className="flex items-center gap-1.5">
                 Hàng đóng Container (FCL)
                  <span className="px-1.5 py-0.2 rounded text-[9px] bg-blue-100 text-blue-700 font-extrabold">+ Quy cách Cont</span>
                </span>
              </label>

              {/* Khung quy cách Container mở rộng khi tích chọn */}
              {isContainerCargo && (
                <div className="bg-blue-50/80 border border-blue-200 rounded-xl p-3 space-y-2 animate-fadeIn mt-1.5">
                  <p className="text-[11px] font-bold text-blue-950 flex items-center justify-between">
                    <span>Quy cách vỏ Container:</span>
                    <span className="text-[10px] text-blue-600 font-normal">Chọn nhiều loại</span>
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { label: "Cont 20 feet (20ft)", Icon: Box },
                      { label: "Cont 40ft DC (Tiêu chuẩn)", Icon: Boxes },
                      { label: "Cont 40ft HC (Cao)", Icon: Boxes },
                      { label: "Cont Lạnh (RF)", Icon: Snowflake },
                      { label: "Kéo vỏ Cont rỗng", Icon: Repeat },
                    ].map(({ label, Icon }) => {
                      const isSel = containerTypes.includes(label);
                      return (
                        <button
                          key={label}
                          type="button"
                          onClick={() => {
                            if (isSel) {
                              setContainerTypes(containerTypes.filter((t) => t !== label));
                            } else {
                              setContainerTypes([...containerTypes, label]);
                            }
                          }}
                          className={`text-[10px] px-2 py-1 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
                            isSel
                              ? "bg-blue-600 text-white shadow-2xs"
                              : "bg-white text-slate-700 border border-blue-200 hover:border-blue-400"
                          }`}
                        >
                          <Icon className={`w-3 h-3 ${isSel ? "text-white" : "text-blue-600"}`} />
                          <span>{label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Tùy chọn Loại hàng Khác */}
              <label className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 hover:text-slate-900 cursor-pointer pt-0.5">
                <input 
                  type="checkbox" 
                  checked={isOtherCargo}
                  onChange={(e) => setIsOtherCargo(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-0" 
                />
                <span>Hàng đặc thù khác...</span>
              </label>

              {/* Ô nhập tên hàng khác khi tích chọn */}
              {isOtherCargo && (
                <div className="animate-fadeIn mt-1">
                  <input
                    type="text"
                    value={otherCargoText}
                    onChange={(e) => setOtherCargoText(e.target.value)}
                    placeholder="Ghi rõ tên hàng (VD: Hóa chất, đồ gỗ mỹ nghệ, phế liệu...)"
                    className="w-full text-xs bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-slate-400 font-medium"
                  />
                </div>
              )}
            </div>
          </div>

          {/* 2. Nhóm Bộ lọc: Loại xe (Quy cách phương tiện) */}
          <div className="space-y-3 border-t border-slate-100 pt-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold text-slate-800">Quy cách phương tiện</p>
              <span className="text-[10px] text-slate-400">Đa chọn</span>
            </div>

            <div className="space-y-2">
              {[
                { id: "box", label: "Xe tải thùng kín (Chống nước)" },
                { id: "tarpaulin", label: "Xe tải mui bạt (Linh hoạt)" },
                { id: "tractor", label: "Xe đầu kéo (Kéo sơ mi rơ-moóc / Container)" },
              ].map((truck) => (
                <label key={truck.id} className="flex items-center gap-2.5 text-xs text-slate-600 hover:text-slate-900 cursor-pointer">
                  <input type="checkbox" defaultChecked={truck.id === "box"} className="rounded text-blue-600 focus:ring-0" />
                  <span>{truck.label}</span>
                </label>
              ))}

              {/* Tùy chọn Xe chuyên dụng */}
              <label className="flex items-center gap-2.5 text-xs font-bold text-blue-900 hover:text-blue-700 cursor-pointer pt-0.5">
                <input 
                  type="checkbox" 
                  checked={isSpecialized}
                  onChange={(e) => setIsSpecialized(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-0" 
                />
                <span className="flex items-center gap-1.5">
                  Xe chuyên dụng (Xe bồn, Xe moóc...)
                  <span className="px-1.5 py-0.2 rounded text-[9px] bg-blue-100 text-blue-700 font-extrabold">+ Chi tiết</span>
                </span>
              </label>
            </div>

            {/* Khung cấu hình chi tiết xe chuyên dụng (Xe bồn, Xe mooc) */}
            {isSpecialized && (
              <div className="bg-blue-50/80 border border-blue-200 rounded-xl p-3 space-y-2.5 animate-fadeIn mt-2">
                <p className="text-[11px] font-bold text-blue-950 flex items-center justify-between">
                  <span>Dòng xe chuyên dụng:</span>
                  <span className="text-[10px] text-blue-600 font-normal">Chọn nhiều cấu hình</span>
                </p>

                {/* Các lựa chọn cấu hình có Icon Lucide chuẩn */}
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { label: "Xe bồn (Xitec chất lỏng/xăng dầu)", Icon: Droplet },
                    { label: "Xe moóc (Moóc lùn / Moóc sàn)", Icon: Layers },
                    { label: "Xe cẩu tự hành", Icon: Construction },
                    { label: "Xe đông lạnh (-18°C)", Icon: Snowflake },
                  ].map(({ label, Icon }) => {
                    const isSelected = specializedTypes.includes(label);
                    return (
                      <button
                        key={label}
                        type="button"
                        onClick={() => {
                          if (isSelected) {
                            setSpecializedTypes(specializedTypes.filter((t) => t !== label));
                          } else {
                            setSpecializedTypes([...specializedTypes, label]);
                          }
                        }}
                        className={`text-[10px] px-2 py-1 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
                          isSelected
                            ? "bg-blue-600 text-white shadow-2xs"
                            : "bg-white text-slate-700 border border-blue-200 hover:border-blue-400"
                        }`}
                      >
                        <Icon className={`w-3 h-3 ${isSelected ? "text-white" : "text-blue-600"}`} />
                        <span>{label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Ô nhập thông số chi tiết cho xe bồn / xe mooc */}
                <div>
                  <label className="block text-[10px] font-semibold text-slate-600 mb-1">
                    Ghi rõ yêu cầu xe bồn / xe moóc:
                  </label>
                  <input
                    type="text"
                    value={specializedNote}
                    onChange={(e) => setSpecializedNote(e.target.value)}
                    placeholder="VD: Xe moóc lùn chở máy 40 tấn, Xe bồn inox 15m³ chở sữa tươi..."
                    className="w-full text-xs bg-white border border-blue-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-slate-400 font-medium"
                  />
                </div>
              </div>
            )}
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
          <div className="flex flex-wrap items-center justify-between gap-2 px-1">
            <div className="flex items-center gap-3">
              <p className="text-sm font-semibold text-slate-600">
                Tìm thấy <strong className="text-blue-600">{filteredOrders.length}</strong> chuyến hàng phù hợp
              </p>
              <button
                type="button"
                onClick={() => setShowMiniMap(!showMiniMap)}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  showMiniMap
                    ? "bg-blue-600 text-white shadow-2xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <Map className="w-3.5 h-3.5" />
                {showMiniMap ? "Bản đồ mini: BẬT" : "Hiện bản đồ mini"}
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <span>Sắp xếp:</span>
              <select className="bg-transparent font-bold text-slate-800 focus:outline-none cursor-pointer">
                <option>Độ khớp tối ưu nhất</option>
                <option>Cước cao nhất</option>
                <option>Thời gian gần nhất</option>
              </select>
            </div>
          </div>

          {/* Mini Interactive Logistics Corridor Map */}
          {showMiniMap && (
            <MiniMarketMap
              orders={filteredOrders}
              hoveredOrderId={hoveredOrderId}
              selectedOrderId={selectedOrder?.id}
              selectedCity={fromCity || toCity}
              onSelectCity={(city) => {
                if (city === "Hải Phòng" || city === "Quảng Ninh") {
                  setFromCity(city);
                } else {
                  setToCity(city);
                }
              }}
              onOpenFullMap={() => setActiveTab("map")}
            />
          )}

          {/* Cards */}
          <div className="space-y-3.5">
            {filteredOrders.map((order) => {
              const isUrgent = order.urgencyLevel === "URGENT";
              const isHovered = hoveredOrderId === order.id;

              return (
                <div
                  key={order.id}
                  onMouseEnter={() => setHoveredOrderId(order.id)}
                  onMouseLeave={() => setHoveredOrderId(null)}
                  className={`bg-white p-5 rounded-2xl border transition-all duration-150 ${
                    isHovered
                      ? "ring-2 ring-blue-500 shadow-md border-blue-400 -translate-y-0.5"
                      : isUrgent
                      ? "border-red-300 ring-1 ring-red-100 bg-red-50/20 hover:shadow-md"
                      : order.isReturnTripMatch
                      ? "border-blue-300 ring-1 ring-blue-100 bg-blue-50/10 hover:shadow-md"
                      : "border-slate-200/90 hover:shadow-md"
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
                      <div className="flex flex-wrap items-center gap-y-1.5 gap-x-4 text-xs text-slate-600 font-medium">
                        <span className="flex items-center gap-1 font-semibold text-slate-800">
                          <Package className="w-3.5 h-3.5 text-blue-600" />
                          {order.cargoName}
                        </span>
                        <span className="flex items-center gap-1">
                          <Scale className="w-3.5 h-3.5 text-slate-400" />
                          <strong>{order.cargoWeightKg / 1000} tấn</strong> ({order.cargoWeightKg.toLocaleString()} kg)
                        </span>
                        <span className="flex items-center gap-1 text-blue-700 bg-blue-50 px-2 py-0.5 rounded font-semibold border border-blue-100">
                          <Box className="w-3 h-3 text-blue-600" />
                          {order.cargoVolumeCbm || 18} m³
                        </span>
                        <span className="flex items-center gap-1 text-slate-500">
                          <span className="text-[11px] text-slate-400">KT:</span>
                          <strong>{order.cargoDimensions || "4.5 x 2.2 x 2.0 m"}</strong>
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
                        <span>Nhận hàng: <strong>{order.pickupTime}</strong></span>
                        <span>•</span>
                        <span>Giao hàng: <strong>{order.deliveryTime}</strong></span>
                      </div>

                      {order.driverNotes && (
                        <div className="text-[11px] text-amber-900 bg-amber-50/80 px-2.5 py-1.5 rounded-lg border border-amber-200/80 flex items-center gap-1.5">
                          <span className="font-bold text-amber-700">Lưu ý cho tài xế:</span>
                          <span>{order.driverNotes}</span>
                        </div>
                      )}

                      {order.matchReason && (
                        <p className="text-xs text-blue-700 bg-blue-50/80 p-2 rounded-lg font-medium border border-blue-100 flex items-center gap-1.5">
                          <Lightbulb className="w-4 h-4 text-amber-500 shrink-0" />
                          <span><strong>Gợi ý hệ thống:</strong> {order.matchReason}</span>
                        </p>
                      )}
                    </div>

                    {/* Price & CTA Button matching image1.png */}
                    <div className="text-left md:text-right shrink-0 w-full md:w-auto flex md:flex-col justify-between items-end gap-2.5 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                      <div>
                        <span className="text-[11px] text-slate-400 block">Cước vận chuyển</span>
                        <p className="text-xl font-extrabold text-blue-600">
                          {formatVND(order.freightPrice)}
                        </p>
                        <span className="text-[10px] text-emerald-600 font-semibold block">Cọc Escrow: {formatVND(order.requiredDeposit)}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedOrder(order);
                            setActiveTab("order-detail");
                          }}
                          className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-sm flex items-center gap-1.5"
                        >
                          {isShipper ? "Xem chi tiết & Ghép xe" : "Nhận đơn ngay"}
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
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
