import { Category } from "./category";
import { Vendor } from "./professional";

export interface BaseResponse<T> {
  message: string;
  status: "success" | "error";
  data: T | null;
}

interface Seller {
  _id: string;
  fullName: string;
  vendorID: string;
  avatar: string;
}

export interface Product {
  discount: {
    active: boolean;
    amount: number;
  };
  _id: string;
  name: string;
  description: string;
  price: number;
  seller: Seller;
  productCategory: Category;
  subCategory: Category;
  images: string[];
  available: boolean;
  views: number;
  viewers: any[]; // You might want to define a more specific type for viewers
  disabled: boolean;
  dateAdded: string;
  numSold: number;
  createdAt: string;
  updatedAt: string;
  stockQuantity: number;
  variations: any[];
  rating: number;
  numReviews: number;
  __v: number;
}

export interface ProductsResponse {
  data: {
    page: number;
    pages: number;
    count: number;
    products: Product[];
  };
}

export interface SimilarProductResponse {
  data: Product[];
}

export interface CartItem {
  name: string;
  quantity: number;
  image: string;
  price: number;
  date: string;
  productId: Product;
  seller: string;
  _id: string;
  total: number;
}

export interface WishItem {
  _id: string;
  name: string;
  price: number;
  images: Array<string>;
}

export interface Escrow {
  _id: string;
  tradeType: string;
  tradeCurrency: string;
  status: string;
}

export interface Order {
  shippingAddress: {
    address: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  orderDetails: {
    itemsTotalPrice: number;
    totalPrice: number;
    extraPrice: number;
  };
  reported: boolean;
  _id: string;
  customer: string;
  orderItems: OrderItem[];
  orderID: string;
  status: string;
  customerConfirmOrder: boolean;
  isPaid: boolean;
  dateOrdered: string;
  escrow: Escrow | null;
  payment: null | {
    invoiceRef: string;
    payerName: string;
    status: string;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface OrderItem {
  name: string;
  quantity: number;
  image: string;
  price: number;
  productId: string;
  seller: string;
  MCDFee: number;
  sellerPay: number;
  total: number;
  _id: string;
}

export interface OrderResponse {
  page: number;
  pages: number;
  count: number;
  orders: Order[];
}

export interface BusinessData {
  _id: string;
  vendor: Vendor;
  businessType: Category;
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
  businessActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  shopCity: string;
}

export interface Payment {
  _id: string;
  vendor: string;
  invoiceRef: string;
  payerName: string;
  payerEmail: string;
  payerPhoneNumber: string;
  amount: number;
  paymentCompleted: boolean;
  paymentDate: Date; // You could use `Date` here if you parse the date string
  order: string;
  paymentFor: string;
  status: "approved" | "pending" | "failed";
  createdAt: Date; // Similarly, could use `Date` if you handle it that way
  updatedAt: Date;
  __v: number;
  ipAddress: string;
}
