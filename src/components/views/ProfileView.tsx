"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import {
  UserCheck,
  Truck,
  Star,
  ShieldCheck,
  CreditCard,
  Phone,
  Mail,
  Award,
  FileText,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

import { initialVehicle } from "@/lib/data";

export const ProfileView: React.FC = () => {
  const { driver, role, shipper } = useApp();

  const isDriver = role === "DRIVER";

  return (
    <div className="space-y-6 pb-12 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800">
          {isDriver ? "Hồ sơ đối tác Tài xế" : "Hồ sơ Chủ hàng Doanh nghiệp"}
        </h2>
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 flex items-center gap-1.5 border border-emerald-200">
          <UserCheck className="w-4 h-4" /> Đã xác thực eKYC CCCD cấp độ 2
        </span>
      </div>

      {/* Driver Card & Vehicle Card Split matching Screen 7 in image1.png */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Card: Thông tin tài xế matching image1.png */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-5">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-blue-100 border-2 border-blue-400 overflow-hidden shrink-0">
              <img
                src={driver.avatarUrl}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-slate-900">{driver.fullName}</h3>
              <div className="flex items-center gap-1 text-amber-500 text-xs font-bold mt-0.5">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>4.9 (128 đánh giá)</span>
              </div>
              <span className="inline-flex items-center gap-1 mt-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Tài xế đã xác thực
              </span>
            </div>
          </div>

          <div className="space-y-3 text-xs border-t border-slate-100 pt-4">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5" /> Số điện thoại:
              </span>
              <span className="font-semibold text-slate-800">{driver.phoneNumber}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" /> Email:
              </span>
              <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                <span>nguyenvana@gmail.com</span>
                <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5">
                  <CheckCircle2 className="w-3 h-3" /> Đã xác thực
                </span>
              </span>
            </div>
          </div>

          {/* Thông tin cá nhân matching image1.png */}
          <div className="border-t border-slate-100 pt-4 space-y-2 text-xs">
            <h4 className="font-bold text-slate-800 mb-2">Thông tin cá nhân</h4>
            <div className="grid grid-cols-3 gap-2 text-center p-3 rounded-xl bg-slate-50 border border-slate-100">
              <div>
                <span className="text-[10px] text-slate-400 block">Ngày sinh</span>
                <span className="font-bold text-slate-800">12/05/90</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Số CCCD</span>
                <span className="font-bold text-slate-800">024090000123</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Bằng lái</span>
                <span className="font-bold text-slate-800">2 năm (Hạng FC)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Card: Thông tin xe matching Screen 7 in image1.png */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Truck className="w-5 h-5 text-blue-600" />
              Thông tin xe
            </h3>
            <button className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1">
              <span>Quản lý xe</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center gap-4">
            <img
              src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=300&auto=format&fit=crop&q=80"
              alt="Truck"
              className="w-24 h-20 object-cover rounded-xl border border-slate-200 shadow-2xs shrink-0"
            />
            <div className="space-y-1 text-xs">
              <p className="text-slate-400">
                Biển số: <strong className="text-slate-900 text-sm font-mono">{initialVehicle.plateNumber}</strong>
              </p>
              <p className="text-slate-400">
                Loại xe: <strong className="text-slate-800">{initialVehicle.vehicleType}</strong>
              </p>
              <p className="text-slate-400">
                Tải trọng: <strong className="text-blue-600">{initialVehicle.maxPayloadKg / 1000} tấn</strong>
              </p>
              <p className="text-slate-400">
                Kích thước thùng: <strong className="text-slate-800">{initialVehicle.dimensions}</strong>
              </p>
            </div>
          </div>

          {/* Giấy tờ xe */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-2 text-xs">
            <div className="flex items-center justify-between text-slate-600">
              <span className="flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-slate-400" /> Cà vẹt xe:
              </span>
              <span className="font-bold text-emerald-600 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Đã đối soát
              </span>
            </div>
            <div className="flex items-center justify-between text-slate-600">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-slate-400" /> Đăng kiểm & Bảo hiểm:
              </span>
              <span className="font-bold text-emerald-600">Còn hạn đến 12/2027</span>
            </div>
          </div>
        </div>
      </div>

      {/* Thống kê hoạt động matching Screen 7 in image1.png */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900">Thống kê hoạt động & Uy tín</h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-center space-y-1">
            <span className="text-xs text-slate-500 font-medium">Tỷ lệ hoàn thành</span>
            <p className="text-2xl font-extrabold text-blue-600">98%</p>
            <span className="text-[10px] text-slate-400">125 / 128 chuyến</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-center space-y-1">
            <span className="text-xs text-slate-500 font-medium">Tỷ lệ nhận chuyến</span>
            <p className="text-2xl font-extrabold text-emerald-600">96%</p>
            <span className="text-[10px] text-slate-400">Rất tích cực nhận đơn</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-center space-y-1">
            <span className="text-xs text-slate-500 font-medium">Điểm đánh giá trung bình</span>
            <p className="text-2xl font-extrabold text-amber-500 flex items-center justify-center gap-1">
              <Star className="w-6 h-6 fill-amber-400 text-amber-400" />
              <span>4.9</span>
            </p>
            <span className="text-[10px] text-slate-400">Từ 128 chủ hàng</span>
          </div>
        </div>
      </div>
    </div>
  );
};
