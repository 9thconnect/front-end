import SingleProductPage from "@/components/pages/marketplace/singleProductPage";

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
    `http://localhost:3000/marketplace/${id}/api`
  ).then((res) => res.json());

  console.log("prod", product.id);

  return {
    title: product.name,
  };
}

export default async function Page({ params }: Props) {
  const product = await fetch(
    `http://localhost:3000/marketplace/${params.id}/api`
  ).then((res) => res.json());

  return (
    <div>
      <Suspense fallback={<p>Loading...</p>}>
        <SingleProductPage product={product} />
      </Suspense>
    </div>
  );
}
