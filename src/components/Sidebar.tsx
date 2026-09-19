"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import {
  LayoutDashboard,
  Search,
  Truck,
  MapPin,
  Wallet,
  Star,
  LifeBuoy,
  User,
  Settings,
  PlusCircle,
  Package,
} from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  highlight?: boolean;
}

export const Sidebar: React.FC = () => {
  const { role, activeTab, setActiveTab } = useApp();

  const driverNavItems: NavItem[] = [
    { id: "dashboard", label: "Tổng quan", icon: LayoutDashboard },
    { id: "market", label: "Tìm hàng", icon: Search },
    { id: "my-orders", label: "Chuyến của tôi", icon: Truck },
    { id: "map", label: "Bản đồ", icon: MapPin },
    { id: "wallet", label: "Thu nhập", icon: Wallet },
    { id: "reviews", label: "Đánh giá", icon: Star },
    { id: "services", label: "Dịch vụ hỗ trợ", icon: LifeBuoy },
    { id: "profile", label: "Hồ sơ tài xế", icon: User },
    { id: "settings", label: "Cài đặt", icon: Settings },
  ];

  const shipperNavItems: NavItem[] = [
    { id: "dashboard", label: "Tổng quan", icon: LayoutDashboard },
    { id: "create-order", label: "+ Tạo đơn mới", icon: PlusCircle, highlight: true },
    { id: "my-orders", label: "Đơn hàng của tôi", icon: Package },
    { id: "market", label: "Chợ xe về rỗng", icon: Truck },
    { id: "map", label: "Theo dõi hành trình", icon: MapPin },
    { id: "wallet", label: "Thanh toán & Escrow", icon: Wallet },
    { id: "reviews", label: "Đánh giá tài xế", icon: Star },
    { id: "services", label: "Trung tâm hỗ trợ", icon: LifeBuoy },
    { id: "profile", label: "Hồ sơ chủ hàng", icon: User },
    { id: "settings", label: "Cài đặt", icon: Settings },
  ];

  const navItems = role === "SHIPPER" ? shipperNavItems : driverNavItems;

  return (
    <aside className="w-64 bg-[#0F172A] text-slate-300 flex flex-col h-screen shrink-0 border-r border-slate-800 select-none">
      {/* Brand Logo */}
      <div className="p-5 flex items-center gap-3 border-b border-slate-800/80">
        <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
          <Truck className="w-6 h-6" />
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
