"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { 
  X, CheckCircle, ShieldCheck, Camera, CreditCard, Truck, 
  FileText, ArrowRight, ArrowLeft, Upload, AlertTriangle, Sparkles
} from "lucide-react";

interface DriverKycModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DriverKycModal: React.FC<DriverKycModalProps> = ({ isOpen, onClose }) => {
  const { driver, submitDriverKyc } = useApp();
  const [step, setStep] = useState<number>(1);

  // Form state
  const [formData, setFormData] = useState({
    driverName: driver.fullName || "Nguyễn Văn A",
    phone: driver.phoneNumber || "0988123456",
    email: driver.email || "driver.vylt@gmail.com",
    idCardNumber: "001095018291",
    idCardIssuedDate: "2022-05-12",
    idCardFrontUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400",
    idCardBackUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400",
    selfieUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
    driverLicenseNumber: "B2-998822",
    driverLicenseClass: "C",
    driverLicenseExp: "2029-10-15",
    licenseFrontUrl: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400",
    truckPlate: "29C-998.88",
    truckType: "Xe tải mui bạt 8 tấn",
    truckWeightTon: 8,
    registrationCertUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400",
    bankName: "Vietcombank (Ngoại Thương Việt Nam)",
    bankAccountNumber: "9988776655",
    bankAccountHolder: (driver.fullName || "NGUYEN VAN A").toUpperCase(),
  });

  if (!isOpen) return null;

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitDriverKyc(formData);
    onClose();
  };

  const fillQuickDemo = () => {
    setFormData({
      driverName: "Lê Hoàng Nam",
      phone: "0912345678",
      email: "nam.lehoang@gmail.com",
      idCardNumber: "034098012345",
      idCardIssuedDate: "2023-01-10",
      idCardFrontUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400",
      idCardBackUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400",
      selfieUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      driverLicenseNumber: "GPLX-0129883",
      driverLicenseClass: "FC",
      driverLicenseExp: "2030-05-20",
      licenseFrontUrl: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400",
      truckPlate: "29H-776.54",
      truckType: "Xe tải thùng kín 10 tấn",
      truckWeightTon: 10,
      registrationCertUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400",
      bankName: "Techcombank (Kỹ Thương Việt Nam)",
      bankAccountNumber: "1903344556677",
      bankAccountHolder: "LE HOANG NAM",
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-slate-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-800 text-white p-5 flex items-center justify-between relative">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <ShieldCheck className="w-6 h-6 text-emerald-300" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Xác Thực Định Danh eKYC & Hồ Sơ Tài Xế</h2>
              <p className="text-xs text-emerald-100">Chuẩn xác thực Bộ GTVT & Quy chế Sàn Logistics 2026</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Demo Autofill Banner */}
        <div className="bg-emerald-50 border-b border-emerald-100 px-5 py-2.5 flex items-center justify-between text-xs text-emerald-800">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            Dùng dữ liệu giả lập để kiểm tra nhanh quy trình thẩm định?
          </span>
          <button
            type="button"
            onClick={fillQuickDemo}
            className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-medium transition-colors"
          >
            Điền nhanh Demo
          </button>
        </div>

        {/* Step Indicator */}
        <div className="grid grid-cols-4 border-b border-slate-100 bg-slate-50/50 text-xs">
          {[
            { id: 1, label: "1. CCCD Gắn chip", icon: CreditCard },
            { id: 2, label: "2. Chân dung", icon: Camera },
            { id: 3, label: "3. Bằng lái GPLX", icon: FileText },
            { id: 4, label: "4. Xe tải & Ngân hàng", icon: Truck },
          ].map((s) => {
            const Icon = s.icon;
            const isActive = step === s.id;
            const isCompleted = step > s.id;
            return (
              <button
                key={s.id}
                onClick={() => setStep(s.id)}
                className={`py-3 px-2 flex flex-col sm:flex-row items-center justify-center gap-1.5 font-medium border-b-2 transition-all ${
                  isActive
                    ? "border-emerald-600 text-emerald-700 bg-white shadow-sm"
                    : isCompleted
                    ? "border-emerald-300 text-emerald-600 bg-emerald-50/30"
                    : "border-transparent text-slate-400 hover:text-slate-600"
                }`}
              >
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                  isActive ? "bg-emerald-600 text-white" : isCompleted ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-500"
                }`}>
                  {isCompleted ? "✓" : s.id}
                </div>
                <span className="truncate hidden sm:inline">{s.label}</span>
              </button>
            );
          })}
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* STEP 1: CCCD */}
          {step === 1 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start gap-2.5 text-xs text-amber-800">
                <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <p>
                  Theo quy định pháp luật & quy chế bảo đảm cọc, tài xế vận tải phải cung cấp CCCD gắn chip chính chủ để kích hoạt ví cọc và nhận chuyến hàng có giá trị cao.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Họ và tên (Theo CCCD)</label>
                  <input
                    type="text"
                    required
                    value={formData.driverName}
                    onChange={(e) => setFormData({ ...formData, driverName: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    placeholder="VD: NGUYỄN VĂN A"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Số Căn cước công dân (12 số)</label>
                  <input
                    type="text"
                    required
                    value={formData.idCardNumber}
                    onChange={(e) => setFormData({ ...formData, idCardNumber: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono"
                    placeholder="001095018291"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Số điện thoại liên hệ</label>
                  <input
                    type="text"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Ngày cấp CCCD</label>
                  <input
                    type="date"
                    required
                    value={formData.idCardIssuedDate}
                    onChange={(e) => setFormData({ ...formData, idCardIssuedDate: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Ảnh 2 mặt CCCD */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 text-center hover:border-emerald-400 transition-colors bg-slate-50/50">
                  <p className="text-xs font-semibold text-slate-700 mb-2">Ảnh CCCD Mặt Trước</p>
                  <div className="w-full h-28 rounded-lg overflow-hidden bg-slate-100 flex items-center justify-center border border-slate-200 relative group">
                    <img 
                      src={formData.idCardFrontUrl} 
                      alt="CCCD Front" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs transition-opacity cursor-pointer">
                      <Upload className="w-4 h-4 mr-1" /> Chụp lại
                    </div>
                  </div>
                  <span className="text-[11px] text-emerald-600 font-medium mt-1 inline-block">✓ Đã tải lên ảnh rõ nét</span>
                </div>

                <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 text-center hover:border-emerald-400 transition-colors bg-slate-50/50">
                  <p className="text-xs font-semibold text-slate-700 mb-2">Ảnh CCCD Mặt Sau (Chip điện tử)</p>
                  <div className="w-full h-28 rounded-lg overflow-hidden bg-slate-100 flex items-center justify-center border border-slate-200 relative group">
                    <img 
                      src={formData.idCardBackUrl} 
                      alt="CCCD Back" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs transition-opacity cursor-pointer">
                      <Upload className="w-4 h-4 mr-1" /> Chụp lại
                    </div>
                  </div>
                  <span className="text-[11px] text-emerald-600 font-medium mt-1 inline-block">✓ Đã nhận diện mã MRZ</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Sinh trắc học selfie */}
          {step === 2 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="text-center max-w-md mx-auto space-y-2">
                <h3 className="text-sm font-bold text-slate-800">Chụp Chân Dung Đối Soát Khuôn Mặt (Liveness Check)</h3>
                <p className="text-xs text-slate-500">
                  Hệ thống tự động so khớp tỷ lệ 99.8% giữa khuôn mặt selfie và ảnh trên Căn cước công dân để chống giả mạo danh tính tài xế.
                </p>
              </div>

              <div className="flex flex-col items-center justify-center py-4">
                <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-emerald-500 shadow-xl relative bg-slate-900 group">
                  <img 
                    src={formData.selfieUrl} 
                    alt="Driver Selfie" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-emerald-950/40 border-2 border-dashed border-emerald-300 rounded-full pointer-events-none"></div>
                </div>

                <div className="mt-4 flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Xác thực người thực thành công (Khớp 99.4% với CCCD)</span>
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl text-xs text-slate-600 space-y-1">
                <p className="font-semibold text-slate-700">Yêu cầu ảnh chụp chân dung:</p>
                <p>• Không đeo kính râm, không đội mũ che khuất trán hoặc tai.</p>
                <p>• Ánh sáng đầy đủ, chụp thẳng góc mặt nhìn vào camera.</p>
              </div>
            </div>
          )}

          {/* STEP 3: Giấy phép lái xe */}
          {step === 3 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Số Giấy phép lái xe (GPLX)</label>
                  <input
                    type="text"
                    required
                    value={formData.driverLicenseNumber}
                    onChange={(e) => setFormData({ ...formData, driverLicenseNumber: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono"
                    placeholder="B2-1234567"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Hạng GPLX</label>
                  <select
                    value={formData.driverLicenseClass}
                    onChange={(e) => setFormData({ ...formData, driverLicenseClass: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    <option value="B2">Hạng B2 (Xe dưới 3.5 tấn)</option>
                    <option value="C">Hạng C (Xe tải trên 3.5 tấn)</option>
                    <option value="D">Hạng D (Xe tải & chở người)</option>
                    <option value="E">Hạng E (Xe tải nặng & rơ moóc)</option>
                    <option value="FC">Hạng FC (Đầu kéo Container)</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Ngày hết hạn GPLX</label>
                  <input
                    type="date"
                    required
                    value={formData.driverLicenseExp}
                    onChange={(e) => setFormData({ ...formData, driverLicenseExp: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 text-center bg-slate-50/50">
                <p className="text-xs font-semibold text-slate-700 mb-2">Ảnh chụp Giấy phép lái xe (GPLX)</p>
                <div className="w-full h-36 rounded-lg overflow-hidden bg-slate-100 flex items-center justify-center border border-slate-200 relative group">
                  <img 
                    src={formData.licenseFrontUrl} 
                    alt="License" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs transition-opacity cursor-pointer">
                    <Upload className="w-4 h-4 mr-1" /> Chụp lại bằng lái
                  </div>
                </div>
                <span className="text-[11px] text-emerald-600 font-medium mt-2 inline-block">✓ Đã kiểm tra số hiệu Tổng cục Đường bộ hợp lệ</span>
              </div>
            </div>
          )}

          {/* STEP 4: Phương tiện & Ngân hàng */}
          {step === 4 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-3">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-emerald-600" />
                  Thông tin Phương tiện Vận chuyển
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Biển kiểm soát</label>
                    <input
                      type="text"
                      required
                      value={formData.truckPlate}
                      onChange={(e) => setFormData({ ...formData, truckPlate: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg uppercase font-mono"
                      placeholder="29C-123.45"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Quy cách thùng xe</label>
                    <input
                      type="text"
                      required
                      value={formData.truckType}
                      onChange={(e) => setFormData({ ...formData, truckType: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg"
                      placeholder="Xe tải mui bạt 8 tấn"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Tải trọng (Tấn)</label>
                    <input
                      type="number"
                      required
                      value={formData.truckWeightTon}
                      onChange={(e) => setFormData({ ...formData, truckWeightTon: Number(e.target.value) })}
                      className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg"
                      placeholder="8"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-3">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-teal-600" />
                  Tài khoản Ngân hàng liên kết ví cọc & rút cước
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Ngân hàng</label>
                    <input
                      type="text"
                      required
                      value={formData.bankName}
                      onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Số tài khoản</label>
                    <input
                      type="text"
                      required
                      value={formData.bankAccountNumber}
                      onChange={(e) => setFormData({ ...formData, bankAccountNumber: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Tên chủ tài khoản (Trùng CCCD)</label>
                    <input
                      type="text"
                      required
                      value={formData.bankAccountHolder}
                      onChange={(e) => setFormData({ ...formData, bankAccountHolder: e.target.value.toUpperCase() })}
                      className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg uppercase"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-800 space-y-1">
                <p className="font-semibold flex items-center gap-1">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  Cam kết trách nhiệm hợp đồng vận tải:
                </p>
                <p>
                  Tôi cam kết thông tin CCCD, Bằng lái và Đăng kiểm trên là chính xác 100%. Tôi đồng ý với cơ chế khóa cọc 10% để nhận chuyến và chế tài bồi thường nếu tự ý hủy đơn.
                </p>
              </div>
            </div>
          )}

          {/* Footer Controls */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" /> Quay lại
              </button>
            ) : (
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-700 transition-colors"
              >
                Đóng
              </button>
            )}

            {step < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-5 py-2.5 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors flex items-center gap-1.5 shadow-sm shadow-emerald-600/30"
              >
                Tiếp tục bước {step + 1} <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                className="px-6 py-2.5 text-xs font-bold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-lg transition-all shadow-md shadow-emerald-600/30 flex items-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" /> Nộp Hồ Sơ Thẩm Định Ngay
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
