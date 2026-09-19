"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { Search, Bell, ShieldCheck, UserCheck, Truck, Package } from "lucide-react";

export const Header: React.FC = () => {
  const { role, setRole, driver, shipper, setActiveTab } = useApp();

  const currentUser = role === "DRIVER" ? driver : shipper;

  return (
    <header className="h-16 bg-white border-b border-slate-200/80 px-6 flex items-center justify-between gap-4 sticky top-0 z-30 shadow-xs">
      {/* Search Bar matching image1.png */}
      <div className="flex-1 max-w-md relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
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
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Truck className="w-3.5 h-3.5" />
          Tài Xế (Driver)
        </button>

        <button
          onClick={() => {
            setRole("SHIPPER");
            setActiveTab("dashboard");
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            role === "SHIPPER"
              ? "bg-blue-600 text-white shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Package className="w-3.5 h-3.5" />
          Chủ Hàng (Shipper)
        </button>

        <button
          onClick={() => {
            setRole("ADMIN");
            setActiveTab("admin");
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            role === "ADMIN"
              ? "bg-blue-600 text-white shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          Quản Trị (Admin)
        </button>
      </div>

      {/* Right User & Notification Controls */}
      <div className="flex items-center gap-3">
        {/* Notification Bell */}
        <button className="relative p-2 rounded-xl text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-all">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white"></span>
        </button>

        {/* User Card matching image1.png */}
        <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
          <div className="w-9 h-9 rounded-full bg-blue-100 border border-blue-300 flex items-center justify-center text-blue-700 font-bold text-sm overflow-hidden">
            {currentUser.avatarUrl ? (
              <img src={currentUser.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              currentUser.fullName.charAt(0)
            )}
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-sm font-semibold text-slate-800 leading-tight flex items-center gap-1">
              {currentUser.fullName}
              <UserCheck className="w-3.5 h-3.5 text-emerald-500 inline" />
            </p>
            <p className="text-xs text-slate-500 font-medium">
              {role === "DRIVER" ? "Tài xế chuyên tuyến" : "Chủ hàng Doanh nghiệp"}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};
