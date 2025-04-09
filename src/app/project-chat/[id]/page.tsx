import SingleProjectPage from "@/components/pages/hire/singleProjectPage";
import React from "react";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const page = ({ params }: Props) => {
  return (
    <div className="h-screen">
      <SingleProjectPage id={params.id} />
    </div>
  );
};

export default page;
