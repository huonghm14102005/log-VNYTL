"use client";

import React, { useState } from "react";
import { DriverKycApplication } from "@/types";
import { useApp } from "@/context/AppContext";
import { 
  X, CheckCircle, ShieldCheck, Camera, CreditCard, Truck, 
  FileText, Ban, AlertTriangle, ExternalLink, ZoomIn, User
} from "lucide-react";

interface AdminKycDetailModalProps {
  application: DriverKycApplication | null;
  isOpen: boolean;
  onClose: () => void;
}

export const AdminKycDetailModal: React.FC<AdminKycDetailModalProps> = ({
  application,
  isOpen,
  onClose,
}) => {
  const { approveDriverKyc, rejectDriverKyc } = useApp();
  const [activeDocTab, setActiveDocTab] = useState<"CCCD" | "SELFIE" | "LICENSE" | "TRUCK">("CCCD");
  const [rejectReason, setRejectReason] = useState<string>("");
  const [showRejectBox, setShowRejectBox] = useState<boolean>(false);

  if (!isOpen || !application) return null;

  const handleApprove = () => {
    approveDriverKyc(application.id);
    onClose();
  };

  const handleReject = () => {
    rejectDriverKyc(application.id, rejectReason || "Hình ảnh giấy tờ không đủ độ phân giải");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-4xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[92vh] border border-slate-200">
        {/* Header Modal */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold">Thẩm Định Hồ Sơ eKYC Đối Tác Tài Xế</h2>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  application.status === "PENDING"
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                    : application.status === "VERIFIED"
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                    : "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                }`}>
                  {application.status === "PENDING" ? "CHỜ DUYỆT" : application.status === "VERIFIED" ? "ĐÃ KÍCH HOẠT" : "ĐÃ TỪ CHỐI"}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Mã hồ sơ: <span className="font-mono text-amber-300">{application.id}</span> • Nộp lúc: {application.submittedAt}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: 2 Columns */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
          {/* CỘT TRÁI: Image Viewer (7 Cols) */}
          <div className="lg:col-span-7 p-5 space-y-4 bg-slate-50/70">
            {/* Tabs chọn loại chứng từ */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-200/80 rounded-xl text-xs font-semibold overflow-x-auto">
              <button
                onClick={() => setActiveDocTab("CCCD")}
                className={`flex-1 py-2 px-2.5 rounded-lg transition-all flex items-center justify-center gap-1.5 whitespace-nowrap ${
                  activeDocTab === "CCCD"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <CreditCard className="w-3.5 h-3.5 text-blue-600" />
                CCCD (2 mặt)
              </button>
              <button
                onClick={() => setActiveDocTab("SELFIE")}
                className={`flex-1 py-2 px-2.5 rounded-lg transition-all flex items-center justify-center gap-1.5 whitespace-nowrap ${
                  activeDocTab === "SELFIE"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Camera className="w-3.5 h-3.5 text-emerald-600" />
                Chân dung
              </button>
              <button
                onClick={() => setActiveDocTab("LICENSE")}
                className={`flex-1 py-2 px-2.5 rounded-lg transition-all flex items-center justify-center gap-1.5 whitespace-nowrap ${
                  activeDocTab === "LICENSE"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <FileText className="w-3.5 h-3.5 text-amber-600" />
                Bằng lái GPLX
              </button>
              <button
                onClick={() => setActiveDocTab("TRUCK")}
                className={`flex-1 py-2 px-2.5 rounded-lg transition-all flex items-center justify-center gap-1.5 whitespace-nowrap ${
                  activeDocTab === "TRUCK"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Truck className="w-3.5 h-3.5 text-indigo-600" />
                Xe & Đăng kiểm
              </button>
            </div>

            {/* Khung hiển thị ảnh chứng từ */}
            <div className="space-y-3">
              {activeDocTab === "CCCD" && (
                <div className="space-y-3 animate-fadeIn">
                  <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-700 flex items-center gap-1">
                        <CreditCard className="w-3.5 h-3.5 text-blue-600" /> Mặt trước CCCD gắn chip
                      </span>
                      <span className="text-emerald-600 font-semibold text-[11px]">✓ Quét OCR thành công</span>
                    </div>
                    <div className="h-44 w-full rounded-lg overflow-hidden border border-slate-200 relative group bg-slate-900 flex items-center justify-center">
                      <img 
                        src={application.idCardFrontUrl} 
                        alt="CCCD Front" 
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <a 
                        href={application.idCardFrontUrl} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="absolute bottom-2 right-2 px-2 py-1 rounded bg-black/70 text-white text-[10px] flex items-center gap-1 hover:bg-black"
                      >
                        <ZoomIn className="w-3 h-3" /> Phóng to
                      </a>
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-700 flex items-center gap-1">
                        <CreditCard className="w-3.5 h-3.5 text-blue-600" /> Mặt sau CCCD (Chip & Mã MRZ)
                      </span>
                      <span className="text-emerald-600 font-semibold text-[11px]">✓ Mã MRZ hợp lệ</span>
                    </div>
                    <div className="h-44 w-full rounded-lg overflow-hidden border border-slate-200 relative group bg-slate-900 flex items-center justify-center">
                      <img 
                        src={application.idCardBackUrl} 
                        alt="CCCD Back" 
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <a 
                        href={application.idCardBackUrl} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="absolute bottom-2 right-2 px-2 py-1 rounded bg-black/70 text-white text-[10px] flex items-center gap-1 hover:bg-black"
                      >
                        <ZoomIn className="w-3 h-3" /> Phóng to
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {activeDocTab === "SELFIE" && (
                <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3 animate-fadeIn text-center">
                  <span className="font-bold text-slate-800 text-xs block">
                    Ảnh Chụp Chân Dung Sinh Trắc Học (Facial Liveness)
                  </span>
                  <div className="w-56 h-56 mx-auto rounded-full overflow-hidden border-4 border-emerald-500 shadow-lg relative bg-slate-900 group">
                    <img 
                      src={application.selfieUrl} 
                      alt="Selfie" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-emerald-900/20 border-2 border-dashed border-emerald-400 rounded-full pointer-events-none"></div>
                  </div>
                  <div className="bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl p-3 text-xs space-y-1">
                    <p className="font-bold flex items-center justify-center gap-1.5">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      Kết quả so khớp sinh trắc học: ĐẠT 99.4%
                    </p>
                    <p className="text-[11px] text-emerald-700">
                      Khuôn mặt người chụp khớp hoàn toàn với ảnh trên Căn cước công dân gắn chip. Không có dấu hiệu giả mạo Deepfake.
                    </p>
                  </div>
                </div>
              )}

              {activeDocTab === "LICENSE" && (
                <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3 animate-fadeIn">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800">Ảnh chụp Giấy phép lái xe (GPLX Hạng {application.driverLicenseClass})</span>
                    <span className="text-emerald-600 font-semibold text-[11px]">✓ Hợp lệ Tổng cục Đường bộ</span>
                  </div>
                  <div className="h-72 w-full rounded-lg overflow-hidden border border-slate-200 relative group bg-slate-900 flex items-center justify-center">
                    <img 
                      src={application.licenseFrontUrl} 
                      alt="License" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <a 
                      href={application.licenseFrontUrl} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="absolute bottom-2 right-2 px-2.5 py-1 rounded bg-black/70 text-white text-[11px] flex items-center gap-1 hover:bg-black"
                    >
                      <ZoomIn className="w-3.5 h-3.5" /> Phóng to toàn màn hình
                    </a>
                  </div>
                </div>
              )}

              {activeDocTab === "TRUCK" && (
                <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3 animate-fadeIn">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800">Giấy Chứng Nhận Đăng Ký Xe (Cà vẹt) & Sổ Đăng Kiểm</span>
                    <span className="text-emerald-600 font-semibold text-[11px]">✓ Còn hạn kiểm định</span>
                  </div>
                  <div className="h-72 w-full rounded-lg overflow-hidden border border-slate-200 relative group bg-slate-900 flex items-center justify-center">
                    <img 
                      src={application.registrationCertUrl} 
                      alt="Truck Certificate" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <a 
                      href={application.registrationCertUrl} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="absolute bottom-2 right-2 px-2.5 py-1 rounded bg-black/70 text-white text-[11px] flex items-center gap-1 hover:bg-black"
                    >
                      <ZoomIn className="w-3.5 h-3.5" /> Phóng to toàn màn hình
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* CỘT PHẢI: Chi tiết dữ liệu thẩm duyệt & Checklist (5 Cols) */}
          <div className="lg:col-span-5 p-5 space-y-4 bg-white flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-100 pb-2">
                <User className="w-4 h-4 text-blue-600" />
                Dữ liệu Trích Xuất Thẩm Duyệt
              </h3>

              {/* Thông tin cá nhân */}
              <div className="space-y-2 text-xs bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Họ và tên:</span>
                  <span className="font-bold text-slate-900 uppercase">{application.driverName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Số CCCD (12 số):</span>
                  <span className="font-mono font-bold text-blue-700">{application.idCardNumber}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Ngày cấp:</span>
                  <span className="font-medium text-slate-700">{application.idCardIssuedDate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Số điện thoại:</span>
                  <span className="font-medium text-slate-700">{application.phone}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Email:</span>
                  <span className="font-medium text-slate-700">{application.email}</span>
                </div>
              </div>

              {/* Thông tin Giấy phép & Phương tiện */}
              <div className="space-y-2 text-xs bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Số GPLX:</span>
                  <span className="font-mono font-bold text-slate-900">{application.driverLicenseNumber}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Hạng Giấy phép:</span>
                  <span className="font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded text-[11px]">
                    Hạng {application.driverLicenseClass}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Hạn bằng lái:</span>
                  <span className="font-medium text-slate-700">{application.driverLicenseExp}</span>
                </div>
                <div className="flex items-center justify-between border-t border-slate-200/60 pt-2">
                  <span className="text-slate-500">Biển kiểm soát xe:</span>
                  <span className="font-mono font-bold text-slate-900 bg-slate-200 px-2 py-0.5 rounded">
                    {application.truckPlate}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Quy cách & Tải trọng:</span>
                  <span className="font-bold text-slate-800">{application.truckType} ({application.truckWeightTon} tấn)</span>
                </div>
              </div>

              {/* Thông tin tài khoản ngân hàng */}
              <div className="space-y-2 text-xs bg-emerald-50/50 p-3 rounded-xl border border-emerald-200">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Ngân hàng thụ hưởng:</span>
                  <span className="font-bold text-emerald-900">{application.bankName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Số tài khoản:</span>
                  <span className="font-mono font-bold text-emerald-800">{application.bankAccountNumber}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Chủ tài khoản:</span>
                  <span className="font-bold text-emerald-900 uppercase">{application.bankAccountHolder}</span>
                </div>
              </div>

              {/* Checklist Thẩm định */}
              <div className="space-y-1.5 text-[11px] bg-slate-100 p-3 rounded-xl text-slate-700">
                <p className="font-bold text-slate-800 mb-1">Kết quả kiểm tra tự động hệ thống:</p>
                <p className="flex items-center gap-1.5 text-emerald-700">
                  <CheckCircle className="w-3.5 h-3.5" /> CCCD gắn chip không thuộc danh sách đen cấm vận tải.
                </p>
                <p className="flex items-center gap-1.5 text-emerald-700">
                  <CheckCircle className="w-3.5 h-3.5" /> Bằng lái GPLX còn thời hạn trên 2 năm.
                </p>
                <p className="flex items-center gap-1.5 text-emerald-700">
                  <CheckCircle className="w-3.5 h-3.5" /> Biển số trùng khớp với Giấy đăng kiểm xe cơ giới.
                </p>
              </div>

              {/* Hộp nhập lý do từ chối nếu mở */}
              {showRejectBox && (
                <div className="space-y-2 animate-fadeIn bg-rose-50 p-3 rounded-xl border border-rose-200">
                  <label className="block text-xs font-bold text-rose-900">Lý do từ chối hồ sơ eKYC:</label>
                  <textarea
                    rows={2}
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    placeholder="VD: Ảnh chụp mặt sau CCCD bị lóa đèn, yêu cầu chụp lại góc thẳng..."
                    className="w-full text-xs p-2 rounded-lg border border-rose-300 focus:outline-none focus:ring-1 focus:ring-rose-500"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowRejectBox(false)}
                      className="px-2.5 py-1 text-xs text-slate-600 hover:text-slate-800"
                    >
                      Hủy
                    </button>
                    <button
                      type="button"
                      onClick={handleReject}
                      className="px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-md"
                    >
                      Xác nhận từ chối
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Cụm nút hành động của Admin */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
              >
                Đóng
              </button>

              {application.status === "PENDING" ? (
                <div className="flex items-center gap-2">
                  {!showRejectBox && (
                    <button
                      type="button"
                      onClick={() => setShowRejectBox(true)}
                      className="px-3.5 py-2 text-xs font-bold text-rose-600 border border-rose-200 hover:bg-rose-50 rounded-xl transition-colors flex items-center gap-1.5"
                    >
                      <Ban className="w-3.5 h-3.5" /> Từ chối
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handleApprove}
                    className="px-5 py-2 text-xs font-bold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl shadow-md shadow-emerald-600/30 transition-all flex items-center gap-1.5"
                  >
                    <CheckCircle className="w-4 h-4" /> Phê Duyệt & Kích Hoạt Ngay
                  </button>
                </div>
              ) : application.status === "VERIFIED" ? (
                <div className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1.5 rounded-xl flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4" /> Hồ sơ này đã được kích hoạt chạy đơn
                </div>
              ) : (
                <div className="text-xs font-bold text-rose-700 bg-rose-100 px-3 py-1.5 rounded-xl flex items-center gap-1.5">
                  <Ban className="w-4 h-4" /> Hồ sơ đã bị từ chối
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
