"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { formatVND } from "@/lib/currency";
import {
  Wallet,
  ArrowUpRight,
  ShieldCheck,
  Calendar,
  Lock,
  Download,
  PlusCircle,
  CreditCard,
  ChevronDown,
  ArrowRight,
  Receipt,
  FileCheck,
  AlertCircle,
} from "lucide-react";

export const WalletView: React.FC = () => {
  const { wallet, topupWalletDemo, showToast, role } = useApp();
  const isDriver = role === "DRIVER";

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Wallet className="w-5 h-5 text-blue-600" />
            {isDriver ? "Thu nhập & Sổ cái Ví Escrow" : "Chi phí Vận tải & Quản lý Ký quỹ Escrow"}
          </h2>
          <p className="text-xs text-slate-500">
            {isDriver
              ? "Quản lý dòng tiền vận tải, số dư ví cọc và nhận tiền cước giải ngân"
              : "Theo dõi chi phí vận tải tháng và tài khoản ký quỹ trung gian bảo đảm"}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-600 shadow-2xs">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-semibold">01/09/2026 - 30/09/2026</span>
          </div>

          {/* Demo Topup Button */}
          <button
            onClick={() => {
              topupWalletDemo(10000000);
              showToast(isDriver ? "Đã nạp 10.000.000đ vào Ví cọc tài xế thành công!" : "Đã nạp 10.000.000đ vào Ví ký quỹ cước Escrow thành công!");
            }}
            className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 py-1.5 rounded-xl shadow-xs transition-all"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            {isDriver ? "+ Nạp 10tr vào Ví cọc (Demo)" : "+ Nạp 10tr vào Escrow (Demo)"}
          </button>
        </div>
      </div>

      {/* 3 KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <p className="text-xs font-semibold text-slate-500 mb-1">
            {isDriver ? "Tổng thu nhập tháng này" : "Tổng chi phí vận tải tháng"}
          </p>
          <h3 className="text-2xl font-extrabold text-slate-900">
            {formatVND(isDriver ? (wallet.totalIncome || 23500000) : 34500000)}
          </h3>
          <span className="text-xs font-bold text-emerald-600 flex items-center gap-0.5 mt-2">
            <ArrowUpRight className="w-3.5 h-3.5" />
            {isDriver ? "+ 8% so với tháng trước" : "Tiết kiệm 20% nhờ ghép xe rỗng"}
          </span>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <p className="text-xs font-semibold text-slate-500 mb-1">
            {isDriver ? "Đã nhận (Có thể rút)" : "Đã thanh toán (Hoàn tất giao hàng)"}
          </p>
          <h3 className="text-2xl font-extrabold text-emerald-600">
            {formatVND(isDriver ? (wallet.incomeBalance || 18500000) : 23500000)}
          </h3>
          {isDriver ? (
            <button
              onClick={() => showToast("Đã gửi yêu cầu rút tiền về STK BIDV ****8942 thành công!")}
              className="text-xs font-bold text-blue-600 hover:underline mt-2 flex items-center gap-1"
            >
              <span>Yêu cầu rút tiền về ngân hàng</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <p className="text-xs text-slate-500 mt-2 flex items-center gap-1 font-medium">
              <FileCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Đã xuất đủ 4 hóa đơn VAT điện tử</span>
            </p>
          )}
        </div>

        {/* Card 3 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <p className="text-xs font-semibold text-slate-500 mb-1">
            {isDriver ? "Ví cọc khả dụng / Đang khóa" : "Đang ký quỹ tạm giữ trong Escrow"}
          </p>
          <h3 className="text-2xl font-extrabold text-blue-600">
            {isDriver ? formatVND(wallet.depositBalance) : formatVND(11000000)}
          </h3>
          <p className="text-xs text-slate-500 flex items-center gap-1 mt-2">
            <Lock className="w-3 h-3 text-amber-500" />
            <span>
              {isDriver
                ? `Đang khóa cọc: ${formatVND(wallet.lockedDeposit)}`
                : "Tạm giữ an toàn cho 2 chuyến đang di chuyển"}
            </span>
          </p>
        </div>
      </div>

      {/* Main Split: Biểu đồ + Bảng chi tiết */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Biểu đồ chi phí / thu nhập (5 Cols) */}
        <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-800">
              {isDriver ? "Biểu đồ thu nhập" : "Biểu đồ chi phí vận tải"}
            </h3>
            <span className="text-xs text-slate-400 font-semibold flex items-center gap-1">
              Theo tuần
            </span>
          </div>

          <div className="h-44 flex items-end justify-between gap-3 px-2 pt-4 border-b border-slate-200">
            {[
              { day: "Tuần 1", height: "55%", value: isDriver ? "5.5tr" : "7.2tr" },
              { day: "Tuần 2", height: "65%", value: isDriver ? "5.8tr" : "8.5tr" },
              { day: "Tuần 3", height: "85%", value: isDriver ? "6.8tr" : "9.8tr", active: true },
              { day: "Tuần 4", height: "50%", value: isDriver ? "5.4tr" : "9.0tr" },
            ].map((bar, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group relative">
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

          <div className="pt-2 text-xs text-slate-500 flex items-center justify-between">
            <span>Chi phí trung bình: ~5.75tr / đơn</span>
            <span className="text-emerald-600 font-bold">100% hóa đơn VAT</span>
          </div>
        </div>

        {/* Right Column: Sổ cái giao dịch Escrow (7 Cols) */}
        <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <Receipt className="w-4 h-4 text-blue-600" />
              {isDriver ? "Lịch sử biến động Ví Cọc & Tiền Cước" : "Sổ cái Ký Quỹ & Thanh Toán Escrow"}
            </h3>
            <button className="text-xs font-semibold text-blue-600 hover:underline">
              Xem tất cả
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="text-slate-400 border-b border-slate-100 pb-2">
                  <th className="font-semibold py-2">Ngày</th>
                  <th className="font-semibold py-2">{isDriver ? "Nội dung" : "Đơn hàng & Tuyến đường"}</th>
                  <th className="font-semibold py-2 text-right">{isDriver ? "Số tiền" : "Tiền cước"}</th>
                  <th className="font-semibold py-2 text-right">Trạng thái Escrow</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr>
                  <td className="py-3 font-medium text-slate-500">18/09</td>
                  <td className="py-3 font-semibold text-slate-900">
                    Chuyến #FT202609180023
                    <span className="flex items-center gap-1 text-[10px] font-normal text-slate-400">
                      <span>Hưng Yên</span>
                      <ArrowRight className="w-2.5 h-2.5 inline text-slate-400" />
                      <span>Cảng Đình Vũ HP (Cont 40ft than 26T)</span>
                    </span>
                  </td>
                  <td className="py-3 text-right font-extrabold text-blue-600">5.800.000đ</td>
                  <td className="py-3 text-right">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                      Đang ký quỹ Escrow
                    </span>
                  </td>
                </tr>

                <tr>
                  <td className="py-3 font-medium text-slate-500">17/09</td>
                  <td className="py-3 font-semibold text-slate-900">
                    Chuyến #FT202609170018
                    <span className="flex items-center gap-1 text-[10px] font-normal text-slate-400">
                      <span>Cảng Hải Phòng</span>
                      <ArrowRight className="w-2.5 h-2.5 inline text-slate-400" />
                      <span>Chân cầu Kiền (Thép cuộn 22T)</span>
                    </span>
                  </td>
                  <td className="py-3 text-right font-extrabold text-blue-600">5.200.000đ</td>
                  <td className="py-3 text-right">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                      Đang ký quỹ Escrow
                    </span>
                  </td>
                </tr>

                <tr>
                  <td className="py-3 font-medium text-slate-500">16/09</td>
                  <td className="py-3 font-semibold text-slate-900">
                    Chuyến #FT202609160012
                    <span className="flex items-center gap-1 text-[10px] font-normal text-slate-400">
                      <span>Hưng Yên</span>
                      <ArrowRight className="w-2.5 h-2.5 inline text-slate-400" />
                      <span>Cảng Lạch Huyện (Cont lạnh tôm 25T)</span>
                    </span>
                  </td>
                  <td className="py-3 text-right font-extrabold text-blue-600">6.500.000đ</td>
                  <td className="py-3 text-right">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">
                      {isDriver ? "Đã nhận cước" : "Đã giải ngân"}
                    </span>
                  </td>
                </tr>

                <tr>
                  <td className="py-3 font-medium text-slate-500">15/09</td>
                  <td className="py-3 font-semibold text-slate-900">
                    Chuyến #FT202609150008
                    <span className="flex items-center gap-1 text-[10px] font-normal text-slate-400">
                      <span>Hà Nam</span>
                      <ArrowRight className="w-2.5 h-2.5 inline text-slate-400" />
                      <span>Hà Nội (10 tấn)</span>
                    </span>
                  </td>
                  <td className="py-3 text-right font-extrabold text-blue-600">3.800.000đ</td>
                  <td className="py-3 text-right">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                      {isDriver ? "Chờ thanh toán" : "Đang giữ Escrow"}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Chính sách giữ tiền 7 ngày Escrow */}
          <div className="mt-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-600 text-[11px] leading-relaxed flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong>Quy chế Ký quỹ & Bảo đảm Escrow (VYLT 2026):</strong> Tiền cước được bảo vệ tuyệt đối trong tài khoản trung gian của Sàn. Trong trường hợp phát sinh tranh chấp hoặc khiếu nại chất lượng hàng hóa, tiền cước được tạm giữ tối đa <strong>7 ngày</strong> để Hội đồng đối soát xác minh trước khi giải ngân hoặc hoàn tiền 100%.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
