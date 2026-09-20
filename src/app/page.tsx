"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { DashboardView } from "@/components/views/DashboardView";
import { MarketView } from "@/components/views/MarketView";
import { OrderDetailView } from "@/components/views/OrderDetailView";
import { MyOrdersView } from "@/components/views/MyOrdersView";
import { CreateOrderView } from "@/components/views/CreateOrderView";
import { MapView } from "@/components/views/MapView";
import { WalletView } from "@/components/views/WalletView";
import { ProfileView } from "@/components/views/ProfileView";
import { ServicesView } from "@/components/views/ServicesView";
import { SettingsView } from "@/components/views/SettingsView";
import { AdminView } from "@/components/views/AdminView";
import { ChatModal } from "@/components/ChatModal";
import { MessageSquare } from "lucide-react";

export default function Home() {
  const { activeTab, role, toastMessage } = useApp();
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Render view router based on role and activeTab
  const renderActiveView = () => {
    if (role === "ADMIN") {
      switch (activeTab) {
        case "admin":
        case "admin-ekyc":
        case "admin-escrow":
        case "admin-disputes":
        case "dashboard":
          return <AdminView />;
        case "admin-orders":
        case "my-orders":
          return <MyOrdersView />;
        case "settings":
          return <SettingsView />;
        case "wallet":
          return <WalletView />;
        case "map":
          return <MapView />;
        default:
          return <AdminView />;
      }
    }

    switch (activeTab) {
      case "dashboard":
        return <DashboardView />;
      case "market":
        return <MarketView />;
      case "order-detail":
        return <OrderDetailView />;
      case "my-orders":
        return <MyOrdersView />;
      case "create-order":
        return <CreateOrderView />;
      case "map":
        return <MapView />;
      case "wallet":
        return <WalletView />;
      case "profile":
        return <ProfileView />;
      case "services":
        return <ServicesView />;
      case "settings":
        return <SettingsView />;
      case "admin":
        return <AdminView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden text-slate-900">
      {/* 1. Left Sidebar Navigation matching image1.png */}
      <Sidebar />

      {/* 2. Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <Header />

        {/* Scrollable Main View Container */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          {renderActiveView()}
        </main>
      </div>

      {/* Floating Chat Button */}
      <button
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-blue-600 hover:bg-blue-700 text-white p-3.5 rounded-full shadow-lg shadow-blue-500/30 flex items-center justify-center transition-all hover:scale-105"
        title="Mở phòng Chat nội bộ"
      >
        <MessageSquare className="w-5 h-5" />
      </button>

      {/* In-App Chat Modal */}
      <ChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white text-xs font-semibold px-5 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-2.5 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
