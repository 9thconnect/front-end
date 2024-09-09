import SingleProductPage from "@/components/pages/marketplace/singleProductPage";
import { siteConfig } from "@/config/site.config";
import { Product } from "@/type/common";
import requests from "@/utils/requests";

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
    `${siteConfig.apiURL}/product/customer/single-product/${params.id}`
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
  // const product = await fetch(
  //   `${siteConfig.apiURL}/product/customer/single-product/${params.id}`
  // ).then((res) => res.json());

  return (
    <div>
      <Suspense fallback={<p>Loading...</p>}>
        <SingleProductPage id={params.id} />
      </Suspense>
    </div>
  );
}
