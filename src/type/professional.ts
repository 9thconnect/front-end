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
  shopID: string;
  businessEmail: string;
  businessPhoneNumber: string;
  businessLegalName: string;
  businessRegNo: string;
  businessLogo: string;
  businessApproved: boolean;
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
