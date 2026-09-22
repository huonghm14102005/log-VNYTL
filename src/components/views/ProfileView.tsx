"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { DriverKycModal } from "@/components/DriverKycModal";
import {
  UserCheck,
  Truck,
  Star,
  ShieldCheck,
  ShieldAlert,
  Clock,
  CreditCard,
  Phone,
  Mail,
  Award,
  FileText,
  CheckCircle2,
  ArrowRight,
  Building2,
  MapPin,
  Calendar,
  Briefcase,
  PlusCircle,
  Hash,
  Check,
} from "lucide-react";
import { Vehicle } from "@/types";

export const ProfileView: React.FC = () => {
  const { driver, role, shipper, setShipper, driverVehicles, addDriverVehicle, setDefaultVehicle } = useApp();
  const [isKycModalOpen, setIsKycModalOpen] = useState(false);
  const [isAddVehicleOpen, setIsAddVehicleOpen] = useState(false);

  // New vehicle form state for driver
  const [newPlate, setNewPlate] = useState("");
  const [newType, setNewType] = useState("Xe tải thùng kín");
  const [newBrand, setNewBrand] = useState("");
  const [newPayload, setNewPayload] = useState(8000);
  const [newDimensions, setNewDimensions] = useState("6.5 x 2.2 x 2.4 m");

  // Shipper profile mode (Doanh nghiệp vs Cá nhân theo ghi chú feedback: Hồ sơ k doanh nghiệp)
  const isDriver = role === "DRIVER";
  const [isCorporate, setIsCorporate] = useState(!shipper.isIndividual);

  const handleAddVehicleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlate) return;
    addDriverVehicle({
      plateNumber: newPlate,
      vehicleType: newType,
      brand: newBrand || `${newType} (${newPayload / 1000} tấn)`,
      maxPayloadKg: Number(newPayload),
      dimensions: newDimensions,
      isVerified: true,
      isDefault: false,
    });
    setNewPlate("");
    setNewBrand("");
    setIsAddVehicleOpen(false);
  };

  return (
    <div className="space-y-6 pb-12 max-w-5xl mx-auto">
      {/* 1. Header & Role Verification Status */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            {isDriver ? (
              <>
                <Truck className="w-5 h-5 text-blue-600" />
                <span>Hồ sơ Đối tác Tài xế</span>
              </>
            ) : (
              <>
                <Building2 className="w-5 h-5 text-indigo-600" />
                <span>{isCorporate ? "Hồ sơ Doanh nghiệp Chủ hàng" : "Hồ sơ Chủ hàng Cá nhân"}</span>
              </>
            )}
          </h2>
          <p className="text-xs text-slate-500">
            {isDriver
              ? "Quản lý giấy tờ pháp lý, bằng lái và danh sách đội xe nhận chuyến"
              : "Thông tin đơn vị gửi hàng, mã số thuế và hồ sơ liên kết ký quỹ Escrow"}
          </p>
        </div>

        {isDriver ? (
          <button
            onClick={() => setIsKycModalOpen(true)}
            className="transition-transform hover:scale-105"
          >
            {driver.kycStatus === "VERIFIED" ? (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 flex items-center gap-1.5 border border-emerald-200 shadow-xs cursor-pointer">
                <UserCheck className="w-4 h-4" /> Đã xác thực eKYC CCCD Cấp độ 2 (Bộ GTVT)
              </span>
            ) : driver.kycStatus === "PENDING" ? (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 flex items-center gap-1.5 border border-amber-300 shadow-xs cursor-pointer animate-pulse">
                <Clock className="w-4 h-4" /> Hồ sơ eKYC CCCD đang chờ thẩm duyệt
              </span>
            ) : (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 flex items-center gap-1.5 border border-rose-200 shadow-xs cursor-pointer">
                <ShieldAlert className="w-4 h-4" /> Chưa hoàn tất eKYC CCCD (Bấm để nộp)
              </span>
            )}
          </button>
        ) : (
          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
            <button
              onClick={() => {
                setIsCorporate(true);
                setShipper((prev) => ({ ...prev, isIndividual: false }));
              }}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                isCorporate
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Doanh nghiệp
            </button>
            <button
              onClick={() => {
                setIsCorporate(false);
                setShipper((prev) => ({ ...prev, isIndividual: true }));
              }}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                !isCorporate
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Cá nhân gửi hàng
            </button>
          </div>
        )}
      </div>

      {/* ==================== PHẦN 1: GIAO DIỆN CHỦ HÀNG (SHIPPER) ==================== */}
      {!isDriver && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Thẻ 1: Thông tin pháp nhân / Doanh nghiệp gửi hàng */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900">
                      {isCorporate ? shipper.companyName : shipper.fullName}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {isCorporate ? "Doanh nghiệp Xuất Nhập Khẩu" : "Chủ hàng cá nhân"}
                    </p>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Đã xác thực
                </span>
              </div>

              <div className="space-y-2.5 text-xs">
                {isCorporate && (
                  <>
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-slate-400 font-medium">Tên công ty:</span>
                      <span className="font-bold text-slate-800 text-right">
                        Công ty TNHH Xuất nhập khẩu Âu Lạc
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 font-medium">Mã số thuế:</span>
                      <span className="font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                        0201889988
                      </span>
                    </div>

                    <div className="flex items-start justify-between gap-2">
                      <span className="text-slate-400 font-medium">Ngành nghề kinh doanh:</span>
                      <span className="font-semibold text-slate-800 text-right">
                        Xuất nhập khẩu nông sản, máy móc cơ khí & vật tư
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 font-medium">Ngày thành lập:</span>
                      <span className="font-semibold text-slate-800">15/08/2018</span>
                    </div>

                    <div className="flex items-start justify-between gap-2 pt-1 border-t border-slate-100">
                      <span className="text-slate-400 font-medium flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" /> Địa chỉ trụ sở:
                      </span>
                      <span className="font-medium text-slate-800 text-right max-w-xs">
                        Số 68 Đường Lê Thánh Tông, Ngô Quyền, Hải Phòng
                      </span>
                    </div>
                  </>
                )}

                {!isCorporate && (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 font-medium">Họ và tên chủ hàng:</span>
                      <span className="font-bold text-slate-800">{shipper.fullName}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 font-medium">Số Căn cước công dân:</span>
                      <span className="font-mono font-bold text-slate-800">001085009988</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 font-medium">Địa chỉ gửi hàng thường xuyên:</span>
                      <span className="font-semibold text-slate-800">Quận Hải An, TP. Hải Phòng</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Thẻ 2: Người đại diện & Đầu mối liên hệ */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-2 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-indigo-600" />
                Người đại diện & Đầu mối giao dịch
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 font-medium">Họ và tên đại diện:</span>
                  <span className="font-bold text-slate-900">{shipper.fullName}</span>
                </div>

                {isCorporate && (
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-medium">Chức vụ trong doanh nghiệp:</span>
                    <span className="font-bold text-slate-800">Trưởng phòng Xuất Nhập Khẩu & Logistics</span>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span className="text-slate-400 font-medium flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5" /> Điện thoại liên hệ:
                  </span>
                  <span className="font-bold text-indigo-600">0912.888.666</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400 font-medium flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5" /> Email giao dịch:
                  </span>
                  <span className="font-semibold text-slate-800">logistics@aulac-imex.com.vn</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1 mt-2">
                  <p className="text-[11px] font-bold text-slate-700">Tài khoản ngân hàng đối soát ký quỹ:</p>
                  <p className="text-xs font-mono font-bold text-slate-900">Vietcombank - 0031000889988</p>
                  <p className="text-[10px] text-slate-400">Chủ TK: CONG TY TNHH XNK AU LAC</p>
                </div>
              </div>
            </div>
          </div>

          {/* Thẻ 3: Hồ sơ pháp lý & Thông tin vận chuyển thường dùng (matching image4.png) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Hồ sơ pháp lý */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
              <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-2">
                <FileText className="w-4 h-4 text-indigo-600" />
                Hồ sơ pháp lý
              </h4>

              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
                  <span className="font-medium text-slate-700">Giấy phép kinh doanh</span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-700">
                    Còn hạn đến 2028
                  </span>
                </div>

                <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
                  <span className="font-medium text-slate-700">Mã số thuế</span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-700">
                    Đã xác thực
                  </span>
                </div>

                <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
                  <span className="font-medium text-slate-700">CCCD người đại diện</span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-700">
                    Đã xác thực
                  </span>
                </div>

                <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
                  <span className="font-medium text-slate-700">Tài khoản ngân hàng</span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-700">
                    Đã liên kết Escrow
                  </span>
                </div>
              </div>
            </div>

            {/* Thông tin vận chuyển thường dùng */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
              <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-2">
                <Truck className="w-4 h-4 text-indigo-600" />
                Thông tin vận chuyển thường dùng
              </h4>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 font-medium">Tần suất gửi hàng:</span>
                  <span className="font-extrabold text-slate-800">~8 đơn / tháng</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400 font-medium">Tuyến thường dùng:</span>
                  <span className="font-extrabold text-indigo-700">Hải Phòng – Hà Nội</span>
                </div>

                <div className="space-y-1">
                  <span className="text-slate-400 font-medium block">Loại hàng thường gửi:</span>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-2.5 py-1 rounded-lg bg-slate-100 font-semibold text-slate-700">Hàng tiêu dùng</span>
                    <span className="px-2.5 py-1 rounded-lg bg-slate-100 font-semibold text-slate-700">Điện tử</span>
                    <span className="px-2.5 py-1 rounded-lg bg-slate-100 font-semibold text-slate-700">Máy móc</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-slate-400 font-medium block">Loại xe thường thuê:</span>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 font-semibold border border-blue-200">Xe tải thùng kín</span>
                    <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 font-semibold border border-blue-200">10–15 tấn</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================== PHẦN 2: GIAO DIỆN TÀI XẾ (DRIVER) ==================== */}
      {isDriver && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Thông tin tài xế */}
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
                  <span className="font-semibold text-slate-800">{driver.email || "nguyenvana@gmail.com"}</span>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-4 space-y-2 text-xs">
                <h4 className="font-bold text-slate-800 mb-2">Thông tin định danh CCCD & Bằng lái</h4>
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
                    <span className="font-bold text-slate-800">Hạng FC</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Thẻ Quản lý Phương tiện & Đăng ký thêm xe (1 tài xế dùng nhiều xe) */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Truck className="w-5 h-5 text-blue-600" />
                    Đội xe của tôi ({driverVehicles.length} xe)
                  </h3>
                  <p className="text-[11px] text-slate-400">1 tài xế có thể đăng ký & chuyển đổi nhiều xe</p>
                </div>
                <button
                  onClick={() => setIsAddVehicleOpen(true)}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs transition-all"
                >
                  <PlusCircle className="w-4 h-4" />
                  + Đăng ký xe mới
                </button>
              </div>

              {/* Danh sách xe đã đăng ký */}
              <div className="space-y-3">
                {driverVehicles.map((veh) => (
                  <div
                    key={veh.id}
                    className={`p-3.5 rounded-xl border transition-all flex items-start justify-between gap-3 ${
                      veh.isDefault
                        ? "border-blue-500 bg-blue-50/40 ring-1 ring-blue-400"
                        : "border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-extrabold text-sm text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200 shadow-2xs">
                          {veh.plateNumber}
                        </span>
                        {veh.isDefault && (
                          <span className="text-[10px] font-bold bg-blue-600 text-white px-2 py-0.5 rounded-full flex items-center gap-0.5">
                            <Check className="w-3 h-3" /> Đang dùng
                          </span>
                        )}
                      </div>
                      <p className="font-semibold text-slate-800">{veh.brand || veh.vehicleType}</p>
                      <p className="text-[11px] text-slate-500">
                        Tải trọng: <strong>{veh.maxPayloadKg / 1000} tấn</strong> • Kích thước: {veh.dimensions}
                      </p>
                    </div>

                    {!veh.isDefault && (
                      <button
                        onClick={() => setDefaultVehicle(veh.id)}
                        className="text-xs text-blue-600 hover:text-blue-800 font-bold self-center border border-blue-200 bg-white px-2.5 py-1 rounded-lg hover:bg-blue-50"
                      >
                        Chọn chạy xe này
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Đăng ký thêm xe cho tài xế */}
          {isAddVehicleOpen && (
            <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-100">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Truck className="w-5 h-5 text-blue-600" />
                    Đăng ký thêm xe mới vào tài khoản
                  </h3>
                  <button
                    onClick={() => setIsAddVehicleOpen(false)}
                    className="text-slate-400 hover:text-slate-600 text-sm font-bold"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleAddVehicleSubmit} className="space-y-3 text-xs">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Biển số xe đăng kiểm:</label>
                    <input
                      type="text"
                      value={newPlate}
                      onChange={(e) => setNewPlate(e.target.value)}
                      placeholder="VD: 29C-888.99"
                      required
                      className="w-full uppercase font-mono font-bold bg-slate-50 p-2.5 rounded-xl border border-slate-200 focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Loại xe:</label>
                      <select
                        value={newType}
                        onChange={(e) => setNewType(e.target.value)}
                        className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200 font-semibold"
                      >
                        <option>Xe tải thùng kín</option>
                        <option>Xe tải mui bạt</option>
                        <option>Xe đầu kéo</option>
                        <option>Xe bồn (Xitec)</option>
                        <option>Xe moóc lùn</option>
                        <option>Xe đông lạnh</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Tải trọng (kg):</label>
                      <input
                        type="number"
                        value={newPayload}
                        onChange={(e) => setNewPayload(Number(e.target.value))}
                        className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200 font-bold"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Hiệu xe / Đời xe:</label>
                    <input
                      type="text"
                      value={newBrand}
                      onChange={(e) => setNewBrand(e.target.value)}
                      placeholder="VD: Isuzu Forward 8 tấn / Hino 500"
                      className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Kích thước lòng thùng (Dài x Rộng x Cao m):</label>
                    <input
                      type="text"
                      value={newDimensions}
                      onChange={(e) => setNewDimensions(e.target.value)}
                      placeholder="6.5 x 2.3 x 2.4 m"
                      className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200"
                    />
                  </div>

                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-[11px] text-emerald-800">
                    Xe mới sẽ được tự động kích hoạt đối soát với CSDL Đăng kiểm Bộ GTVT.
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsAddVehicleOpen(false)}
                      className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50"
                    >
                      Hủy
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-sm"
                    >
                      Lưu xe vào hồ sơ
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Thống kê hoạt động & Uy tín */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Thống kê hoạt động & Uy tín tài xế</h3>

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
      )}

      {/* Driver eKYC Modal */}
      <DriverKycModal
        isOpen={isKycModalOpen}
        onClose={() => setIsKycModalOpen(false)}
      />
    </div>
  );
};
