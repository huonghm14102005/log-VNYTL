"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { formatVND } from "@/lib/currency";
import { ShieldCheck, UserCheck, Check, X, AlertTriangle, ArrowUpRight, Lock } from "lucide-react";

export const AdminView: React.FC = () => {
  const { showToast, orders } = useApp();

  return (
    <div className="space-y-6 pb-12 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-600" />
            Bảng Quản Trị Hệ Thống (Admin Console)
          </h2>
          <p className="text-xs text-slate-500">Giám sát tính tuân thủ eKYC CCCD và dòng tiền ký quỹ Escrow</p>
        </div>
        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          Hệ thống hoạt động bình thường
        </span>
      </div>

      {/* KPI Cards Admin */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-xs font-semibold text-slate-500 mb-1">Tổng tiền ký quỹ Escrow đang giữ</p>
          <h3 className="text-2xl font-extrabold text-blue-600">45.200.000đ</h3>
          <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
            <Lock className="w-3.5 h-3.5 text-amber-500" /> Đóng băng an toàn song phương
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-xs font-semibold text-slate-500 mb-1">Doanh thu phí sàn (Take Rate 8%)</p>
          <h3 className="text-2xl font-extrabold text-emerald-600">6.450.000đ</h3>
          <span className="text-xs font-bold text-emerald-600 flex items-center gap-0.5 mt-1">
            <ArrowUpRight className="w-3.5 h-3.5" /> +24% tháng này
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-xs font-semibold text-slate-500 mb-1">Hồ sơ eKYC chờ duyệt</p>
          <h3 className="text-2xl font-extrabold text-amber-500">1 hồ sơ</h3>
          <p className="text-xs text-slate-400 mt-1">Tài xế xe tải mới nộp</p>
        </div>
      </div>

      {/* Danh sách duyệt eKYC 1 chạm */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
          <UserCheck className="w-4 h-4 text-blue-600" />
          Xét duyệt hồ sơ đối tác eKYC CCCD (Chuẩn Grab / ShopeeFood)
        </h3>

        <div className="border border-slate-100 rounded-xl p-4 bg-slate-50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
              alt="Avatar"
              className="w-12 h-12 rounded-xl object-cover border border-slate-300"
            />
            <div className="space-y-0.5 text-xs">
              <h4 className="font-bold text-slate-900 text-sm">Lê Hoàng Nam (Tài xế mới)</h4>
              <p className="text-slate-500">CCCD: 031089004512 · Bằng lái: Hạng C (5 năm)</p>
              <p className="text-slate-500">Phương tiện: Xe tải thùng 8 tấn (Biển: 29C-987.65)</p>
              <span className="inline-block text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded text-[10px]">
                AI OCR Face-Match: Khớp 97%
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => showToast("Đã từ chối hồ sơ (Yêu cầu chụp lại ảnh đăng kiểm còn hạn).")}
              className="px-4 py-2 rounded-xl border border-red-200 text-red-600 text-xs font-bold hover:bg-red-50 flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" /> Từ chối
            </button>
            <button
              onClick={() => showToast("Đã phê duyệt và kích hoạt tài khoản đối tác Tài xế thành công!")}
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm flex items-center gap-1"
            >
              <Check className="w-3.5 h-3.5" /> Duyệt 1 chạm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
