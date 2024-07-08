"use client";

import useParams from "@/lib/hooks/params.hook";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CardLinkContainer(
  { children, type, searchParams }: {
    children: React.ReactNode;
    type: "balance" | "spent" | "received";
    searchParams: { [key: string]: string };
  },
) {
  const {
    getQueryParam,
    deleteQueryString,
    createQueryString,
    getFullPathname,
  } = useParams();

  const pathname = usePathname();
  const mode = getQueryParam("mode");

  const createQueryLink = () => {
    if (type === "balance") {
      const path = deleteQueryString("mode");
      return `${pathname}?${path}`;
    } else {
      const path = createQueryString("mode", type);
      return `${pathname}?${path}`;
    }
  };

  return (
    <Link
      href={createQueryLink()}
      scroll={false}
    >
      {children}
    </Link>
  );
}
