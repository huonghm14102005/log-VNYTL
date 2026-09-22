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
            {formatVND(wallet.totalIncome || 35200000)}
          </h3>
          <span className="text-xs font-bold text-emerald-600 flex items-center gap-0.5 mt-2">
            <ArrowUpRight className="w-3.5 h-3.5" />
            {isDriver ? "+ 18% so với tháng trước" : "Tiết kiệm 22% nhờ xe rỗng"}
          </span>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <p className="text-xs font-semibold text-slate-500 mb-1">
            {isDriver ? "Đã nhận (Có thể rút)" : "Đã thanh toán (Hoàn tất giao hàng)"}
          </p>
          <h3 className="text-2xl font-extrabold text-emerald-600">
            {formatVND(wallet.incomeBalance || 28500000)}
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
              <span>Đã xuất đủ 8 hóa đơn VAT</span>
            </p>
          )}
        </div>

        {/* Card 3 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <p className="text-xs font-semibold text-slate-500 mb-1">
            {isDriver ? "Ví cọc khả dụng / Đang khóa" : "Đang ký quỹ tạm giữ trong Escrow"}
          </p>
          <h3 className="text-2xl font-extrabold text-blue-600">
            {isDriver ? formatVND(wallet.depositBalance) : formatVND(wallet.lockedDeposit || 6700000)}
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
              Theo ngày
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </span>
          </div>

          {/* Bar Chart Simulation */}
          <div className="h-48 flex items-end justify-between gap-1.5 px-2 pt-6 border-b border-slate-200">
            {[20, 35, 45, 30, 60, 50, 80, 75, 95, 65, 40, 55, 70, 85].map((val, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full bg-blue-500 hover:bg-blue-600 rounded-t transition-all duration-200"
                  style={{ height: `${val}%` }}
                ></div>
                <span className="text-[9px] text-slate-400">{idx + 1}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-between text-xs text-slate-500 pt-1 font-medium">
            <span>01/09/2026</span>
            <span>15/09/2026</span>
            <span>30/09/2026</span>
          </div>
        </div>

        {/* Right Column: Bảng Lịch sử đơn hàng & Chi phí thanh toán (7 Cols) */}
        <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-800">
              {isDriver ? "Chi tiết thu nhập" : "Lịch sử đơn hàng & Chi phí thanh toán"}
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
                      <span>Hải Phòng</span>
                      <ArrowRight className="w-2.5 h-2.5 inline text-slate-400" />
                      <span>Hà Nội (8 tấn máy móc)</span>
                    </span>
                  </td>
                  <td className="py-3 text-right font-extrabold text-blue-600">3.500.000đ</td>
                  <td className="py-3 text-right">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">
                      {isDriver ? "Đã nhận" : "Đã giải ngân"}
                    </span>
                  </td>
                </tr>

                <tr>
                  <td className="py-3 font-medium text-slate-500">17/09</td>
                  <td className="py-3 font-semibold text-slate-900">
                    Chuyến #FT202609170018
                    <span className="flex items-center gap-1 text-[10px] font-normal text-slate-400">
                      <span>Bắc Ninh</span>
                      <ArrowRight className="w-2.5 h-2.5 inline text-slate-400" />
                      <span>Hải Phòng (12 tấn thép)</span>
                    </span>
                  </td>
                  <td className="py-3 text-right font-extrabold text-blue-600">4.200.000đ</td>
                  <td className="py-3 text-right">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">
                      {isDriver ? "Đã nhận" : "Đã giải ngân"}
                    </span>
                  </td>
                </tr>

                <tr>
                  <td className="py-3 font-medium text-slate-500">16/09</td>
                  <td className="py-3 font-semibold text-slate-900">
                    Chuyến #FT202609160012
                    <span className="flex items-center gap-1 text-[10px] font-normal text-slate-400">
                      <span>Quảng Ninh</span>
                      <ArrowRight className="w-2.5 h-2.5 inline text-slate-400" />
                      <span>Hải Phòng (5 tấn)</span>
                    </span>
                  </td>
                  <td className="py-3 text-right font-extrabold text-blue-600">2.100.000đ</td>
                  <td className="py-3 text-right">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">
                      {isDriver ? "Đã nhận" : "Đã giải ngân"}
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
