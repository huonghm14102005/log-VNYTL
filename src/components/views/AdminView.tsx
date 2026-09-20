"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { formatVND } from "@/lib/currency";
import AdminPanelSettingsRoundedIcon from "@mui/icons-material/AdminPanelSettingsRounded";
import VerifiedUserRoundedIcon from "@mui/icons-material/VerifiedUserRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import NorthEastRoundedIcon from "@mui/icons-material/NorthEastRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";

import GavelRoundedIcon from "@mui/icons-material/GavelRounded";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import ShieldCheckRoundedIcon from "@mui/icons-material/ShieldRounded";
import DirectionsCarRoundedIcon from "@mui/icons-material/DirectionsCarRounded";

export const AdminView: React.FC = () => {
  const { showToast, orders, activeTab, setActiveTab } = useApp();

  const isEkycTab = activeTab === "admin-ekyc";
  const isEscrowTab = activeTab === "admin-escrow";
  const isDisputeTab = activeTab === "admin-disputes";
  const isAllTab = activeTab === "admin" || activeTab === "dashboard";

  return (
    <div className="space-y-6 pb-12 max-w-5xl mx-auto">
      {/* Header & Status */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <AdminPanelSettingsRoundedIcon className="!w-6 !h-6 text-amber-600" />
            Trung Tâm Điều Hành Sàn (Admin Console)
          </h2>
          <p className="text-xs text-slate-500">
            Giám sát tính tuân thủ pháp lý eKYC, dòng tiền ký quỹ Escrow hai chiều và an toàn giao dịch
          </p>
        </div>
        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1.5 shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Hệ thống sàn hoạt động an toàn
        </span>
      </div>

      {/* Internal Navigation Sub-tabs for quick Demo */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab("admin")}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
            isAllTab
              ? "bg-slate-900 text-white shadow-xs"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          Tổng quan Sàn
        </button>

        <button
          onClick={() => setActiveTab("admin-ekyc")}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            isEkycTab
              ? "bg-amber-600 text-white shadow-xs"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          <VerifiedUserRoundedIcon className="!w-4 !h-4" />
          Duyệt eKYC CCCD
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-amber-100 text-amber-800">1</span>
        </button>

        <button
          onClick={() => setActiveTab("admin-escrow")}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            isEscrowTab
              ? "bg-blue-600 text-white shadow-xs"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          <AccountBalanceWalletRoundedIcon className="!w-4 !h-4" />
          Giám sát Ký quỹ Escrow
        </button>

        <button
          onClick={() => setActiveTab("admin-disputes")}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            isDisputeTab
              ? "bg-indigo-600 text-white shadow-xs"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          <GavelRoundedIcon className="!w-4 !h-4" />
          Xử lý Khiếu nại
        </button>
      </div>

      {/* KPI Cards Admin (Hiển thị khi ở tab Tổng quan hoặc Escrow) */}
      {(isAllTab || isEscrowTab) && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs card-hover">
            <p className="text-xs font-semibold text-slate-500 mb-1">Tổng tiền ký quỹ Escrow đang giữ</p>
            <h3 className="text-2xl font-extrabold text-blue-600">45.200.000đ</h3>
            <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
              <LockRoundedIcon className="!w-4 !h-4 text-amber-500" /> Đóng băng an toàn song phương (Tài xế + Chủ hàng)
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs card-hover">
            <p className="text-xs font-semibold text-slate-500 mb-1">Doanh thu phí dịch vụ sàn (Take Rate 8%)</p>
            <h3 className="text-2xl font-extrabold text-emerald-600">6.450.000đ</h3>
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-0.5 mt-1">
              <NorthEastRoundedIcon className="!w-4 !h-4" /> +24% so với tháng trước
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs card-hover">
            <p className="text-xs font-semibold text-slate-500 mb-1">Hồ sơ eKYC CCCD chờ thẩm định</p>
            <h3 className="text-2xl font-extrabold text-amber-500">1 hồ sơ mới</h3>
            <p className="text-xs text-slate-400 mt-1">Đối tác xe tải tuyến Hà Nội - Hải Phòng</p>
          </div>
        </div>
      )}

      {/* Section 1: Danh sách duyệt eKYC 1 chạm */}
      {(isAllTab || isEkycTab) && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <VerifiedUserRoundedIcon className="!w-5 !h-5 text-amber-600" />
              Thẩm định hồ sơ đối tác eKYC CCCD & Giấy phép vận tải
            </h3>
            <span className="text-xs text-slate-400 font-semibold">Quy trình 7 bước tiêu chuẩn</span>
          </div>

          <div className="border border-slate-200/90 rounded-2xl p-5 bg-slate-50 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
            <div className="flex items-start gap-4">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80"
                alt="Avatar"
                className="w-16 h-16 rounded-2xl object-cover border-2 border-slate-300 shrink-0 shadow-2xs"
              />
              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-2">
                  <h4 className="font-extrabold text-slate-900 text-sm">Lê Hoàng Nam</h4>
                  <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-[10px] font-bold">Tài xế mới</span>
                </div>
                <p className="text-slate-600">
                  <strong>CCCD:</strong> 031089004512 · <strong>GPLX:</strong> Hạng C (5 năm kinh nghiệm)
                </p>
                <p className="text-slate-600">
                  <strong>Phương tiện:</strong> Xe tải thùng 8 tấn (Biển số: 29C-987.65)
                </p>
                <div className="flex items-center gap-3 pt-1">
                  <span className="inline-flex items-center gap-1 text-emerald-700 font-bold bg-emerald-100/80 px-2.5 py-0.5 rounded-md text-[10px]">
                    <CheckCircleRoundedIcon className="!w-3.5 !h-3.5" /> Đối chiếu sinh trắc học CCCD: Khớp 97%
                  </span>
                  <span className="inline-flex items-center gap-1 text-blue-700 font-bold bg-blue-100/80 px-2.5 py-0.5 rounded-md text-[10px]">
                    STK chính chủ Techcombank
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto justify-end pt-3 md:pt-0 border-t md:border-t-0 border-slate-200">
              <button
                onClick={() => showToast("Đã từ chối hồ sơ (Yêu cầu tài xế chụp lại ảnh đăng kiểm còn hạn).")}
                className="px-4 py-2.5 rounded-xl border border-red-200 text-red-600 text-xs font-bold hover:bg-red-50 flex items-center gap-1 transition-all"
              >
                <CancelRoundedIcon className="!w-4 !h-4" /> Từ chối
              </button>
              <button
                onClick={() => showToast("Đã phê duyệt và kích hoạt tài khoản đối tác Tài xế thành công!")}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 flex items-center gap-1 transition-all"
              >
                <CheckCircleRoundedIcon className="!w-4 !h-4" /> Phê duyệt 1 chạm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Section 2: Sổ cái Ký quỹ Escrow */}
      {(isAllTab || isEscrowTab) && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <AccountBalanceWalletRoundedIcon className="!w-5 !h-5 text-blue-600" />
              Sổ cái Ký quỹ Escrow song phương thời gian thực
            </h3>
            <span className="text-xs text-blue-600 font-semibold">Tự động khóa & giải ngân chuẩn Bảng J</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="text-slate-400 border-b border-slate-100 pb-2">
                  <th className="font-semibold py-2">Mã Chuyến</th>
                  <th className="font-semibold py-2">Tài xế cọc (10%)</th>
                  <th className="font-semibold py-2">Chủ hàng nộp cước (100%)</th>
                  <th className="font-semibold py-2 text-center">Trạng thái Escrow</th>
                  <th className="font-semibold py-2 text-right">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr>
                  <td className="py-3 font-semibold text-slate-900">#FT202609180023</td>
                  <td className="py-3 font-medium text-emerald-600">Đã khóa 350.000đ</td>
                  <td className="py-3 font-medium text-blue-600">Đã ký quỹ 3.500.000đ</td>
                  <td className="py-3 text-center">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700">
                      Đang vận chuyển (Khóa an toàn)
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <button
                      onClick={() => showToast("Đang kiểm tra tín hiệu GPS vệ tinh của xe...")}
                      className="text-blue-600 hover:underline font-bold"
                    >
                      Kiểm tra GPS
                    </button>
                  </td>
                </tr>

                <tr>
                  <td className="py-3 font-semibold text-slate-900">#FT202609180024</td>
                  <td className="py-3 font-medium text-emerald-600">Đã khóa 420.000đ</td>
                  <td className="py-3 font-medium text-amber-600">Chờ nộp (Còn 18 phút)</td>
                  <td className="py-3 text-center">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700">
                      Chờ Escrow Chủ hàng
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <button
                      onClick={() => showToast("Đã gửi SMS thông báo đôn đốc Chủ hàng nộp cọc Escrow.")}
                      className="text-amber-600 hover:underline font-bold"
                    >
                      Nhắc nộp cước
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Section 3: Quản lý Khiếu nại & Tranh chấp */}
      {(isAllTab || isDisputeTab) && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <GavelRoundedIcon className="!w-5 !h-5 text-indigo-600" />
              Trung tâm Trọng tài & Xử lý Khiếu nại
            </h3>
            <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              0 vụ việc khiếu nại tồn đọng
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600 space-y-2 leading-relaxed">
            <p>
              🛡️ <strong>Chính sách Bảo vệ Tranh chấp:</strong> Toàn bộ giao dịch trên Sàn Full Truck VYLT 2026 được bảo hiểm bởi cơ chế <strong>Ký quỹ Escrow hai chiều</strong> kết hợp kiểm tra <strong>ảnh chụp nghiệm thu e-POD</strong> lúc nhận và giao hàng.
            </p>
            <p className="text-slate-500">
              Nếu xảy ra sự cố hỏng hóc hoặc chậm trễ ngoài mong muốn, Ban Quản trị Sàn sẽ đóng băng tiền cọc trong 72 giờ để đối soát camera hành trình và biên bản kiểm đếm song phương.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
