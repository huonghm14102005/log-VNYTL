"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import SupportAgentRoundedIcon from "@mui/icons-material/SupportAgentRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";

import AdminPanelSettingsRoundedIcon from "@mui/icons-material/AdminPanelSettingsRounded";
import VerifiedUserRoundedIcon from "@mui/icons-material/VerifiedUserRounded";
import GavelRoundedIcon from "@mui/icons-material/GavelRounded";

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  highlight?: boolean;
  badge?: string;
  badgeColor?: string;
}

export const Sidebar: React.FC = () => {
  const { role, activeTab, setActiveTab } = useApp();

  // 1. Menu Tài Xế (Driver)
  const driverNavItems: NavItem[] = [
    { id: "dashboard", label: "Tổng quan Tài xế", icon: DashboardRoundedIcon },
    { id: "market", label: "Tìm đơn", icon: SearchRoundedIcon, badge: "MỚI", badgeColor: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" },
    { id: "my-orders", label: "Chuyến của tôi", icon: LocalShippingRoundedIcon },
    { id: "map", label: "Bản đồ hành trình", icon: LocationOnRoundedIcon, badge: "TRỰC TIẾP", badgeColor: "bg-blue-500/20 text-blue-400 border border-blue-500/30" },
    { id: "wallet", label: "Thu nhập & Ví cọc", icon: AccountBalanceWalletRoundedIcon },
    { id: "profile", label: "Hồ sơ", icon: PersonRoundedIcon },
    { id: "services", label: "Trạm dừng & Dịch vụ", icon: SupportAgentRoundedIcon },
    { id: "settings", label: "Cài đặt tài khoản", icon: SettingsRoundedIcon },
  ];

  // 2. Menu Chủ Hàng (Shipper)
  const shipperNavItems: NavItem[] = [
    { id: "dashboard", label: "Tổng quan Chủ hàng", icon: DashboardRoundedIcon },
    { id: "create-order", label: "Đăng đơn hàng mới", icon: AddCircleOutlineRoundedIcon, highlight: true },
    { id: "my-orders", label: "Đơn hàng đã đăng", icon: Inventory2RoundedIcon },
    { id: "market", label: "Xe về rỗng", icon: LocalShippingRoundedIcon },
    { id: "map", label: "Theo dõi hành trình", icon: LocationOnRoundedIcon },
    { id: "wallet", label: "Ví & Ký quỹ Escrow", icon: AccountBalanceWalletRoundedIcon },
    { id: "profile", label: "Hồ sơ Doanh nghiệp", icon: PersonRoundedIcon },
    { id: "settings", label: "Cài đặt tài khoản", icon: SettingsRoundedIcon },
  ];

  // 3. Menu Quản Trị Sàn (Admin)
  const adminNavItems: NavItem[] = [
    { id: "admin", label: "Bảng điều hành Sàn", icon: AdminPanelSettingsRoundedIcon },
    { id: "admin-ekyc", label: "Duyệt hồ sơ eKYC", icon: VerifiedUserRoundedIcon, badge: "1 chờ", badgeColor: "bg-amber-500/20 text-amber-300 border border-amber-500/40" },
    { id: "admin-escrow", label: "Giám sát Ký quỹ Escrow", icon: AccountBalanceWalletRoundedIcon },
    { id: "admin-orders", label: "Giám sát Chuyến hàng", icon: Inventory2RoundedIcon },
    { id: "admin-disputes", label: "Xử lý Khiếu nại", icon: GavelRoundedIcon, badge: "0 tồn", badgeColor: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" },
    { id: "settings", label: "Cài đặt Hệ thống Sàn", icon: SettingsRoundedIcon },
  ];

  const navItems = role === "ADMIN" ? adminNavItems : role === "SHIPPER" ? shipperNavItems : driverNavItems;

  return (
    <aside className="w-64 bg-[#0F172A] text-slate-300 flex flex-col h-screen shrink-0 border-r border-slate-800 select-none">
      {/* Brand Logo */}
      <div className="p-5 flex items-center gap-3 border-b border-slate-800/80">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg ${
          role === "ADMIN" ? "bg-amber-600 shadow-amber-500/20" : role === "SHIPPER" ? "bg-indigo-600 shadow-indigo-500/20" : "bg-blue-600 shadow-blue-500/20"
        }`}>
          <LocalShippingRoundedIcon className="!w-6 !h-6" />
        </div>
        <div>
          <h1 className="text-white font-bold text-base tracking-tight flex items-center gap-1.5">
            TruckLoad
            <span className="text-blue-400 font-extrabold text-[10px] px-1.5 py-0.5 rounded bg-blue-950/80 border border-blue-800 tracking-wider">
              PRO
            </span>
          </h1>
          <p className="text-xs text-slate-400 font-medium">Sàn Vận Tải Hai Chiều</p>
        </div>
      </div>

      {/* Role / Mode Indicator Badge */}
      <div className="px-4 pt-3 pb-1">
        <div className={`px-3 py-2 rounded-xl text-xs flex items-center justify-between border ${
          role === "ADMIN"
            ? "bg-amber-500/10 border-amber-500/30 text-amber-400"
            : role === "SHIPPER"
            ? "bg-indigo-500/10 border-indigo-500/30 text-indigo-300"
            : "bg-blue-500/10 border-blue-500/30 text-blue-400"
        }`}>
          <span className="font-bold flex items-center gap-1.5">
            {role === "ADMIN" && <AdminPanelSettingsRoundedIcon className="!w-4 !h-4" />}
            {role === "SHIPPER" && <Inventory2RoundedIcon className="!w-4 !h-4" />}
            {role === "DRIVER" && <LocalShippingRoundedIcon className="!w-4 !h-4" />}
            Chế độ: {role === "ADMIN" ? "Quản Trị Sàn" : role === "SHIPPER" ? "Chủ Hàng" : "Tài Xế"}
          </span>
          <span className={`w-2 h-2 rounded-full animate-pulse ${
            role === "ADMIN" ? "bg-amber-400" : role === "SHIPPER" ? "bg-indigo-400" : "bg-emerald-400"
          }`}></span>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 px-3 py-3 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          const isHighlight = item.highlight;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                isHighlight
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-600/30 hover:brightness-110 font-semibold"
                  : isActive
                  ? "bg-blue-600/20 text-blue-400 font-semibold border border-blue-500/30"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`!w-5 !h-5 shrink-0 ${isActive && !isHighlight ? "text-blue-400" : ""}`} />
                <span>{item.label}</span>
              </div>

              {item.badge && (
                <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-md uppercase tracking-wider ${item.badgeColor || "bg-slate-800 text-slate-300"}`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer info */}
      <div className="p-4 border-t border-slate-800/80 text-xs text-slate-500 text-center">
        Vietnam Young Logistics Talent 2026
      </div>
    </aside>
  );
};
