import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

const CompanyProfessions = () => {
  const [page, setPage] = useState(1);

  const { isLoading, isError, data, error, refetch, isFetching } = useQuery({
    queryKey: ["get-company-professions", { page: page }],
    // queryFn: getOrders,
  });
  return <div></div>;
};

export default CompanyProfessions;
