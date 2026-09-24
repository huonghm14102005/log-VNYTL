"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import AdminPanelSettingsRoundedIcon from "@mui/icons-material/AdminPanelSettingsRounded";
import VerifiedUserRoundedIcon from "@mui/icons-material/VerifiedUserRounded";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";

export const Header: React.FC = () => {
  const { role, setRole, driver, shipper, setActiveTab } = useApp();
  const [showNotifications, setShowNotifications] = React.useState(false);

  const currentUser = role === "DRIVER" ? driver : shipper;

  const mockCaseNotifications = [
    {
      id: "notif-1",
      title: "Giải ngân cước Escrow hoàn tất",
      desc: "Chủ hàng đã duyệt ảnh giao nhận e-POD đơn #FT202609180023. Hệ thống đã giải ngân 5.800.000đ và hoàn cọc 500.000đ vào ví tài xế.",
      time: "14:05 - Hôm nay",
      type: "success",
      badge: "Hoàn tất",
    },
    {
      id: "notif-2",
      title: "Giao hàng thành công - Đã nộp e-POD",
      desc: "Xe đầu kéo 15H-056.78 đã hạ bãi an toàn cont 40ft than 26 tấn tại Cảng Nam Hải Đình Vũ. Đã đính kèm ảnh phiếu giao nhận e-POD.",
      time: "13:50 - Hôm nay",
      type: "info",
      badge: "Đã giao",
    },
    {
      id: "notif-3",
      title: "Hàng đang vận chuyển trên cao tốc 5B",
      desc: "Tài xế Nguyễn Văn A đã rời Kho Sebang (Phố Nối A), tốc độ 70km/h. Dự kiến tới Cảng Đình Vũ sau 1 giờ 15 phút.",
      time: "09:00 - Hôm nay",
      type: "info",
      badge: "Đang chạy",
    },
    {
      id: "notif-4",
      title: "Ký quỹ cước Escrow thành công",
      desc: "Cước vận chuyển 5.800.000đ đã được khóa bảo đảm trong Escrow. Hệ thống đã mở thông tin liên hệ trực tiếp cho 2 bên.",
      time: "08:25 - Hôm nay",
      type: "escrow",
      badge: "Escrow Khóa",
    },
    {
      id: "notif-5",
      title: "Tài xế đã khóa cọc trách nhiệm",
      desc: "Tài xế Nguyễn Văn A đã đóng băng 500.000đ tiền cọc từ Ví cọc để nhận chuyến cont 40ft #FT202609180023.",
      time: "08:15 - Hôm nay",
      type: "escrow",
      badge: "Đã cọc",
    },
    {
      id: "notif-6",
      title: "Ghép xe về rỗng thành công (-20% cước)",
      desc: "Đơn cont 40ft than 26 tấn Phố Nối → Cảng Đình Vũ đã được AI ghép với xe đầu kéo mooc 40ft chiều về rỗng.",
      time: "08:02 - Hôm nay",
      type: "match",
      badge: "Khớp AI",
    },
  ];

  return (
    <header className="h-16 bg-white border-b border-slate-200/80 px-6 flex items-center justify-between gap-4 sticky top-0 z-30 shadow-xs">
      {/* Search Bar matching image1.png */}
      <div className="flex-1 max-w-md relative">
        <SearchRoundedIcon className="!w-4 !h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Tìm kiếm chuyến hàng, địa điểm, biển số xe..."
          className="w-full bg-slate-100/90 text-sm text-slate-800 pl-10 pr-4 py-2 rounded-xl border border-transparent focus:border-blue-400 focus:bg-white focus:outline-none transition-all"
        />
      </div>

      {/* Center: Demo Quick Role Switcher */}
      <div className="hidden lg:flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
        <span className="text-xs text-slate-500 font-semibold px-2.5">Chế độ Demo:</span>
        <button
          onClick={() => {
            setRole("DRIVER");
            setActiveTab("dashboard");
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            role === "DRIVER"
              ? "bg-blue-600 text-white shadow-sm"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
          }`}
        >
          <LocalShippingRoundedIcon className="!w-4 !h-4" />
          Tài Xế (Driver)
        </button>

        <button
          onClick={() => {
            setRole("SHIPPER");
            setActiveTab("dashboard");
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            role === "SHIPPER"
              ? "bg-indigo-600 text-white shadow-sm"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
          }`}
        >
          <Inventory2RoundedIcon className="!w-4 !h-4" />
          Chủ Hàng (Shipper)
        </button>

        <button
          onClick={() => {
            setRole("ADMIN");
            setActiveTab("admin");
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            role === "ADMIN"
              ? "bg-amber-600 text-white shadow-sm"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
          }`}
        >
          <AdminPanelSettingsRoundedIcon className="!w-4 !h-4" />
          Quản Trị (Admin)
        </button>
      </div>

      {/* Right User & Notification Controls */}
      <div className="flex items-center gap-3 relative">
        {/* Notification Bell with Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className={`relative p-2 rounded-xl text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-all ${
              showNotifications ? "bg-slate-100 text-blue-600" : ""
            }`}
            title="Xem thông báo tiến trình đơn hàng"
          >
            <NotificationsRoundedIcon className="!w-5 !h-5" />
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white animate-pulse"></span>
          </button>

          {/* Notification Case Popup */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-96 bg-white rounded-2xl shadow-xl border border-slate-200 py-3 z-50 animate-fadeIn">
              <div className="px-4 pb-2.5 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Thông báo hệ thống</h4>
                  <p className="text-[11px] text-slate-400">Tiến trình Case mẫu: Đơn #FT202609180023</p>
                </div>
                <span className="text-[10px] font-bold bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full border border-blue-100">
                  6 mốc sự kiện
                </span>
              </div>

              <div className="max-h-[380px] overflow-y-auto divide-y divide-slate-50 px-2">
                {mockCaseNotifications.map((n) => (
                  <div key={n.id} className="p-2.5 hover:bg-slate-50 rounded-xl transition-colors space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-slate-800 leading-tight">{n.title}</span>
                      <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded uppercase shrink-0 ${
                        n.type === "success"
                          ? "bg-emerald-100 text-emerald-700"
                          : n.type === "escrow"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-amber-100 text-amber-800"
                      }`}>
                        {n.badge}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-relaxed">{n.desc}</p>
                    <p className="text-[10px] text-slate-400 font-medium">{n.time}</p>
                  </div>
                ))}
              </div>

              <div className="pt-2 px-3 border-t border-slate-100 text-center">
                <button
                  onClick={() => {
                    setShowNotifications(false);
                    setActiveTab("my-orders");
                  }}
                  className="text-xs font-bold text-blue-600 hover:underline"
                >
                  Xem chi tiết đơn hàng trong chuyến của tôi →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Card matching image1.png */}
        <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
          <div className={`w-9 h-9 rounded-full border flex items-center justify-center font-bold text-sm overflow-hidden ${
            role === "ADMIN"
              ? "bg-amber-100 border-amber-300 text-amber-800"
              : role === "SHIPPER"
              ? "bg-indigo-100 border-indigo-300 text-indigo-700"
              : "bg-blue-100 border-blue-300 text-blue-700"
          }`}>
            {role === "ADMIN" ? (
              <AdminPanelSettingsRoundedIcon className="!w-5 !h-5 text-amber-700" />
            ) : currentUser.avatarUrl ? (
              <img src={currentUser.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              currentUser.fullName.charAt(0)
            )}
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-sm font-semibold text-slate-800 leading-tight flex items-center gap-1">
              {role === "ADMIN" ? "Ban Điều Hành Sàn" : currentUser.fullName}
              <VerifiedUserRoundedIcon className="!w-4 !h-4 text-emerald-500 inline" />
            </p>
            <p className="text-xs text-slate-500 font-medium">
              {role === "ADMIN" ? "Admin Tổng Sàn TruckLoad" : role === "DRIVER" ? "Tài xế chuyên tuyến" : "Chủ hàng Doanh nghiệp"}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};
