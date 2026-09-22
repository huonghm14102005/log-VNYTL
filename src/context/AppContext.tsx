"use client";

import React, { createContext, useContext, useState } from "react";
import { Order, ReturnTrip, User, UserRole, Vehicle, Wallet, ChatMessage, DriverKycApplication, KycStatus } from "@/types";
import { initialDriver, initialShipper, initialOrders, initialReturnTrips, initialWallet, initialPendingKycApplication, initialDriverVehicles } from "@/lib/data";
import { sanitizeChatMessage } from "@/lib/anti-leakage";

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  driver: User;
  setDriver: React.Dispatch<React.SetStateAction<User>>;
  shipper: User;
  setShipper: React.Dispatch<React.SetStateAction<User>>;
  driverVehicles: Vehicle[];
  addDriverVehicle: (veh: Partial<Vehicle>) => void;
  setDefaultVehicle: (id: string) => void;
  orders: Order[];
  returnTrips: ReturnTrip[];
  wallet: Wallet;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedOrder: Order | null;
  setSelectedOrder: (order: Order | null) => void;

  // eKYC Onboarding
  kycApplications: DriverKycApplication[];
  submitDriverKyc: (data: Partial<DriverKycApplication>) => void;
  approveDriverKyc: (appId: string) => void;
  rejectDriverKyc: (appId: string, reason?: string) => void;
  switchDriverAccountStatus: (status: KycStatus) => void;

  // Actions
  createOrder: (orderData: Partial<Order>) => Order;
  acceptOrderAndLockDeposit: (orderId: string) => boolean;
  payEscrow: (orderId: string) => void;
  updateLocationStep: (orderId: string) => void;
  submitPod: (orderId: string, receiverName: string, photoUrl: string) => void;
  confirmReleaseEscrow: (orderId: string) => void;
  topupWalletDemo: (amount: number) => void;
  
  // Chat
  messages: ChatMessage[];
  sendMessage: (orderId: string, text: string) => void;

  // Toast
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>("DRIVER");
  const [driver, setDriver] = useState<User>(initialDriver);
  const [shipper, setShipper] = useState<User>(initialShipper);
  const [driverVehicles, setDriverVehicles] = useState<Vehicle[]>(initialDriverVehicles);
  const [kycApplications, setKycApplications] = useState<DriverKycApplication[]>([initialPendingKycApplication]);
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [returnTrips, setReturnTrips] = useState<ReturnTrip[]>(initialReturnTrips);
  const [wallet, setWallet] = useState<Wallet>(initialWallet);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(initialOrders[0]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-01",
      orderId: "ord-01",
      senderId: "shipper-01",
      senderName: "Nguyễn Văn B (Chủ hàng)",
      senderRole: "SHIPPER",
      content: "Chào bác tài, hàng 8 tấn máy móc đã sẵn sàng ở Cảng Đình Vũ rồi nhé!",
      isFiltered: false,
      timestamp: "08:20",
    },
    {
      id: "msg-02",
      orderId: "ord-01",
      senderId: "driver-01",
      senderName: "Nguyễn Văn A (Tài xế)",
      senderRole: "DRIVER",
      content: "Vâng tôi đang điều xe 29H-123.45 tới cổng kho 2, dự kiến 15 phút nữa tới nơi.",
      isFiltered: false,
      timestamp: "08:22",
    },
  ]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // 1. Tạo đơn hàng mới từ Chủ hàng
  const createOrder = (orderData: Partial<Order>): Order => {
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderCode: `ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      shipperId: initialShipper.id,
      shipperName: initialShipper.companyName || initialShipper.fullName,
      shipperPhone: initialShipper.phoneNumber,
      shipperRating: initialShipper.rating,
      originCity: orderData.originCity || "Hải Phòng",
      originAddress: orderData.originAddress || "Cảng Đình Vũ, Hải Phòng",
      originLat: orderData.originLat || 20.8549,
      originLng: orderData.originLng || 106.7481,
      destCity: orderData.destCity || "Hà Nội",
      destAddress: orderData.destAddress || "KCN Thăng Long, Đông Anh, Hà Nội",
      destLat: orderData.destLat || 21.1215,
      destLng: orderData.destLng || 105.7825,
      distanceKm: orderData.distanceKm || 120,
      cargoName: orderData.cargoName || "Lô hàng bách hóa",
      cargoType: orderData.cargoType || "Hàng tiêu dùng",
      cargoWeightKg: orderData.cargoWeightKg || 8000,
      vehicleTypeRequired: orderData.vehicleTypeRequired || "Xe tải thùng",
      declaredValue: orderData.declaredValue || 150000000,
      freightPrice: orderData.freightPrice || 3500000,
      requiredDeposit: Math.min(5000000, (orderData.declaredValue || 150000000) * 0.1),
      servicePackage: orderData.servicePackage || "STANDARD",
      urgencyLevel: orderData.urgencyLevel || "NORMAL",
      status: "SEARCHING",
      pickupTime: "Hôm nay - 15:00",
      deliveryTime: "Hôm nay - 20:00",
      estimatedHours: "2 giờ 30 phút",
      matchScore: 96,
      matchReason: "Khớp 96% với xe tải 10 tấn đang tìm chuyến về Hà Nội của Tài xế Nguyễn Văn A!",
      isReturnTripMatch: true,
      ...orderData,
    };

    setOrders((prev) => [newOrder, ...prev]);
    showToast(`Đã đăng đơn hàng ${newOrder.orderCode} lên sàn thành công!`);
    return newOrder;
  };

  // 2. Tài xế nhận đơn & Khóa cọc 10%
  const acceptOrderAndLockDeposit = (orderId: string): boolean => {
    // Kiểm tra trạng thái eKYC của tài xế
    if (driver.kycStatus !== "VERIFIED") {
      showToast("Tài khoản chưa hoàn tất phê duyệt eKYC CCCD & Hồ sơ phương tiện! Vui lòng hoàn thiện hồ sơ để nhận đơn.");
      return false;
    }

    const targetOrder = orders.find((o) => o.id === orderId);
    if (!targetOrder) return false;

    if (wallet.depositBalance < targetOrder.requiredDeposit) {
      showToast(`Số dư ví cọc không đủ (Yêu cầu ${targetOrder.requiredDeposit.toLocaleString()}đ). Vui lòng nạp thêm!`);
      return false;
    }

    // Trừ cọc ví
    setWallet((prev) => ({
      ...prev,
      depositBalance: prev.depositBalance - targetOrder.requiredDeposit,
      lockedDeposit: prev.lockedDeposit + targetOrder.requiredDeposit,
      transactions: [
        {
          id: `tx-${Date.now()}`,
          type: "DEPOSIT_LOCK",
          amount: -targetOrder.requiredDeposit,
          description: `Khóa cọc nhận đơn ${targetOrder.orderCode} (${targetOrder.originCity} → ${targetOrder.destCity})`,
          date: "Vừa xong",
          status: "COMPLETED",
        },
        ...prev.transactions,
      ],
    }));

    // Cập nhật trạng thái đơn
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? {
              ...o,
              status: "WAITING_ESCROW_PAYMENT",
              driverId: initialDriver.id,
              driverName: initialDriver.fullName,
              driverPhone: initialDriver.phoneNumber,
              driverPlateNumber: "29H-123.45",
              driverDeposited: true,
              escrowDeadlineMinutes: 30, // Bắt đầu đếm ngược 30 phút cho chủ hàng
            }
          : o
      )
    );

    showToast(`Bạn đã khóa cọc ${targetOrder.requiredDeposit.toLocaleString()}đ thành công! Đang chờ chủ hàng nộp cước Escrow (30 phút đếm ngược).`);
    return true;
  };

  // 3. Chủ hàng nộp cước vào Escrow
  const payEscrow = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? {
              ...o,
              status: "MATCHED_ESCROWED",
              isEscrowPaid: true,
              trackingProgress: {
                completedKm: 10,
                totalKm: o.distanceKm,
                remainingTime: "2 giờ 15 phút",
                currentLat: o.originLat,
                currentLng: o.originLng,
              },
            }
          : o
      )
    );
    showToast("Ký quỹ cước Escrow thành công! Đã mở khóa Số điện thoại và phòng Chat giữa hai bên.");
  };

  // 4. Cập nhật vị trí di chuyển trên đường
  const updateLocationStep = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== orderId) return o;
        const currentProg = o.trackingProgress || {
          completedKm: 0,
          totalKm: o.distanceKm,
          remainingTime: "2 giờ",
          currentLat: o.originLat,
          currentLng: o.originLng,
        };
        const nextKm = Math.min(o.distanceKm, currentProg.completedKm + 30);
        return {
          ...o,
          status: nextKm >= o.distanceKm ? "DELIVERED" : "IN_TRANSIT",
          trackingProgress: {
            ...currentProg,
            completedKm: nextKm,
            remainingTime: nextKm >= o.distanceKm ? "Đã đến điểm giao" : "Còn 45 phút",
          },
        };
      })
    );
    showToast("Tọa độ GPS đã được cập nhật thành công!");
  };

  // 5. Nộp ảnh giao hàng e-POD
  const submitPod = (orderId: string, receiverName: string, photoUrl: string) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? {
              ...o,
              status: "DELIVERED",
              pod: {
                photoUrl: photoUrl || "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&auto=format&fit=crop&q=80",
                receiverName: receiverName || "Người nhận tại kho",
                deliveredAt: "Vừa xong",
              },
            }
          : o
      )
    );
    showToast("Đã nộp biên bản e-POD & ảnh giao hàng thành công! Đang chờ chủ hàng xác nhận giải ngân (hoặc tự động sau 24h).");
  };

  // 6. Chủ hàng xác nhận hài lòng & Giải ngân cước
  const confirmReleaseEscrow = (orderId: string) => {
    const targetOrder = orders.find((o) => o.id === orderId);
    if (!targetOrder) return;

    const netIncome = Math.round(targetOrder.freightPrice * 0.92); // Trừ 8% sàn

    setWallet((prev) => ({
      ...prev,
      depositBalance: prev.depositBalance + targetOrder.requiredDeposit, // Hoàn cọc
      lockedDeposit: Math.max(0, prev.lockedDeposit - targetOrder.requiredDeposit),
      incomeBalance: prev.incomeBalance + netIncome,
      totalIncome: prev.totalIncome + netIncome,
      transactions: [
        {
          id: `tx-rel-${Date.now()}`,
          type: "FREIGHT_PAYOUT",
          amount: netIncome,
          description: `Nhận cước chuyến ${targetOrder.orderCode} (đã trừ 8% phí sàn)`,
          date: "Vừa xong",
          status: "COMPLETED",
        },
        {
          id: `tx-unl-${Date.now()}`,
          type: "DEPOSIT_UNLOCK",
          amount: targetOrder.requiredDeposit,
          description: `Hoàn trả cọc chuyến ${targetOrder.orderCode}`,
          date: "Vừa xong",
          status: "COMPLETED",
        },
        ...prev.transactions,
      ],
    }));

    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: "COMPLETED" } : o))
    );

    showToast(`Đã giải ngân ${netIncome.toLocaleString()}đ và hoàn cọc ${targetOrder.requiredDeposit.toLocaleString()}đ cho tài xế thành công!`);
  };

  // 7. Nạp tiền ví cọc Demo
  const topupWalletDemo = (amount: number) => {
    setWallet((prev) => ({
      ...prev,
      depositBalance: prev.depositBalance + amount,
      transactions: [
        {
          id: `tx-top-${Date.now()}`,
          type: "TOPUP",
          amount: amount,
          description: "Nạp tiền vào ví cọc qua VietQR Banking (Demo)",
          date: "Vừa xong",
          status: "COMPLETED",
        },
        ...prev.transactions,
      ],
    }));
    showToast(`Đã nạp ${amount.toLocaleString()}đ vào ví cọc thành công!`);
  };

  // 8. Gửi tin nhắn chat có bộ lọc Anti-Leakage
  const sendMessage = (orderId: string, text: string) => {
    const { cleanText, isLeaked } = sanitizeChatMessage(text);
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      orderId,
      senderId: role === "DRIVER" ? initialDriver.id : initialShipper.id,
      senderName: role === "DRIVER" ? "Nguyễn Văn A (Tài xế)" : "Nguyễn Văn B (Chủ hàng)",
      senderRole: role,
      content: cleanText,
      isFiltered: isLeaked,
      timestamp: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, newMsg]);

    if (isLeaked) {
      showToast("Cảnh báo: Tin nhắn chứa số điện thoại hoặc từ khóa né sàn đã bị che giấu để bảo vệ giao dịch!");
    }
  };

  // 9. Quản lý eKYC Driver Onboarding
  const submitDriverKyc = (data: Partial<DriverKycApplication>) => {
    const newApp: DriverKycApplication = {
      id: `kyc-${Date.now()}`,
      driverId: driver.id,
      driverName: data.driverName || driver.fullName,
      phone: data.phone || driver.phoneNumber,
      email: data.email || driver.email,
      idCardNumber: data.idCardNumber || "001095018291",
      idCardIssuedDate: data.idCardIssuedDate || "2022-05-12",
      idCardFrontUrl: data.idCardFrontUrl || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400",
      idCardBackUrl: data.idCardBackUrl || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400",
      selfieUrl: data.selfieUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
      driverLicenseNumber: data.driverLicenseNumber || "B2-998822",
      driverLicenseClass: data.driverLicenseClass || "C",
      driverLicenseExp: data.driverLicenseExp || "2029-10-15",
      licenseFrontUrl: data.licenseFrontUrl || "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400",
      truckPlate: data.truckPlate || "29C-998.88",
      truckType: data.truckType || "Xe tải mui bạt 8 tấn",
      truckWeightTon: data.truckWeightTon || 8,
      registrationCertUrl: data.registrationCertUrl || "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400",
      bankName: data.bankName || "Vietcombank",
      bankAccountNumber: data.bankAccountNumber || "9988776655",
      bankAccountHolder: (data.driverName || driver.fullName).toUpperCase(),
      status: "PENDING",
      submittedAt: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }) + " hôm nay",
      ...data,
    };

    setKycApplications((prev) => [newApp, ...prev]);
    setDriver((prev) => ({ ...prev, kycStatus: "PENDING" }));
    showToast("Hồ sơ eKYC CCCD & Phương tiện đã gửi thành công! Đang chờ Ban Quản Trị thẩm định.");
  };

  const approveDriverKyc = (appId: string) => {
    setKycApplications((prev) =>
      prev.map((app) => (app.id === appId ? { ...app, status: "VERIFIED", reviewedAt: "Vừa xong" } : app))
    );
    setDriver((prev) => ({ ...prev, kycStatus: "VERIFIED" }));
    showToast("Đã phê duyệt eKYC thành công! Tài khoản tài xế đã được kích hoạt chạy đơn.");
  };

  const rejectDriverKyc = (appId: string, reason?: string) => {
    setKycApplications((prev) =>
      prev.map((app) => (app.id === appId ? { ...app, status: "REJECTED", reviewNotes: reason || "Ảnh giấy tờ bị mờ", reviewedAt: "Vừa xong" } : app))
    );
    setDriver((prev) => ({ ...prev, kycStatus: "REJECTED" }));
    showToast("Đã từ chối hồ sơ eKYC. Đã gửi yêu cầu chụp lại ảnh CCCD.");
  };

  const switchDriverAccountStatus = (status: KycStatus) => {
    setDriver((prev) => ({ ...prev, kycStatus: status }));
    showToast(`Đã chuyển trạng thái tài xế: ${status === "VERIFIED" ? "ĐÃ DUYỆT (Nhận chuyến bình thường)" : status === "PENDING" ? "CHỜ DUYỆT (Khóa nhận chuyến)" : "CHƯA NỘP HỒ SƠ"}`);
  };

  const addDriverVehicle = (veh: Partial<Vehicle>) => {
    const newVeh: Vehicle = {
      id: `veh-${Date.now()}`,
      driverId: driver.id,
      plateNumber: veh.plateNumber || "29C-112.23",
      vehicleType: veh.vehicleType || "Xe tải thùng kín",
      brand: veh.brand || "Hino 500 Series",
      maxPayloadKg: veh.maxPayloadKg || 8000,
      dimensions: veh.dimensions || "6.0 x 2.2 x 2.4 m",
      isVerified: true,
      isDefault: false,
    };
    setDriverVehicles((prev) => [...prev, newVeh]);
    showToast(`Đã thêm xe ${newVeh.plateNumber} vào hồ sơ thành công!`);
  };

  const setDefaultVehicle = (id: string) => {
    setDriverVehicles((prev) =>
      prev.map((v) => ({
        ...v,
        isDefault: v.id === id,
      }))
    );
    showToast("Đã thiết lập xe hoạt động chính!");
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        driver,
        setDriver,
        shipper,
        setShipper,
        driverVehicles,
        addDriverVehicle,
        setDefaultVehicle,
        orders,
        returnTrips,
        wallet,
        activeTab,
        setActiveTab,
        selectedOrder,
        setSelectedOrder,
        kycApplications,
        submitDriverKyc,
        approveDriverKyc,
        rejectDriverKyc,
        switchDriverAccountStatus,
        createOrder,
        acceptOrderAndLockDeposit,
        payEscrow,
        updateLocationStep,
        submitPod,
        confirmReleaseEscrow,
        topupWalletDemo,
        messages,
        sendMessage,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within an AppProvider");
  return context;
};
