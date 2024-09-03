import SingleTalentPage from "@/components/pages/hire/singleTalentPage";
import { Suspense } from "react";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function Page({ params }: Props) {
  return (
    <div>
      <Suspense fallback={<p>Loading...</p>}>
        <SingleTalentPage id={params.id} />
      </Suspense>
    </div>
  );
}
