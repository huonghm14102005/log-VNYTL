"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { formatVND } from "@/lib/currency";
import {
  Truck,
  PackageCheck,
  Clock,
  TrendingUp,
  MapPin,
  ChevronRight,
  ArrowUpRight,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export const DashboardView: React.FC = () => {
  const { role, driver, shipper, orders, setActiveTab, setSelectedOrder } = useApp();

  const isDriver = role === "DRIVER";
  const currentUser = isDriver ? driver : shipper;

  const activeOrders = orders.filter(
    (o) => o.status === "IN_TRANSIT" || o.status === "PICKING_UP" || o.status === "WAITING_ESCROW_PAYMENT"
  );

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Welcome Banner matching image1.png */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-lg shadow-blue-500/15 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 z-10 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold text-blue-100">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            Nền tảng vận tải kết nối thông minh VYLT 2026
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Xin chào, {currentUser.fullName}!
          </h2>
          <p className="text-blue-100 text-sm leading-relaxed">
            {isDriver
              ? "Chúc bạn có những chuyến đi an toàn, tối ưu chi phí với các chuyến về rỗng!"
              : "Hệ thống đã tự động quét và tìm thấy 3 xe tải về rỗng có thể giảm tới 25% cước!"}
          </p>
          {!isDriver && (
            <button
              onClick={() => setActiveTab("create-order")}
              className="mt-2 inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold px-4 py-2.5 rounded-xl text-sm transition-all shadow-md"
            >
              + Đăng đơn hàng mới
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Decorative truck graphic */}
        <div className="shrink-0 flex items-center justify-center p-4 bg-white/10 rounded-2xl backdrop-blur-xs border border-white/20">
          <img
            src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=400&auto=format&fit=crop&q=80"
            alt="Truck"
            className="w-48 h-28 object-cover rounded-xl shadow-md"
          />
        </div>
      </div>

      {/* 2. 4 KPI Stat Cards matching image1.png */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <p className="text-xs font-semibold text-slate-500 mb-1">Chuyến hôm nay</p>
          <div className="flex items-baseline justify-between">
            <h3 className="text-2xl font-extrabold text-slate-800">5</h3>
            <span className="text-xs font-semibold text-emerald-600 flex items-center gap-0.5">
              <TrendingUp className="w-3.5 h-3.5" /> +2 so với hôm qua
            </span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <p className="text-xs font-semibold text-slate-500 mb-1">Đang vận chuyển</p>
          <div className="flex items-baseline justify-between">
            <h3 className="text-2xl font-extrabold text-blue-600">2</h3>
            <span className="text-xs font-semibold text-blue-600 flex items-center gap-0.5">
              <Clock className="w-3.5 h-3.5" /> 1 xe sắp tới nơi
            </span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <p className="text-xs font-semibold text-slate-500 mb-1">Đã hoàn thành</p>
          <div className="flex items-baseline justify-between">
            <h3 className="text-2xl font-extrabold text-slate-800">3</h3>
            <span className="text-xs font-semibold text-emerald-600 flex items-center gap-0.5">
              <PackageCheck className="w-3.5 h-3.5" /> 100% đúng hạn
            </span>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <p className="text-xs font-semibold text-slate-500 mb-1">
            {isDriver ? "Thu nhập hôm nay" : "Chi phí vận tải tuần này"}
          </p>
          <div className="flex items-baseline justify-between">
            <h3 className="text-2xl font-extrabold text-emerald-600">
              {isDriver ? "8.500.000đ" : "12.800.000đ"}
            </h3>
            <span className="text-xs font-semibold text-emerald-600 flex items-center gap-0.5">
              <ArrowUpRight className="w-3.5 h-3.5" /> + 1.200.000đ
            </span>
          </div>
        </div>
      </div>

      {/* 3. Main Split Section matching image1.png */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Chuyến hàng đang chạy (7 Cols) */}
        <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                <Truck className="w-5 h-5 text-blue-600" />
                Chuyến hàng đang chạy
              </h3>
              <button
                onClick={() => setActiveTab("my-orders")}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700"
              >
                Xem tất cả
              </button>
            </div>

            {/* Orders list */}
            <div className="space-y-3">
              {activeOrders.slice(0, 2).map((order) => (
                <div
                  key={order.id}
                  className="p-4 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-blue-50/40 hover:border-blue-200 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                      <Truck className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                        {order.originCity} ➔ {order.destCity}
                        <span className="text-xs font-normal text-slate-500">
                          ({order.distanceKm} km)
                        </span>
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {order.cargoName} · {order.cargoWeightKg / 1000} tấn
                      </p>
                      <p className="text-xs font-semibold text-emerald-600 mt-1">
                        Cước: {formatVND(order.freightPrice)}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0 w-full sm:w-auto flex sm:flex-col justify-between sm:justify-center items-end gap-1">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                      {order.status === "IN_TRANSIT" ? "Đang vận chuyển" : "Đang lấy hàng"}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      {order.trackingProgress
                        ? `Còn ${order.distanceKm - order.trackingProgress.completedKm} km`
                        : "Còn 2 giờ"}
                    </span>
                    <button
                      onClick={() => {
                        setSelectedOrder(order);
                        setActiveTab("map");
                      }}
                      className="text-xs font-bold text-blue-600 hover:underline mt-1"
                    >
                      Bản đồ trực tiếp ➔
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1.5 text-emerald-600 font-semibold">
              <ShieldCheck className="w-4 h-4" /> Ký quỹ Escrow bảo vệ an toàn 100%
            </span>
            <span>Cập nhật GPS: Vừa xong</span>
          </div>
        </div>

        {/* Right Column: Doanh thu tuần này with Bar Chart matching image1.png (5 Cols) */}
        <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base font-bold text-slate-800">
                {isDriver ? "Doanh thu tuần này" : "Ngân sách tuần này"}
              </h3>
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-0.5">
                <ArrowUpRight className="w-3.5 h-3.5" /> + 12% so với tuần trước
              </span>
            </div>
            <p className="text-2xl font-extrabold text-slate-900 mb-6">
              {isDriver ? "36.500.000đ" : "28.900.000đ"}
            </p>

            {/* Stylized CSS Bar Chart matching Screen 1 in image1.png */}
            <div className="h-44 flex items-end justify-between gap-3 px-2 pt-4 border-b border-slate-200">
              {[
                { day: "T2", height: "45%", value: "4.2tr" },
                { day: "T3", height: "65%", value: "6.5tr" },
                { day: "T4", height: "50%", value: "5.0tr" },
                { day: "T5", height: "80%", value: "8.1tr" },
                { day: "T6", height: "95%", value: "9.5tr", active: true },
                { day: "T7", height: "35%", value: "3.2tr" },
                { day: "CN", height: "20%", value: "1.8tr" },
              ].map((bar, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 group relative">
                  {/* Tooltip on hover */}
                  <span className="absolute -top-7 text-[10px] font-bold bg-slate-800 text-white px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {bar.value}
                  </span>
                  <div
                    className={`w-full rounded-t-lg transition-all duration-300 ${
                      bar.active
                        ? "bg-blue-600 shadow-md shadow-blue-500/30"
                        : "bg-blue-200 hover:bg-blue-400"
                    }`}
                    style={{ height: bar.height }}
                  ></div>
                  <span className="text-[11px] font-semibold text-slate-500">{bar.day}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setActiveTab("wallet")}
            className="w-full mt-4 py-2.5 text-center text-xs font-bold text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
          >
            Xem bảng đối soát dòng tiền Escrow ➔
          </button>
        </div>
      </div>
    </div>
  );
};
