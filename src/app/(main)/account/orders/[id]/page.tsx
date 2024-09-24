import SingleOrderPage from "@/components/pages/marketplace/singleOrderPage";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import React from "react";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
const page = ({ params }: Props) => {
  return <SingleOrderPage id={params.id} />;
};

export default page;
