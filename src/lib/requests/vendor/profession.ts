import { ProfessionalData } from "@/type/professional";
import requests from "@/utils/requests";

export const getCompanyProfessional = ({ queryKey }: { queryKey: any }) => {
  const [_key, { page }] = queryKey;
  return requests.get<ProfessionalData[]>(`/order/orders?pageNumber=${page}`);
};
