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

  const currentUser = role === "DRIVER" ? driver : shipper;

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
      <div className="flex items-center gap-3">
        {/* Notification Bell */}
        <button className="relative p-2 rounded-xl text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-all">
          <NotificationsRoundedIcon className="!w-5 !h-5" />
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white"></span>
        </button>

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
              {role === "ADMIN" ? "Admin Tổng Sàn VYLT" : role === "DRIVER" ? "Tài xế chuyên tuyến" : "Chủ hàng Doanh nghiệp"}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};
