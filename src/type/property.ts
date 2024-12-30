interface Location {
  state: string;
  country: string;
  address: string;
}

interface Details {
  bedroom: number;
  bathroom: number;
  toilet: number;
  sittingRoom: number;
}

interface Contact {
  callNumber: string;
  whatsAppNumber: string;
}

interface Vendor {
  _id: string;
  fullName: string;
  vendorID: string;
}

interface MarketedBy {
  _id: string;
  shopName: string;
  shopCity: string;
  shopID: string;
  businessLegalName: string;
  businessLogo: string;
}

interface PropertyType {
  _id: string;
  title: string;
  image: string;
}

export interface Property {
  location: Location;
  details: Details;
  contact: Contact;
  _id: string;
  title: string;
  description: string;
  price: number;
  amenities: string[];
  images: string[];
  vendor: Vendor;
  marketedBy: MarketedBy;
  propertyType: PropertyType;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
