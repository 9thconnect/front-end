import SectionContainer from "@/components/cards/common/sectionContainer";
import FilterSection from "@/components/common/filterSection";
import LogisticPage from "@/components/pages/logistics/logisticsHome";
import React from "react";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const page = ({ params }: Props) => {
  return <LogisticPage slug={params.slug} />;
};

export default page;
