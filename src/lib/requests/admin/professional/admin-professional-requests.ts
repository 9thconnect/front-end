import { ProfessionsResponseData } from "@/type/professional";
import requests from "@/utils/requests";

export const fetchProfessionals = ({
  search = "",
  professionType = "",
  vendor = "",
  pageNumber = 1,
}: {
  search?: string;
  professionType?: string;
  vendor?: string;
  pageNumber?: number;
}) =>
  requests.get<ProfessionsResponseData>(
    `/vendor/all-professions?search=${encodeURIComponent(
      search
    )}&filterByProfessionType=${professionType}&filterByVendor=${vendor}&pageNumber=${pageNumber}`
  );
