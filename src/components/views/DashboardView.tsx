"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { formatVND } from "@/lib/currency";
import { DriverKycModal } from "@/components/DriverKycModal";
import {
  Truck,
  PackageCheck,
  Clock,
  TrendingUp,
  MapPin,
  ChevronRight,
  ArrowUpRight,
  ArrowRight,
  ShieldCheck,
  ShieldAlert,
  AlertCircle,
  Sparkles,
  RefreshCw,
  FileCheck2,
} from "lucide-react";

export const DashboardView: React.FC = () => {
  const { role, setRole, driver, shipper, orders, setActiveTab, setSelectedOrder, switchDriverAccountStatus } = useApp();
  const [isKycModalOpen, setIsKycModalOpen] = useState(false);

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

        {/* Decorative truck graphic (Đổi hình xe đầu bằng, chéo) */}
        <div className="shrink-0 flex items-center justify-center p-3 bg-white/10 rounded-2xl backdrop-blur-xs border border-white/20">
          <img
            src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=400&auto=format&fit=crop&q=80"
            alt="Flat Cab Modern Truck"
            className="w-52 h-28 object-cover rounded-xl shadow-md"
          />
        </div>
      </div>

      {/* 1.5. Driver eKYC Onboarding & Verification Status Banner */}
      {isDriver && (
        <div className="rounded-2xl transition-all">
          {driver.kycStatus === "VERIFIED" ? (
            <div className="bg-gradient-to-r from-emerald-50 via-teal-50/70 to-emerald-50 border border-emerald-200/80 rounded-2xl p-4.5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm shadow-emerald-600/30">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-emerald-900">
                      Tài khoản đã hoàn tất eKYC CCCD & Hồ sơ phương tiện
                    </h4>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-200 text-emerald-800 uppercase tracking-wide">
                      ĐÃ PHÊ DUYỆT
                    </span>
                  </div>
                  <p className="text-xs text-emerald-700 mt-0.5">
                    CCCD: 001095018291 • Bằng lái GPLX Hạng C • Xe tải: 29C-998.88 (8 tấn) • Đủ điều kiện nhận chuyến & khóa cọc 10%.
                  </p>
                </div>
              </div>

              {/* Demo Switcher Button */}
              <div className="flex items-center gap-2 self-stretch md:self-auto justify-end">
                <button
                  onClick={() => switchDriverAccountStatus("PENDING")}
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-emerald-300 text-emerald-800 hover:bg-emerald-100/70 transition-colors flex items-center gap-1.5"
                  title="Chuyển sang trạng thái Chờ duyệt để thử nghiệm tính năng khóa nhận đơn"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-emerald-600" />
                  Mô phỏng: Chờ Admin duyệt
                </button>
                <button
                  onClick={() => setIsKycModalOpen(true)}
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
                >
                  Xem hồ sơ eKYC
                </button>
              </div>
            </div>
          ) : driver.kycStatus === "PENDING" ? (
            <div className="bg-gradient-to-r from-amber-50 via-yellow-50/80 to-amber-50 border-2 border-amber-300 rounded-2xl p-4.5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-md">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm shadow-amber-500/30 animate-pulse">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-amber-950">
                      Hồ sơ eKYC CCCD & Xe tải đang chờ Ban Quản Trị thẩm duyệt
                    </h4>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-200 text-amber-900 uppercase tracking-wide">
                      ĐANG XỬ LÝ (KHÓA NHẬN ĐƠN)
                    </span>
                  </div>
                  <p className="text-xs text-amber-800 mt-1 leading-relaxed">
                    Theo quy chuẩn vận tải an toàn 2026, tài khoản đang tạm thời <strong>KHÓA tính năng Nhận chuyến & Cọc ví</strong> cho đến khi hồ sơ CCCD gắn chip và Đăng kiểm được duyệt.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-stretch md:self-auto justify-end">
                <button
                  onClick={() => {
                    setRole("ADMIN");
                    setActiveTab("admin");
                  }}
                  className="text-xs font-bold px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white transition-all shadow-sm flex items-center gap-1.5"
                >
                  <FileCheck2 className="w-4 h-4" />
                  Chuyển sang Quản trị viên duyệt ngay
                </button>
                <button
                  onClick={() => switchDriverAccountStatus("VERIFIED")}
                  className="text-xs font-semibold px-3 py-2 rounded-xl border border-amber-300 text-amber-900 hover:bg-amber-100 transition-colors"
                >
                  Kích hoạt nhanh
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-gradient-to-r from-rose-50 via-orange-50/70 to-rose-50 border border-rose-200 rounded-2xl p-4.5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-sm shadow-rose-600/30">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-rose-950">
                      Chưa hoàn tất eKYC Căn cước công dân & Giấy phép lái xe
                    </h4>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-200 text-rose-800 uppercase tracking-wide">
                      CHƯA KÍCH HOẠT
                    </span>
                  </div>
                  <p className="text-xs text-rose-700 mt-0.5">
                    Vui lòng nộp hồ sơ eKYC trực tuyến (CCCD, Chân dung selfie, GPLX và Cà vẹt xe) để được kích hoạt nhận chuyến chạy hàng.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsKycModalOpen(true)}
                className="text-xs font-bold px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white transition-all shadow-sm flex items-center gap-1.5 self-stretch md:self-auto justify-center"
              >
                <ShieldCheck className="w-4 h-4" />
                Nộp hồ sơ eKYC CCCD (4 bước)
              </button>
            </div>
          )}
        </div>
      )}

      {/* 2. 4 KPI Stat Cards (Đổi sang Số chuyến trong tháng và Chi phí vận tải tháng) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Số chuyến trong tháng */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs card-hover">
          <p className="text-xs font-semibold text-slate-500 mb-1">Số chuyến trong tháng</p>
          <div className="flex items-baseline justify-between">
            <h3 className="text-2xl font-extrabold text-slate-800">28</h3>
            <span className="text-xs font-semibold text-emerald-600 flex items-center gap-0.5">
              <TrendingUp className="w-3.5 h-3.5" /> +4 so với tháng trước
            </span>
          </div>
        </div>

        {/* Card 2: Đang vận chuyển */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs card-hover">
          <p className="text-xs font-semibold text-slate-500 mb-1">Đang vận chuyển</p>
          <div className="flex items-baseline justify-between">
            <h3 className="text-2xl font-extrabold text-blue-600">2</h3>
            <span className="text-xs font-semibold text-blue-600 flex items-center gap-0.5">
              <Clock className="w-3.5 h-3.5" /> 1 xe sắp tới nơi
            </span>
          </div>
        </div>

        {/* Card 3: Đã hoàn thành */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs card-hover">
          <p className="text-xs font-semibold text-slate-500 mb-1">Đã hoàn thành</p>
          <div className="flex items-baseline justify-between">
            <h3 className="text-2xl font-extrabold text-slate-800">26</h3>
            <span className="text-xs font-semibold text-emerald-600 flex items-center gap-0.5">
              <PackageCheck className="w-3.5 h-3.5" /> 100% đúng hạn
            </span>
          </div>
        </div>

        {/* Card 4: Doanh thu / Chi phí vận tải tháng */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs card-hover">
          <p className="text-xs font-semibold text-slate-500 mb-1">
            {isDriver ? "Thu nhập tháng này" : "Chi phí vận tải tháng"}
          </p>
          <div className="flex items-baseline justify-between">
            <h3 className="text-2xl font-extrabold text-emerald-600">
              {isDriver ? "48.500.000đ" : "68.500.000đ"}
            </h3>
            <span className="text-xs font-semibold text-emerald-600 flex items-center gap-0.5">
              <ArrowUpRight className="w-3.5 h-3.5" />
              {isDriver ? "+ 15%" : "Tiết kiệm 15.2tr"}
            </span>
          </div>
        </div>
      </div>

      {/* 3. Main Split Section: Giao diện chi tiết theo vai trò */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Chuyến hàng đang chạy (7 Cols) */}
        <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                <Truck className="w-5 h-5 text-blue-600" />
                {isDriver ? "Chuyến hàng đang phụ trách" : "Đơn hàng của bạn đang vận chuyển"}
              </h3>
              <button
                onClick={() => setActiveTab("my-orders")}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700"
              >
                Xem tất cả đơn
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
                      <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                        <span>{order.originCity}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-blue-600 inline shrink-0" />
                        <span>{order.destCity}</span>
                        <span className="text-xs font-normal text-slate-500 ml-1">
                          ({order.distanceKm} km)
                        </span>
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {order.cargoName} · {order.cargoWeightKg / 1000} tấn {order.cargoVolumeCbm ? `· ${order.cargoVolumeCbm} m³` : ""}
                      </p>
                      <p className="text-xs font-semibold text-emerald-600 mt-1">
                        Cước: {formatVND(order.freightPrice)} {order.driverName ? `• Tài xế: ${order.driverName} (${order.driverPlateNumber || "29H-123.45"})` : ""}
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
                        : "Còn 1 giờ 30 phút"}
                    </span>
                    <button
                      onClick={() => {
                        setSelectedOrder(order);
                        setActiveTab("map");
                      }}
                      className="text-xs font-bold text-blue-600 hover:underline mt-1 flex items-center gap-1"
                    >
                      <span>Theo dõi hành trình</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1.5 text-emerald-600 font-semibold">
              <ShieldCheck className="w-4 h-4" /> Ký quỹ Escrow bảo đảm an toàn 100%
            </span>
            <span>Cập nhật vị trí: Vừa xong</span>
          </div>
        </div>

        {/* Right Column: Biểu đồ & Đề xuất tối ưu (5 Cols) */}
        <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base font-bold text-slate-800">
                {isDriver ? "Thu nhập theo tuần" : "Chi phí vận tải tháng"}
              </h3>
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-0.5">
                <ArrowUpRight className="w-3.5 h-3.5" />
                {isDriver ? "+ 12% hiệu suất" : "Tiết kiệm 22% so với xe chiều đi"}
              </span>
            </div>
            <p className="text-2xl font-extrabold text-slate-900 mb-4">
              {isDriver ? "36.500.000đ" : "68.500.000đ"}
            </p>

            {/* Stylized CSS Bar Chart matching Screen 1 in image1.png */}
            <div className="h-44 flex items-end justify-between gap-3 px-2 pt-4 border-b border-slate-200">
              {[
                { day: "Tuần 1", height: "45%", value: "15.2tr" },
                { day: "Tuần 2", height: "65%", value: "22.5tr" },
                { day: "Tuần 3", height: "85%", value: "28.1tr", active: true },
                { day: "Tuần 4", height: "50%", value: "17.7tr" },
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

          <div className="pt-3">
            {!isDriver ? (
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/80 text-xs text-amber-900 space-y-1">
                <p className="font-bold flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  Gợi ý xe tải về rỗng chiều Hải Phòng → Hà Nội:
                </p>
                <p className="text-[11px] text-amber-800">
                  Có 3 xe tải 8-15 tấn đang trả hàng tại Đình Vũ và tìm chuyến quay đầu về Hà Nội với cước giảm 25%.
                </p>
                <button
                  onClick={() => setActiveTab("market")}
                  className="mt-1 text-blue-700 font-bold hover:underline inline-flex items-center gap-1"
                >
                  Xem danh sách xe về rỗng ngay →
                </button>
              </div>
            ) : (
              <button
                onClick={() => setActiveTab("wallet")}
                className="w-full py-2.5 text-center text-xs font-bold text-blue-600 hover:bg-blue-50 rounded-xl transition-all flex items-center justify-center gap-1.5"
              >
                <span>Xem bảng đối soát dòng tiền Escrow</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Driver eKYC Modal */}
      <DriverKycModal
        isOpen={isKycModalOpen}
        onClose={() => setIsKycModalOpen(false)}
      />
    </div>
  );
};
