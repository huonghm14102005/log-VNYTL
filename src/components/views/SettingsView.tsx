"use client";

import React, { useState } from "react";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

export const SettingsView: React.FC = () => {
  const [notifyNewTrip, setNotifyNewTrip] = useState(true);
  const [notifyPayment, setNotifyPayment] = useState(true);
  const [notifyPromo, setNotifyPromo] = useState(false);

  return (
    <div className="space-y-6 pb-12 max-w-3xl mx-auto">
      <div>
        <h2 className="text-xl font-bold text-slate-800">Cài đặt ứng dụng</h2>
        <p className="text-xs text-slate-500">Tùy chỉnh thông báo, bảo mật tài khoản và quy chế dịch vụ</p>
      </div>

      {/* Thông báo matching Screen 9 in image1.png */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-3">
          <NotificationsRoundedIcon className="!w-5 !h-5 text-blue-600" />
          Cài đặt Thông báo
        </h3>

        <div className="space-y-3">
          <label className="flex items-center justify-between cursor-pointer text-xs text-slate-700 py-1">
            <span>Thông báo chuyến hàng mới phù hợp</span>
            <input
              type="checkbox"
              checked={notifyNewTrip}
              onChange={(e) => setNotifyNewTrip(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-0 cursor-pointer"
            />
          </label>

          <label className="flex items-center justify-between cursor-pointer text-xs text-slate-700 py-1">
            <span>Thông báo thanh toán cước & Ký quỹ Escrow</span>
            <input
              type="checkbox"
              checked={notifyPayment}
              onChange={(e) => setNotifyPayment(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-0 cursor-pointer"
            />
          </label>

          <label className="flex items-center justify-between cursor-pointer text-xs text-slate-700 py-1">
            <span>Thông báo khuyến mãi & Tiết kiệm chuyến về rỗng</span>
            <input
              type="checkbox"
              checked={notifyPromo}
              onChange={(e) => setNotifyPromo(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-0 cursor-pointer"
            />
          </label>
        </div>
      </div>

      {/* Bảo mật matching Screen 9 in image1.png */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-3">
          <LockRoundedIcon className="!w-5 !h-5 text-blue-600" />
          Bảo mật
        </h3>

        <button className="w-full flex items-center justify-between text-xs font-semibold text-slate-700 hover:text-blue-600 py-2 transition-colors">
          <span>Đổi mật khẩu</span>
          <ChevronRightRoundedIcon className="!w-4 !h-4 text-slate-400" />
        </button>
      </div>

      {/* Hỗ trợ matching Screen 9 in image1.png */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-3">
          <HelpOutlineRoundedIcon className="!w-5 !h-5 text-blue-600" />
          Hỗ trợ & Pháp lý
        </h3>

        <div className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
          <button className="w-full flex items-center justify-between py-2.5 hover:text-blue-600">
            <span>Trung tâm trợ giúp (FAQ)</span>
            <ChevronRightRoundedIcon className="!w-4 !h-4 text-slate-400" />
          </button>
          <button className="w-full flex items-center justify-between py-2.5 hover:text-blue-600">
            <span>Liên hệ đường dây nóng hỗ trợ 24/7 (Hotline 1900 6868)</span>
            <ChevronRightRoundedIcon className="!w-4 !h-4 text-slate-400" />
          </button>
          <button className="w-full flex items-center justify-between py-2.5 hover:text-blue-600">
            <span>Điều khoản sử dụng & Quy chế bảo vệ giao dịch Escrow</span>
            <ChevronRightRoundedIcon className="!w-4 !h-4 text-slate-400" />
          </button>
        </div>
      </div>
    </div>
  );
};
