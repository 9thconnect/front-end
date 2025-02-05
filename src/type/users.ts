import { CartItem } from "./common";

export interface IAdmin {
  _id: string;
  fullName: string;
  username: string;
  email: string;
  role: string;
  isActive: boolean;
  phone: string;
  createdAt: string;
  updatedAt: string;
  avatar: string;
  phoneNumber: string;
  __v: number;
}

export interface IUser {
  wallet: {
    escrowBalance: number;
    availableBalance: number;
  };
  _id: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  avatar: string;
  savedProducts: string[];
  cart: Array<CartItem>;
  createdAt: string;
  updatedAt: string;
  __v: number;
  lastSeen: string;
}

interface AccountDetails {
  accountNumber: string;
  accountName: string;
  bankName: string;
  bankCode: string;
}

export interface IVendor {
  wallet: Wallet;
  accountDetails: AccountDetails;
  _id: string;
  fullName: string;
  vendorID: string;
  email: string;
  phoneNumber: string;
  vendorType: "seller" | "professional" | "real-estate" | "logistic";
  sellerType: "wholeSale" | "retail";
  professionalType: "company" | "individual";
  avatar: string;
  gender: string;
  isActivate: boolean;
  accountConfirm: boolean;
  confirmationCode: string | null;
  confirmationCodeExpires: string | null;
  passwordResetToken: string;
  accountClosed: boolean;
  registeredOn: string;
  businesses?: Business[];
  professions?: Profession[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  lastSeen: string;
}

interface Wallet {
  totalAmountOwed: number;
  totalAmountReceived: number;
  totalWithdraw: number;
}

interface Business {
  // Define the properties for Business if they exist
}

interface Profession {
  _id: string;
  vendor: string;
  professionType: string;
  profession: string;
  professionName: string;
  professionDesc: string;
  professionCity: string;
  professionID: string;
  professionApproved: boolean;
  professionActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface CustomerStats {
  offerStats: {
    pendingOffers: number;
    acceptedOffers: number;
    rejectedOffers: number;
    totalProposedPrice: number;
  };
  projectStats: {
    startedProjects: number;
    completedProjects: number;
    cancelledProjects: number;
    totalProjectAmountSpent: number;
  };
  transactionStats: {
    pendingPayments: number;
    approvedPayments: number;
    failedPayments: number;
    shippedOrders: number;
    totalAmountSpent: number;
  };
  orderStats: {
    pendingOrders: number;
    receivedOrders: number;
    processingOrders: number;
    deliveredOrders: number;
    cancelledOrders: number;
    totalOrderAmountSpent: number;
  };
  walletStats: {
    availableBalance: number;
    escrowBalance: number;
  };
}

export interface VendorStats {
  offerStats: {
    pendingOffers: number;
    acceptedOffers: number;
    rejectedOffers: number;
    totalProposedPrice: number;
  };
  projectStats: {
    startedProjects: number;
    completedProjects: number;
    cancelledProjects: number;
    totalProjectAmountSpent: number;
  };
  transactionStats: {
    pendingPayments: number;
    approvedPayments: number;
    failedPayments: number;
    shippedOrders: number;
    totalAmountSpent: number;
  };
  orderStats: {
    pendingOrders: number;
    receivedOrders: number;
    processingOrders: number;
    deliveredOrders: number;
    cancelledOrders: number;
    totalOrderAmountSpent: number;
  };
  walletStats: {
    availableBalance: number;
    escrowBalance: number;
  };
}
