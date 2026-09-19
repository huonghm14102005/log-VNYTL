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

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  highlight?: boolean;
}

export const Sidebar: React.FC = () => {
  const { role, activeTab, setActiveTab } = useApp();

  const driverNavItems: NavItem[] = [
    { id: "dashboard", label: "Tổng quan", icon: DashboardRoundedIcon },
    { id: "market", label: "Tìm hàng", icon: SearchRoundedIcon },
    { id: "my-orders", label: "Chuyến của tôi", icon: LocalShippingRoundedIcon },
    { id: "map", label: "Bản đồ", icon: LocationOnRoundedIcon },
    { id: "wallet", label: "Thu nhập", icon: AccountBalanceWalletRoundedIcon },
    { id: "reviews", label: "Đánh giá", icon: StarRoundedIcon },
    { id: "services", label: "Dịch vụ hỗ trợ", icon: SupportAgentRoundedIcon },
    { id: "profile", label: "Hồ sơ tài xế", icon: PersonRoundedIcon },
    { id: "settings", label: "Cài đặt", icon: SettingsRoundedIcon },
  ];

  const shipperNavItems: NavItem[] = [
    { id: "dashboard", label: "Tổng quan", icon: DashboardRoundedIcon },
    { id: "create-order", label: "+ Tạo đơn mới", icon: AddCircleOutlineRoundedIcon, highlight: true },
    { id: "my-orders", label: "Đơn hàng của tôi", icon: Inventory2RoundedIcon },
    { id: "market", label: "Chợ xe về rỗng", icon: LocalShippingRoundedIcon },
    { id: "map", label: "Theo dõi hành trình", icon: LocationOnRoundedIcon },
    { id: "wallet", label: "Thanh toán & Escrow", icon: AccountBalanceWalletRoundedIcon },
    { id: "reviews", label: "Đánh giá tài xế", icon: StarRoundedIcon },
    { id: "services", label: "Trung tâm hỗ trợ", icon: SupportAgentRoundedIcon },
    { id: "profile", label: "Hồ sơ chủ hàng", icon: PersonRoundedIcon },
    { id: "settings", label: "Cài đặt", icon: SettingsRoundedIcon },
  ];

  const navItems = role === "SHIPPER" ? shipperNavItems : driverNavItems;

  return (
    <aside className="w-64 bg-[#0F172A] text-slate-300 flex flex-col h-screen shrink-0 border-r border-slate-800 select-none">
      {/* Brand Logo */}
      <div className="p-5 flex items-center gap-3 border-b border-slate-800/80">
        <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
          <LocalShippingRoundedIcon className="!w-6 !h-6" />
        </div>
        <div>
          <h1 className="text-white font-bold text-base tracking-tight flex items-center gap-1.5">
            Full Truck
            <span className="text-blue-400 font-extrabold text-xs px-1.5 py-0.5 rounded bg-blue-950/80 border border-blue-800">
              VYLT
            </span>
          </h1>
          <p className="text-xs text-slate-400 font-medium">Sàn Vận Tải Hai Chiều</p>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          const isHighlight = item.highlight;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                isHighlight
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-600/30 hover:brightness-110 font-semibold"
                  : isActive
                  ? "bg-blue-600/20 text-blue-400 font-semibold border border-blue-500/30"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <Icon className={`w-5 h-5 shrink-0 ${isActive && !isHighlight ? "text-blue-400" : ""}`} />
              <span>{item.label}</span>
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
