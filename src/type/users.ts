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
  __v: number;
}

export interface IUser {
  _id: string;
  fullName: string;
  username: string;
  email: string;
  role: string;
  isActive: boolean;
  phone: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
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
  vendorType: string;
  avatar: string;
  gender: string;
  isActivate: boolean;
  accountConfirm: boolean;
  confirmationCode: string | null;
  confirmationCodeExpires: string | null;
  passwordResetToken: string;
  accountClosed: boolean;
  registeredOn: string;
  businesses: Business[];
  professions: Profession[];
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
