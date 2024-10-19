"use client";

import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonTalentCard = () => (
  <div className="border rounded-lg p-4">
    <Skeleton className="h-40 w-full mb-4" />
    <Skeleton className="h-4 w-3/4 mb-2" />
    <Skeleton className="h-4 w-1/2 mb-2" />
    <Skeleton className="h-4 w-1/4" />
  </div>
);
