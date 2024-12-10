export interface CustomerTo {
  _id: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  avatar: string;
}

export interface VendorFrom {
  _id: string;
  fullName: string;
  vendorID: string;
  email: string;
  phoneNumber: string;
  vendorType: string;
  avatar: string;
}

export interface Project {
  _id: string;
  projectDescription: string;
  projectID: string;
  status: string;
  approvedPrice: number;
}

export interface Profession {
  _id: string;
  profession: string;
  professionName: string;
  professionID: string;
  price: number;
}

export interface Notification {
  _id: string;
  customerTo: CustomerTo | null;
  professional?: {
    _id: string;
    fullName: string;
    avatar: string;
  };
  customer?: {
    _id: string;
    fullName: string;
    avatar: string;
  };
  customerFrom?: CustomerTo | null;
  vendorFrom: VendorFrom | null;
  vendorTo: VendorFrom | null;
  isRead: boolean;
  message: string;
  notificationType:
    | "order"
    | "offer"
    | "project"
    | "product"
    | "profession"
    | "business"
    | "wallet"
    | "transaction";
  ownerType: "vendor" | "customer";
  project?: Project;
  offer?: {
    _id: string;
    projectDescription: string;
    proposedPrice: number;
    status: "pending" | "accepted" | "rejected";
  };
  profession: Profession;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
