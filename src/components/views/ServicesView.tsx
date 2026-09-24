"use client";

import React from "react";
import LocalParkingRoundedIcon from "@mui/icons-material/LocalParkingRounded";
import HotelRoundedIcon from "@mui/icons-material/HotelRounded";
import RestaurantRoundedIcon from "@mui/icons-material/RestaurantRounded";
import LocalGasStationRoundedIcon from "@mui/icons-material/LocalGasStationRounded";
import BuildRoundedIcon from "@mui/icons-material/BuildRounded";
import EmergencyRoundedIcon from "@mui/icons-material/EmergencyRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

export const ServicesView: React.FC = () => {
  const services = [
    {
      title: "Bãi đỗ xe",
      desc: "Tìm bãi đỗ xe an toàn gần bạn",
      icon: LocalParkingRoundedIcon,
      color: "text-blue-600 bg-blue-50",
    },
    {
      title: "Trạm nghỉ",
      desc: "Nghỉ ngơi, tắm rửa, vệ sinh tiện nghi",
      icon: HotelRoundedIcon,
      color: "text-indigo-600 bg-indigo-50",
    },
    {
      title: "Ăn uống",
      desc: "Nhà hàng, quán ăn uy tín cho cánh tài xế",
      icon: RestaurantRoundedIcon,
      color: "text-amber-600 bg-amber-50",
    },
    {
      title: "Nhiên liệu",
      desc: "Trạm xăng dầu chính hãng chiết khấu cao",
      icon: LocalGasStationRoundedIcon,
      color: "text-emerald-600 bg-emerald-50",
    },
    {
      title: "Sửa chữa",
      desc: "Garage, vá lốp lưu động, cứu hộ xe tải 24/7",
      icon: BuildRoundedIcon,
      color: "text-cyan-600 bg-cyan-50",
    },
    {
      title: "Cứu hộ khẩn cấp",
      desc: "ATM, bảo hiểm, đường dây nóng hỗ trợ dọc tuyến",
      icon: EmergencyRoundedIcon,
      color: "text-red-600 bg-red-50",
    },
  ];

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h2 className="text-xl font-bold text-slate-800">Dịch vụ hỗ trợ tài xế dọc tuyến</h2>
        <p className="text-xs text-slate-500">Tiện ích phục vụ hành trình an toàn, thuận lợi trên mọi cung đường</p>
      </div>

      {/* Grid 6 Services matching Screen 8 in image1.png */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={i}
              className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-blue-300 hover:shadow-md transition-all cursor-pointer flex items-center gap-4 group"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${item.color}`}>
                <Icon className="!w-6 !h-6" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-500 mt-0.5 leading-tight">{item.desc}</p>
              </div>
              <ChevronRightRoundedIcon className="!w-5 !h-5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
            </div>
          );
        })}
      </div>

      {/* Banner Truckers' Home matching Screen 8 in image1.png */}
      <div className="rounded-2xl overflow-hidden relative border border-slate-200 shadow-md bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between">
        <div className="p-8 space-y-3 z-10 max-w-lg">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-600 text-white inline-flex items-center gap-1.5">
            <AutoAwesomeRoundedIcon className="!w-3.5 !h-3.5" /> Hệ sinh thái TruckLoad
          </span>
          <h3 className="text-2xl font-extrabold tracking-tight">Truckers' Home</h3>
          <p className="text-slate-300 text-xs leading-relaxed">
            Mạng lưới trạm dừng chân đạt chuẩn dọc quốc lộ 5 và cao tốc Hà Nội - Hải Phòng. Nghỉ ngơi - Ăn uống - Tắm rửa - Bảo dưỡng miễn phí cho tài xế của sàn.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-6 py-2.5 rounded-xl transition-all shadow-md">
            Khám phá ngay
          </button>
        </div>

        <div className="w-full md:w-96 h-56 md:h-64 relative shrink-0">
          <img
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=500&auto=format&fit=crop&q=80"
            alt="Truckers Rest Stop"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-slate-900 via-transparent to-transparent"></div>
        </div>
      </div>
    </div>
  );
};
