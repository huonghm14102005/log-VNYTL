export type UserRole = "DRIVER" | "SHIPPER" | "ADMIN";

export type OrderStatus =
  | "DRAFT"
  | "SEARCHING"
  | "WAITING_DRIVER_DEPOSIT"
  | "WAITING_ESCROW_PAYMENT"
  | "MATCHED_ESCROWED"
  | "PICKING_UP"
  | "IN_TRANSIT"
  | "DELIVERED"
  | "COMPLETED"
  | "CANCELLED"
  | "DISPUTED";

export type ServicePackage = "STANDARD" | "SUPERVISED" | "INSURED";

export type UrgencyLevel = "NORMAL" | "URGENT" | "FLEXIBLE";

export type KycStatus = "UNVERIFIED" | "PENDING" | "VERIFIED" | "REJECTED";

export interface DriverKycApplication {
  id: string;
  driverId: string;
  fullName: string;
  phone: string;
  cccdNumber: string;
  dob: string;
  driverLicenseNumber: string;
  driverLicenseClass: string;
  plateNumber: string;
  vehicleType: string;
  maxPayloadKg: number;
  bankName: string;
  bankAccount: string;
  cccdFrontUrl?: string;
  cccdBackUrl?: string;
  portraitUrl?: string;
  status: KycStatus;
  submittedAt: string;
  matchScore: number;
}

export interface User {
  id: string;
  fullName: string;
  phoneNumber: string;
  role: UserRole;
  avatarUrl?: string;
  companyName?: string;
  rating: number;
  totalTrips: number;
  completedRate: number;
  isVerified: boolean;
  kycStatus?: KycStatus;
  idCardNumber?: string;
  driverLicense?: string;
}

export interface Vehicle {
  id: string;
  driverId: string;
  plateNumber: string;
  vehicleType: string;
  brand?: string;
  maxPayloadKg: number;
  dimensions: string; // e.g. "6.2 x 2.3 x 2.5 m"
  photoUrl?: string;
  isVerified: boolean;
}

export interface Order {
  id: string;
  orderCode: string;
  shipperId: string;
  shipperName: string;
  shipperPhone: string;
  shipperRating: number;
  driverId?: string;
  driverName?: string;
  driverPhone?: string;
  driverPlateNumber?: string;

  originCity: string;
  originAddress: string;
  originLat: number;
  originLng: number;

  destCity: string;
  destAddress: string;
  destLat: number;
  destLng: number;

  distanceKm: number;
  cargoName: string;
  cargoType: string;
  cargoWeightKg: number;
  vehicleTypeRequired: string;
  
  declaredValue: number;
  freightPrice: number;
  requiredDeposit: number;
  servicePackage: ServicePackage;
  urgencyLevel: UrgencyLevel;
  status: OrderStatus;

  pickupTime: string;
  deliveryTime: string;
  estimatedHours: string;
  
  matchScore?: number;
  matchReason?: string;
  isReturnTripMatch?: boolean;
  specialNotes?: string;

  escrowDeadlineMinutes?: number;
  isEscrowPaid?: boolean;
  driverDeposited?: boolean;

  trackingProgress?: {
    completedKm: number;
    totalKm: number;
    remainingTime: string;
    currentLat: number;
    currentLng: number;
  };

  pod?: {
    photoUrl: string;
    signatureUrl?: string;
    receiverName: string;
    deliveredAt: string;
  };
}

export interface ReturnTrip {
  id: string;
  driverId: string;
  driverName: string;
  plateNumber: string;
  vehicleType: string;
  availablePayloadKg: number;
  originCity: string;
  destCity: string;
  availableFrom: string;
  availableTo: string;
  expectedPrice: number;
  discountPercent: number; // e.g. 25% discount
}

export interface Wallet {
  depositBalance: number;
  lockedDeposit: number;
  incomeBalance: number;
  totalIncome: number;
  transactions: {
    id: string;
    type: "DEPOSIT_LOCK" | "DEPOSIT_UNLOCK" | "FREIGHT_PAYOUT" | "TOPUP" | "WITHDRAW";
    amount: number;
    description: string;
    date: string;
    status: "COMPLETED" | "PENDING";
  }[];
}

export interface ChatMessage {
  id: string;
  orderId: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  content: string;
  isFiltered: boolean;
  timestamp: string;
}
