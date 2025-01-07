import SingleLogisticsPage from "@/components/pages/logistics/singleLogisticPage";
import { siteConfig } from "@/config/site.config";

import type { Metadata, ResolvingMetadata } from "next";
import { Suspense } from "react";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.id;

  // fetch data

  const product = await fetch(
    `${siteConfig.apiURL}/logistic/logistic-single/${params.id}`
  )
    .then((res) => res.json())
    .catch((err) => {
      console.log(err);
    });

  console.log(product?.data?.data?.name);

  return {
    title: product?.data?.data?.name,
  };
}

export default async function Page({ params }: Props) {
  return (
    <div>
      <Suspense fallback={<p>Loading...</p>}>
        <SingleLogisticsPage id={params.id} />
      </Suspense>
    </div>
  );
}
