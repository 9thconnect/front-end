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
