"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { formatVND } from "@/lib/currency";
import { DriverKycModal } from "@/components/DriverKycModal";
import {
  ArrowLeft,
  MapPin,
  Clock,
  Package,
  Truck,
  Building2,
  Phone,
  ShieldCheck,
  ShieldAlert,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Lock,
  Scale,
  Star,
  ArrowRight,
} from "lucide-react";

export const OrderDetailView: React.FC = () => {
  const {
    selectedOrder,
    role,
    driver,
    setActiveTab,
    acceptOrderAndLockDeposit,
    payEscrow,
    wallet,
    showToast,
  } = useApp();

  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showEscrowPayModal, setShowEscrowPayModal] = useState(false);
  const [showKycModal, setShowKycModal] = useState(false);

  if (!selectedOrder) {
    return (
      <div className="p-8 text-center bg-white rounded-2xl border border-slate-200">
        <p className="text-slate-500">Chưa chọn chuyến hàng nào.</p>
        <button
          onClick={() => setActiveTab("market")}
          className="mt-3 text-xs font-bold text-blue-600 hover:underline"
        >
          Quay lại danh sách tìm hàng
        </button>
      </div>
    );
  }

  const isDriver = role === "DRIVER";
  const order = selectedOrder;

  return (
    <div className="space-y-6 pb-12 max-w-5xl mx-auto">
      {/* Top Back Navigation matching image1.png */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setActiveTab("market")}
          className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-2xs transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Quay lại danh sách
        </button>

        <span className="text-xs text-slate-500 font-semibold">
          Mã đơn: <strong className="text-slate-800">#{order.orderCode}</strong>
        </span>
      </div>

      {/* Main Route Card matching Screen 3 in image1.png */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-6">
        {/* Route Timeline Graphic */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-50 rounded-2xl border border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900">{order.originCity}</h3>
              <p className="text-xs text-slate-500">Điểm lấy hàng</p>
            </div>
          </div>

          <div className="flex-1 max-w-xs mx-4 text-center">
            <span className="text-xs font-bold text-slate-400">{order.distanceKm} km</span>
            <div className="h-0.5 bg-blue-300 w-full relative my-1">
              <div className="w-2.5 h-2.5 bg-blue-600 rounded-full absolute -top-1 left-1/2 -translate-x-1/2"></div>
            </div>
            <span className="text-[10px] text-blue-600 font-semibold">Lộ trình tối ưu</span>
          </div>

          <div className="flex items-center gap-3 text-right">
            <div>
              <h3 className="text-base font-extrabold text-slate-900">{order.destCity}</h3>
              <p className="text-xs text-slate-500">Điểm giao hàng</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold">
              <MapPin className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Thông tin chuyến & Người gửi Grid matching image1.png */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
          {/* Cột trái: Thông tin chuyến */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-2">
              Thông tin chuyến
            </h4>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <Package className="w-4 h-4 text-slate-400" /> Hàng hóa:
                </span>
                <span className="font-bold text-slate-800">{order.cargoName}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <Scale className="w-4 h-4 text-slate-400" /> Trọng lượng:
                </span>
                <span className="font-bold text-slate-800">
                  {order.cargoWeightKg.toLocaleString()} kg ({order.cargoWeightKg / 1000} tấn)
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <Package className="w-4 h-4 text-slate-400" /> Thể tích / Số khối:
                </span>
                <span className="font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                  {order.cargoVolumeCbm || 18} m³ (CBM)
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-slate-400" /> Kích thước (D×R×C):
                </span>
                <span className="font-semibold text-slate-800">
                  {order.cargoDimensions || "4.5 x 2.2 x 2.0 m"}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-slate-400" /> Loại xe yêu cầu:
                </span>
                <span className="font-bold text-slate-800">{order.vehicleTypeRequired}</span>
              </div>

              {order.driverNotes && (
                <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-[11px] leading-relaxed">
                  <strong>Lưu ý từ chủ hàng:</strong> {order.driverNotes}
                </div>
              )}

              <div className="flex items-center justify-between">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-slate-400" /> Nhận hàng:
                </span>
                <span className="font-bold text-slate-800">{order.pickupTime}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-slate-400" /> Giao hàng:
                </span>
                <span className="font-bold text-slate-800">{order.deliveryTime}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-500">Thời gian bốc/dỡ:</span>
                <span className="font-semibold text-slate-700">{order.estimatedHours}</span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <span className="text-slate-500">Giá trị khai báo:</span>
                <span className="font-bold text-blue-600">{formatVND(order.declaredValue)}</span>
              </div>
            </div>
          </div>

          {/* Cột phải: Thông tin người gửi & Cước phí */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-2">
              Thông tin người gửi & Cước phí
            </h4>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold shrink-0">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-extrabold text-slate-900">{order.shipperName}</p>
                  <p className="text-[11px] text-slate-500 flex items-center gap-1">
                    <span>Đánh giá:</span>
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 inline" />
                    <span>{order.shipperRating} / 5.0</span>
                  </p>
                </div>
              </div>

              {/* Bảo mật SĐT */}
              <div className="text-xs pt-2 border-t border-slate-200/80 flex items-center justify-between">
                <span className="text-slate-500 flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5" /> Số điện thoại:
                </span>
                {order.isEscrowPaid ? (
                  <span className="font-bold text-emerald-600">{order.shipperPhone}</span>
                ) : (
                  <span className="text-slate-400 font-mono flex items-center gap-1">
                    <Lock className="w-3 h-3" /> 0901***567 (Mở sau khi ký quỹ)
                  </span>
                )}
              </div>
            </div>

            {/* Cước vận chuyển box */}
            <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-100 space-y-1 text-center">
              <span className="text-xs font-semibold text-slate-600">Cước vận chuyển</span>
              <p className="text-2xl font-extrabold text-blue-600">{formatVND(order.freightPrice)}</p>
              <p className="text-[11px] text-slate-400">(Có thể thương lượng qua chat nội bộ)</p>
            </div>
          </div>
        </div>

        {/* Escrow Banner */}
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <p className="font-bold">Cơ chế Bảo đảm Ký quỹ Escrow hai chiều (TruckLoad):</p>
            <p className="text-emerald-700 leading-relaxed flex flex-wrap items-center gap-1">
              <span>Tài xế cọc 10% giá trị hàng ({formatVND(order.requiredDeposit)})</span>
              <ArrowRight className="w-3.5 h-3.5 inline text-emerald-800 shrink-0" />
              <span>Chủ hàng nộp 100% cước vào Escrow trong 30 phút. Hai bên chỉ thấy SĐT khi tiền đã được khóa an toàn!</span>
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-slate-100">
          <button
            onClick={() => setActiveTab("chat")}
            className="w-full sm:w-auto px-6 py-3 rounded-xl border border-blue-600 text-blue-600 hover:bg-blue-50 font-bold text-xs transition-all flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            Liên hệ qua Chat nội bộ
          </button>

          {/* Button for Driver */}
          {isDriver && (
            <>
              {order.driverDeposited ? (
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <span className="px-4 py-3 rounded-xl bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center gap-1.5 border border-emerald-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Đã nhận đơn hàng (Đã khóa cọc)
                  </span>
                  <button
                    onClick={() => setActiveTab("map")}
                    className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md flex items-center gap-1.5 transition-all"
                  >
                    <span>Vào bản đồ chạy chuyến</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : driver.kycStatus !== "VERIFIED" ? (
                <button
                  onClick={() => setShowKycModal(true)}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                  title="Tài khoản chưa hoàn tất phê duyệt eKYC CCCD"
                >
                  <ShieldAlert className="w-4 h-4 text-slate-950" />
                  Khóa nhận đơn ({driver.kycStatus === "PENDING" ? "Hồ sơ chờ duyệt" : "Chưa duyệt eKYC"})
                </button>
              ) : (
                <button
                  onClick={() => setShowDepositModal(true)}
                  className="w-full sm:w-auto px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  Nhận đơn hàng & Khóa cọc ({formatVND(order.requiredDeposit)})
                </button>
              )}
            </>
          )}

          {/* Button for Shipper */}
          {!isDriver && (
            <>
              {order.status === "WAITING_ESCROW_PAYMENT" && (
                <button
                  onClick={() => setShowEscrowPayModal(true)}
                  className="w-full sm:w-auto px-8 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-900 font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  Nộp cước Escrow ({formatVND(order.freightPrice)}) (Còn 30 phút)
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {/* Modal Khóa Cọc của Tài xế */}
      {showDepositModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-100">
            <div className="flex items-center gap-3 text-blue-600">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Xác nhận Khóa Cọc Nhận Chuyến</h3>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed flex flex-wrap items-center gap-1">
              <span>Bạn đang nhận chuyến <strong>{order.originCity}</strong></span>
              <ArrowRight className="w-3.5 h-3.5 inline text-blue-600 shrink-0" />
              <span><strong>{order.destCity}</strong>. Để cam kết không bùng cuốc, hệ thống sẽ đóng băng tiền cọc trách nhiệm từ Ví cọc của bạn.</span>
            </p>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Số tiền cọc (10% giá trị hàng):</span>
                <span className="font-extrabold text-slate-900">{formatVND(order.requiredDeposit)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Số dư ví cọc hiện có:</span>
                <span className="font-extrabold text-emerald-600">{formatVND(wallet.depositBalance)}</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-2 font-semibold">
                <span className="text-slate-700">Cước nhận được sau chuyến:</span>
                <span className="text-blue-600">{formatVND(Math.round(order.freightPrice * 0.92))} (sau trừ 8% phí sàn)</span>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowDepositModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-100"
              >
                Hủy bỏ
              </button>
              <button
                onClick={() => {
                  const ok = acceptOrderAndLockDeposit(order.id);
                  setShowDepositModal(false);
                  if (ok) setActiveTab("my-orders");
                }}
                className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm"
              >
                Đồng ý khóa cọc
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Nộp Cước Escrow của Chủ hàng */}
      {showEscrowPayModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-100">
            <div className="flex items-center gap-3 text-emerald-600">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Ký Quỹ Tiền Cước Escrow</h3>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Tài xế <strong>{order.driverName}</strong> đã khóa cọc <strong>{formatVND(order.requiredDeposit)}</strong>. Vui lòng thanh toán cước vào tài khoản trung gian để hệ thống mở Số điện thoại và điều xe đến kho.
            </p>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Cước vận chuyển:</span>
                <span className="font-extrabold text-slate-900">{formatVND(order.freightPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Phương thức:</span>
                <span className="font-semibold text-blue-600">Ví Escrow bảo vệ sàn</span>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowEscrowPayModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-100"
              >
                Để sau
              </button>
              <button
                onClick={() => {
                  payEscrow(order.id);
                  setShowEscrowPayModal(false);
                }}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm"
              >
                Xác nhận nộp cước
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal eKYC CCCD */}
      <DriverKycModal
        isOpen={showKycModal}
        onClose={() => setShowKycModal(false)}
      />
    </div>
  );
};
