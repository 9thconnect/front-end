import { Category } from "./category";
import { IVendor } from "./users";

export interface Vendor {
  _id: string;
  fullName: string;
  vendorID: string;
  email: string;
  avatar: string;
}

export interface Profession {
  _id: string;
  vendor: Vendor;
  professionType: Category;
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

export interface ProfessionsResponseData {
  page: number;
  pages: number;
  count: number;
  professions: Profession[];
}

export interface Business {
  _id: string;
  vendor?: IVendor;
  businessType: Category;
  business: string;
  businessDesc: string;
  shopName: string;
  shopCity: string;
  shopAddress: string;
  shopState: string;
  shopCountry: string;
  shopID: string;
  businessEmail: string;
  businessPhoneNumber: string;
  businessLegalName: string;
  businessRegNo: string;
  businessLogo: string;
  businessApproved: boolean;
  businessRejected: boolean;
  businessActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BusinessResponseData {
  page: number;
  pages: number;
  count: number;
  businesses: Business[];
}

// jrjrjrj

interface Artisan {
  _id: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  artisanID: string;
  avatar: string;
}

interface ProfessionType {
  _id: string;
  title: string;
  description: string;
  categoryType: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

interface Qualification {
  degree: string;
  institute: string;
  year: string;
  _id: string;
}

export interface ProfessionalData {
  _id: string;
  vendor: IVendor;
  artisan: Artisan;
  professionType: ProfessionType;
  profession: string;
  professionName: string;
  professionDesc: string;
  professionCity: string;
  professionID: string;
  professionApproved: boolean;
  professionActive: boolean;
  price: number;
  portfolio: string[];
  qualifications: Qualification[];
  createdAt: string;
  updatedAt: string;
  ownerType: string;
}

export interface SingleTalentPageProps {
  id: string;
}

export interface Customer {
  _id: string;
  fullName: string;
  avatar: string;
}
export interface Proposal {
  _id: string;
  customer: Customer;
  professional: {
    _id: string;
    fullName: string;
    vendorID: string;
    avatar: string;
  };
  profession: {
    _id: string;
    profession: string;
    professionName: string;
    professionID: string;
    price: number;
  };
  projectDescription: string;
  proposedPrice: number;
  status: "pending" | "accepted" | "rejected";
  offeredDate: Date;
  expired: boolean;
  isPaid: boolean;
  expectedDelivery: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  rejectedDate?: string;
  rejectedReason?: string;
}

export interface Project {
  requestExtension: {
    originalDate: string | null;
    newDate: string | null;
    days: number;
    reason: string;
  };
  _id: string;
  customer: { _id: string; fullName: string; avatar: string };
  professional: {
    _id: string;
    fullName: string;
    avatar: string;
    vendorID?: string;
  };
  profession: {
    _id: string;
    profession: string;
    professionName: string;
    professionID: string;
    price: number;
  };
  projectDescription: string;
  projectID: string;
  status: "started" | "completed" | "cancelled";
  startedDate: Date;
  approvedPrice: number;
  gatewayFee: number;
  MCDFee: number;
  professionalPay: number;
  isPaid: boolean;
  datePaid?: Date;
  payment: {
    _id: string;
    invoiceRef: string;
    payerName: string;
    gateway: string;
    status: string;
  };
  escrow: string;
  offer: string;
  expectedDelivery: number;
  deliveryDate: string;
  extendedDeliveryDate: boolean;
  completedProject: Array<{
    message: string;
    fileUrl: string;
    publicId: string;
    fileName: string;
    fileType: string;
    fileSize: number;
    fileFormat: string;
  }>;
  createdAt: string;
  updatedAt: string;
  completedDate?: Date;
  __v: number;
}
