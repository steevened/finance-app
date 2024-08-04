"use client";

import { Skeleton } from "../ui/skeleton";

export default function TableSkeleton() {
  return (
    <div>
      <div className="p-4 rounded-md">
        <div className="space-y-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="grid grid-cols-3 gap-4">
              <Skeleton className="h-8 col-span-1" />
              <Skeleton className="h-8 col-span-1" />
              <Skeleton className="h-8 col-span-1" />
            </div>
          ))}
        </div>
      </div>
      <p className=" mt-4 text-center">
        <Skeleton className="h-4 w-64 mx-auto" />
      </p>
    </div>
  );
}
