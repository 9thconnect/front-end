export interface Contact {
  callNumber: string;
  whatsAppNumber: string;
}

export interface Vendor {
  _id: string;
  fullName: string;
  vendorID: string;
}

export interface MarketedBy {
  _id: string;
  shopName: string;
  shopCity: string;
  shopID: string;
  businessLegalName: string;
  businessLogo: string;
}

export interface Logistics {
  _id: string;
  title: string;
  registration: string;
  details: string;
  logisticType: "road" | "rail" | "air" | "sea" | "interModal";
  logisticSubType?:
    | "bike"
    | "truck"
    | "van"
    | "LTL"
    | "internodalRail"
    | "unitTrain"
    | "cargoAirline"
    | "containerShip";
  capacity: number;
  fuelType: string;
  image: string;
  ratePerKg: number;
  ratePerKilometer: number;
  contact: Contact;
  vendor: Vendor;
  marketedBy: MarketedBy;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface LogisticsResponse {
  data: {
    page: number;
    pages: number;
    count: number;
    logistics: Logistics[];
  };
}

export interface CreateLogisticsRequest {
  title: string;
  registration: string;
  details: string;
  logisticType: "road" | "air" | "sea";
  logisticSubType: "van" | "cargoAirline" | string;
  capacity: number;
  fuelType: string;
  image: string;
  ratePerKg: number;
  ratePerKilometer: number;
  contact: Contact;
}
