"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { formatVND } from "@/lib/currency";
import { Truck, MapPin, Clock, ChevronRight, ShieldCheck, CheckCircle2 } from "lucide-react";

export const MyOrdersView: React.FC = () => {
  const { orders, setSelectedOrder, setActiveTab, role, confirmReleaseEscrow } = useApp();

  const [activeStatusTab, setActiveStatusTab] = useState<string>("ALL");

  const tabs = [
    { id: "ALL", label: "Tất cả", count: orders.length },
    {
      id: "WAITING",
      label: "Chờ nhận",
      count: orders.filter((o) => o.status === "SEARCHING" || o.status === "WAITING_ESCROW_PAYMENT").length,
    },
    {
      id: "RUNNING",
      label: "Đang chạy",
      count: orders.filter((o) => o.status === "IN_TRANSIT" || o.status === "PICKING_UP" || o.status === "MATCHED_ESCROWED").length,
    },
    {
      id: "DELIVERED",
      label: "Đã giao",
      count: orders.filter((o) => o.status === "DELIVERED" || o.status === "COMPLETED").length,
    },
    { id: "CANCELLED", label: "Đã hủy", count: 0 },
  ];

  const filteredOrders = orders.filter((o) => {
    if (activeStatusTab === "WAITING") {
      return o.status === "SEARCHING" || o.status === "WAITING_ESCROW_PAYMENT";
    }
    if (activeStatusTab === "RUNNING") {
      return o.status === "IN_TRANSIT" || o.status === "PICKING_UP" || o.status === "MATCHED_ESCROWED";
    }
    if (activeStatusTab === "DELIVERED") {
      return o.status === "DELIVERED" || o.status === "COMPLETED";
    }
    if (activeStatusTab === "CANCELLED") {
      return o.status === "CANCELLED";
    }
    return true;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "IN_TRANSIT":
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700">Đang vận chuyển</span>;
      case "PICKING_UP":
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700">Đang lấy hàng</span>;
      case "WAITING_ESCROW_PAYMENT":
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-700">Chờ cước Escrow (30p)</span>;
      case "DELIVERED":
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-cyan-100 text-cyan-700">Đã giao (Chờ duyệt e-POD)</span>;
      case "COMPLETED":
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">Đã hoàn thành & Giải ngân</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600">Đang tìm xe</span>;
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800">
          {role === "DRIVER" ? "Chuyến của tôi" : "Đơn hàng của tôi"}
        </h2>
        <span className="text-xs text-slate-500 font-medium">
          Quản lý theo thời gian thực (FSM Workflow)
        </span>
      </div>

      {/* Status Filter Tabs matching Screen 4 in image1.png */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveStatusTab(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeStatusTab === tab.id
                ? "bg-blue-600 text-white shadow-xs"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                activeStatusTab === tab.id ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Order Cards List matching image1.png */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <div
            key={order.id}
            className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs hover:border-blue-300 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
          >
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-3">
                <span className="text-xs font-extrabold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100 font-mono">
                  #{order.orderCode}
                </span>
                {getStatusBadge(order.status)}
              </div>

              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                {order.originCity} ➔ {order.destCity}
                <span className="text-xs font-normal text-slate-400">({order.distanceKm} km)</span>
              </h3>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 font-medium">
                <span>📦 {order.cargoName}</span>
                <span>⚖️ {order.cargoWeightKg / 1000} tấn</span>
                <span>🚚 {order.vehicleTypeRequired}</span>
              </div>

              <div className="flex flex-wrap items-center gap-x-4 text-xs text-slate-600">
                <span>Nhận: {order.pickupTime}</span>
                <span>•</span>
                <span>Giao: {order.deliveryTime}</span>
              </div>
            </div>

            {/* Price & Actions */}
            <div className="text-left md:text-right shrink-0 w-full md:w-auto flex md:flex-col justify-between items-end gap-2.5 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
              <div>
                <span className="text-[11px] text-slate-400 block">Cước vận chuyển</span>
                <p className="text-lg font-extrabold text-blue-600">{formatVND(order.freightPrice)}</p>
              </div>

              <div className="flex items-center gap-2">
                {role === "SHIPPER" && order.status === "DELIVERED" && (
                  <button
                    onClick={() => confirmReleaseEscrow(order.id)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-xs transition-all flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Xác nhận nhận đủ hàng & Giải ngân
                  </button>
                )}

                <button
                  onClick={() => {
                    setSelectedOrder(order);
                    setActiveTab(order.status === "IN_TRANSIT" ? "map" : "order-detail");
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-xs transition-all flex items-center gap-1.5"
                >
                  Xem chi tiết
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
