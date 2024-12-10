import { Project, Proposal } from "@/type/professional";
import requests from "@/utils/requests";

export const getProposals = (
  pageNumber?: number,
  filterByStatus?: string,
  filterByArtisan?: string
) => {
  // Create a query object based on the passed parameters
  const queryParams: Record<string, string | number | boolean | undefined> = {
    pageNumber,
    filterByStatus,
    filterByArtisan,
  };

  // Filter out undefined values from the query object
  const queryString = Object.keys(queryParams)
    .filter((key) => queryParams[key] !== undefined)
    .map((key) => `${key}=${encodeURIComponent(queryParams[key] as string)}`)
    .join("&");

  // Make the request with the dynamically constructed query string
  return requests.get<{
    data: {
      page: number;
      pages: number;
      count: number;
      offers: Array<Proposal>;
    };
  }>(`/offer/vendor-offers${queryString ? `?${queryString}` : ""}`);
};

export const acceptOffer = async (payload: {
  offerId: string;
  addCustomExpectedDelivery?: boolean;
  customExpectDeliver?: number;
}) => {
  const response = await requests.patch(`/offer/accept-offer`, payload);
  return response.data;
};

export const rejectOffer = async (payload: {
  offerId: string;
  rejectedReason: string;
}) => {
  const response = await requests.patch(`/offer/reject-offer`, payload);
  return response.data;
};

export const getProjects = (
  pageNumber?: number,
  filterByStatus?: string,
  filterByArtisan?: string
) => {
  // Create a query object based on the passed parameters
  const queryParams: Record<string, string | number | boolean | undefined> = {
    pageNumber,
    filterByStatus,
    filterByArtisan,
  };

  // Filter out undefined values from the query object
  const queryString = Object.keys(queryParams)
    .filter((key) => queryParams[key] !== undefined)
    .map((key) => `${key}=${encodeURIComponent(queryParams[key] as string)}`)
    .join("&");

  // Make the request with the dynamically constructed query string
  return requests.get<{
    data: {
      page: number;
      pages: number;
      count: number;
      projects: Array<Project>;
    };
  }>(`/project/vendor-projects${queryString ? `?${queryString}` : ""}`);
};

export const completeProject = async (payload: {
  projectId: string;
  completedProject: Array<{
    message: string;
    fileUrl: string;
    fileName?: string;
    fileType?: string;
    fileSize?: number;
    fileFormat?: string;
  }>;
}) => {
  const response = await requests.patch(`/project/complete-project`, payload);
  return response.data;
};
