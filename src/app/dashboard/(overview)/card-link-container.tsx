"use client";

import useParams from "@/lib/hooks/params.hook";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CardLinkContainer(
  { children, type }: {
    children: React.ReactNode;
    type: "balance" | "spent" | "received";
  },
) {
  const pathname = usePathname();

  return (
    <Link
      href={{
        pathname,
        query: type !== "balance"
          ? {
            mode: type,
          }
          : undefined,
      }}
      scroll={false}
    >
      {children}
    </Link>
  );
}
