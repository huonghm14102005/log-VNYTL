"use client";

import React, { useState } from "react";
import { Order } from "@/types";
import { formatVND } from "@/lib/currency";
import {
  MapPin,
  Truck,
  Navigation,
  Sparkles,
  Maximize2,
  Minimize2,
  ChevronDown,
  ChevronUp,
  Layers,
  Compass,
  ArrowRight,
  Info,
  Route,
  Zap,
} from "lucide-react";

interface MiniMarketMapProps {
  orders: Order[];
  hoveredOrderId?: string | null;
  selectedOrderId?: string | null;
  onSelectOrder?: (order: Order) => void;
  onSelectCity?: (city: string) => void;
  selectedCity?: string;
  onOpenFullMap?: () => void;
}

interface MapCityNode {
  id: string;
  name: string;
  shortName: string;
  x: number;
  y: number;
  description: string;
  isHub?: boolean;
}

const CITY_NODES: MapCityNode[] = [
  {
    id: "hanoi",
    name: "Hà Nội",
    shortName: "HN",
    x: 105,
    y: 135,
    description: "KCN Thăng Long / ICD Mỹ Đình",
    isHub: true,
  },
  {
    id: "bacninh",
    name: "Bắc Ninh",
    shortName: "BN",
    x: 155,
    y: 65,
    description: "KCN Quế Võ / Yên Phong (Samsung)",
  },
  {
    id: "haiduong",
    name: "Hải Dương",
    shortName: "HD",
    x: 275,
    y: 160,
    description: "KCN Đại An / Tân Trường (55km)",
  },
  {
    id: "hungyen",
    name: "Hưng Yên",
    shortName: "HY",
    x: 200,
    y: 215,
    description: "KCN Thăng Long II / Phố Nối",
  },
  {
    id: "haiphong",
    name: "Hải Phòng",
    shortName: "HP",
    x: 465,
    y: 195,
    description: "Cảng Quốc tế Đình Vũ / Lạch Huyện",
    isHub: true,
  },
  {
    id: "quangninh",
    name: "Quảng Ninh",
    shortName: "QN",
    x: 525,
    y: 105,
    description: "Hạ Long / Cảng Cái Lân",
  },
];

export const MiniMarketMap: React.FC<MiniMarketMapProps> = ({
  orders,
  hoveredOrderId,
  selectedOrderId,
  onSelectOrder,
  onSelectCity,
  selectedCity,
  onOpenFullMap,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isHeightLarge, setIsHeightLarge] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState<{
    city: MapCityNode;
    ordersCount: number;
    matchingOrders: Order[];
  } | null>(null);

  // Active highlighted order
  const activeOrder = orders.find((o) => o.id === (hoveredOrderId || selectedOrderId));

  // Count orders by city (origin or dest)
  const getCityOrderCount = (cityName: string) => {
    return orders.filter(
      (o) =>
        o.originCity.toLowerCase().includes(cityName.toLowerCase()) ||
        o.destCity.toLowerCase().includes(cityName.toLowerCase())
    ).length;
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden transition-all">
      {/* Header bar of Mini Map */}
      <div className="px-4 py-3 bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 text-white flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-blue-600/30 border border-blue-400/40 flex items-center justify-center text-blue-400">
            <Route className="w-4 h-4 text-blue-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-bold text-white tracking-wide flex items-center gap-1.5">
                Bản đồ luồng vận tải hành lang hai chiều
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  Trực quan thời gian thực
                </span>
              </h3>
            </div>
            <p className="text-[11px] text-slate-300">
              Trục Cao tốc CT04 (Hà Nội - Hải Phòng) & QL5 • Bán kính kết nối 120 km
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5">
          {/* Height Switcher */}
          {isExpanded && (
            <button
              onClick={() => setIsHeightLarge(!isHeightLarge)}
              title={isHeightLarge ? "Thu nhỏ chiều cao" : "Mở rộng góc nhìn"}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 text-xs transition-all cursor-pointer flex items-center gap-1"
            >
              <Layers className="w-3.5 h-3.5" />
              <span className="text-[10px] font-medium hidden sm:inline">
                {isHeightLarge ? "Góc chuẩn" : "Mở rộng"}
              </span>
            </button>
          )}

          {/* Jump to Full Tracking Map */}
          {onOpenFullMap && (
            <button
              onClick={onOpenFullMap}
              title="Xem bản đồ điều hướng chi tiết"
              className="p-1.5 rounded-lg bg-blue-600/80 hover:bg-blue-600 text-white text-xs transition-all cursor-pointer flex items-center gap-1 shadow-2xs"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span className="text-[10px] font-bold hidden sm:inline">Toàn màn hình</span>
            </button>
          )}

          {/* Collapse/Expand Mini Map */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            title={isExpanded ? "Thu gọn bản đồ" : "Mở bản đồ"}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 transition-all cursor-pointer"
          >
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Map Body Content */}
      {isExpanded && (
        <div className="relative bg-[#E8EDF2] select-none transition-all">
          {/* Map canvas container */}
          <div
            className={`w-full relative overflow-hidden transition-all duration-300 ${
              isHeightLarge ? "h-72 sm:h-80" : "h-52 sm:h-60"
            }`}
          >
            {/* Map subtle grid texture */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `radial-gradient(#64748b 1px, transparent 1px)`,
                backgroundSize: "20px 20px",
              }}
            />

            {/* Geographical rivers / coast background accents */}
            <svg
              className="w-full h-full absolute inset-0"
              viewBox="0 0 600 280"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                {/* Gradient for Expressway CT04 */}
                <linearGradient id="ct04Gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#2563EB" />
                  <stop offset="50%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#0EA5E9" />
                </linearGradient>

                {/* Highlight Glow for active order */}
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="glow" />
                  <feMerge>
                    <feMergeNode in="glow" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Waterway / Coastal line representation (Vịnh Bắc Bộ & Sông Hồng) */}
              <path
                d="M 540,0 Q 560,90 530,160 T 570,280 L 600,280 L 600,0 Z"
                fill="#CBD5E1"
                opacity="0.5"
              />
              <path
                d="M 70,0 Q 120,80 180,180 T 270,280"
                fill="none"
                stroke="#BFDBFE"
                strokeWidth="10"
                opacity="0.4"
                strokeLinecap="round"
              />

              {/* Highway Corridor 1: QL5 Cũ (Đường màu xám kết nối Hải Phòng - Hải Dương - Hà Nội) */}
              <path
                d="M 105,135 Q 275,140 465,195"
                fill="none"
                stroke="#94A3B8"
                strokeWidth="7"
                strokeLinecap="round"
                opacity="0.8"
              />
              <path
                d="M 105,135 Q 275,140 465,195"
                fill="none"
                stroke="#F1F5F9"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                strokeLinecap="round"
              />

              {/* Highway Corridor 2: Cao tốc Hà Nội - Hải Phòng (CT04 / 5B - Đường chính nối Cảng Đình Vũ) */}
              <path
                d="M 105,145 C 210,235 340,240 465,195"
                fill="none"
                stroke="#1E293B"
                strokeWidth="8"
                strokeLinecap="round"
              />
              <path
                d="M 105,145 C 210,235 340,240 465,195"
                fill="none"
                stroke="url(#ct04Gradient)"
                strokeWidth="4"
                strokeLinecap="round"
              />

              {/* Highway Corridor 3: Nhánh Bắc Ninh - Hải Phòng (QL18 / QL10) */}
              <path
                d="M 155,65 Q 290,95 465,195"
                fill="none"
                stroke="#64748B"
                strokeWidth="4"
                strokeDasharray="5 3"
                opacity="0.7"
              />

              {/* Highway Corridor 4: Hải Phòng - Quảng Ninh (Cao tốc Bạch Đằng) */}
              <path
                d="M 465,195 Q 490,140 525,105"
                fill="none"
                stroke="#0284C7"
                strokeWidth="5"
                strokeLinecap="round"
              />

              {/* Active Route Highlight (if an order is hovered or selected) */}
              {activeOrder && (
                <g filter="url(#glow)">
                  <path
                    d="M 105,145 C 210,235 340,240 465,195"
                    fill="none"
                    stroke="#F59E0B"
                    strokeWidth="6"
                    strokeLinecap="round"
                    className="animate-pulse"
                  />
                  <path
                    d="M 105,145 C 210,235 340,240 465,195"
                    fill="none"
                    stroke="#FEF08A"
                    strokeWidth="2"
                    strokeDasharray="6 4"
                  />
                </g>
              )}

              {/* Road Highway Tags */}
              <g transform="translate(260, 238)">
                <rect x="-32" y="-10" width="64" height="18" rx="4" fill="#1E3A8A" opacity="0.9" />
                <text x="0" y="3" fill="#FFFFFF" fontSize="9" fontWeight="bold" textAnchor="middle">
                  CT04 • 5B
                </text>
              </g>

              <g transform="translate(270, 133)">
                <rect x="-24" y="-8" width="48" height="16" rx="4" fill="#475569" opacity="0.8" />
                <text x="0" y="4" fill="#FFFFFF" fontSize="8" fontWeight="bold" textAnchor="middle">
                  QL5
                </text>
              </g>

              {/* Animated Empty Return Truck along CT04 (Hải Phòng -> Hà Nội) */}
              <g transform="translate(330, 218)">
                <circle r="16" fill="#3B82F6" opacity="0.2" className="animate-ping" />
                <rect x="-14" y="-10" width="28" height="20" rx="5" fill="#0F172A" stroke="#38BDF8" strokeWidth="1.5" />
                <path d="M -5,-3 L 5,-3 M -5,2 L 3,2" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
                {/* Truck tooltip label */}
                <g transform="translate(0, -18)">
                  <rect x="-50" y="-12" width="100" height="16" rx="4" fill="#1E293B" opacity="0.95" />
                  <text x="0" y="-1" fill="#38BDF8" fontSize="8" fontWeight="bold" textAnchor="middle">
                    Xe về rỗng • 29H-123.45 (-25%)
                  </text>
                </g>
              </g>

              {/* City Waypoint Nodes */}
              {CITY_NODES.map((city) => {
                const count = getCityOrderCount(city.name);
                const isSelected = selectedCity?.toLowerCase().includes(city.name.toLowerCase());
                const isOrigin = activeOrder?.originCity.toLowerCase().includes(city.name.toLowerCase());
                const isDest = activeOrder?.destCity.toLowerCase().includes(city.name.toLowerCase());
                const isHighlighted = isOrigin || isDest || isSelected;

                return (
                  <g
                    key={city.id}
                    transform={`translate(${city.x}, ${city.y})`}
                    className="cursor-pointer group"
                    onClick={() => onSelectCity && onSelectCity(city.name)}
                    onMouseEnter={() => {
                      const matched = orders.filter(
                        (o) =>
                          o.originCity.toLowerCase().includes(city.name.toLowerCase()) ||
                          o.destCity.toLowerCase().includes(city.name.toLowerCase())
                      );
                      setActiveTooltip({
                        city,
                        ordersCount: count,
                        matchingOrders: matched,
                      });
                    }}
                    onMouseLeave={() => setActiveTooltip(null)}
                  >
                    {/* Pulsing ring for active hubs */}
                    {(city.isHub || isHighlighted) && (
                      <circle
                        r={isHighlighted ? "18" : "13"}
                        fill={isOrigin ? "#10B981" : isDest ? "#EF4444" : "#2563EB"}
                        opacity="0.25"
                        className="animate-pulse"
                      />
                    )}

                    {/* Main Node Circle */}
                    <circle
                      r={city.isHub ? "9" : "7"}
                      fill={
                        isOrigin
                          ? "#10B981"
                          : isDest
                          ? "#EF4444"
                          : isHighlighted
                          ? "#2563EB"
                          : city.isHub
                          ? "#1E293B"
                          : "#475569"
                      }
                      stroke="#FFFFFF"
                      strokeWidth="2.5"
                      className="transition-all duration-200 group-hover:scale-125"
                    />

                    {/* Order count badge */}
                    {count > 0 && (
                      <g transform="translate(8, -10)">
                        <circle r="7" fill="#2563EB" stroke="#FFFFFF" strokeWidth="1.5" />
                        <text
                          x="0"
                          y="3"
                          fill="#FFFFFF"
                          fontSize="8"
                          fontWeight="bold"
                          textAnchor="middle"
                        >
                          {count}
                        </text>
                      </g>
                    )}

                    {/* City Label */}
                    <text
                      x="0"
                      y={city.y > 180 ? 20 : -14}
                      fill="#0F172A"
                      fontSize="11"
                      fontWeight="bold"
                      textAnchor="middle"
                      className="drop-shadow-xs group-hover:fill-blue-600 transition-colors"
                    >
                      {city.name}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Quick Interactive Hover Tooltip Box */}
            {activeTooltip && (
              <div
                className="absolute z-20 bg-slate-900/95 text-white backdrop-blur-md px-3 py-2 rounded-xl text-xs shadow-xl border border-slate-700 pointer-events-none transition-all duration-150 animate-fadeIn"
                style={{
                  left: Math.min(Math.max(activeTooltip.city.x * 0.9 - 60, 10), 380),
                  top: Math.max(activeTooltip.city.y * 0.8 - 70, 8),
                }}
              >
                <div className="flex items-center gap-1.5 font-bold text-blue-300">
                  <MapPin className="w-3 h-3 text-blue-400" />
                  <span>{activeTooltip.city.name}</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-blue-500/30 text-blue-200">
                    {activeTooltip.city.shortName}
                  </span>
                </div>
                <p className="text-[10px] text-slate-300">{activeTooltip.city.description}</p>
                <div className="mt-1 pt-1 border-t border-slate-800 flex items-center justify-between gap-3 text-[10px]">
                  <span className="text-slate-400">Đơn hàng đi/đến:</span>
                  <strong className="text-amber-300 font-bold">
                    {activeTooltip.ordersCount} chuyến
                  </strong>
                </div>
              </div>
            )}

            {/* In-Map Floating Legend / Corridor Info */}
            <div className="absolute bottom-2 left-2 z-10 flex flex-wrap items-center gap-1.5 bg-white/90 backdrop-blur-md px-2.5 py-1.5 rounded-xl border border-slate-200/90 text-[10px] shadow-xs">
              <span className="font-bold text-slate-700 flex items-center gap-1">
                <Compass className="w-3 h-3 text-blue-600" />
                Chú giải:
              </span>
              <span className="inline-flex items-center gap-1 text-slate-600">
                <span className="w-2.5 h-1 rounded bg-blue-600"></span> Cao tốc CT04
              </span>
              <span className="inline-flex items-center gap-1 text-slate-600">
                <span className="w-2.5 h-1 rounded bg-slate-400"></span> QL5
              </span>
              <span className="inline-flex items-center gap-1 text-emerald-700 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Điểm lấy
              </span>
              <span className="inline-flex items-center gap-1 text-red-700 font-medium">
                <span className="w-2 h-2 rounded-full bg-red-500"></span> Điểm giao
              </span>
              <span className="inline-flex items-center gap-1 text-blue-700 font-medium">
                <Truck className="w-3 h-3 text-blue-600" /> Xe rỗng (-25%)
              </span>
            </div>

            {/* Floating Live Corridor Status Badge */}
            <div className="absolute top-2 right-2 z-10 hidden sm:flex items-center gap-2 bg-slate-900/85 backdrop-blur-md text-white px-3 py-1.5 rounded-xl text-[11px] border border-slate-700/60 shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>
                Hành lang <strong>Hải Phòng ⇄ Hà Nội</strong>: <strong>120 km</strong> (~1h45p)
              </span>
            </div>
          </div>

          {/* Active order route status bar when hovered or selected */}
          {activeOrder && (
            <div className="px-4 py-2 bg-amber-50/95 border-t border-amber-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-amber-500 text-slate-950 font-extrabold text-[10px]">
                  ĐANG CHỌN ĐƠN
                </span>
                <span className="font-bold text-slate-900">
                  {activeOrder.originCity} → {activeOrder.destCity}
                </span>
                <span className="text-slate-500">({activeOrder.cargoName})</span>
                <span className="font-semibold text-blue-700">
                  {formatVND(activeOrder.freightPrice)}
                </span>
              </div>
              <div className="flex items-center gap-3 text-slate-600 text-[11px]">
                <span>Khoảng cách: <strong>{activeOrder.distanceKm} km</strong></span>
                {activeOrder.isReturnTripMatch && (
                  <span className="text-emerald-700 font-bold bg-emerald-100/80 px-2 py-0.5 rounded">
                    Khớp xe về rỗng
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
