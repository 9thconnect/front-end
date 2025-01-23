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
  }>(`/offer/customer-offers${queryString ? `?${queryString}` : ""}`);
};

export const payForProject = (payload: {
  offerId: string;
  redirectURL: string;
}) => {
  return requests.post<{ checkout: string }>(`/offer/customer-pay-gig`, {
    redirectURL: payload.redirectURL,
    offerId: payload.offerId,
  });
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
  }>(`/project/customer-projects${queryString ? `?${queryString}` : ""}`);
};
