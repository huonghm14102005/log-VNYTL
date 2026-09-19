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
} from "lucide-react";

export const WalletView: React.FC = () => {
  const { wallet, topupWalletDemo, showToast } = useApp();

  return (
    <div className="space-y-6 pb-12">
      {/* Header matching Screen 6 in image1.png */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Wallet className="w-5 h-5 text-blue-600" />
            Thu nhập & Sổ cái Ví Escrow
          </h2>
          <p className="text-xs text-slate-500">Quản lý dòng tiền vận tải và tài khoản ký quỹ trung gian</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-600 shadow-2xs">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-semibold">01/09/2026 - 30/09/2026</span>
          </div>

          {/* Demo Topup Button */}
          <button
            onClick={() => topupWalletDemo(10000000)}
            className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 py-1.5 rounded-xl shadow-xs transition-all"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            + Nạp 10tr vào Ví cọc (Demo)
          </button>
        </div>
      </div>

      {/* 3 KPI Cards matching Screen 6 in image1.png */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Tổng thu nhập */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <p className="text-xs font-semibold text-slate-500 mb-1">Tổng thu nhập</p>
          <h3 className="text-2xl font-extrabold text-slate-900">
            {formatVND(wallet.totalIncome || 35200000)}
          </h3>
          <span className="text-xs font-bold text-emerald-600 flex items-center gap-0.5 mt-2">
            <ArrowUpRight className="w-3.5 h-3.5" /> + 18% so với tháng trước
          </span>
        </div>

        {/* Card 2: Đã nhận */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <p className="text-xs font-semibold text-slate-500 mb-1">Đã nhận (Có thể rút)</p>
          <h3 className="text-2xl font-extrabold text-emerald-600">
            {formatVND(wallet.incomeBalance || 28500000)}
          </h3>
          <button
            onClick={() => showToast("Đã gửi yêu cầu rút tiền về STK BIDV ****8942 thành công!")}
            className="text-xs font-bold text-blue-600 hover:underline mt-2 flex items-center gap-1"
          >
            <span>Yêu cầu rút tiền về ngân hàng</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Card 3: Chờ thanh toán / Khóa cọc Escrow */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <p className="text-xs font-semibold text-slate-500 mb-1">Ví cọc khả dụng / Đang khóa</p>
          <h3 className="text-2xl font-extrabold text-blue-600">
            {formatVND(wallet.depositBalance)}
          </h3>
          <p className="text-xs text-slate-500 flex items-center gap-1 mt-2">
            <Lock className="w-3 h-3 text-amber-500" /> Đang khóa cọc: <strong>{formatVND(wallet.lockedDeposit)}</strong>
          </p>
        </div>
      </div>

      {/* Main Split: Biểu đồ thu nhập + Bảng chi tiết matching Screen 6 in image1.png */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Biểu đồ thu nhập (5 Cols) */}
        <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-800">Biểu đồ thu nhập</h3>
            <span className="text-xs text-slate-400 font-semibold flex items-center gap-1">
              Theo ngày
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </span>
          </div>

          {/* Bar Chart Simulation matching image1.png */}
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

        {/* Right Column: Chi tiết thu nhập bảng matching Screen 6 in image1.png (7 Cols) */}
        <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-800">Chi tiết thu nhập</h3>
            <button className="text-xs font-semibold text-blue-600 hover:underline">
              Xem tất cả
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="text-slate-400 border-b border-slate-100 pb-2">
                  <th className="font-semibold py-2">Ngày</th>
                  <th className="font-semibold py-2">Nội dung</th>
                  <th className="font-semibold py-2 text-right">Số tiền</th>
                  <th className="font-semibold py-2 text-right">Trạng thái</th>
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
                      <span>Hà Nội (8 tấn)</span>
                    </span>
                  </td>
                  <td className="py-3 text-right font-extrabold text-blue-600">3.500.000đ</td>
                  <td className="py-3 text-right">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">
                      Đã nhận
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
                      <span>Hải Phòng (12 tấn)</span>
                    </span>
                  </td>
                  <td className="py-3 text-right font-extrabold text-blue-600">4.200.000đ</td>
                  <td className="py-3 text-right">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">
                      Đã nhận
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
                      Đã nhận
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
                      <span>Hà Nội</span>
                    </span>
                  </td>
                  <td className="py-3 text-right font-extrabold text-blue-600">3.800.000đ</td>
                  <td className="py-3 text-right">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700">
                      Chờ thanh toán
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-500 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Sổ cái tài chính kép bất biến tuân thủ chuẩn kế toán sàn
            </span>
            <span className="text-[11px]">Đối soát tự động</span>
          </div>
        </div>
      </div>
    </div>
  );
};
