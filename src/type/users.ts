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
  rating: number;
  __v: number;
  lastSeen: string;
  profileBuild: boolean;
  accountSuspend: boolean;
}

interface Wallet {
  escrowBalance: number;
  availableBalance: number;
  totalInflow: number;
  totalOutflow: number;
  bookedBalance: number;
}

interface Business {
  _id: string;
  vendor: string;
  businessType: string;
  business: string;
  businessDesc: string;
  shopName: string;
  shopAddress: string;
  shopID: string;
  businessEmail: string;
  businessPhoneNumber: string;
  businessLegalName: string;
  businessRegNo: string;
  businessLogo: string;
  businessApproved: boolean;
  businessRejected: boolean;
  businessPending: boolean;
  businessActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  approvedBy: string;
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
  price: number;
  professionPending: boolean;
  professionRejected: boolean;
  rating: number;
  numReviews: number;
  portfolio: string[];
  qualifications: {
    degree: string;
    institute: string;
    year: number;
    _id: string;
  }[];
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
  workerStats: {
    totalStaffs: number;
    professionTotalValue: number;
  };
}

interface WalletStats {
  availableBalance: number;
  escrowBalance: number;
  totalAmountOwed: number;
  totalAmountReceived: number;
  totalAmountWithdraw: number;
}

interface OrderStats {
  pendingOrders: number;
  receivedOrders: number;
  processingOrders: number;
  shippedOrders: number;
  deliveredOrders: number;
  cancelledOrders: number;
}

interface ShopStats {
  totalProducts: number;
  totalProductValue: number;
}

export interface StatsSeller {
  walletStats: WalletStats;
  orderStats: OrderStats;
  shopStats: ShopStats;
}

export interface AdminStats {
  walletStats: {
    totalAmountOwedToSellers: number;
    totalAmountReceivedBySellers: number;
    totalAmountOwedToProfessionals: number;
    totalAmountReceivedByProfessionals: number;
    totalAmountWithdrawByVendors: number;
  };
  orderStats: {
    pendingOrders: number;
    receivedOrders: number;
    processingOrders: number;
    shippedOrders: number;
    deliveredOrders: number;
    cancelledOrders: number;
    totalOrderedAmount: number;
  };
  productStats: {
    totalProducts: number;
    totalProductValue: number;
  };
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
    totalApprovedPrice: number;
  };
  professionStats: {
    totalProfessions: number;
    professionTotalValue: number;
  };
  artisanStats: {
    totalArtisans: number;
  };
  propertyStats: {
    totalProperties: number;
  };
  logisticStats: {
    totalFleets: number;
  };
  transactionStats: {
    pendingPayments: number;
    approvedPayments: number;
    failedPayments: number;
    totalPayments: number;
  };
  vendor: {
    totalVendors: number;
    totalSuspectedVendors: number;
    totalActiveVendors: number;
    totalVendorSellers: number;
    totalVendorProfessionals: number;
    totalVendorRealEstate: number;
    totalVendorLogistics: number;
  };
  customer: {
    totalCustomers: number;
    totalSuspectedCustomers: number;
    totalActiveCustomers: number;
  };
}
